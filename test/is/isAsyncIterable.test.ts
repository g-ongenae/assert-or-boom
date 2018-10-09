import test, {Assertions, beforeEach} from 'ava';

import {AssertOrBoom} from '../../src/index';

// Functions here are only for test and doesn't need typedef
// tslint:disable: typedef

let assert: AssertOrBoom;

beforeEach('Instantiate an AssertOrBoom object', () => {
  assert = new AssertOrBoom();
});

test('should not set willThrow to true if value is valid', (t: Assertions) => {
  const valuesToTest: any[] = [{[Symbol.asyncIterator]: () => {}}];

  for (const value of valuesToTest) {
    assert.isAsyncIterable(value);
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
    async () => void 0,
    async function() {},
    function*(): IterableIterator<any> {},
    async function*(): AsyncIterableIterator<any> {},
  ];

  for (const value of valuesToTest) {
    assert.willThrow = false; // reset
    assert.isAsyncIterable(value);
    t.true(assert.willThrow);
  }
});

test('should be chainable', (t: Assertions) => {
  const invalid: any = 'invalid';
  const valid: any = {[Symbol.asyncIterator]: () => {}};

  assert.willThrow = false; // reset
  assert.isAsyncIterable(invalid).isAsyncIterable(valid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isAsyncIterable(valid).isAsyncIterable(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isAsyncIterable(invalid).isAsyncIterable(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isAsyncIterable(valid).isAsyncIterable(valid);
  t.false(assert.willThrow);
});
