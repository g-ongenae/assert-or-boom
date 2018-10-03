# isUint32Array

Check if a value is a valid uint32Array.

## Skeleton

```ts
assert.isUint32Array(value)
```

## Arguments

- `value` anything, if it's a valid value, it will not throw when a [or](../or.md) method is called;

## Import and use

```ts
import { AssertOrBoom } from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();

assert.isUint32Array(undefined).orBoom('Badaboom');
```
