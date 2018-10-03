import test, {Assertions, beforeEach} from 'ava';

import {AssertOrBoom} from '../src/index';

let assert: AssertOrBoom;

beforeEach('Initialize AssertOrBoom', () => {
  assert = new AssertOrBoom();
});

test('should be chainable between is and or', (t: Assertions) => {
  t.notThrows(() => assert.isString('test').orBadRequest());
  t.throws(() => assert.isString(false).orBadRequest());
});

test('should be chainable with multiple is and or', (t: Assertions) => {
  t.notThrows(() =>
    assert
      .isString('test')
      .isString('test')
      .orBadRequest(),
  );
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

test('should be chainable between isNot and or', (t: Assertions) => {
  t.notThrows(() => assert.isNotString(false).orBadRequest());
  t.throws(() => assert.isNotString('test').orBadRequest());
});

test('should be chainable with multiple is and isNot and and or', (t: Assertions) => {
  t.notThrows(() =>
    assert
      .isNotString(false)
      .isString('test')
      .orBadRequest(),
  );
  t.throws(() =>
    assert
      .isNotString(false)
      .isString(false)
      .orBadRequest(),
  );
  t.throws(() =>
    assert
      .isNotString('test')
      .isString('test')
      .orBadRequest(),
  );
});
