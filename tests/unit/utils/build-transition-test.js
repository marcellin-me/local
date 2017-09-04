import { module, test } from 'qunit';
import buildTransition from 'local/utils/build-transition';

import Application from '@ember/application';
import Route from '@ember/routing/route';

// START stub a route
const MOCKApp = Application.create();
MOCKApp.IndexRoute = Route.extend({});
MOCKApp.PageRoute = Route.extend({});
// END stub a route

module('Unit | Utility | build transition');

test('it calls window location function for external links', function(assert) {
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
	var route = MOCKApp.__container__.lookup('route:index');
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
	let link = 'invalid.route';

	let result = buildTransition(null, link);
	assert.ok(!result.valid);
	assert.ok(!result.run.toString().includes('window.location'));
	assert.ok(!result.run.toString().includes('transitionTo'));
	assert.ok(result.run.toString().includes('error'), 'should call error function for invalid links/routes');
});
