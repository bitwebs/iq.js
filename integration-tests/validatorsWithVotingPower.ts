import { LCDClient } from '../src';

const terra = new LCDClient({
  chainID: 'bombay-12',
  URL: 'https://mcafee-lcd.iqchain.network',
});

terra.utils.validatorsWithVotingPower().then(x => console.log(x));
