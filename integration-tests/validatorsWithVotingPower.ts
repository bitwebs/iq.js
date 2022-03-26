import { LCDClient } from '../src';

const iq = new LCDClient({
  chainID: 'bombay-12',
  URL: 'https://mcafee-lcd.iqchain.network',
});

iq.utils.validatorsWithVotingPower().then(x => console.log(x));
