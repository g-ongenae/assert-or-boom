# isNotEven

Check if a value is not a valid even.

## Skeleton

```ts
assert.isNotEven(value)
```

## Arguments

- `value` anything, if it's a valid value, it will throw when a [or](../or.md) method is called;

## Import and use

```ts
import { AssertOrBoom } from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();

assert.isNotEven(undefined).orBoom('Badaboom');
```
