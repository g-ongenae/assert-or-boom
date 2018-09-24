import test, {Assertions, beforeEach} from 'ava';

import {AssertOrBoom} from '../src/index';

let assert: AssertOrBoom;

beforeEach('Instantiate an AssertOrBoom object', () => {
  assert = new AssertOrBoom();
});

test('should not set shouldThrow to true', (t: Assertions) => {
  const valuesToTest: any[] = [`value to test ${true}`, 'value to test', 'value to "tesst"', ''];

  for (const value of valuesToTest) {
    assert.isString(value);
    t.false(assert.shouldThrow);
  }
});

test('should set shouldThrow to true', (t: Assertions) => {
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
    assert.shouldThrow = false; // reset
    assert.isString(value);
    t.true(assert.shouldThrow);
  }
});
