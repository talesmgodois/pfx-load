import { PfxLoad, PfxOptions } from './types'

import * as nodeForge from 'node-forge';

import * as fs from 'fs';
import { IS_OUTDATED } from './errors';

const DEFAULT_OPTIONS: PfxOptions = {
  showCerts: false,
  showError: true
}

const pfxLoad = (certPath: string, passphrase: string, _options: PfxOptions = DEFAULT_OPTIONS): PfxLoad => {
  const options = { ...DEFAULT_OPTIONS, ..._options };
  const { showCerts, showError } = options;

  const validCerts: Array<any> = [];
  let error = null;
  let isPasswordOrPfxInvalid;
  let isPfxOutdated;

  try {
    const blob = fs.readFileSync(certPath, { encoding: 'base64' });

    const pkcs12 = nodeForge.pkcs12;

    const p12Der = nodeForge.util.decode64(blob);
    const p12Asn1 = nodeForge.asn1.fromDer(p12Der);

    const certDecripted = pkcs12.pkcs12FromAsn1(
      p12Asn1,
      passphrase,
    );

    certDecripted.safeContents.map((safeContent) => {
      safeContent.safeBags.map((safeBag) => {
        if (safeBag.cert) {
          validCerts.push(safeBag.cert);
        }
      });
    });

    const isOutdatedCert = validCerts.filter((cert) => {
      return cert.validity.notAfter.getTime() >= new Date().getTime();
    }).length === 0;

    if (isOutdatedCert) {
      isPfxOutdated = isOutdatedCert;
      throw IS_OUTDATED;
    }

    isPasswordOrPfxInvalid = false;
  } catch (e) {
    isPasswordOrPfxInvalid = e !== IS_OUTDATED;
    error = e;
  }

  const willWork = (!isPfxOutdated && !isPasswordOrPfxInvalid && !error);
  const _validCerts = showCerts ? { validCerts } : {};
  const _error = showError ? { error } : {}
  return {
    isPfxOutdated,
    isPasswordOrPfxInvalid,
    willWork,
    ..._error,
    ..._validCerts
  }
}


export default pfxLoad;