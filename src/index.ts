import * as boom from 'boom';
import {CODES} from 'magic-http-status';

export default function aOrB(value: any, statusCode?: number, message?: string, payload?: object): void {
  if (!value) {
    const code: number | undefined = statusCode || (!!message ? CODES.BAD_REQUEST : undefined);
    const errMessage: string = !!message ? message : 'Value is not truthy';
    throw new boom(errMessage, {statusCode: code, data: payload});
  }

  return;
}
