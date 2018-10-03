import test, {Assertions, beforeEach} from 'ava';

import {AssertOrBoom} from '../../src/index';

let assert: AssertOrBoom;

beforeEach('Instantiate an AssertOrBoom object', () => {
  assert = new AssertOrBoom();
});

test('should set willThrow to true if value is valid', (t: Assertions) => {
  const valuesToTest: any[] = [
    // TODO ADD VALUES
  ];

  for (const value of valuesToTest) {
    assert.isNotWeakSet(value);
    t.false(assert.willThrow);
  }
});

test('should not set willThrow to true if value is invalid', (t: Assertions) => {
  const valuesToTest: any[] = [
    // TODO ADD VALUES
  ];

  for (const value of valuesToTest) {
    assert.willThrow = false; // reset
    assert.isNotWeakSet(value);
    t.true(assert.willThrow);
  }
});

test('should be chainable', (t: Assertions) => {
  const invalid: any = 'invalid';
  const valid: any = 'valid';

  assert.willThrow = false; // reset
  assert.isNotWeakSet(invalid).isNotWeakSet(valid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isNotWeakSet(valid).isNotWeakSet(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isNotWeakSet(invalid).isNotWeakSet(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isNotWeakSet(valid).isNotWeakSet(valid);
  t.true(assert.willThrow);
});
