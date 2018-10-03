# isUint8ClampedArray

Check if a value is a valid uint8ClampedArray.

## Skeleton

```ts
assert.isUint8ClampedArray(value)
```

## Arguments

- `value` anything, if it's a valid value, it will not throw when a [or](../or.md) method is called;

## Import and use

```ts
import { AssertOrBoom } from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();

assert.isUint8ClampedArray(undefined).orBoom('Badaboom');
```
