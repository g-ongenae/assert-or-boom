            # isNotUint16Array

            Check if a value is not a valid uint16Array.

            ## Skeleton

            ```ts
            assert.isNotUint16Array(value)
            ```

            ## Arguments

            - `value` anything, if it's a valid value, it will throw when a [or](../or.md) method is called;

            ## Import and use

            ```ts
            import { AssertOrBoom } from 'assert-or-boom';
            const assert: AssertOrBoom = new AssertOrBoom();

            assert.isNotUint16Array(undefined).orBoom('Badaboom');
            ```
