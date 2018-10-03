# isNotUint8ClampedArray

Check if a value is not a valid uint8ClampedArray.

## Skeleton

```ts
assert.isNotUint8ClampedArray(value);
```

## Arguments

- `value` anything, if it's a valid value, it will throw when a [or](../or.md) method is called;

## Import and use

```ts
import {AssertOrBoom} from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();

assert.isNotUint8ClampedArray(undefined).orBoom('Badaboom');
```
