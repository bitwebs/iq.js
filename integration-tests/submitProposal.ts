import {
  LCDClient,
  MnemonicKey,
  MsgSubmitProposal,
  // TextProposal,
  // CommunityPoolSpendProposal,
  ParameterChangeProposal,
} from '../src';

const client = new LCDClient({
  chainID: 'mcafee-1',
  URL: 'https://mcafee-lcd.iqchain.network',
});

// LocalIq test1 iq1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v
const mk = new MnemonicKey({
  mnemonic:
    'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
});

const wallet = client.wallet(mk);

const title = 'Test proposal';
const description = 'Hello world';
const changes = [{ subspace: 'staking', key: 'MaxValidators', value: '130' }];

async function main() {
  const execute = new MsgSubmitProposal(
    new ParameterChangeProposal(
      title,
      description,
      changes
    ),
    { ubiq: 10000000 },
    wallet.key.accAddress
  );

  const executeTx = await wallet.createAndSignTx({
    msgs: [execute],
  });

  const executeTxResult = await client.tx.broadcastSync(executeTx);
  console.log(executeTxResult);
}

main().catch(console.error);
