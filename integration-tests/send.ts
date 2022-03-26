import { LCDClient, MsgSend, MnemonicKey } from '../src';
import { SignMode } from '@web4/iq.proto/cosmos/tx/signing/v1beta1/signing';

async function main() {
  // create a key out of a mnemonic
  const mk = new MnemonicKey({
    mnemonic:
      'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
  });

  const mcafee = new LCDClient({
    chainID: 'mcafee-1',
    URL: 'https://mcafee-lcd.iqchain.network',
  });

  // a wallet can be created out of any key
  // wallets abstract transaction building
  const wallet = mcafee.wallet(mk);

  // create a simple message that moves coin balances
  const send = new MsgSend(
    'iq1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
    'iq17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
    { ubiq: 1312029 }
  );

  wallet
    .createAndSignTx({
      signMode: SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
      msgs: [send],
      memo: 'test from iq.js!',
    })
    .then(tx => {
      return mcafee.tx.broadcast(tx);
    })
    .then(result => {
      console.log(`TX hash: ${result.txhash}  ${result.raw_log}`);
    });
}

main().catch(console.error);
