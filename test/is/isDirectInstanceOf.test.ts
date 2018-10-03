import test, {Assertions, beforeEach} from 'ava';

import {AssertOrBoom} from '../../src/index';

class TestClass {
  public willSayTrue: any;

  constructor(value: any) {
    this.willSayTrue = value;
  }

  public sayTrue(): boolean {
    return !!this.willSayTrue;
  }
}

let assert: AssertOrBoom;

beforeEach('Instantiate an AssertOrBoom object', () => {
  assert = new AssertOrBoom();
});

test('should not set willThrow to true if value is valid', (t: Assertions) => {
  const valuesToTest: any[] = [
    // TODO ADD VALUES
  ];

  for (const value of valuesToTest) {
    assert.isDirectInstanceOf(value, TestClass);
    t.false(assert.willThrow);
  }
});

test('should set willThrow to true if value is invalid', (t: Assertions) => {
  const valuesToTest: any[] = [
    // TODO ADD VALUES
  ];

  for (const value of valuesToTest) {
    assert.willThrow = false; // reset
    assert.isDirectInstanceOf(value, TestClass);
    t.true(assert.willThrow);
  }
});

test('should be chainable', (t: Assertions) => {
  const invalid: any = 'invalid';
  const valid: any = 'valid';

  assert.willThrow = false; // reset
  assert.isDirectInstanceOf(invalid, TestClass).isDirectInstanceOf(valid, TestClass);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isDirectInstanceOf(valid, TestClass).isDirectInstanceOf(invalid, TestClass);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isDirectInstanceOf(invalid, TestClass).isDirectInstanceOf(invalid, TestClass);
  t.true(assert.willThrow);

  assert.willThrow = false; // reset
  assert.isDirectInstanceOf(valid, TestClass).isDirectInstanceOf(valid, TestClass);
  t.false(assert.willThrow);
});
