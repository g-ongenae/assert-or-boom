import test, {Assertions, beforeEach} from 'ava';
import * as boom from 'boom';
import {CODES} from 'magic-http-status';

import {AssertOrBoom} from '../../src/index';

let assert: AssertOrBoom;

beforeEach('Instantiate an AssertOrBoom object', () => {
  assert = new AssertOrBoom();
});

test('should not throw an error when willThrow is not set to true', (t: Assertions) => {
  assert.willThrow = false;
  t.notThrows(assert.orUnavailableForLegalReasons());
});

test('should throw an error when willThrow is set to true', (t: Assertions) => {
  assert.willThrow = true;
  t.throws(() => assert.orUnavailableForLegalReasons());
});

test('should throw a Boom Error', (t: Assertions) => {
  assert.willThrow = true;
  try {
    assert.orUnavailableForLegalReasons();
    t.fail("Didn't throw an error");
  } catch (err) {
    t.truthy(boom.isBoom(err));
  }
});

test('should pass payload', (t: Assertions) => {
  const payload: object = {example: true, instance: 1};
  assert.willThrow = true;
  try {
    assert.orUnavailableForLegalReasons(payload);
    t.fail("Didn't throw an error");
  } catch (err) {
    t.is(err.output.payload, payload);
  }
});

test('should pass message', (t: Assertions) => {
  const message: string = 'a message for test';
  assert.willThrow = true;
  try {
    assert.orUnavailableForLegalReasons(message);
    t.fail("Didn't throw an error");
  } catch (err) {
    t.is(err.output.message, message);
  }
});

test('should throw a "Unavailable For Legal Reasons" error code', (t: Assertions) => {
  assert.willThrow = true;
  try {
    assert.orUnavailableForLegalReasons();
    t.fail("Didn't throw an error");
  } catch (err) {
    t.is(err.output.statusCode, CODES.UNAVAILABLE_FOR_LEGAL_REASONS);
  }
});

test('should throw a "Unavailable For Legal Reasons" error message when not set', (t: Assertions) => {
  assert.willThrow = true;
  try {
    assert.orUnavailableForLegalReasons();
    t.fail("Didn't throw an error");
  } catch (err) {
    t.is(err.output.message, 'Unavailable For Legal Reasons');
  }
});
