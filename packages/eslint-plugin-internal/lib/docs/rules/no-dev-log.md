# Disallow commit of dev logger (no-dev-log)

## Rule details

The following pattern is considered an error:

```js
logger.dev('some log')
```

The following pattern is not error:

```js
logger.debug('some more log')
```
