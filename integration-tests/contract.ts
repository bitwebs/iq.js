import {
  MsgStoreCode,
  MsgInstantiateContract,
  MsgExecuteContract,
  StdFee,
  isTxError,
  LocalIq,
  getCodeId,
  getContractAddress,
} from '../src';
import * as fs from 'fs';

// test1 key from localiq accounts
const iq = new LocalIq();
const { test1 } = iq.wallets;

async function main(): Promise<void> {
  const storeCode = new MsgStoreCode(
    test1.key.accAddress,
    fs.readFileSync('contract.wasm').toString('base64')
  );
  const storeCodeTx = await test1.createAndSignTx({
    msgs: [storeCode],
  });
  const storeCodeTxResult = await iq.tx.broadcast(storeCodeTx);

  console.log(storeCodeTxResult);

  if (isTxError(storeCodeTxResult)) {
    throw new Error(
      `store code failed. code: ${storeCodeTxResult.code}, codespace: ${storeCodeTxResult.codespace}, raw_log: ${storeCodeTxResult.raw_log}`
    );
  }

  const codeId = getCodeId(storeCodeTxResult);

  const instantiate = new MsgInstantiateContract(
    test1.key.accAddress,
    null,
    +codeId, // code ID
    { count: 0, }, // InitMsg
    { ubiq: 10000000, ubkrw: 1000000 } // init coins
  );

  const instantiateTx = await test1.createAndSignTx({
    msgs: [instantiate],
  });
  const instantiateTxResult = await iq.tx.broadcast(instantiateTx);

  console.log(instantiateTxResult);

  if (isTxError(instantiateTxResult)) {
    throw new Error(
      `instantiate failed. code: ${instantiateTxResult.code}, codespace: ${instantiateTxResult.codespace}, raw_log: ${instantiateTxResult.raw_log}`
    );
  }

  const contractAddress = getContractAddress(instantiateTxResult);

  const execute = new MsgExecuteContract(
    test1.key.accAddress, // sender
    contractAddress, // contract address
    { increment: {} }, // handle msg
    { ubiq: 100000 } // coins
  );
  const executeTx = await test1.createAndSignTx({
    msgs: [execute],
  });
  const executeTxResult = await iq.tx.broadcast(executeTx);
  console.log(executeTxResult);
}

main().then(console.log);
