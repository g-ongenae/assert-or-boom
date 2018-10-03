import test, {Assertions, beforeEach} from 'ava';

import {AssertOrBoom} from '../../src/index';

let assert: AssertOrBoom;

beforeEach('Instantiate an AssertOrBoom object', () => {
  assert = new AssertOrBoom();
});

test('should not set willThrow to true if value is valid', (t: Assertions) => {
  const valuesToTest: any[] = [
    // TODO ADD VALUES
  ];

  for (const value of valuesToTest) {
    assert.isNullOrUndefined(value);
    t.false(assert.willThrow);
  }
});

test('should set willThrow to true if value is invalid', (t: Assertions) => {
  const valuesToTest: any[] = [
    // TODO ADD VALUES
  ];

  for (const value of valuesToTest) {
    assert.willThrow = false; // reset
    assert.isNullOrUndefined(value);
    t.true(assert.willThrow);
  }
});

test('should be chainable', (t: Assertions) => {
  const invalid: any = 'invalid';
  const valid: any = 'valid';

  assert.willThrow = false; // reset
  assert.isNotNullOrUndefined(invalid).isNotNullOrUndefined(valid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isNotNullOrUndefined(valid).isNotNullOrUndefined(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isNotNullOrUndefined(invalid).isNotNullOrUndefined(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isNotNullOrUndefined(valid).isNotNullOrUndefined(valid);
  t.true(assert.willThrow);
});
