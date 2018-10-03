import test, {Assertions, beforeEach} from 'ava';

import {AssertOrBoom} from '../../src/index';

let assert: AssertOrBoom;

beforeEach('Instantiate an AssertOrBoom object', () => {
  assert = new AssertOrBoom();
});

test('should not set willThrow to true if value is valid', (t: Assertions) => {
  const valuesToTest: any[] = [`value to test ${true}`, 'value to test', 'value to "test"', ''];

  for (const value of valuesToTest) {
    assert.isString(value);
    t.false(assert.willThrow);
  }
});

test('should set willThrow to true if value is invalid', (t: Assertions) => {
  const valuesToTest: any[] = [
    1,
    0x1,
    function(): boolean {
      return true;
    },
    new Date(),
    undefined,
    void 0,
    null, // tslint:disable-line
    true,
    false,
  ];

  for (const value of valuesToTest) {
    assert.willThrow = false; // reset
    assert.isString(value);
    t.true(assert.willThrow);
  }
});

test('should be chainable', (t: Assertions) => {
  const invalid: any = undefined;
  const valid: any = 'valid';

  assert.willThrow = false; // reset
  assert.isString(invalid).isString(valid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isString(valid).isString(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isString(invalid).isString(invalid);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isString(valid).isString(valid);
  t.false(assert.willThrow);
});
