import { LCDClient, MnemonicKey, MsgExecuteContract, Wallet } from '../src';

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

async function main() {
  const execute = new MsgExecuteContract(
    wallet.key.accAddress, // sender
    'iq156v8s539wtz0sjpn8y8a8lfg8fhmwa7fy22aff', // contract account address
    // handle msg
    {
      swap: {
        offer_asset: {
          amount: '1000000',
          info: {
            native_token: {
              denom: 'ubiq',
            },
          },
        },
      },
    },
    { ubiq: 1000000 } // coins
  );

  const executeTx = await wallet.createAndSignTx({
    msgs: [execute],
  });

  const executeTxResult = await client.tx.broadcastSync(executeTx);
  console.log(executeTxResult);
}

main().catch(console.error);
