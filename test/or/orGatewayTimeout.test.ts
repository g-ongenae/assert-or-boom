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
  t.notThrows(() => assert.orGatewayTimeout());
});

test('should throw an error when willThrow is set to true', (t: Assertions) => {
  assert.willThrow = true;
  t.throws(() => assert.orGatewayTimeout());
});

test('should throw a Boom Error', (t: Assertions) => {
  assert.willThrow = true;
  try {
    assert.orGatewayTimeout();
    t.fail("Didn't throw an error");
  } catch (err) {
    t.truthy(boom.isBoom(err));
  }
});

test('should pass payload', (t: Assertions) => {
  const payload: object = {example: true, instance: 1};
  assert.willThrow = true;
  try {
    assert.orGatewayTimeout(undefined, payload);
    t.fail("Didn't throw an error");
  } catch (err) {
    t.is(err.output.payload, payload);
  }
});

test('should pass message', (t: Assertions) => {
  const message: string = 'a message for test';
  assert.willThrow = true;
  try {
    assert.orGatewayTimeout(message);
    t.fail("Didn't throw an error");
  } catch (err) {
    t.is(err.output.message, message);
  }
});

test('should throw a "Gateway Timeout" error code', (t: Assertions) => {
  assert.willThrow = true;
  try {
    assert.orGatewayTimeout();
    t.fail("Didn't throw an error");
  } catch (err) {
    t.is(err.output.statusCode, CODES.GATEWAY_TIMEOUT);
  }
});

test('should throw a "Gateway Timeout" error message when not set', (t: Assertions) => {
  assert.willThrow = true;
  try {
    assert.orGatewayTimeout();
    t.fail("Didn't throw an error");
  } catch (err) {
    t.is(err.output.message, 'Gateway Timeout');
  }
});
