# isAny

Check if a value is a valid any.

## Skeleton

```ts
assert.isAny(value);
```

## Arguments

- `value` anything, if it's a valid value, it will not throw when a [or](../or.md) method is called;

## Import and use

```ts
import {AssertOrBoom} from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();

assert.isAny(undefined).orBoom('Badaboom');
```
