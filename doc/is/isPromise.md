# isPromise

Check if a value is a valid promise.

## Skeleton

```ts
assert.isPromise(value);
```

## Arguments

- `value` anything, if it's a valid value, it will not throw when a [or](../or.md) method is called;

## Import and use

```ts
import {AssertOrBoom} from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();

assert.isPromise(undefined).orBoom('Badaboom');
```