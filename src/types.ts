export type Cert = any;

export interface PfxLoad {
  isPasswordOrPfxInvalid?: boolean;
  isPfxOutdated?: boolean;
  willWork?: boolean;
  error?: Error | null
  validCerts?: Array<Cert>;
}


export interface PfxOptions {
  showCerts?: boolean;
  showError?: boolean;
}
export default {}