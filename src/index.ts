import is, {Class} from '@sindresorhus/is';
import * as boom from 'boom';
import {CODES} from 'magic-http-status';

interface Bam extends Error {
  data?: object;
}

export class AssertOrBoom {
  willThrow: boolean;

  constructor() {
    this.willThrow = false;
  }

  /**
   * Thrower
   */

  /**
   * orBoom
   */
  public orBoom(code?: number, message?: string, payload?: object): void {
    this.assertOrBoom(!this.willThrow, code, message, payload);
  }

  /**
   * aOrB - Assert or Boom
   */
  public readonly assertOrBoom = (value: any, statusCode?: number, message?: string, payload?: object): void => {
    if (!value) {
      this.willThrow = false;

      const code: number | undefined = statusCode || (!!message ? CODES.BAD_REQUEST : undefined);
      const errMessage: string = !!message ? message : 'Value is not truthy';
      throw new boom(errMessage, {statusCode: code, data: payload});
    }
  };

  /**
   * orBam
   */
  public orBam(message?: string, payload?: object): void {
    this.assertOrBam(!this.willThrow, message, payload);
  }

  /**
   * Assert or Bam
   */
  public readonly assertOrBam = (value: any, message?: string, payload?: object): void => {
    if (!value) {
      this.willThrow = false;

      const errMessage: string = !!message ? message : 'Value is not truthy';
      const error: Bam = new Error(errMessage);
      error.data = payload;
      throw error;
    }
  };

  //-----------
  // IS METHODS
  //-----------

  /**
   * Check is undefined valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isUndefined(value: any): this {
    this.willThrow = !is.undefined(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a undefined valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotUndefined(value: any): this {
    this.willThrow = is.undefined(value) || this.willThrow;

    return this;
  }

  /**
   * Check is string valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isString(value: any): this {
    this.willThrow = !is.string(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a string valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotString(value: any): this {
    this.willThrow = is.string(value) || this.willThrow;

    return this;
  }

  /**
   * Check is number valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNumber(value: any): this {
    this.willThrow = !is.number(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a number valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotNumber(value: any): this {
    this.willThrow = is.number(value) || this.willThrow;

    return this;
  }

  /**
   * Check is function valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isFunction(value: any): this {
    this.willThrow = !is.function_(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a function valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotFunction(value: any): this {
    this.willThrow = is.function_(value) || this.willThrow;

    return this;
  }

  /**
   * Check is null valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNull(value: any): this {
    this.willThrow = !is.null_(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a null valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotNull(value: any): this {
    this.willThrow = is.null_(value) || this.willThrow;

    return this;
  }

  /**
   * Check is class valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isClass(value: any): this {
    this.willThrow = !is.class_(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a class valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotClass(value: any): this {
    this.willThrow = is.class_(value) || this.willThrow;

    return this;
  }

  /**
   * Check is boolean valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isBoolean(value: any): this {
    this.willThrow = !is.boolean(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a boolean valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotBoolean(value: any): this {
    this.willThrow = is.boolean(value) || this.willThrow;

    return this;
  }

  /**
   * Check is symbol valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isSymbol(value: any): this {
    this.willThrow = !is.symbol(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a symbol valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotSymbol(value: any): this {
    this.willThrow = is.symbol(value) || this.willThrow;

    return this;
  }

  /**
   * Check is array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isArray(value: any): this {
    this.willThrow = !is.array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotArray(value: any): this {
    this.willThrow = is.array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is buffer valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isBuffer(value: any): this {
    this.willThrow = !is.buffer(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a buffer valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotBuffer(value: any): this {
    this.willThrow = is.buffer(value) || this.willThrow;

    return this;
  }

  /**
   * Check is nullOrUndefined valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNullOrUndefined(value: any): this {
    this.willThrow = !is.nullOrUndefined(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a nullOrUndefined valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotNullOrUndefined(value: any): this {
    this.willThrow = is.nullOrUndefined(value) || this.willThrow;

    return this;
  }

  /**
   * Check is object valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isObject(value: any): this {
    this.willThrow = !is.object(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a object valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotObject(value: any): this {
    this.willThrow = is.object(value) || this.willThrow;

    return this;
  }

  /**
   * Check is iterable valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isIterable(value: any): this {
    this.willThrow = !is.iterable(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a iterable valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotIterable(value: any): this {
    this.willThrow = is.iterable(value) || this.willThrow;

    return this;
  }

  /**
   * Check is asyncIterable valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isAsyncIterable(value: any): this {
    this.willThrow = !is.asyncIterable(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a asyncIterable valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotAsyncIterable(value: any): this {
    this.willThrow = is.asyncIterable(value) || this.willThrow;

    return this;
  }

  /**
   * Check is generator valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isGenerator(value: any): this {
    this.willThrow = !is.generator(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a generator valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotGenerator(value: any): this {
    this.willThrow = is.generator(value) || this.willThrow;

    return this;
  }

  /**
   * Check is nativePromise valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNativePromise(value: any): this {
    this.willThrow = !is.nativePromise(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a nativePromise valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotNativePromise(value: any): this {
    this.willThrow = is.nativePromise(value) || this.willThrow;

    return this;
  }

  /**
   * Check is promise valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isPromise(value: any): this {
    this.willThrow = !is.promise(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a promise valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotPromise(value: any): this {
    this.willThrow = is.promise(value) || this.willThrow;

    return this;
  }

  /**
   * Check is generatorFunction valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isGeneratorFunction(value: any): this {
    this.willThrow = !is.generatorFunction(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a generatorFunction valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotGeneratorFunction(value: any): this {
    this.willThrow = is.generatorFunction(value) || this.willThrow;

    return this;
  }

  /**
   * Check is asyncFunction valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isAsyncFunction(value: any): this {
    this.willThrow = !is.asyncFunction(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a asyncFunction valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotAsyncFunction(value: any): this {
    this.willThrow = is.asyncFunction(value) || this.willThrow;

    return this;
  }

  /**
   * Check is boundFunction valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isBoundFunction(value: any): this {
    this.willThrow = !is.boundFunction(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a boundFunction valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotBoundFunction(value: any): this {
    this.willThrow = is.boundFunction(value) || this.willThrow;

    return this;
  }

  /**
   * Check is regExp valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isRegExp(value: any): this {
    this.willThrow = !is.regExp(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a regExp valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotRegExp(value: any): this {
    this.willThrow = is.regExp(value) || this.willThrow;

    return this;
  }

  /**
   * Check is date valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isDate(value: any): this {
    this.willThrow = !is.date(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a date valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotDate(value: any): this {
    this.willThrow = is.date(value) || this.willThrow;

    return this;
  }

  /**
   * Check is error valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isError(value: any): this {
    this.willThrow = !is.error(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a error valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotError(value: any): this {
    this.willThrow = is.error(value) || this.willThrow;

    return this;
  }

  /**
   * Check is map valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isMap(value: any): this {
    this.willThrow = !is.map(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a map valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotMap(value: any): this {
    this.willThrow = is.map(value) || this.willThrow;

    return this;
  }

  /**
   * Check is set valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isSet(value: any): this {
    this.willThrow = !is.set(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a set valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotSet(value: any): this {
    this.willThrow = is.set(value) || this.willThrow;

    return this;
  }

  /**
   * Check is weakMap valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isWeakMap(value: any): this {
    this.willThrow = !is.weakMap(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a weakMap valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotWeakMap(value: any): this {
    this.willThrow = is.weakMap(value) || this.willThrow;

    return this;
  }

  /**
   * Check is weakSet valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isWeakSet(value: any): this {
    this.willThrow = !is.weakSet(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a weakSet valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotWeakSet(value: any): this {
    this.willThrow = is.weakSet(value) || this.willThrow;

    return this;
  }

  /**
   * Check is int8Array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isInt8Array(value: any): this {
    this.willThrow = !is.int8Array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a int8Array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotInt8Array(value: any): this {
    this.willThrow = is.int8Array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is uint8Array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isUint8Array(value: any): this {
    this.willThrow = !is.uint8Array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a uint8Array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotUint8Array(value: any): this {
    this.willThrow = is.uint8Array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is uint8ClampedArray valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isUint8ClampedArray(value: any): this {
    this.willThrow = !is.uint8ClampedArray(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a uint8ClampedArray valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotUint8ClampedArray(value: any): this {
    this.willThrow = is.uint8ClampedArray(value) || this.willThrow;

    return this;
  }

  /**
   * Check is int16Array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isInt16Array(value: any): this {
    this.willThrow = !is.int16Array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a int16Array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotInt16Array(value: any): this {
    this.willThrow = is.int16Array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is uint16Array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isUint16Array(value: any): this {
    this.willThrow = !is.uint16Array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a uint16Array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotUint16Array(value: any): this {
    this.willThrow = is.uint16Array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is int32Array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isInt32Array(value: any): this {
    this.willThrow = !is.int32Array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a int32Array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotInt32Array(value: any): this {
    this.willThrow = is.int32Array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is uint32Array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isUint32Array(value: any): this {
    this.willThrow = !is.uint32Array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a uint32Array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotUint32Array(value: any): this {
    this.willThrow = is.uint32Array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is float32Array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isFloat32Array(value: any): this {
    this.willThrow = !is.float32Array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a float32Array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotFloat32Array(value: any): this {
    this.willThrow = is.float32Array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is float64Array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isFloat64Array(value: any): this {
    this.willThrow = !is.float64Array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a float64Array valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotFloat64Array(value: any): this {
    this.willThrow = is.float64Array(value) || this.willThrow;

    return this;
  }

  /**
   * Check is arrayBuffer valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isArrayBuffer(value: any): this {
    this.willThrow = !is.arrayBuffer(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a arrayBuffer valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotArrayBuffer(value: any): this {
    this.willThrow = is.arrayBuffer(value) || this.willThrow;

    return this;
  }

  /**
   * Check is sharedArrayBuffer valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isSharedArrayBuffer(value: any): this {
    this.willThrow = !is.sharedArrayBuffer(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a sharedArrayBuffer valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotSharedArrayBuffer(value: any): this {
    this.willThrow = is.sharedArrayBuffer(value) || this.willThrow;

    return this;
  }

  /**
   * Check is dataView valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isDataView(value: any): this {
    this.willThrow = !is.dataView(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a dataView valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotDataView(value: any): this {
    this.willThrow = is.dataView(value) || this.willThrow;

    return this;
  }

  /**
   * Check is directInstanceOf valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isDirectInstanceOf<C extends object>(value: any, klass: Class<C>): this {
    this.willThrow = !is.directInstanceOf(value, klass) || this.willThrow;

    return this;
  }

  /**
   * Check is not a directInstanceOf valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotDirectInstanceOf<C extends object>(value: any, klass: Class<C>): this {
    this.willThrow = is.directInstanceOf(value, klass) || this.willThrow;

    return this;
  }

  /**
   * Check is urlInstance valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isUrlInstance(value: any): this {
    this.willThrow = !is.urlInstance(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a urlInstance valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotUrlInstance(value: any): this {
    this.willThrow = is.urlInstance(value) || this.willThrow;

    return this;
  }

  /**
   * Check is truthy valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isTruthy(value: any): this {
    this.willThrow = !is.truthy(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a truthy valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotTruthy(value: any): this {
    this.willThrow = is.truthy(value) || this.willThrow;

    return this;
  }

  /**
   * Check is falsy valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isFalsy(value: any): this {
    this.willThrow = !is.falsy(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a falsy valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotFalsy(value: any): this {
    this.willThrow = is.falsy(value) || this.willThrow;

    return this;
  }

  /**
   * Check is nan valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNan(value: any): this {
    this.willThrow = !is.nan(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a nan valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotNan(value: any): this {
    this.willThrow = is.nan(value) || this.willThrow;

    return this;
  }

  /**
   * Check is primitive valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isPrimitive(value: any): this {
    this.willThrow = !is.primitive(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a primitive valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotPrimitive(value: any): this {
    this.willThrow = is.primitive(value) || this.willThrow;

    return this;
  }

  /**
   * Check is integer valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isInteger(value: any): this {
    this.willThrow = !is.integer(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a integer valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotInteger(value: any): this {
    this.willThrow = is.integer(value) || this.willThrow;

    return this;
  }

  /**
   * Check is safeInteger valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isSafeInteger(value: any): this {
    this.willThrow = !is.safeInteger(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a safeInteger valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotSafeInteger(value: any): this {
    this.willThrow = is.safeInteger(value) || this.willThrow;

    return this;
  }

  /**
   * Check is plainObject valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isPlainObject(value: any): this {
    this.willThrow = !is.plainObject(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a plainObject valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotPlainObject(value: any): this {
    this.willThrow = is.plainObject(value) || this.willThrow;

    return this;
  }

  /**
   * Check is typedArray valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isTypedArray(value: any): this {
    this.willThrow = !is.typedArray(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a typedArray valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotTypedArray(value: any): this {
    this.willThrow = is.typedArray(value) || this.willThrow;

    return this;
  }

  /**
   * Check is arrayLike valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isArrayLike(value: any): this {
    this.willThrow = !is.arrayLike(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a arrayLike valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotArrayLike(value: any): this {
    this.willThrow = is.arrayLike(value) || this.willThrow;

    return this;
  }

  /**
   * Check is inRange valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isInRange(value: any, range: number | number[]): this {
    this.willThrow = !is.inRange(value, range) || this.willThrow;

    return this;
  }

  /**
   * Check is not a inRange valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotInRange(value: any, range: number | number[]): this {
    this.willThrow = is.inRange(value, range) || this.willThrow;

    return this;
  }

  /**
   * Check is domElement valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isDomElement(value: any): this {
    this.willThrow = !is.domElement(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a domElement valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotDomElement(value: any): this {
    this.willThrow = is.domElement(value) || this.willThrow;

    return this;
  }

  /**
   * Check is observable valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isObservable(value: any): this {
    this.willThrow = !is.observable(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a observable valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotObservable(value: any): this {
    this.willThrow = is.observable(value) || this.willThrow;

    return this;
  }

  /**
   * Check is nodeStream valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNodeStream(value: any): this {
    this.willThrow = !is.nodeStream(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a nodeStream valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotNodeStream(value: any): this {
    this.willThrow = is.nodeStream(value) || this.willThrow;

    return this;
  }

  /**
   * Check is infinite valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isInfinite(value: any): this {
    this.willThrow = !is.infinite(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a infinite valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotInfinite(value: any): this {
    this.willThrow = is.infinite(value) || this.willThrow;

    return this;
  }

  /**
   * Check is even valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isEven(value: any): this {
    this.willThrow = !is.even(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a even valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotEven(value: any): this {
    this.willThrow = is.even(value) || this.willThrow;

    return this;
  }

  /**
   * Check is odd valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isOdd(value: any): this {
    this.willThrow = !is.odd(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a odd valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotOdd(value: any): this {
    this.willThrow = is.odd(value) || this.willThrow;

    return this;
  }

  /**
   * Check is empty valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isEmpty(value: any): this {
    // @ts-ignore
    this.willThrow = !is.empty(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a empty valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotEmpty(value: any): this {
    // @ts-ignore
    this.willThrow = is.empty(value) || this.willThrow;

    return this;
  }

  /**
   * Check is emptyOrWhitespace valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isEmptyOrWhitespace(value: any): this {
    // @ts-ignore
    this.willThrow = !is.emptyOrWhitespace(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a emptyOrWhitespace valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotEmptyOrWhitespace(value: any): this {
    // @ts-ignore
    this.willThrow = is.emptyOrWhitespace(value) || this.willThrow;

    return this;
  }

  /**
   * Check is any valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isAny(value: any): this {
    this.willThrow = !is.any(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a any valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotAny(value: any): this {
    this.willThrow = is.any(value) || this.willThrow;

    return this;
  }

  /**
   * Check is all valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isAll(value: any): this {
    this.willThrow = !is.all(value) || this.willThrow;

    return this;
  }

  /**
   * Check is not a all valid value
   * @param value the value to check
   * @returns itself to be chained with an error or with other check
   */
  public isNotAll(value: any): this {
    this.willThrow = is.all(value) || this.willThrow;

    return this;
  }

  //-----------
  // OR METHODS
  //-----------

  /**
   * Throw a Bad Request boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orBadRequest(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.badRequest(message, payload);
    }
  }

  /**
   * Throw a Unauthorized boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orUnauthorized(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      // @ts-ignore
      throw boom.unauthorized(message, payload);
    }
  }

  /**
   * Throw a Payment Required boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orPaymentRequired(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.paymentRequired(message, payload);
    }
  }

  /**
   * Throw a Forbidden boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orForbidden(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.forbidden(message, payload);
    }
  }

  /**
   * Throw a Not Found boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orNotFound(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.notFound(message, payload);
    }
  }

  /**
   * Throw a Method Not Allowed boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orMethodNotAllowed(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.methodNotAllowed(message, payload);
    }
  }

  /**
   * Throw a Not Acceptable boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orNotAcceptable(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.notAcceptable(message, payload);
    }
  }

  /**
   * Throw a Proxy Authentication Required boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orProxyAuthenticationRequired(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.proxyAuthRequired(message, payload);
    }
  }

  /**
   * Throw a Request Timeout boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orRequestTimeout(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.clientTimeout(message, payload);
    }
  }

  /**
   * Throw a Conflict boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orConflict(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.conflict(message, payload);
    }
  }

  /**
   * Throw a Gone boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orGone(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.resourceGone(message, payload);
    }
  }

  /**
   * Throw a Length Required boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orLengthRequired(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.lengthRequired(message, payload);
    }
  }

  /**
   * Throw a Precondition Failed boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orPreconditionFailed(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.preconditionFailed(message, payload);
    }
  }

  /**
   * Throw a Payload Too Large boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orPayloadTooLarge(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.entityTooLarge(message, payload);
    }
  }

  /**
   * Throw a URI Too Long boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orUriTooLong(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.uriTooLong(message, payload);
    }
  }

  /**
   * Throw a Unsupported Media Type boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orUnsupportedMediaType(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.unsupportedMediaType(message, payload);
    }
  }

  /**
   * Throw a Range Not Satisfiable boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orRangeNotSatisfiable(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.rangeNotSatisfiable(message, payload);
    }
  }

  /**
   * Throw a Expectation Failed boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orExpectationFailed(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.expectationFailed(message, payload);
    }
  }

  /**
   * Throw a Im a teapot boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orImATeapot(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.teapot(message, payload);
    }
  }

  /**
   * Throw a Misdirected Request boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orMisdirectedRequest(message?: string, payload?: object): void {
    return this.orBoom(CODES.MISDIRECTED_REQUEST, message, payload);
  }

  /**
   * Throw a Unprocessable Entity boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orUnprocessableEntity(message?: string, payload?: object): void {
    return this.orBoom(CODES.UNPROCESSABLE_ENTITY, message, payload);
  }

  /**
   * Throw a Locked boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orLocked(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.locked(message, payload);
    }
  }

  /**
   * Throw a Failed Dependency boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orFailedDependency(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.failedDependency(message, payload);
    }
  }

  /**
   * Throw a Unordered Collection boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orUnorderedCollection(message?: string, payload?: object): void {
    return this.orBoom(CODES.UNORDERED_COLLECTION, message, payload);
  }

  /**
   * Throw a Upgrade Required boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orUpgradeRequired(message?: string, payload?: object): void {
    return this.orBoom(CODES.UPGRADE_REQUIRED, message, payload);
  }

  /**
   * Throw a Precondition Required boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orPreconditionRequired(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.preconditionRequired(message, payload);
    }
  }

  /**
   * Throw a Too Many Requests boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orTooManyRequests(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.tooManyRequests(message, payload);
    }
  }

  /**
   * Throw a Request Header Fields Too Large boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orRequestHeaderFieldsTooLarge(message?: string, payload?: object): void {
    return this.orBoom(CODES.REQUEST_HEADERS_FIELDS_TOO_LARGE, message, payload);
  }

  /**
   * Throw a Unavailable For Legal Reasons boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orUnavailableForLegalReasons(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.illegal(message, payload);
    }
  }

  /**
   * Throw a Internal Server Error boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orInternalServerError(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.badImplementation(message, payload);
    }
  }

  /**
   * Throw a Not Implemented boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orNotImplemented(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.notImplemented(message, payload);
    }
  }

  /**
   * Throw a Bad Gateway boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orBadGateway(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.badGateway(message, payload);
    }
  }

  /**
   * Throw a Service Unavailable boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orServiceUnavailable(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.serverUnavailable(message, payload);
    }
  }

  /**
   * Throw a Gateway Timeout boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orGatewayTimeout(message?: string, payload?: object): void {
    if (this.willThrow) {
      this.willThrow = false;

      throw boom.gatewayTimeout(message, payload);
    }
  }

  /**
   * Throw a HTTP Version Not Supported boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orHttpVersionNotSupported(message?: string, payload?: object): void {
    return this.orBoom(CODES.HTTP_VERSION_NOT_SUPPORTED, message, payload);
  }

  /**
   * Throw a Variant Also Negotiates boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orVariantAlsoNegotiates(message?: string, payload?: object): void {
    return this.orBoom(CODES.VARIANT_ALSO_NEGOTIATE, message, payload);
  }

  /**
   * Throw a Insufficient Storage boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orInsufficientStorage(message?: string, payload?: object): void {
    return this.orBoom(CODES.INSUFFICIENT_STORAGE, message, payload);
  }

  /**
   * Throw a Loop Detected boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orLoopDetected(message?: string, payload?: object): void {
    return this.orBoom(CODES.LOOP_DETECTED, message, payload);
  }

  /**
   * Throw a Bandwidth Limit Exceeded boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orBandwidthLimitExceeded(message?: string, payload?: object): void {
    return this.orBoom(CODES.BANDWIDTH_LIMIT_EXCEEDED, message, payload);
  }

  /**
   * Throw a Not Extended boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orNotExtended(message?: string, payload?: object): void {
    return this.orBoom(CODES.NOT_EXTENDED, message, payload);
  }

  /**
   * Throw a Network Authentication Required boom error if willThrow is true
   * @param message the error message
   * @param payload data to debug this error
   */
  public orNetworkAuthenticationRequired(message?: string, payload?: object): void {
    return this.orBoom(CODES.NETWORK_AUTHENTIFICATION_REQUIRED, message, payload);
  }
}

export default new AssertOrBoom().assertOrBoom;
