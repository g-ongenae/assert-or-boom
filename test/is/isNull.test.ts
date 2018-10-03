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
    assert.isNull(value);
    t.false(assert.shouldThrow);
  }
});

test('should set shouldThrow to true if value is invalid', (t: Assertions) => {
  const valuesToTest: any[] = [
    // TODO ADD VALUES
  ];

  for (const value of valuesToTest) {
    assert.shouldThrow = false; // reset
    assert.isNull(value);
    t.true(assert.willThrow);
  }
});

test('should be chainable', (t: Assertions) => {
  const invalid: any = 'invalid';
  const valid: any = 'valid';

  assert.shouldThrow = false; // reset
  assert.isNotNull(invalid).isNotNull(valid);
  t.true(assert.willThrow);

  assert.shouldThrow = false; // reset
  assert.isNotNull(valid).isNotNull(invalid);
  t.true(assert.willThrow);

  assert.shouldThrow = false; // reset
  assert.isNotNull(invalid).isNotNull(invalid);
  t.true(assert.willThrow);

  assert.shouldThrow = false; // reset
  assert.isNotNull(valid).isNotNull(valid);
  t.true(assert.willThrow);
});