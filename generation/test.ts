import {Assertions} from 'ava';
import * as boom from 'boom';

import {AssertOrBoom} from '../src/index';

function macroShouldThrowGoodStatusCode(t: Assertions, input: string, expected: number) {
  const assert: AssertOrBoom = new AssertOrBoom();
  assert.shouldThrow = true;

  try {
    // @ts-ignore
    assert[input]();
    t.fail(`${input} didn't throw an Error`);
  } catch (e) {
    t.truthy(boom.isBoom(e), `${input} didn't throw a Boom error`);
    t.is(e.statusCode, expected, `${input} didn't throw the right status code`);
    t.pass();
  }
}

// @ts-ignore
macroShouldThrowGoodStatusCode.title = (providedTitle: string | null, input: string, expected: number) =>
  `${providedTitle} ${input} should throw the status code ${expected}`.trim();

function macroShouldThrowGoodStatusMessage(t: Assertions, input: string, expected: number) {
  const assert: AssertOrBoom = new AssertOrBoom();
  assert.shouldThrow = true;

  try {
    // @ts-ignore
    assert[input]();
    t.fail(`${input} didn't throw an Error`);
  } catch (e) {
    t.truthy(boom.isBoom(e), `${input} didn't throw a Boom error`);
    t.is(typeof e.message, 'string', `${e.message} should be a string`);
    t.is(e.message, expected, `${input} didn't throw the right status message`);
    t.pass();
  }
}

// @ts-ignore
macroShouldThrowGoodStatusMessage.title = (providedTitle: string | null, input: string, expected: number) =>
  `${providedTitle} ${input} should throw the status message "${expected}"`.trim();
