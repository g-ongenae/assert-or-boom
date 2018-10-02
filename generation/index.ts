import is from '@sindresorhus/is';
import {writeFile, ensureDir} from 'fs-extra';
import {resolve} from 'path';
import {firstLetterUpperCase} from './string';
import {STATUS_CODES} from 'http';

export class Writer {
  private readonly baseDir: string;

  constructor(baseDir: string) {
    this.baseDir = baseDir;
  }

  public async writeAll() {
    await this.ensureDirs();

    let content: string = this.writeStart();

    // Add all is & Add all is not
    content += await this.addIsAndIsNotMethods();
    // Add all or
    content += await this.addOrMethods();

    content += this.writeEnd();

    return writeFile(`${this.baseDir}/src/index.ts`, content);
  }

  /**
   * Utils
   */

  private async ensureDirs(): Promise<void[]> {
    const dirs: string[] = ['src', 'doc', 'doc/is', 'doc/isNot', 'doc/or', 'test/is', 'test/isNot', 'test/or'];

    return Promise.all(dirs.map(async (d) => ensureDir(resolve(this.baseDir, d))));
  }


  private async addIsAndIsNotMethods(): Promise<string> {
    const methods: string[] = [];

    Object.keys(is).map(async (key: string) => {
        if (key === 'default') {
            return;
        }

        if (key.includes('_')) {
            key = key.substring(0, key.length - 1);
        }

        methods.push(this.writeIs(key));
        methods.push(this.writeIsNot(key));
        await this.writeIsDoc(key);
        await this.writeIsNotDoc(key);
        await this.writeIsTest(key);
        await this.writeIsNotTest(key);
    });

    return methods.join('\n');
  }

  private async addOrMethods(): Promise<string> {
    const methods: string[] = [];

    Object.keys(STATUS_CODES).map(async (n: string) => {
        if (parseInt(n) < 400) return;
        const key: string | undefined = STATUS_CODES[n];
        if (typeof key === 'undefined') return;
        methods.push(this.writeOr(key));
        await this.writeOrDoc(key);
        await this.writeOrTest(key);
    });

    return methods.join('\n');
  }

  /**
   * Index - General
   */

  private writeStart(): string {
    return `
            import is from '@sindresorhus/is';
            import * as boom from 'boom';

            interface Bam extends Error {
                data: object;
            }

            export class AssertOrBoom {
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
                    const errMessage: string = !!message ? message : 'Value is not truthy';
                    const error: Bam = new Error(errMessage);
                    error.data = payload;
                    throw error;
                  }
                };
        `;
  }

  private writeEnd(): string {
    return `}
        
        export default new AssertOrBoom().assertOrBoom;
        `;
  }

  /**
   * Or functions
   */

  private writeOr(name: string): string {
    return `
            /**
             * Throw a ${name} boom error if shouldThrow is true
             * @param message the error message
             * @param payload data to debug this error
             */
            public or${firstLetterUpperCase(name)}(message?: string, payload?: object): void {
                if (this.willThrow) {
                    this.willThrow = false;

                    throw boom.${name}(message, payload);
                }
            }
        `;
  }

  private writeOrTest(name: string): Promise<void> {
    const funcName: string = firstLetterUpperCase(name);

    const content: string = `
            import test, {Assertions, beforeEach} from 'ava';
            import * as boom from 'boom';
            import {CODES, MESSAGES} from 'magic-http-status';

            import { AssertOrBoom } from '../src/index';

            let assert: AssertOrBoom;

            beforeEach('Instantiate an AssertOrBoom object', () => {
                assert = new AssertOrBoom();
            });

            test('should not throw an error when willThrow is not set to true', (t: Assertions) => {
                assert.willThrow = false;
                t.notThrows(assert.or${funcName}());
            });

            test('should throw an error when willThrow is set to true', (t: Assertions) => {
                assert.willThrow = true;
                t.throws(() => assert.or${funcName}());
            });

            test('should throw a Boom Error', (t: Assertions) => {
                assert.willThrow = true;
                try {
                    assert.or${funcName}();
                    t.fail("Didn't throw an error");
                } catch (err) {
                    t.truthy(boom.isBoom(err));
                }
            });

            test('should pass payload', (t: Assertions) => {
                const payload: object = { example: true, instance: 1 };
                assert.willThrow = true;
                try {
                    assert.or${funcName}(payload);
                    t.fail("Didn't throw an error");
                } catch (err) {
                    t.is(err.output.payload, payload);
                }
            });

            test('should pass message', (t: Assertions) => {
                const message: string = 'a message for test';
                assert.willThrow = true;
                try {
                    assert.or${funcName}(message);
                    t.fail("Didn't throw an error");
                } catch (err) {
                    t.is(err.output.message, message);
                }
            });

            test('should throw a "${name}" error code', (t: Assertions) => {
                assert.willThrow = true;
                try {
                    assert.or${funcName}();
                    t.fail("Didn't throw an error");
                } catch (err) {
                    t.is(err.output.statusCode, CODES.${name.replace(' ', '_')});
                }                
            });

            test('should throw a "${name}" error message when not set', (t: Assertions) => {
                assert.willThrow = true;
                try {
                    assert.or${funcName}(message);
                    t.fail("Didn't throw an error");
                } catch (err) {
                    t.is(err.output.message, "${name}");
                }                
            });
        `;

    return writeFile(`${this.baseDir}/test/or/or${funcName}.test.ts`, content);
  }

  private writeOrDoc(name: string): Promise<void> {
    const funcName: string = firstLetterUpperCase(name);
    const content: string = `
            # or${funcName}

            Throw a Boom.${name} if the previous assertions where false.

            ## Skeleton

            \`\`\`ts
            assert.or${funcName}(message, payload);
            \`\`\`

            ## Arguments

            - \`message\` a specific message for this error;
            - \`payload\` some data to throw with the error;

            ## Import and use

            \`\`\`ts
            import { AssertOrBoom } from 'assert-or-boom';
            const assert: AssertOrBoom = new AssertOrBoom();

            assert.isString(undefined).or${funcName}('Badaboom');
            \`\`\`
        `;

    return writeFile(`${this.baseDir}/doc/or/or${funcName}.md`, content);
  }

  /**
   * Is functions
   */

  private writeIs(name: string): string {
    return `
            /**
             * Check is ${name} valid value
             * @param value the value to check
             * @returns itself to be chained with an error or with other check
             */
            public is${firstLetterUpperCase(name)}(value: any): this {
                this.willThrow = !is.${name}(value) || this.willThrow;

                return this;
            }
        `;
  }

  private writeIsTest(name: string): Promise<void> {
    const funcName: string = firstLetterUpperCase(name);

    const content: string = `
            import test, {Assertions, beforeEach} from 'ava';

            import {AssertOrBoom} from '../src/index';

            let assert: AssertOrBoom;

            beforeEach('Instantiate an AssertOrBoom object', () => {
                assert = new AssertOrBoom();
            });
              
            test('should not set willThrow to true if value is valid', (t: Assertions) => {
                const valuesToTest: any[] = [
                    // TODO ADD VALUES
                ];
                
                for (const value of valuesToTest) {
                    assert.is${funcName}(value);
                    t.false(assert.shouldThrow);
                }
            });
              
            test('should set shouldThrow to true if value is invalid', (t: Assertions) => {
                const valuesToTest: any[] = [
                    // TODO ADD VALUES
                ];
                
                for (const value of valuesToTest) {
                    assert.shouldThrow = false; // reset
                    assert.is${funcName}(value);
                    t.true(assert.willThrow);
                }
            });

            test('should be chainable', (t: Assertions) => {
                const invalid: any = 'invalid';
                const valid: any = 'valid';

                assert.shouldThrow = false; // reset
                assert.isNot${funcName}(invalid).isNot${funcName}(valid);
                t.true(assert.willThrow);

                assert.shouldThrow = false; // reset
                assert.isNot${funcName}(valid).isNot${funcName}(invalid);
                t.true(assert.willThrow);

                assert.shouldThrow = false; // reset
                assert.isNot${funcName}(invalid).isNot${funcName}(invalid);
                t.true(assert.willThrow);

                assert.shouldThrow = false; // reset
                assert.isNot${funcName}(valid).isNot${funcName}(valid);
                t.true(assert.willThrow);
            });
        `;

    return writeFile(`${this.baseDir}/test/is/is${funcName}.test.ts`, content);
  }

  private writeIsDoc(name: string): Promise<void> {
    const funcName: string = firstLetterUpperCase(name);
    const content: string = `
            # is${funcName}

            Check if a value is a valid ${name}.

            ## Skeleton

            \`\`\`ts
            assert.is${funcName}(value)
            \`\`\`

            ## Arguments

            - \`value\` anything, if it's a valid value, it will not throw when a [or](../or.md) method is called;

            ## Import and use

            \`\`\`ts
            import { AssertOrBoom } from 'assert-or-boom';
            const assert: AssertOrBoom = new AssertOrBoom();

            assert.is${funcName}(undefined).orBoom('Badaboom');
            \`\`\`
        `;

    return writeFile(`${this.baseDir}/doc/is/is${funcName}.md`, content);
  }

  private writeIsNot(name: string): string {
    return `
            /**
             * Check is not a ${name} valid value
             * @param value the value to check
             * @returns itself to be chained with an error or with other check
             */
            public isNot${firstLetterUpperCase(name)}(value: any): this {
                this.willThrow = is.${name}(value) || this.willThrow;

                return this;
            }
        `;
  }

  private writeIsNotTest(name: string): Promise<void> {
    const funcName: string = firstLetterUpperCase(name);

    const content: string = `
            import test, {Assertions, beforeEach} from 'ava';

            import {AssertOrBoom} from '../src/index';

            let assert: AssertOrBoom;

            beforeEach('Instantiate an AssertOrBoom object', () => {
                assert = new AssertOrBoom();
            });
              
            test('should set willThrow to true if value is valid', (t: Assertions) => {
                const valuesToTest: any[] = [
                    // TODO ADD VALUES
                ];
                
                for (const value of valuesToTest) {
                    assert.isNot${funcName}(value);
                    t.false(assert.shouldThrow);
                }
            });
              
            test('should not set shouldThrow to true if value is invalid', (t: Assertions) => {
                const valuesToTest: any[] = [
                    // TODO ADD VALUES
                ];
                
                for (const value of valuesToTest) {
                    assert.shouldThrow = false; // reset
                    assert.isNot${funcName}(value);
                    t.true(assert.willThrow);
                }
            });  
            
            test('should be chainable', (t: Assertions) => {
                const invalid: any = 'invalid';
                const valid: any = 'valid';

                assert.shouldThrow = false; // reset
                assert.isNot${funcName}(invalid).isNot${funcName}(valid);
                t.true(assert.willThrow);

                assert.shouldThrow = false; // reset
                assert.isNot${funcName}(valid).isNot${funcName}(invalid);
                t.true(assert.willThrow);

                assert.shouldThrow = false; // reset
                assert.isNot${funcName}(invalid).isNot${funcName}(invalid);
                t.true(assert.willThrow);

                assert.shouldThrow = false; // reset
                assert.isNot${funcName}(valid).isNot${funcName}(valid);
                t.true(assert.willThrow);
            });
        `;

    return writeFile(`${this.baseDir}/test/isNot/isNot${funcName}.test.ts`, content);
  }

  private writeIsNotDoc(name: string): Promise<void> {
    const funcName: string = firstLetterUpperCase(name);
    const content: string = `
            # isNot${funcName}

            Check if a value is not a valid ${name}.

            ## Skeleton

            \`\`\`ts
            assert.isNot${funcName}(value)
            \`\`\`

            ## Arguments

            - \`value\` anything, if it's a valid value, it will throw when a [or](../or.md) method is called;

            ## Import and use

            \`\`\`ts
            import { AssertOrBoom } from 'assert-or-boom';
            const assert: AssertOrBoom = new AssertOrBoom();

            assert.isNot${funcName}(undefined).orBoom('Badaboom');
            \`\`\`
        `;

    return writeFile(`${this.baseDir}/doc/isNot/isNot${funcName}.md`, content);
  }
}

const writer: Writer = new Writer(`${process.env.HOME}/Documents/code/assertOrBoom/`);

writer.writeAll()
    .then(() => {
        console.log('Finished');
    })
    .catch((err: Error) => {
        console.error('An error occured', err);
    })
