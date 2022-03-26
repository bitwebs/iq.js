import { LCDClient } from '../src';

async function main() {
  const mcafee = new LCDClient({
    chainID: 'mcafee-1',
    URL: 'https://mcafee-lcd.iqchain.network',
    gasPrices: { ubusd: 0.38 },
  });

  console.log(`Proposer: ${JSON.stringify(await mcafee.gov.proposer(5320))}`);
  console.log(
    `Initial Deposit:  ${JSON.stringify(await mcafee.gov.initialDeposit(5320))}`
  );
  console.log(`Deposits: ${JSON.stringify(await mcafee.gov.deposits(5320))}`);
  console.log(`Votes: ${JSON.stringify(await mcafee.gov.votes(5320))}`);
}

main().catch(console.error);
