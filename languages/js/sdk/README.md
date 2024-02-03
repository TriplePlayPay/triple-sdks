# Triple Play Pay Javascript SDK

## Example usage:

```javascript
let triple = require('@tripleplaypay/sdk')
let client = triple.client({ bearerToken: 'token' });
let response = await client.authorize({
    amount: '',
    cc: '',
    mm: '',
    yy: '',
    cvv: '',
    zip: '',
    ticket: '',
    meta: '',
});
```

for all usages, see [Documentation](./DOCUMENTATION.md).

## API docs

for api docs, see [API Docs](../../../openapi/API-docs.md).

## Packaging

this package is provided as `cjs` with typescript bindings.
To use from an `esm` package, simply set your `package.json` "type" field to `module`:

```json
{
  "type": "module"
}
```

and import the SDK like so:

```typescript
import * as triple from '@tripleplaypay/sdk'
```

## Support
