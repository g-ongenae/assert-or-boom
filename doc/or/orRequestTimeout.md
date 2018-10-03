# orRequestTimeout

Throw a Boom.Request Timeout if the previous assertions where false.

## Skeleton

```ts
assert.orRequestTimeout(message, payload);
```

## Arguments

- `message` a specific message for this error;
- `payload` some data to throw with the error;

## Import and use

```ts
import {AssertOrBoom} from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();

assert.isString(undefined).orRequestTimeout('Badaboom');
```
