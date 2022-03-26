import { LocalIq, WebSocketClient } from '../src';

const wsclient = new WebSocketClient('ws://localhost:26657/websocket');
const iq = new LocalIq();
let count = 0;

wsclient.subscribe('NewBlock', {}, () => {
  console.log(count);
  count += 1;

  if (count === 3) {
    wsclient.destroy();
  }
});

// send tracker
wsclient.subscribe(
  'Tx',
  {
    'message.action': '/cosmos.bank.v1beta1.MsgSend',
    'message.sender': ['CONTAINS', 'iq1'], // always true
  },
  data => {
    console.log('Send occured!');
    console.log(data.value);
  }
);

// swap tracker
wsclient.subscribeTx({ 'message.action': '/iq.market.v1beta1.MsgSwap' }, async data => {
  console.log('Swap occured!');
  const txInfo = await iq.tx.txInfo(data.value.TxResult.txhash);
  if (txInfo.logs) {
    console.log(txInfo.logs[0].eventsByType);
  }
});

wsclient.start();
