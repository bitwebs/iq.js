import { LCDClient } from '../src';

async function main() {
  const mcafee = new LCDClient({
    chainID: 'localiq',
    URL: 'http://localhost:1317',
    gasPrices: { ubusd: 0.38 },
  });

  console.log(
    `Txs Page 1: ${JSON.stringify(
      (
        await mcafee.tx.search({
          events: [{ key: 'tx.height', value: '12' }],
          'pagination.limit': '50',
        })
      ).txs.map(tx => tx)
    )}`
  );
}
main().catch(console.error);
