            # isDomElement

            Check if a value is a valid domElement.

            ## Skeleton

            ```ts
            assert.isDomElement(value)
            ```

            ## Arguments

            - `value` anything, if it's a valid value, it will not throw when a [or](../or.md) method is called;

            ## Import and use

            ```ts
            import { AssertOrBoom } from 'assert-or-boom';
            const assert: AssertOrBoom = new AssertOrBoom();

            assert.isDomElement(undefined).orBoom('Badaboom');
            ```
