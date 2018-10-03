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
    assert.isArrayBuffer(value);
    t.false(assert.willThrow);
  }
});

test('should set willThrow to true if value is invalid', (t: Assertions) => {
  const valuesToTest: any[] = [
    // TODO ADD VALUES
  ];

  for (const value of valuesToTest) {
    assert.willThrow = false; // reset
    assert.isArrayBuffer(value);
    t.true(assert.willThrow);
  }
});

test('should be chainable', (t: Assertions) => {
  const invalid: any = 'invalid';
  const valid: any = 'valid';

  assert.willThrow = false; // reset
  assert.isArrayBuffer(invalid).isArrayBuffer(valid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isArrayBuffer(valid).isArrayBuffer(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isArrayBuffer(invalid).isArrayBuffer(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isArrayBuffer(valid).isArrayBuffer(valid);
  t.false(assert.willThrow);
});
