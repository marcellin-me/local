import { module, test } from 'qunit';
import buildTransition from 'local/utils/build-transition';

import Application from '@ember/application';
import Route from '@ember/routing/route';
import { run } from '@ember/runloop';
import { debug } from '@ember/debug';

let MOCKApp;
module('Unit | Utility | build transition', {
	before() {
		// START stub a route
    debug('Creating...');
		MOCKApp = run(() => {
			let application = Application.create();
			application.IndexRoute = Route.extend({});
			application.PageRoute = Route.extend({});
			return application;
		});
		// END stub a route
	},
	after() {
    debug('Destroying...');
		run(MOCKApp, 'destroy');
	},
});

test('it calls window location function for external links', function(assert) {
  debug('1...');  
  let link = 'https://example.com/menu.html';

	let result = buildTransition(null, link);
	assert.ok(result.valid);
	assert.ok(!result.run.toString().includes('transitionTo'));
	assert.ok(
		result.run.toString().includes('window.location'),
		'should call window location function for external links'
	);
});
test('it calls transitionTo function for internal links/routes', function(assert) {
  debug('2...');
	let route = MOCKApp.__container__.lookup('route:index');
	let link = 'page'; // this is the route name (not the path name)

	let result = buildTransition(route, link);
	assert.ok(result.valid);
	assert.ok(!result.run.toString().includes('window.location'));
	assert.ok(
		result.run.toString().includes('transitionTo'),
		'should call transitionTo function for internal links/routes'
	);
});
test('it calls error function for invalid links/routes', function(assert) {
  debug('3...');
	let link = 'invalid.route';

	let result = buildTransition(null, link);
	assert.ok(!result.valid);
	assert.ok(!result.run.toString().includes('window.location'));
	assert.ok(!result.run.toString().includes('transitionTo'));
	assert.ok(result.run.toString().includes('Error'), 'should call error function for invalid links/routes');
});
