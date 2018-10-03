# orBoom

Throw a Boom Error if the previous assertions were false.

## Skeleton

```ts
assert.orBoom(code, message, payload);
```

## Arguments

- `code` a specific http code for this error;
- `message` a specific message for this error;
- `payload` some data to throw with the error;

## Import and use

```ts
import {AssertOrBoom} from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();

assert.isString(undefined).orBoom('Badaboom');
```
