import { MsgSend } from './MsgSend';
import { Coins } from '../../Coins';

describe('MsgSend', () => {
  it('deserialize correctly', () => {
    const send = MsgSend.fromAmino({
      type: 'bank/MsgSend',
      value: {
        from_address: 'iq1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        to_address: 'iq1v9ku44wycfnsucez6fp085f5fsksp47u9x8jr4',
        amount: [
          {
            denom: 'ubiq',
            amount: '8102024952',
          },
        ],
      },
    });

    expect(send).toMatchObject({
      from_address: 'iq1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      to_address: 'iq1v9ku44wycfnsucez6fp085f5fsksp47u9x8jr4',
      amount: new Coins({
        ubiq: 8102024952,
      }),
    });

    expect(send.toAmino()).toMatchObject({
      type: 'bank/MsgSend',
      value: {
        from_address: 'iq1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        to_address: 'iq1v9ku44wycfnsucez6fp085f5fsksp47u9x8jr4',
        amount: [
          {
            denom: 'ubiq',
            amount: '8102024952',
          },
        ],
      },
    });
  });

  it('deserialize correctly proto', () => {
    const send = MsgSend.fromData({
      '@type': '/cosmos.bank.v1beta1.MsgSend',
      from_address: 'iq1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      to_address: 'iq1v9ku44wycfnsucez6fp085f5fsksp47u9x8jr4',
      amount: [
        {
          denom: 'ubiq',
          amount: '8102024952',
        },
      ],
    });

    expect(send).toMatchObject({
      from_address: 'iq1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      to_address: 'iq1v9ku44wycfnsucez6fp085f5fsksp47u9x8jr4',
      amount: new Coins({
        ubiq: 8102024952,
      }),
    });

    expect(send.toData()).toMatchObject({
      '@type': '/cosmos.bank.v1beta1.MsgSend',
      from_address: 'iq1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      to_address: 'iq1v9ku44wycfnsucez6fp085f5fsksp47u9x8jr4',
      amount: [
        {
          denom: 'ubiq',
          amount: '8102024952',
        },
      ],
    });
  });
});
