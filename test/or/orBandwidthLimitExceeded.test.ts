import test, {Assertions, beforeEach} from 'ava';
import * as boom from 'boom';
import {CODES} from 'magic-http-status';

import {AssertOrBoom} from '../src/index';

let assert: AssertOrBoom;

beforeEach('Instantiate an AssertOrBoom object', () => {
  assert = new AssertOrBoom();
});

test('should not throw an error when willThrow is not set to true', (t: Assertions) => {
  assert.willThrow = false;
  t.notThrows(assert.orBandwidthLimitExceeded());
});

test('should throw an error when willThrow is set to true', (t: Assertions) => {
  assert.willThrow = true;
  t.throws(() => assert.orBandwidthLimitExceeded());
});

test('should throw a Boom Error', (t: Assertions) => {
  assert.willThrow = true;
  try {
    assert.orBandwidthLimitExceeded();
    t.fail("Didn't throw an error");
  } catch (err) {
    t.truthy(boom.isBoom(err));
  }
});

test('should pass payload', (t: Assertions) => {
  const payload: object = {example: true, instance: 1};
  assert.willThrow = true;
  try {
    assert.orBandwidthLimitExceeded(payload);
    t.fail("Didn't throw an error");
  } catch (err) {
    t.is(err.output.payload, payload);
  }
});

test('should pass message', (t: Assertions) => {
  const message: string = 'a message for test';
  assert.willThrow = true;
  try {
    assert.orBandwidthLimitExceeded(message);
    t.fail("Didn't throw an error");
  } catch (err) {
    t.is(err.output.message, message);
  }
});

test('should throw a "Bandwidth Limit Exceeded" error code', (t: Assertions) => {
  assert.willThrow = true;
  try {
    assert.orBandwidthLimitExceeded();
    t.fail("Didn't throw an error");
  } catch (err) {
    t.is(err.output.statusCode, CODES.BANDWIDTH_LIMIT_EXCEEDED);
  }
});

test('should throw a "Bandwidth Limit Exceeded" error message when not set', (t: Assertions) => {
  assert.willThrow = true;
  try {
    assert.orBandwidthLimitExceeded();
    t.fail("Didn't throw an error");
  } catch (err) {
    t.is(err.output.message, 'Bandwidth Limit Exceeded');
  }
});
