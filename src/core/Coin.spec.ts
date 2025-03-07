import { Coin } from './Coin';
import { Dec, Int } from './numeric';

describe('Coin', () => {
  it('different types for amount', () => {
    const ref = new Coin('ubiq', 1000);
    const coins = [new Coin('ubiq', 1000.0), new Coin('ubiq', '1000')];
    coins.forEach(coin => expect(coin).toEqual(ref));
  });

  it('deserializes Coin value', () => {
    const coin = Coin.fromAmino({
      denom: 'ubiq',
      amount: '1000',
    });

    expect(coin.denom).toEqual('ubiq');
    expect(coin.amount.toNumber()).toEqual(1000);
  });

  it('serializes', () => {
    const coinAmino: Coin.Amino = {
      denom: 'ubiq',
      amount: '1000',
    };

    const coin = Coin.fromAmino(coinAmino);
    expect(coin.amount).toBeInstanceOf(Int);
    expect(coin.toAmino()).toEqual(coinAmino);

    const decCoinAmino = {
      denom: 'ubiq',
      amount: '1000.000000000000000000',
    };
    const decCoin = Coin.fromAmino(decCoinAmino);
    expect(decCoin.amount).toBeInstanceOf(Dec);
    expect(decCoin.toAmino()).toEqual(decCoinAmino);
  });

  it('arithmetic', () => {
    const zero = new Coin('ubiq', 0);
    const coin = new Coin('ubiq', 1000);
    const coin2 = new Coin('ubiq', 2000);
    const coin3 = new Coin('ubkrw', 2000);

    // addition
    const sum = coin.add(coin2);
    const decSum = coin.add(0.1);
    expect(coin.add(zero).amount).toEqual(coin.amount);
    expect(sum.amount.toNumber()).toEqual(3000);
    expect(sum.denom).toEqual('ubiq');
    expect(coin.add(1500)).toEqual(new Coin('ubiq', 2500));
    expect(decSum.isDecCoin()).toBe(true);
    expect(decSum.isIntCoin()).toBe(false);
    expect(decSum.amount.toNumber()).toEqual(1000.1);
    expect(() => coin.add(coin3)).toThrowError(Coin.ArithmeticError);

    // subtraction
    const diff = coin2.sub(coin);
    expect(diff.denom).toEqual('ubiq');
    expect(diff.amount.toNumber()).toEqual(1000);
    expect(() => coin2.sub(coin3)).toThrow(Coin.ArithmeticError);

    // multiplication
    const product = coin.mul(3.1233);
    expect(product.denom).toEqual('ubiq');
    expect(product.amount.toNumber()).toEqual(3123.3);

    // division
    const quotient = coin.div(5);
    expect(quotient.denom).toEqual('ubiq');
    expect(quotient.amount.toNumber()).toEqual(200);

    // modulo
    const rem = coin.mod(43);
    expect(rem.denom).toEqual('ubiq');
    expect(rem.amount.toNumber()).toEqual(coin.amount.toNumber() % 43);
  });

  it('equality', () => {
    const coin1 = new Coin('ubiq', 1000);
    const coin2 = new Coin('ubiq', 1000);
    const coin3 = new Coin('ubiq', 1001);
    expect(coin1).toEqual(coin2);
    expect(coin1).not.toEqual(coin3);
  });

  it('toString', () => {
    const coin1 = new Coin('ubiq', 123456);
    const coin2 = new Coin('ubiq', 123456.789);
    expect(coin1.toString()).toEqual('123456ubiq');
    expect(coin1.toDecCoin().toString()).toEqual('123456.0ubiq');
    expect(coin2.toString()).toEqual('123456.789ubiq');
  });

  describe('fromString', () => {
    it('parse IntCoin', () => {
      const coin1 = new Coin('ubiq', 1001);
      const coin2 = Coin.fromString('1001ubiq');
      expect(coin1).toEqual(coin2);

      const coin3 = new Coin('ubiq', -1);
      const coin4 = Coin.fromString('-1ubiq');
      expect(coin3).toEqual(coin4);
    });

    it('parse IBC IntCoin', () => {
      const coin1 = new Coin(
        'ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B',
        1001
      );
      const coin2 = Coin.fromString(
        '1001ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B'
      );
      expect(coin1).toEqual(coin2);

      const coin3 = new Coin(
        'ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B',
        -1
      );
      const coin4 = Coin.fromString(
        '-1ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B'
      );
      expect(coin3).toEqual(coin4);
    });

    it('parse DecCoin', () => {
      const coin1 = new Coin('ubiq', 1001.5);
      const coin2 = Coin.fromString('1001.500000000000000000ubiq');
      expect(coin1).toEqual(coin2);

      const coin3 = new Coin('ubiq', '-1.0');
      const coin4 = Coin.fromString('-1.000000000000000000ubiq');
      expect(coin3).toEqual(coin4);
    });

    it('parse IBC DecCoin', () => {
      const coin1 = new Coin(
        'ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B',
        1001.5
      );
      const coin2 = Coin.fromString(
        '1001.500000000000000000ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B'
      );
      expect(coin1).toEqual(coin2);

      const coin3 = new Coin(
        'ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B',
        '-1.0'
      );
      const coin4 = Coin.fromString(
        '-1.000000000000000000ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B'
      );
      expect(coin3).toEqual(coin4);
    });
  });
});
