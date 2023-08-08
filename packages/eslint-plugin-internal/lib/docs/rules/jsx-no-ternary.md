# Disallow ternary operator in JSX. (jsx-no-ternary)

Having complex conditionals such as the ternary operator embedded in JSX can make it harder to read. This rule aims to improve the readability of JSX by preventing the use of complex expressions.

## Rule details

The following pattern is considered a warning:

```js
function MyComponent({visible}) {
  return <div className={visible ? classNames(styles.MyComponent, styles.visible) : styles.Hidden} />;
}
```

The following patterns are not warnings:

```js
function MyComponent({visible}) {
  const className = visible ? classNames(styles.MyComponent, styles.visible) : styles.Hidden;

  return <div className={className} />;
}

function MyComponent({visible}) {
  return <div className={visible && styles.Visible} />;
}
```
