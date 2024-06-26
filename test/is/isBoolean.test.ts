import test, {Assertions, beforeEach} from 'ava';

import {AssertOrBoom} from '../../src/index';

let assert: AssertOrBoom;

beforeEach('Instantiate an AssertOrBoom object', () => {
  assert = new AssertOrBoom();
});

test('should not set willThrow to true if value is valid', (t: Assertions) => {
  const valuesToTest: any[] = [true, false];

  for (const value of valuesToTest) {
    assert.isBoolean(value);
    t.false(assert.willThrow);
  }
});

test('should set willThrow to true if value is invalid', (t: Assertions) => {
  const valuesToTest: any[] = [
    undefined,
    null, // tslint:disable-line
    1,
    'string',
    new Array(),
  ];

  for (const value of valuesToTest) {
    assert.willThrow = false; // reset
    assert.isBoolean(value);
    t.true(assert.willThrow);
  }
});

test('should be chainable', (t: Assertions) => {
  const invalid: any = 'invalid';
  const valid: any = true;

  assert.willThrow = false; // reset
  assert.isBoolean(invalid).isBoolean(valid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isBoolean(valid).isBoolean(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isBoolean(invalid).isBoolean(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isBoolean(valid).isBoolean(valid);
  t.false(assert.willThrow);
});
