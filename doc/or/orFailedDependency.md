# orFailedDependency

Throw a Boom.Failed Dependency if the previous assertions were false.

## Skeleton

```ts
assert.orFailedDependency(message, payload);
```

## Arguments

- `message` a specific message for this error;
- `payload` some data to throw with the error;

## Import and use

```ts
import {AssertOrBoom} from 'assert-or-boom';
const assert: AssertOrBoom = new AssertOrBoom();

assert.isString(undefined).orFailedDependency('Badaboom');
```
