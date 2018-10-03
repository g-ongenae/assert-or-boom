# aOrB - assertOrBoom

This is the default export function.

It works like a basic assert function but with Boom errors.

## Skeleton

```js
aOrB(value, statusCode, message, payload);
```

## Arguments

- `value`, anything, if it's a truthy value, it will not throw;
- `statusCode`, a http code number;
- `message`, name of the error;
- `payload`, additional datas;

## Import

```ts
// With require
const aOrB = require('assert-or-boom');

// With import
import aOrB from 'assert-or-boom';
```
