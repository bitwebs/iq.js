import {
  LCDClient,
  MsgSend,
  Coin,
  CreateTxOptions,
} from '../src';
import Axios from 'axios';

async function main() {
  const { data: gasPrices } = await Axios.get(
    'https://mcafee-1.iqchain.network/v1/txs/gas_prices'
  );

  const columbus = new LCDClient({
    chainID: 'columbus-5',
    URL: 'https://lcd.iqchain.network',
    gasPrices,
  });

  const accountInfo = await columbus.auth.accountInfo(
    'iq1zsky63r58vc7dfn3ljj32ch6fyn4e5qd8skzyz'
  );

  const msgs = [
    new MsgSend(
    	'iq1zsky63r58vc7dfn3ljj32ch6fyn4e5qd8skzyz',
    	'iq1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
		{ubkrw:12345}
    ),
  ];

  const memo = 'estimate fee';
  const txOptions: CreateTxOptions = {
    msgs,
    memo,
    gasPrices,
    gasAdjustment: 1.75,
  };
  // Test raw estimate fee function with specified gas
  const rawFee = await columbus.tx.estimateFee(
    [
      {
        sequenceNumber: accountInfo.getSequenceNumber(),
        publicKey: accountInfo.getPublicKey(),
      },
    ],
    txOptions
  );

  console.log('MsgSwap(500000 gas): ', rawFee.toData());
}

main().catch(console.error);
