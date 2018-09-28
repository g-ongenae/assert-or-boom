import is from '@sindresorhus/is';
import * as boom from 'boom';
import {CODES} from 'magic-http-status';

interface Bam extends Error {
  data?: object;
}

function firstLetterUpperCase(s: string): string {
  return s[0].toUpperCase() + s.substring(1);
}

export class AssertOrBoom {
  shouldThrow: boolean = false;

  constructor() {
    this.addIsMethods();
  }

  /*
   * Thrower
   */

  /**
   * orBadRequest
   */
  public orBadRequest(message?: string, payload?: object): void {
    this.orBoom(CODES.BAD_REQUEST, message, payload);
  }

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
   * Validation
   */
  private addIsMethods(): void {
    Object.keys(is).map((key: string) => {
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
}

export default new AssertOrBoom().assertOrBoom;
