# isNotMap

Check if a value is not a valid map.

## Skeleton

```ts
assert.isNotMap(value)
```

## Arguments

- `value` anything, if it's a valid value, it will throw when a [or](../or.md) method is called;

## Import and use

```ts
import { AssertOrBoom } from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();

assert.isNotMap(undefined).orBoom('Badaboom');
```
