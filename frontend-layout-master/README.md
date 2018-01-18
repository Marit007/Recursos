# Frontend Layout

> A React component (server side) with common layout for meli web apps.

## Installation

```
npm install frontend-layout --save
```

## `layoutMiddleware`

It's a middleware function that provides a `res.render()` method to enable server rendering for React apps wrapped with a given react layout component.

The react layout component always will be rendered to static markup and receives `user`, `device` and `platform` as props. It must have a `<body>` with the `{'{{children}}'}`, `{'{{melidata}}'}` and `{'{{scripts}}'}` to be replaced.

The React component could be rendered to string (to be client mountable) or to static markup if you want to render a simple static page as stripping away the extra React attributes and client data can save lots of bytes.

`layoutMiddleware([options])` middleware initialization, the following list provides details on the options parameter:
- `baseURL`: `string` | default: `null`, enables critical path for layout component, base url of the application should be specified.
- `embedCss`: `bool` | default: `false`, embeds layout styles (header and footer) inline into `<head>`.
- `externalCss`: `array` of strings | default: `null`, add a `<link>` tag with each `string` as href.

  For example:
  ```js
  externalCss: ['foo.css', 'bar.css']
  ```
  Results on:
  ```html
  <link rel="stylesheet" type="text/css" href="foo.css"/>
  <link rel="stylesheet" type="text/css" href="bar.css"/>
  ```
- `inlineCss`: `array` of strings | default: `null`, add a `<style`> tag for each `string` of css rules.

  For example:
  ```js
  inlineCss: ['body { background: red; }']
  ```
  Results on:
  ```html
  <style>body { background: red; }</style>
  ```
- `scripts`: `array` | default: `null`, add a script tag with each `string` as src.
- `type`: `string`, | default: `'full'`, flavors of meli layout, can be 'full', 'lite', 'internal' or 'none'.
- `layout`: `function`, a React layout component that always will be rendered to static markup.
- `criticalPath`: `object`, config object that enables and configure the critical path functionality.
- `criticalPath.key`: `string` | default: `null`, enables the critical path functionality. Used as the part of the name of the critical path cookie.
- `criticalPath.cookiePath`: `string`, | default: `'/'`, indicates the path for the critical path cookie.
- `criticalPath.cookieDomain`: `string`, | default `req.hostname`, domain name for the critical path cookie.
- `fixed`: `boolean` | default: `false`, makes the header stick to the top of the viewport.
- `performanceStats`: `function` | default: `null`, collects render performance stats for every render. The stats info is an object that contains the name of the `page` and the `duration` in milliseconds.
- `searchFocus`: `bool` | default: `false`, set it to `true` to put the focus into searchbox input field automatically

For example:
```js
criticalPath: {
  key: 'tiendas_oficiales',
  cookiePath: '/tiendas-oficiales',
}
```
Enables the critical path by embedding styles for the first user's request to `/tiendas-oficiales`
 and loads the cached styles for all subsequent requests. Creates the cookie `c_tiendas_oficiales`
 that indicates that user is already has the resources cached, that cookie is staying only in
 `/tiendas-oficiales` so it will not pollute another pages.

`res.render(Component, [props], callback)` method receive the following parameters (also this method **can overwrite any option of the middleware** initialization):
- `component`: `function` A React component.
- `props`: `object` An Object with props to pass to layout and component.
   + `staticMarkup`: `boolean` Default value: `false` A special prop that indicates if render to string or to static markup without React data attributes.
- `callback`: `function` A callback function to execute after rendering process. If a callback is passed `res.end()` will not be called.


### `layoutMiddleware` Usage
```js
const React = require('react');
const router = require('nordic/ragnar').router();
const { layoutMiddleware } = require('nordic/layout');

const Page = props => (
  <div id="Page">
    <h1>My Page Component</h1>
    <p>Query: {props.data}</p>
  </div>
);

router.use(layoutMiddleware());

router.get('/', function(req, res) {
  res.render(Page, {
    data: req.query.data,
    staticMarkup: true
  });
});
```

The resulting HTML page will be:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>My custom Layout</title>
  </head>
  <body>
    <main>
      <div id="page">
        <h1>My Page Component</h1>
        <p>Query: Iphone</p>
      </div>
    </main>
  </body>
</html>
```

#### With a custom layout
```js
const React = require('react');
const router = require('nordic/ragnar').router();
const { layoutMiddleware } = require('nordic/layout');
const Head = require('react-declarative-head');
const logger = require('nordic/logger')();

const CustomLayout = props => (
  <body data-site={props.platform.id} data-country={props.platform.countryId}>
    <Head>
      <title>My Custom Layout</title>
    </Head>

    <nav>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </nav>

    <main id="root-app">
      {'{{children}}'}
    </main>

    {'{{melidata}}'}
    {'{{scripts}}'}
  </body>
);

router.use(layoutMiddleware({
  layout: CustomLayout,
}));

router.get('/', function(req, res) {
  res.render(Page, {
    data: req.query.data,
    staticMarkup: false,
    performanceStats: (stats) => logger.info(stats),
  });
});
```

## Develop

1) Install dependencies:

```
npm install
```

2) Build the React modules:

```
npm run watch
```

3) Build the example app:

```
npm run watch:examples
```

4) Run the example app:

```
npm run start-dev
```

5) Navigate to:

```
https://dev.mercadopago.com.ar:8080/
```

## License

Copyright © 2016.
