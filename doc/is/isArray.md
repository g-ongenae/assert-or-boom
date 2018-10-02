# isArray

Check if a value is a valid array.

## Skeleton

```ts
assert.isArray(value);
```

## Arguments

- `value` anything, if it's a valid value, it will not throw when a [or](../or.md) method is called;

## Import and use

```ts
import {AssertOrBoom} from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();

assert.isArray(undefined).orBoom('Badaboom');
```
