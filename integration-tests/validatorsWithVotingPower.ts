import { LCDClient } from '../src';

const iq = new LCDClient({
  chainID: 'mcafee-1',
  URL: 'https://mcafee-lcd.iqchain.network',
});

iq.utils.validatorsWithVotingPower().then(x => console.log(x));
