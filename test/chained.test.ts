import test, {Assertions, beforeEach} from 'ava';

import {AssertOrBoom} from '../src/index';

let assert: AssertOrBoom;

beforeEach('Initialize AssertOrBoom', () => {
  assert = new AssertOrBoom();
});

test('should not throw', (t: Assertions) => {
  t.notThrows(() => {
    // @ts-ignore
    assert.isString('test').orBadRequest();
  });
});

test('should throw', (t: Assertions) => {
  t.throws(() => {
    // @ts-ignore
    assert.isString(false).orBadRequest();
  });
});
