import test, {Assertions, beforeEach} from 'ava';

import {AssertOrBoom} from '../../src/index';

// Functions here are only for test and doesn't need typedef
// tslint:disable: typedef

let assert: AssertOrBoom;

beforeEach('Instantiate an AssertOrBoom object', () => {
  assert = new AssertOrBoom();
});

test('should not set willThrow to true if value is valid', (t: Assertions) => {
  const valuesToTest: any[] = [async () => void 0, async function() {}];

  for (const value of valuesToTest) {
    assert.isAsyncFunction(value);
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
    function() {},
    () => void 0,
    new Promise((r) => r()),
    () => new Promise((r) => r()),
    function() {
      return new Promise((r) => r());
    },
  ];

  for (const value of valuesToTest) {
    assert.willThrow = false; // reset
    assert.isAsyncFunction(value);
    t.true(assert.willThrow);
  }
});

test('should be chainable', (t: Assertions) => {
  const invalid: any = 'invalid';
  const valid: any = async () => void 0;

  assert.willThrow = false; // reset
  assert.isAsyncFunction(invalid).isAsyncFunction(valid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isAsyncFunction(valid).isAsyncFunction(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isAsyncFunction(invalid).isAsyncFunction(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isAsyncFunction(valid).isAsyncFunction(valid);
  t.false(assert.willThrow);
});
