import { LCDClient } from '../src';

async function main() {
  const mcafee = new LCDClient({
    chainID: 'mcafee-1',
    URL: 'https://mcafee-lcd.iqchain.network',
    gasPrices: { ubusd: 0.38 },
  });

  console.log(
    `Txs Page 1: ${JSON.stringify(
      (
        await mcafee.tx.search({
          events: [{ key: 'tx.height', value: '5947667' }],
          'pagination.limit': '100',
        })
      ).txs.map(tx => tx.txhash)
    )}`
  );

  console.log(
    `Txs Page 2: ${JSON.stringify(
      (
        await mcafee.tx.search({
          events: [{ key: 'tx.height', value: '5947667' }],
          'pagination.limit': '50',
          'pagination.offset': '1',
        })
      ).txs.map(tx => tx.txhash)
    )}`
  );
}

main().catch(console.error);
