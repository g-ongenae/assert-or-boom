import test, {Assertions, beforeEach} from 'ava';

import {AssertOrBoom} from '../src/index';

let assert: AssertOrBoom;

beforeEach('Initialize AssertOrBoom', () => {
  assert = new AssertOrBoom();
});

test('should not throw', (t: Assertions) => {
  t.notThrows(() => assert.isString('test').orBadRequest());
});

test('should throw', (t: Assertions) => {
  t.throws(() => assert.isString(false).orBadRequest());
});

test('should not throw', (t: Assertions) => {
  t.notThrows(() =>
    assert
      .isString('test')
      .isString('test')
      .orBadRequest(),
  );
});

test('should throw', (t: Assertions) => {
  t.throws(() =>
    assert
      .isString(false)
      .isString('test')
      .orBadRequest(),
  );
  t.throws(() =>
    assert
      .isString('test')
      .isString(false)
      .orBadRequest(),
  );
  t.throws(() =>
    assert
      .isString(false)
      .isString(false)
      .orBadRequest(),
  );
});
