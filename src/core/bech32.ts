import { bech32 } from 'bech32';

/** `iq-` prefixed account address */
export type AccAddress = string;

/** `iqvaloper-` prefixed validator operator address */
export type ValAddress = string;

/** `iqvalcons-` prefixed validator consensus address */
export type ValConsAddress = string;

/** `iqpub-` prefixed account public key */
export type AccPubKey = string;

/** `iqvaloperpub-` prefixed validator public key */
export type ValPubKey = string;

function checkPrefixAndLength(
  prefix: string,
  data: string,
  length: number
): boolean {
  try {
    const vals = bech32.decode(data);
    return vals.prefix === prefix && data.length == length;
  } catch (e) {
    return false;
  }
}

export namespace AccAddress {
  /**
   * Checks if a string is a valid Iq account address.
   *
   * @param data string to check
   */
  export function validate(data: string): boolean {
    return checkPrefixAndLength('iq', data, 44);
  }

  /**
   * Converts a validator address into an account address
   *
   * @param address validator address
   */
  export function fromValAddress(address: ValAddress): AccAddress {
    const vals = bech32.decode(address);
    return bech32.encode('iq', vals.words);
  }
}

export namespace AccPubKey {
  /**
   * Checks if a string is a Iq account's public key
   * @param data string to check
   */

  export function validate(data: string): boolean {
    return checkPrefixAndLength('iqpub', data, 47);
  }

  /**
   * Converts a Iq validator pubkey to an account pubkey.
   * @param address validator pubkey to convert
   */
  export function fromAccAddress(address: AccAddress): AccPubKey {
    const vals = bech32.decode(address);
    return bech32.encode('iqpub', vals.words);
  }
}

export namespace ValAddress {
  /**
   * Checks if a string is a Iq validator address.
   *
   * @param data string to check
   */
  export function validate(data: string): boolean {
    return checkPrefixAndLength('iqvaloper', data, 51);
  }

  /**
   * Converts a Iq account address to a validator address.
   * @param address account address to convert
   */
  export function fromAccAddress(address: AccAddress): ValAddress {
    const vals = bech32.decode(address);
    return bech32.encode('iqvaloper', vals.words);
  }
}

export namespace ValPubKey {
  /**
   * Checks if a string is a Iq validator pubkey
   * @param data string to check
   */
  export function validate(data: string): boolean {
    return checkPrefixAndLength('iqvaloperpub', data, 54);
  }

  /**
   * Converts a Iq validator operator address to a validator pubkey.
   * @param valAddress account pubkey
   */
  export function fromValAddress(valAddress: ValAddress): ValPubKey {
    const vals = bech32.decode(valAddress);
    return bech32.encode('iqvaloperpub', vals.words);
  }
}

export namespace ValConsAddress {
  /**
   * Checks if a string is a Iq validator consensus address
   * @param data string to check
   */

  export function validate(data: string): boolean {
    return checkPrefixAndLength('iqvalcons', data, 51);
  }
}
