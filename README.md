# Assert or Boom

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> Assert or throw a Boom Error

## Install

```bash
# With yarn
yarn add assert-or-boom
# Or with npm
npm i assert-or-boom
```

## Use

```js
const aOrB = require('assert-or-boom');
const boom = require('boom');

try {
  aOrB(true, 500, 'Internal Error');
} catch (err) {
  Boom.isBoom(err); // => true
}
```

## Functions

- [aOrB](./doc/aOrB.md) like assert with Boom;
- [assertOrBam](./doc/assertOrBam.md) like assert but output an error with a payload;
- [orBoom](./doc/orBoom.md) throw a Boom error;
- [orBam](./doc/orBam.md) throw an error with a payload;
- [is functions](./doc/is.md) list of is functions taken from `@sindresohrus/is`;
- [isNot functions](./doc/isNot.md) like is but is not;
- [or functions](./doc/or.md) functions to throw a specific Boom error;
