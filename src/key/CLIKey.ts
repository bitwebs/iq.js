import { Key } from './Key';
import { AccAddress, ValAddress } from '../core/bech32';
import { execSync } from 'child_process';
import { fileSync } from 'tmp';
import { writeFileSync } from 'fs';
import { SignDoc } from '../core/SignDoc';
import { SignatureV2 } from '../core/SignatureV2';
import { PublicKey } from '../core/PublicKey';

interface CLIKeyParams {
  keyName: string;
  multisig?: string;
  cliPath?: string;
  home?: string;
}

/**
 * Key implementation that uses `iqd` to sign transactions. Keys should be registered
 * in `iqd`'s OS keyring.
 *
 * NOTE: This Key implementation overrides `createSignature()` and only provide a shim
 * for `sign()`.
 */
export class CLIKey extends Key {
  private _accAddress?: AccAddress;

  /**
   *
   * @param keyName name of the key for iqd
   * @param multisig (optional) address of multisig account on behalf of which transaction shall be signed
   * @param cliPath (optional) path of iqd
   * @param home (optional) home option for iqd
   */
  constructor(private params: CLIKeyParams) {
    super();
    params.cliPath = params.cliPath || 'iqd';
  }

  private generateCommand(args: string) {
    return `${this.params.cliPath} ${args} --output json ${
      this.params.home ? `--home ${this.params.home}` : ''
    }`;
  }

  private loadAccountDetails() {
    const details = JSON.parse(
      execSync(
        this.generateCommand(`keys show ${this.params.keyName}`)
      ).toString()
    );

    this._accAddress = details.address;
    this.publicKey = PublicKey.fromData(JSON.parse(details.pubkey));
  }

  /**
   * Iq account address. `iq-` prefixed.
   */
  public get accAddress(): AccAddress {
    if (!this._accAddress) {
      this.loadAccountDetails();
      return this.accAddress;
    }
    return this._accAddress;
  }

  /**
   * Iq validator address. `iqvaloper-` prefixed.
   */
  public get valAddress(): ValAddress {
    if (!this._accAddress) {
      this.loadAccountDetails();
      return this.valAddress;
    }
    return ValAddress.fromAccAddress(this._accAddress);
  }

  public async sign(): Promise<Buffer> {
    throw new Error(
      'CLIKey does not use sign() -- use createSignature() directly.'
    );
  }

  public async createSignature(tx: SignDoc): Promise<SignatureV2> {
    if (this.params.multisig) {
      throw new Error('multisig is not supported in direct sign mode');
    }

    const tmpobj = fileSync({ postfix: '.json' });
    writeFileSync(tmpobj.fd, JSON.stringify(tx.toUnSignedTx().toData()));

    const result = execSync(
      this.generateCommand(
        `tx sign ${tmpobj.name} --yes --signature-only --from ${this.params.keyName} --offline ` +
          `--chain-id ${tx.chain_id} --account-number ${tx.account_number} --sequence ${tx.sequence} ` +
          `${
            this.params.multisig ? `--multisig ${this.params.multisig}` : ''
          } --sign-mode direct`
      )
    ).toString();
    tmpobj.removeCallback();
    return SignatureV2.fromData(JSON.parse(result)['signatures'][0]);
  }

  public async createSignatureAmino(tx: SignDoc): Promise<SignatureV2> {
    const tmpobj = fileSync({ postfix: '.json' });
    writeFileSync(tmpobj.fd, JSON.stringify(tx.toUnSignedTx().toData()));

    const result = execSync(
      this.generateCommand(
        `tx sign ${tmpobj.name} --yes --signature-only --from ${this.params.keyName} --offline ` +
          `--chain-id ${tx.chain_id} --account-number ${tx.account_number} --sequence ${tx.sequence} ` +
          `${
            this.params.multisig ? `--multisig ${this.params.multisig}` : ''
          } --sign-mode amino-json`
      )
    ).toString();

    tmpobj.removeCallback();
    return SignatureV2.fromData(JSON.parse(result)['signatures'][0]);
  }
}
