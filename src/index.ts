import is from '@sindresorhus/is';
import * as boom from 'boom';
import {CODES, MESSAGES} from 'magic-http-status';
import {firstLetterUpperCase, toPascalCase} from '../generation/string';

interface Bam extends Error {
  data?: object;
}

export class AssertOrBoom {
  shouldThrow: boolean = false;

  constructor() {
    this.addIsMethods();
    this.addOrMethods();
  }

  /**
   * Thrower
   */

  /**
   * orBoom
   */
  public orBoom(code?: number, message?: string, payload?: object): void {
    this.assertOrBoom(!this.shouldThrow, code, message, payload);
  }

  /**
   * aOrB - Assert or Boom
   */
  public readonly assertOrBoom = (value: any, statusCode?: number, message?: string, payload?: object): void => {
    if (!value) {
      const code: number | undefined = statusCode || (!!message ? CODES.BAD_REQUEST : undefined);
      const errMessage: string = !!message ? message : 'Value is not truthy';
      throw new boom(errMessage, {statusCode: code, data: payload});
    }
  };

  /**
   * orBam
   */
  public orBam(message?: string, payload?: object): void {
    this.assertOrBam(!this.shouldThrow, message, payload);
  }

  /**
   * Assert or Bam
   */
  public readonly assertOrBam = (value: any, message?: string, payload?: object): void => {
    if (!value) {
      const errMessage: string = !!message ? message : 'Value is not truthy';
      const error: Bam = new Error(errMessage);
      error.data = payload;
      throw error;
    }
  };

  /**
   * Add method to validate data
   */
  private addIsMethods(): void {
    Object.keys(is).map((key: string) => {
      console.log('key', key);
      if (key === 'default') {
        return;
      }

      const name: string = key.includes('_')
        ? `is${firstLetterUpperCase(key.substring(0, key.length - 1))}`
        : `is${firstLetterUpperCase(key)}`;

      Object.defineProperty(
        this,
        name,
        (value: any): this => {
          // @ts-ignore
          this.shouldThrow = (is[key] as (value: any) => boolean)(value);

          return this;
        },
      );
    });
  }

  /**
   * Add methods to throws specific HTTP Status code
   */
  private addOrMethods() {
    Object.values(MESSAGES).map((value: string) => {
      console.log('value', `or${toPascalCase(value)}`);
      Object.defineProperty(
        this,
        `or${toPascalCase(value)}`,
        (message?: string, payload?: object): void => {
          this.orBoom(CODES[value], message || value, payload);
        },
      );
    });
  }
}

export default new AssertOrBoom().assertOrBoom;

console.log('This Boom', new AssertOrBoom());
