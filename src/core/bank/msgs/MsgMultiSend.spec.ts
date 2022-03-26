import { MsgMultiSend } from './MsgMultiSend';
import { Coins } from '../../Coins';
import { Coin } from '../../Coin';

const example: MsgMultiSend.Amino = {
  type: 'bank/MsgMultiSend',
  value: {
    inputs: [
      {
        address: 'iq1fex9f78reuwhfsnc8sun6mz8rl9zwqh03fhwf3',
        coins: [
          {
            denom: 'ubkrw',
            amount: '1',
          },
        ],
      },
      {
        address: 'iq1gg64sjt947atmh45ls45avdwd89ey4c4r72u9h',
        coins: [
          {
            denom: 'ubkrw',
            amount: '6900000000',
          },
        ],
      },
      {
        address: 'iq1yh9u2x8phrh2dan56nntgpmg7xnjrwtldhgmyu',
        coins: [
          {
            denom: 'ubkrw',
            amount: '1000000',
          },
        ],
      },
      {
        address: 'iq1c5a0njk9q6q6nheja8gp4ymt2c0qspd8ggpg49',
        coins: [
          {
            denom: 'ubkrw',
            amount: '16430000000',
          },
        ],
      },
      {
        address: 'iq1psswnm8mvy9qg5z4cxc2nvptc9dx62r4tvfrmh',
        coins: [
          {
            denom: 'ubkrw',
            amount: '9900000000',
          },
        ],
      },
      {
        address: 'iq10lgpfm8wjrl4d9datzw6r6dl83k977afzel4t5',
        coins: [
          {
            denom: 'ubkrw',
            amount: '15800000000',
          },
        ],
      },
      {
        address: 'iq13uj5qs3lcqtffqtu6aa089uf6a2pusgwndzzch',
        coins: [
          {
            denom: 'ubkrw',
            amount: '6900000000',
          },
        ],
      },
    ],
    outputs: [
      {
        address: 'iq1fex9f78reuwhfsnc8sun6mz8rl9zwqh03fhwf3',
        coins: [
          {
            denom: 'ubkrw',
            amount: '1',
          },
        ],
      },
      {
        address: 'iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        coins: [
          {
            denom: 'ubkrw',
            amount: '6900000000',
          },
        ],
      },
      {
        address: 'iq1fex9f78reuwhfsnc8sun6mz8rl9zwqh03fhwf3',
        coins: [
          {
            denom: 'ubkrw',
            amount: '1000000',
          },
        ],
      },
      {
        address: 'iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        coins: [
          {
            denom: 'ubkrw',
            amount: '16430000000',
          },
        ],
      },
      {
        address: 'iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        coins: [
          {
            denom: 'ubkrw',
            amount: '9900000000',
          },
        ],
      },
      {
        address: 'iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        coins: [
          {
            denom: 'ubkrw',
            amount: '15800000000',
          },
        ],
      },
      {
        address: 'iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        coins: [
          {
            denom: 'ubkrw',
            amount: '6900000000',
          },
        ],
      },
    ],
  },
};

const proto_example: MsgMultiSend.Data = {
  '@type': '/cosmos.bank.v1beta1.MsgMultiSend',
  inputs: [
    {
      address: 'iq1fex9f78reuwhfsnc8sun6mz8rl9zwqh03fhwf3',
      coins: [
        {
          denom: 'ubkrw',
          amount: '1',
        },
      ],
    },
    {
      address: 'iq1gg64sjt947atmh45ls45avdwd89ey4c4r72u9h',
      coins: [
        {
          denom: 'ubkrw',
          amount: '6900000000',
        },
      ],
    },
    {
      address: 'iq1yh9u2x8phrh2dan56nntgpmg7xnjrwtldhgmyu',
      coins: [
        {
          denom: 'ubkrw',
          amount: '1000000',
        },
      ],
    },
    {
      address: 'iq1c5a0njk9q6q6nheja8gp4ymt2c0qspd8ggpg49',
      coins: [
        {
          denom: 'ubkrw',
          amount: '16430000000',
        },
      ],
    },
    {
      address: 'iq1psswnm8mvy9qg5z4cxc2nvptc9dx62r4tvfrmh',
      coins: [
        {
          denom: 'ubkrw',
          amount: '9900000000',
        },
      ],
    },
    {
      address: 'iq10lgpfm8wjrl4d9datzw6r6dl83k977afzel4t5',
      coins: [
        {
          denom: 'ubkrw',
          amount: '15800000000',
        },
      ],
    },
    {
      address: 'iq13uj5qs3lcqtffqtu6aa089uf6a2pusgwndzzch',
      coins: [
        {
          denom: 'ubkrw',
          amount: '6900000000',
        },
      ],
    },
  ],
  outputs: [
    {
      address: 'iq1fex9f78reuwhfsnc8sun6mz8rl9zwqh03fhwf3',
      coins: [
        {
          denom: 'ubkrw',
          amount: '1',
        },
      ],
    },
    {
      address: 'iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
      coins: [
        {
          denom: 'ubkrw',
          amount: '6900000000',
        },
      ],
    },
    {
      address: 'iq1fex9f78reuwhfsnc8sun6mz8rl9zwqh03fhwf3',
      coins: [
        {
          denom: 'ubkrw',
          amount: '1000000',
        },
      ],
    },
    {
      address: 'iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
      coins: [
        {
          denom: 'ubkrw',
          amount: '16430000000',
        },
      ],
    },
    {
      address: 'iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
      coins: [
        {
          denom: 'ubkrw',
          amount: '9900000000',
        },
      ],
    },
    {
      address: 'iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
      coins: [
        {
          denom: 'ubkrw',
          amount: '15800000000',
        },
      ],
    },
    {
      address: 'iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
      coins: [
        {
          denom: 'ubkrw',
          amount: '6900000000',
        },
      ],
    },
  ],
};

describe('MsgMultiSend', () => {
  it('deserialize correctly', () => {
    const multisend = MsgMultiSend.fromAmino(example);
    expect(multisend.toAmino()).toMatchObject(example);
  });

  it('deserialize correctly proto', () => {
    const multisend = MsgMultiSend.fromProto(proto_example);
    expect(multisend.toData()).toMatchObject(proto_example);
  });

  it('can be created manually', () => {
    const inputs: MsgMultiSend.Input[] = [
      new MsgMultiSend.Input(
        'iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
        new Coins({
          ubkrw: 123123,
        })
      ),
      new MsgMultiSend.Input('iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfad', [
        new Coin('ubiq', 123123),
      ]),
    ];

    const outputs: MsgMultiSend.Output[] = [
      new MsgMultiSend.Output(
        'iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfad',
        new Coins({
          ubkrw: 123123,
        })
      ),
      new MsgMultiSend.Output('iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfga', {
        ubiq: 123123,
      }),
    ];
    const multisend = new MsgMultiSend(inputs, outputs);
    expect(multisend.toAmino()).toMatchObject({
      type: 'bank/MsgMultiSend',
      value: {
        inputs: [
          {
            address: 'iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
            coins: [
              {
                denom: 'ubkrw',
                amount: '123123',
              },
            ],
          },
          {
            address: 'iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfad',
            coins: [
              {
                denom: 'ubiq',
                amount: '123123',
              },
            ],
          },
        ],
        outputs: [
          {
            address: 'iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfad',
            coins: [
              {
                denom: 'ubkrw',
                amount: '123123',
              },
            ],
          },
          {
            address: 'iq105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfga',
            coins: [
              {
                denom: 'ubiq',
                amount: '123123',
              },
            ],
          },
        ],
      },
    });
  });
});
