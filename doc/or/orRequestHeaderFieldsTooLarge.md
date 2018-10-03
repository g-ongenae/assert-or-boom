# orRequestHeaderFieldsTooLarge

Throw a Boom.Request Header Fields Too Large if the previous assertions were false.

## Skeleton

```ts
assert.orRequestHeaderFieldsTooLarge(message, payload);
```

## Arguments

- `message` a specific message for this error;
- `payload` some data to throw with the error;

## Import and use

```ts
import {AssertOrBoom} from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();

assert.isString(undefined).orRequestHeaderFieldsTooLarge('Badaboom');
```
