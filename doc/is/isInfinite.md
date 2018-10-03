# isInfinite

Check if a value is a valid infinite.

## Skeleton

```ts
assert.isInfinite(value);
```

## Arguments

- `value` anything, if it's a valid value, it will not throw when a [or](../or.md) method is called;

## Import and use

```ts
import {AssertOrBoom} from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();

assert.isInfinite(undefined).orBoom('Badaboom');
```
