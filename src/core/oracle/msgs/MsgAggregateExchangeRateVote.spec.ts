import { MsgAggregateExchangeRateVote } from './MsgAggregateExchangeRateVote';

describe('MsgAggregateExchangeRateVote', () => {
  it('getAggregateVoteHash', () => {
    const msg = new MsgAggregateExchangeRateVote(
      {
        ubkrw: '245.000',
        ubusd: '0.2242',
        ubsdr: '0.182',
      },
      'salt',
      'iq1krj7amhhagjnyg2tkkuh6l0550y733jnjulzjh',
      'iqvaloper1krj7amhhagjnyg2tkkuh6l0550y733jnjnnlzy'
    );
    msg.getPrevote();
    expect(msg.getAggregateVoteHash()).toEqual(
      '7929908433e7399845fa60f9ef70ef7f2bb8f01b'
    );
  });
});
