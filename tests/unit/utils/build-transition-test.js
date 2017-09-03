import buildTransition from 'local/utils/build-transition';
import { module, test } from 'qunit';

module('Unit | Utility | build transition');

test('it calls window location function for external links', function(assert) {
  let link = 'https://example.com/menu.html';

  let result = buildTransition(link);
  assert.ok(result.valid);
  assert.ok(!result.run.toString().includes('transitionTo'));
  assert.ok(result.run.toString().includes('window.location'));
});
test('it calls transitionTo function for internal links/routes', function(assert) {
  let link = 'application';  

  let result = buildTransition(link);
  assert.ok(result.valid);
  assert.ok(!result.run.toString().includes('window.location'));
  assert.ok(result.run.toString().includes('transitionTo'));
});
test('it calls error function for invalid links/routes', function(assert) {
  let link = 'invalid.route';

  let result = buildTransition(link);
  assert.ok(!result.valid);
  assert.ok(!result.run.toString().includes('window.location'));
  assert.ok(!result.run.toString().includes('transitionTo'));
  assert.ok(result.run.toString().includes('error'));
});