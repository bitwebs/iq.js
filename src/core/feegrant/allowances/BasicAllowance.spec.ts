import { Coins } from '../../Coins';
import { BasicAllowance } from './BasicAllowance';

describe('BasicAllowance', () => {
  it('both set', () => {
    const now = new Date();
    const ba = new BasicAllowance('1000ubiq', now);

    expect(ba.toData().spend_limit).toEqual(new Coins('1000ubiq').toData());
    expect(ba.toData().expiration).toEqual(now.toISOString());
    expect(ba.toProto().spendLimit).toEqual(new Coins('1000ubiq').toProto());
    expect(ba.toProto().expiration).toEqual(now);
    expect(ba.toAmino().value.spend_limit).toEqual(
      new Coins('1000ubiq').toAmino()
    );
    expect(ba.toAmino().value.expiration).toEqual(now.toISOString());
  });

  it('spend_limit only', () => {
    const ba = new BasicAllowance('1000ubiq', undefined);

    expect(ba.toData().spend_limit).toEqual(new Coins('1000ubiq').toData());
    expect(ba.toData().expiration).toBeUndefined();
    expect(ba.toProto().spendLimit).toEqual(new Coins('1000ubiq').toProto());
    expect(ba.toProto().expiration).toBeUndefined();
    expect(ba.toAmino().value.spend_limit).toEqual(
      new Coins('1000ubiq').toAmino()
    );
    expect(ba.toAmino().value.expiration).toBeUndefined();
  });

  it('expiration only', () => {
    const now = new Date();
    const ba = new BasicAllowance(undefined, now);

    expect(ba.toData().spend_limit).toEqual(undefined);
    expect(ba.toData().expiration).toEqual(now.toISOString());
    expect(ba.toProto().spendLimit).toHaveLength(0);
    expect(ba.toProto().expiration).toEqual(now);
    expect(ba.toAmino().value.spend_limit).toBeUndefined();
    expect(ba.toAmino().value.expiration).toEqual(now.toISOString());
  });

  it('spend_limit has zero amount', () => {
    expect(() => new BasicAllowance('1ubiq,-1ubusd', undefined)).toThrowError();
    expect(() => new BasicAllowance('0ubkrw', undefined)).toThrowError();
    expect(() => new BasicAllowance('-1204unok', undefined)).toThrowError();
  });

  it('allow both empty', () => {
    const ba = new BasicAllowance();
    expect(ba.spend_limit).toBeUndefined();
    expect(ba.expiration).toBeUndefined();
  });
});
