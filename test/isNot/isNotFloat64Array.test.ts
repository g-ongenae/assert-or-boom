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
    assert.isNotFloat64Array(value);
    t.false(assert.willThrow);
  }
});

test('should not set willThrow to true if value is invalid', (t: Assertions) => {
  const valuesToTest: any[] = [
    // TODO ADD VALUES
  ];

  for (const value of valuesToTest) {
    assert.willThrow = false; // reset
    assert.isNotFloat64Array(value);
    t.true(assert.willThrow);
  }
});

test('should be chainable', (t: Assertions) => {
  const invalid: any = 'invalid';
  const valid: any = 'valid';

  assert.willThrow = false; // reset
  assert.isNotFloat64Array(invalid).isNotFloat64Array(valid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isNotFloat64Array(valid).isNotFloat64Array(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isNotFloat64Array(invalid).isNotFloat64Array(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isNotFloat64Array(valid).isNotFloat64Array(valid);
  t.false(assert.willThrow);
});
