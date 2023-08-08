# import/no-absolute-within-module

This rule prevents the usage of absolute imports within a module/feature.
This will allow a clear distinction between imports from within the same module and from across another module.

## Limitations

Autofix does not work for imports that start with "@" (aliases)

## Rule Details

This rule has an autofix, to the relative path.  

### Examples

Given the following GFE folder structure:

```
src
├── products
│   └── index.cjs
│   └── productsSlice.js
│   └── productsUtils.js
├── transactions
│   └── index.cjs
│   └── utils.js
└── core
    └── index.cjs
    └── features.js

```


The following patterns are considered problems:

```js
/**
 *  in src/products/productsSlice.js
 */

import { formatter } from 'src/products/productsUtils';

```

The following patterns are NOT considered problems:

```js
/**
 *  in src/products/productsSlice.js
 */

import { formatter } from './productsUtils';

```
