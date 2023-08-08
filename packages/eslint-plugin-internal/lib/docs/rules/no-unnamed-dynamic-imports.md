# Enforces named dynamic webpack chunks.

Omiting a dynamic import's `webpackChunkName` leads to hashed JavaScript filenames being deployed to production servers.  Including a human-readable fragment in filenames makes stack traces more readable, and improves triage accuracy.

## Rule Details

This rule mandates a `webpackChunkName` block comment for all `import` calls.

The following patterns are considered warnings:

```js
async function foo() {
  return import('bar');
}

async function car() {
  return System.import('qux');
}

async function baz() {
  return import(
    // webpackChunkName: "foobar"
    'foobar'
  );
}
```

The following patterns are not warnings:

```js
async function foo() {
  return import(/* webpackChunkName: 'bar' */ 'bar');
}

async function foo() {
  return import('bar' /* webpackChunkName: 'bar' */ );
}
```
