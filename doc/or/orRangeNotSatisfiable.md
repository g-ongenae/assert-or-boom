# orRangeNotSatisfiable

Throw a Boom.Range Not Satisfiable if the previous assertions where false.

## Skeleton

```ts
assert.orRangeNotSatisfiable(message, payload);
```

## Arguments

- `message` a specific message for this error;
- `payload` some data to throw with the error;

## Import and use

```ts
import { AssertOrBoom } from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();

assert.isString(undefined).orRangeNotSatisfiable('Badaboom');
```
