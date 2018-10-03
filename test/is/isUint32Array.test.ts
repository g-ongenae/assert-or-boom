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
    assert.isUint32Array(value);
    t.false(assert.willThrow);
  }
});

test('should set willThrow to true if value is invalid', (t: Assertions) => {
  const valuesToTest: any[] = [
    // TODO ADD VALUES
  ];

  for (const value of valuesToTest) {
    assert.willThrow = false; // reset
    assert.isUint32Array(value);
    t.true(assert.willThrow);
  }
});

test('should be chainable', (t: Assertions) => {
  const invalid: any = 'invalid';
  const valid: any = 'valid';

  assert.willThrow = false; // reset
  assert.isNotUint32Array(invalid).isNotUint32Array(valid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isNotUint32Array(valid).isNotUint32Array(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isNotUint32Array(invalid).isNotUint32Array(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isNotUint32Array(valid).isNotUint32Array(valid);
  t.true(assert.willThrow);
});
