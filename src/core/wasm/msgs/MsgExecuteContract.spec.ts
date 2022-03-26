import { MsgExecuteContract } from './MsgExecuteContract';

describe('MsgExecuteContract', () => {
  it('works when execute_msg is not JSON', () => {
    const msg1 = MsgExecuteContract.fromAmino({
      type: 'wasm/MsgExecuteContract',
      value: {
        sender: 'iq16xw94u0jgmuaz8zs54xn9x96lxew74gs05gs4h',
        contract: 'iq15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6',
        execute_msg: {
          transfer: {
            recipient: 'iq13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
            amount: 10000,
          },
        },
        coins: [],
      },
    });

    expect(msg1.execute_msg).toMatchObject({
      transfer: {
        recipient: 'iq13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
        amount: 10000,
      },
    });
  });

  it('proto', () => {
    const msg1 = MsgExecuteContract.fromData({
      '@type': '/iq.wasm.v1beta1.MsgExecuteContract',
      sender: 'iq16xw94u0jgmuaz8zs54xn9x96lxew74gs05gs4h',
      contract: 'iq15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6',
      execute_msg: {
        transfer: {
          recipient: 'iq13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
          amount: 10000,
        },
      },
      coins: [],
    });

    expect(msg1.execute_msg).toMatchObject({
      transfer: {
        recipient: 'iq13jqgrtqwucx4jdvhg0d4tc80892fscx54298yt',
        amount: 10000,
      },
    });
  });
});
