# assertOrBam

This method check if value is thruthy or throw a Bam Error.

A Bam Error is like a classic Error but with a payload.

## Skeleton

```ts
assert.assertOrBam(value, message, payload);
```

## Arguments

- `value`, anything, if it's a truthy value, it will not throw;
- `message`, name of the error;
- `payload`, additional datas;

## Import

```ts
import {AssertOrBoom} from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();
```
