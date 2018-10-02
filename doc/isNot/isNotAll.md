# isNotAll

Check if a value is not a valid all.

## Skeleton

```ts
assert.isNotAll(value);
```

## Arguments

- `value` anything, if it's a valid value, it will throw when a [or](../or.md) method is called;

## Import and use

```ts
import {AssertOrBoom} from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();

assert.isNotAll(undefined).orBoom('Badaboom');
```
