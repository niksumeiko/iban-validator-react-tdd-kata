# Disallow inline styles in JSX. (jsx-no-inline-styles)

Inline styles can represent a security risk, and are blocked by CSP. Therefore we disallow their usage, in favour of css utility classes and CSS Modules. 

## Rule details

The following pattern is considered an error:

```js
function MyComponent() {
  return <div style={{ display: 'flex' }} />;
}
```

The following patterns are not errors:

```js
import style from "MyComponent.scss" // using CSS Modules

function MyComponent() {
  return <div className={style.myComponent} />; // using CSS Modules
}

function MyComponent() {
  return <div className="d-flex" />; // using CSS utility classes
}
```
