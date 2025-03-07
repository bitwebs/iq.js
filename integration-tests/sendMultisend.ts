import { LCDClient, MnemonicKey, MsgMultiSend, SignDoc } from '../src';

async function main() {
  // create a key out of a mnemonic
  const mk = new MnemonicKey({
    mnemonic:
      'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
  });

  const mk2 = new MnemonicKey({
    mnemonic:
      'arrest word woman erupt kiss tank neck achieve diagram gadget siren rare valve replace outside angry dance possible purchase extra yellow cruise pride august',
  });

  const mcafee = new LCDClient({
    chainID: 'mcafee-1',
    URL: 'https://mcafee-lcd.iqchain.network',
    gasPrices: { ubusd: 0.38 },
  });

  // create a simple message that moves coin balances
  const send = new MsgMultiSend(
    [
      new MsgMultiSend.Input('iq1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v', {
        ubusd: 100000,
      }),
      new MsgMultiSend.Input('iq1fqwsd6as9v7f93vja2u7yjs98enawcaq6ge2dx', {
        ubusd: 200000,
      }),
    ],
    [
      new MsgMultiSend.Output('iq17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp', {
        ubusd: 150000,
      }),
      new MsgMultiSend.Output('iq1gufrav46pnpwf03yu7xz76ylkmatsxtplrxnmc', {
        ubusd: 150000,
      }),
    ]
  );

  const accInfo = await mcafee.auth.accountInfo(mk.accAddress);
  const accInfo2 = await mcafee.auth.accountInfo(mk2.accAddress);

  const tx = await mcafee.tx.create(
    [
      { address: mk.accAddress, sequenceNumber: accInfo.getSequenceNumber() },
      { address: mk2.accAddress, sequenceNumber: accInfo2.getSequenceNumber() },
    ],
    {
      msgs: [send],
      memo: 'memo',
      gasPrices: { ubusd: 0.456 },
      gasAdjustment: 1.4,
    }
  );

  const sig1 = await mk.createSignatureAmino(
    new SignDoc(
      mcafee.config.chainID,
      accInfo.getAccountNumber(),
      accInfo.getSequenceNumber(),
      tx.auth_info,
      tx.body
    )
  );

  const sig2 = await mk2.createSignatureAmino(
    new SignDoc(
      mcafee.config.chainID,
      accInfo2.getAccountNumber(),
      accInfo2.getSequenceNumber(),
      tx.auth_info,
      tx.body
    )
  );

  tx.appendSignatures([sig1, sig2]);
  console.log(JSON.stringify(tx.toData()));
  mcafee.tx.broadcast(tx).then(console.log);
}

main().catch(console.error);
