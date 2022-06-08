# MyZod Express library

Express middleware to handle requests validation by [myzod](https://github.com/davidmdm/myzod) library. Library can be used for versions `1.x`.

## Installation

```bash
  npm install myzod-express
```

## Usage

Library provided function `validateRequest` which return `RequestHandler` middleware.

```typescript
validateRequest(field: RequestField, schema: MyZodSchema, options?: Options): RequestHandler
```

* `field` (at this moment - `body`, `params`, `query`) parameter specify which `Request` field should be use during validation,
* `schema` parameter is `myzod` schema,
* `options` (optional) parameter stores additional informations.

### Additional options

By default, middleware pass `ValidationError` to the `next()` function. It can be changed by additional option `createAndReturnResponse`, which pass `ValidationError` to `response.send()` function. If `defaultResponseFunc` was provide, `response.send()` will return result of this function.

Response status code can be changed by `defaultResponseCode`.

MyZod additional options can be passed by `myzodOptions`.

### Usage example

```typescript
const schema = myzod.object({
  id: myzod.string(),
});

const app: Express = express();

app.get('/', [validateRequest('params', schema), (req, res) => {
  return 'working';
}]);

app.listen(2137, () => {
  console.log('App listen');
});
```

## Project commands

Brief explanation of project NPM commands.

### Build

> `prebuild` removes `lib` directory before each building

```bash
  npm run build
```

### Run tests

```bash
  npm test
```

### Run tests with coverage

```bash
  npm run coverage
```
