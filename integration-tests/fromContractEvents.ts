import { LCDClient, getContractEvents } from '../src';

const mcafee = new LCDClient({
  chainID: 'mcafee-1',
  URL: 'https://mcafee-lcd.iqchain.network',
});

mcafee.tx
  .txInfo('B652DF530D50E470070F3F211519495078082D01B49ED36B762B4E9446CE484E')
  .then(txInfo => getContractEvents(txInfo))
  .then(console.log);
