# Pfx Load
Validate your pfx certificate in the easier way possible

## How to call?

You just need to to the following:
```
  const obj = pfxLoad('./path_to_pfx_file', 'some password')
```

## Signature

### pfxLoad(certPath: string, passphrase: string, options: PfxOptions): PfxLoad;

- `certpath`: Path of .pfx file.
- `passphrase`: Password to read the certficate
- `options`: 
  - `showCerts`: Default: `false`, Show or not an Array of certificates
  - `showError`: Default: `true`, show or not the error parameter


### Interface
The PfxLoad use the following interfaces:

````
PfxLoad {
  isPasswordOrPfxInvalid?: boolean;
  isPfxOutdated?: boolean;
  willWork?: boolean;
  error?: Error | null
  validCerts?: Array<Cert>;
}

PfxOptions {
  showCerts?: boolean;
  showError?: boolean;
}

`````

I hope you can make a good use of this library. If you'd like to add or complain about something, please create an Issue in our github. Or enter in our [community](https://bit.ly/2Em3IlR)