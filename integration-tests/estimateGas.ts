import { LCDClient, MsgSend, MnemonicKey } from '../src';
import Axios from 'axios';

async function main() {
	// create a key out of a mnemonic
	const mk = new MnemonicKey({
		mnemonic:
			'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
	});

	const { data: gasPrices } = await Axios.get(
		'https://mcafee-1.iqchain.network/v1/txs/gas_prices'
	);

	const mcafee = new LCDClient({
		chainID: 'mcafee-1',
		URL: 'https://mcafee-lcd.iqchain.network',
		gasPrices: { ubiq: gasPrices.ubiq }
	});

	const wallet = mcafee.wallet(mk);

	// create a simple message that moves coin balances
	const send = new MsgSend(
		'iq1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
		'iq17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
		{ ubiq: 1312029 }
	);

	const tx = await wallet
	.createTx({
		msgs: [send],
		memo: 'test from iq.js!',
	});


	const result = await mcafee.tx.estimateGas(tx, {signers:[
		{
        sequenceNumber: await wallet.sequence(),
        publicKey: wallet.key.publicKey,
      },
	]});
	console.log(JSON.stringify(result));
}

main().catch(console.error);
