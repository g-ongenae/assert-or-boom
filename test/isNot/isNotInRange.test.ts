import test, {Assertions, beforeEach} from 'ava';

import {AssertOrBoom} from '../../src/index';

const testRange: number[] = [0, 1];

let assert: AssertOrBoom;

beforeEach('Instantiate an AssertOrBoom object', () => {
  assert = new AssertOrBoom();
});

test('should set willThrow to true if value is valid', (t: Assertions) => {
  const valuesToTest: any[] = [
    // TODO ADD VALUES
  ];

  for (const value of valuesToTest) {
    assert.isNotInRange(value, testRange);
    t.false(assert.willThrow);
  }
});

test('should not set willThrow to true if value is invalid', (t: Assertions) => {
  const valuesToTest: any[] = [
    // TODO ADD VALUES
  ];

  for (const value of valuesToTest) {
    assert.willThrow = false; // reset
    assert.isNotInRange(value, testRange);
    t.true(assert.willThrow);
  }
});

test('should be chainable', (t: Assertions) => {
  const invalid: any = 'invalid';
  const valid: any = 'valid';

  assert.willThrow = false; // reset
  assert.isNotInRange(invalid, testRange).isNotInRange(valid, testRange);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isNotInRange(valid, testRange).isNotInRange(invalid, testRange);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isNotInRange(invalid, testRange).isNotInRange(invalid, testRange);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isNotInRange(valid, testRange).isNotInRange(valid, testRange);
  t.true(assert.willThrow);
});
