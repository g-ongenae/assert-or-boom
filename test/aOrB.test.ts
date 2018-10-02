import test, {Assertions} from 'ava';
import * as boom from 'boom';
import {CODES} from 'magic-http-status';

import aOrB, {AssertOrBoom} from '../src/index';

export function macroShouldThrowGoodStatusCode(t: Assertions, input: string, expected: number) {
  const assert: AssertOrBoom = new AssertOrBoom();
  assert.shouldThrow = true;

  try {
    // @ts-ignore
    assert[input]();
    t.fail("Didn't throw an Error");
  } catch (e) {
    t.truthy(boom.isBoom(e));
    t.is(e.statusCode, expected);
    t.pass();
  }
}

// macroShouldThrowGoodStatusCode.title = (providedTitle: string | null, input: string, expected: number) =>
//   `${providedTitle} ${input} should throw the status code ${expected}`.trim();

test('should pass when the value is truthy', (t: Assertions) => {
  t.notThrows(() => aOrB(true));
});

test('should throw an Error when is not truthy', (t: Assertions) => {
  t.throws(() => aOrB(false));
});

test('should throw a valid Boom Error', (t: Assertions) => {
  try {
    aOrB(false);
    t.fail("Didn't throw an Error");
  } catch (e) {
    t.truthy(boom.isBoom(e));
    t.pass();
  }
});

test('should be able to specify a status code error', (t: Assertions) => {
  const code: number = CODES.BAD_REQUEST;
  try {
    aOrB(false, code);
    t.fail("Didn't throw an Error");
  } catch (e) {
    t.truthy(boom.isBoom(e));
    const err: boom = e as boom;
    t.is(err.output.payload.statusCode, code);
    t.pass();
  }
});

test('should be able to specify a message with a specified status code', (t: Assertions) => {
  const message: string = 'Bang, watch your mouth';
  const code: number = CODES.UNAUTHORIZED;
  try {
    aOrB(false, code, message);
    t.fail("Didn't throw an Error");
  } catch (e) {
    t.truthy(boom.isBoom(e));
    const err: boom = e as boom;
    t.is(err.output.payload.message, message);
    t.pass();
  }
});

test('should be able to specify a message without a specified status code', (t: Assertions) => {
  const message: string = 'Bang, watch your mouth';
  try {
    aOrB(false, undefined, message);
    t.fail("Didn't throw an Error");
  } catch (e) {
    t.truthy(boom.isBoom(e));
    const err: boom = e as boom;
    t.is(err.output.payload.message, message);
    t.pass();
  }
});

test('should be able to add payload data', (t: Assertions) => {
  const payload: object = {testValue: 'Hello World'};
  try {
    aOrB(false, undefined, undefined, payload);
    t.fail("Didn't throw an Error");
  } catch (e) {
    t.truthy(boom.isBoom(e));
    const err: boom = e as boom;
    t.is(err.data, payload);
    t.pass();
  }
});
