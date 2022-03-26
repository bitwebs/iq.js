import { Coins } from './Coins';
import { Coin } from './Coin';

describe('Coins', () => {
  it('clobbers coins of similar denom', () => {
    const coins1 = new Coins([
      new Coin('ubkrw', 1000),
      new Coin('ubiq', 1000),
      new Coin('ubiq', 1000),
    ]);

    const coinBKRW = coins1.get('ubkrw');
    const coinBIQ = coins1.get('ubiq');

    expect(coinBKRW).toBeDefined();
    expect(coinBIQ).toBeDefined();

    if (coinBKRW !== undefined && coinBIQ !== undefined) {
      expect(coinBKRW.amount.toNumber()).toEqual(1000);
      expect(coinBIQ.amount.toNumber()).toEqual(2000);
    }
  });

  it('converts to deccoins if at least one id deccoin', () => {
    const c1 = new Coins({
      ubiq: 1000,
      ubkrw: 1.234,
    });

    const c2 = new Coins({
      ubiq: 1000,
      ubkrw: 1234,
    });

    expect(c1.toArray().every(c => c.isDecCoin())).toBe(true);
    expect(c2.toArray().every(c => c.isDecCoin())).toBe(false);
  });

  it('allows coins to be instantiated with a variety of inputs', () => {
    const ref = new Coins({
      ubkrw: 1,
      ubiq: 2,
    });

    // input #1: Coins
    const coins1 = new Coins(ref);

    // input #2: Coin[]
    const coins2 = new Coins([new Coin('ubkrw', 1), new Coin('ubiq', 2)]);

    // input #3: Coins.AminoDict
    const coins3 = new Coins({
      ubkrw: 1,
      ubiq: 2,
    });

    // input #4: string
    const coins4 = new Coins('2ubiq,1ubkrw');

    [coins1, coins2, coins3, coins4].forEach(cs => {
      expect(cs).toEqual(ref);
    });
  });

  it('fromString', () => {
    const int_coins_string = '5ubkrw,12ubiq';
    const dec_coins_string = '2.3ubkrw,1.45ubiq';
    const neg_dec_coins_string = '-1.0ubkrw,2.5ubiq';

    const int_coins = new Coins({
      ubkrw: 5,
      ubiq: '12',
    });
    const dec_coins = new Coins({
      ubkrw: 2.3,
      ubiq: '1.45',
    });

    const neg_dec_coins = new Coins({
      ubkrw: '-1.0',
      ubiq: 2.5,
    });

    const coins1 = Coins.fromString(int_coins_string);
    const coins2 = Coins.fromString(dec_coins_string);
    const coins3 = Coins.fromString(neg_dec_coins_string);

    expect(coins1).toEqual(int_coins);
    expect(coins2).toEqual(dec_coins);
    expect(coins3).toEqual(neg_dec_coins);
  });

  it('filters', () => {
    const gasPrices = new Coins({
      ubiq: '0.15',
      ubsdr: '0.1018',
      ubusd: '0.15',
      ubkrw: '178.05',
      ubmnt: '431.6259',
      ubeur: '0.125',
      ubcny: '0.97',
      ubjpy: '16.0',
      ubgbp: '0.11',
      ubinr: '11.0',
      ubcad: '0.19',
      ubchf: '0.13',
      ubaud: '0.19',
      ubsgd: '0.2',
    });

    expect(gasPrices.filter(c => ['ubkrw'].includes(c.denom))).toEqual(
      new Coins({ ubkrw: '178.05' })
    );
  });

  it('is iterable', () => {
    const gasPrices = new Coins({
      ubiq: '0.15',
      ubsdr: '0.1018',
      ubusd: '0.15',
      ubkrw: '178.05',
      ubmnt: '431.6259',
      ubeur: '0.125',
      ubcny: '0.97',
      ubjpy: '16.0',
      ubgbp: '0.11',
      ubinr: '11.0',
      ubcad: '0.19',
      ubchf: '0.13',
      ubaud: '0.19',
      ubsgd: '0.2',
    });

    // shouldn't fail or ts giving errors on type
    expect(Array.isArray(Array.from(gasPrices))).toBe(true);
  });
});
