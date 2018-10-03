# isNotInt16Array

Check if a value is not a valid int16Array.

## Skeleton

```ts
assert.isNotInt16Array(value);
```

## Arguments

- `value` anything, if it's a valid value, it will throw when a [or](../or.md) method is called;

## Import and use

```ts
import {AssertOrBoom} from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();

assert.isNotInt16Array(undefined).orBoom('Badaboom');
```
