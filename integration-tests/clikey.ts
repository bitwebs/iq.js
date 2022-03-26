import { Fee, MsgSend } from '../src';
import { LocalIq } from '../src';
import { CLIKey } from '../src/key/CLIKey';

const iq = new LocalIq();
const { test1 } = iq.wallets;
const cliKey = new CLIKey({ keyName: 'operator' });

const cliWallet = iq.wallet(cliKey);

const send = new MsgSend(cliWallet.key.accAddress, test1.key.accAddress, {
  ubiq: 100000,
});

async function main() {
  const tx = await cliWallet.createAndSignTx({
    msgs: [send],
    fee: new Fee(100000, { ubiq: 100000 }, '', ''),
  });

  console.log(await iq.tx.broadcast(tx));
}

main().catch(console.error);
