# IQ.js

<p align="center">
The JavaScript SDK for the IQ network.

<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/bitwebs/iq.js">
  <img alt="npm (scoped)" src="https://img.shields.io/npm/v/@web4/iq.js">
</p>

<p align="center">
  <a href="https://docs.iqchain.network/docs/develop/sdks/iq-js/README.html"><strong>Explore the Docs »</strong></a>
  <br />
  <br/>
  <a href="https://docs.iqchain.network/docs/develop/sdks/iq-js/common-examples.html">Examples</a>
  ·
  <a href="https://bitwebs.github.io/iq.js/">API Reference</a>
  ·
  <a href="https://www.npmjs.com/package/@web4/iq.js">NPM Package</a>
  ·
  <a href="https://github.com/bitwebs/iq.js">GitHub</a>
</p>

Iq.js a JavaScript SDK for writing applications that interact with the Iq blockchain from either Node.js, browser, or React Native environments and provides simple abstractions over core data structures, serialization, key management, and API request generation.

## Features

- **Written in TypeScript**, with type definitions
- Versatile support for [key management](https://docs.iqchain.network/docs/develop/sdks/iq-js/keys.html) solutions
- Works in Node.js, in the browser, and React Native
- Exposes the Iq API through [`LCDClient`](https://docs.iqchain.network/docs/develop/sdks/iq-js/query-data.html)
- Parses responses into native JavaScript types

We highly suggest using Iq.js with TypeScript, or JavaScript in a code editor that has support for type declarations, so you can take advantage of the helpful type hints that are included with the package.

## Installation

Grab the latest version off [NPM](https://www.npmjs.com/package/@web4/iq.js):

```sh
npm install @web4/iq.js
```

## Usage

Iq.js can be use in Node.js, as well as inside the browser. Please check the [docs](https://docs.iqchain.network/docs/develop/sdks/iq-js/README.html) for notes on how to get up and running.

### Getting blockchain data

```ts
import { LCDClient, Coin } from '@web4/iq.js';

// connect to mcafee testnet
const iq = new LCDClient({
  URL: 'https://mcafee-lcd.iqchain.network',
  chainID: 'mcafee-1',
});

// To use LocalIq
// const iq = new LCDClient({
//   URL: 'http://localhost:1317',
//   chainID: 'localiq'
// });

// get the current swap rate from 1 BUSD to I
BKRW
const offerCoin = new Coin('ubusd', '1000000');
iq.market.swapRate(offerCoin, 'ubkrw').then(c => {
  console.log(`${offerCoin.toString()} can be swapped for ${c.toString()}`);
});
```

### Broadcasting transactions

First, [get](https://faucet.iqchain.network/) some testnet tokens for `iq1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v`, or use [LocalIq](https://www.github.com/bitwebs/LocalIq).

```ts
import { LCDClient, MsgSend, MnemonicKey } from '@web4/iq.js';

// create a key out of a mnemonic
const mk = new MnemonicKey({
  mnemonic:
    'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
});

// connect to mcafee testnet
const iq = new LCDClient({
  URL: 'https://mcafee-lcd.iqchain.network',
  chainID: 'mcafee-1',
});

// To use LocalIq
// const iq = new LCDClient({
//   URL: 'http://localhost:1317',
//   chainID: 'localiq'
// });

// a wallet can be created out of any key
// wallets abstract transaction building
const wallet = iq.wallet(mk);

// create a simple message that moves coin balances
const send = new MsgSend(
  'iq1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  'iq17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
  { ubiq: 1000000, ubkrw: 1230201, ubusd: 1312029 }
);

wallet
  .createAndSignTx({
    msgs: [send],
    memo: 'test from iq.js!',
  })
  .then(tx => iq.tx.broadcast(tx))
  .then(result => {
    console.log(`TX hash: ${result.txhash}`);
  });
```

## Iq.js in the browser

You can access all the objects of the `@web4/iq.js` from the global `Iq` object if you load Iq.js with a `<script>` tag.

Include the following in your browser:

```html
<script
  crossorigin
  src="https://unpkg.com/@web4/iq.js/dist/bundle.js"
></script>
```

You can find a small JSFiddle example that refreshes current Oracle votes [here](https://jsfiddle.net/tLm1b527/1/).

## Iq.js in React Native

In order to use Iq.js inside React Native, you need to add the [`node-libs-react-native`](https://github.com/parshap/node-libs-react-native) package and [`react-native-get-random-values`](https://github.com/LinusU/react-native-get-random-values) package to your React Native app's `package.json`.

```sh
yarn add node-libs-react-native react-native-get-random-values
```

You will need to register Node.js native modules in an entry point of your application, such as `index.tsx`:

```js
import 'node-libs-react-native/globals';
import 'react-native-get-random-values';
```

Also, add resolvers to your `metro.config.js`

```js
module.exports {
  // ...
  resolver: {
    // ...
    extraNodeModules: require('node-libs-react-native'),
  },
  // ...
}
```

## License

This software is licensed under the MIT license. See [LICENSE](./LICENSE) for full disclosure.

© 2022 BitWeb Labs

<hr/>
