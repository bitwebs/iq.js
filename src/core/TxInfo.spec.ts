import { TxInfo } from './TxInfo';
const data = require('./TxInfo.data.json');

const instantiateContractTxAmino = {
  height: '301435',
  txhash: '69CA62F1328A3FBC810A3E370A186BC2A5FAED2739848CA3336580DD17C58F7E',
  raw_log:
    '[{"msg_index":0,"log":"","events":[{"type":"instantiate_contract","attributes":[{"key":"owner","value":"iq1t72mplryz3n2y953w44fc3rj0yp4m82qvkhrz3"},{"key":"code_id","value":"118"},{"key":"contract_address","value":"iq1emf0rwa3nfljdn6mq0mycy8vxcdaklgmzwam2s"}]},{"type":"message","attributes":[{"key":"action","value":"instantiate_contract"},{"key":"module","value":"wasm"}]}]}]',
  logs: [
    {
      msg_index: 0,
      log: '',
      events: [
        {
          type: 'instantiate_contract',
          attributes: [
            {
              key: 'creator',
              value: 'iq1t72mplryz3n2y953w44fc3rj0yp4m82qvkhrz3',
            },
            {
              key: 'admin',
              value: '',
            },
            {
              key: 'code_id',
              value: '118',
            },
            {
              key: 'contract_address',
              value: 'iq1emf0rwa3nfljdn6mq0mycy8vxcdaklgmzwam2s',
            },
          ],
        },
        {
          type: 'message',
          attributes: [
            {
              key: 'action',
              value: 'instantiate_contract',
            },
            {
              key: 'module',
              value: 'wasm',
            },
          ],
        },
      ],
    },
  ],
  gas_wanted: '136830',
  gas_used: '113019',
  data: '',
  info: '',
  code: 0,
  codespace: '',
  tx: {
    '@type': '/cosmos.tx.v1beta1.Tx',
    body: {
      messages: [
        {
          '@type': '/iq.oracle.v1beta1.MsgAggregateExchangeRateVote',
          salt: '7b4c',
          exchange_rates:
            '41.753679997386404699ubaud,38.152897754805427746ubcad,27.674031355218179072ubchf,196.026837309362459253ubcny,191.737686262835618671udkk,25.782554425634391941ubeur,22.070815310496596573ubgbp,235.918907556073354996uhkd,2245.955815077995150686ubinr,3326.162377566256916073ubjpy,35308.691895711128492846ubkrw,86357.377776669110190178ubmnt,267.642031750061676333unok,21.345339717339129734ubsdr,263.288481492217392139usek,41.027386540303457627ubsgd,997.082326305691696722uthb,30.291256499267926454ubusd',
          feeder: 'iq1fa0trn2nqjc2n6mmz9txta7ky5h5nnp9m6cra3',
          validator: 'iqvaloper1vk20anceu6h9s00d27pjlvslz3avetkvnwmr35',
        },
        {
          '@type': '/iq.oracle.v1beta1.MsgAggregateExchangeRatePrevote',
          hash: '65789f9286d21370e3c0c6eaaba1eb7bd54acb6e',
          feeder: 'iq1fa0trn2nqjc2n6mmz9txta7ky5h5nnp9m6cra3',
          validator: 'iqvaloper1vk20anceu6h9s00d27pjlvslz3avetkvnwmr35',
        },
      ],
      memo: '@web4/oracle-feeder@1.4.6',
      timeout_height: '0',
      extension_options: [],
      non_critical_extension_options: [],
    },
    auth_info: {
      signer_infos: [
        {
          public_key: {
            '@type': '/cosmos.crypto.secp256k1.PubKey',
            key: 'A6/5zM6Vo11e3aepClYLVn4rsHdXOnFsDccXYiuvSeeJ',
          },
          mode_info: {
            single: {
              mode: 'SIGN_MODE_LEGACY_AMINO_JSON',
            },
          },
          sequence: '0',
        },
      ],
      fee: {
        amount: [],
        gas_limit: '150000',
        payer: '',
        granter: '',
      },
    },
    signatures: [
      'AnnNlVkWB5Kk9wPtikUXpjkfYKdaXulUQ0262quoc9EU1nDkC64rjS7sabJV2mnIFYMeHFJlxsxmnAMrJqkppQ==',
    ],
  },
  timestamp: '2020-09-23T13:17:22Z',
};

describe('TxInfo', () => {
  it('deserializes', () => {
    data.tx_responses.forEach((txInfo: TxInfo.Data) => {
      expect(TxInfo.fromData(txInfo)).toBeTruthy();
    });
  });

  it('parses events correctly', () => {
    const tx = TxInfo.fromData(instantiateContractTxAmino as TxInfo.Data);

    if (!tx.logs) {
      throw new Error('logs undefined');
    }

    const {
      message: { action, module },
      instantiate_contract: { creator, admin, code_id, contract_address },
    } = tx.logs[0].eventsByType;

    expect({
      action: action[0],
      module: module[0],
      creator: creator[0],
      admin: admin[0],
      code_id: code_id[0],
      contract_address: contract_address[0],
    }).toMatchObject({
      action: 'instantiate_contract',
      module: 'wasm',
      creator: 'iq1t72mplryz3n2y953w44fc3rj0yp4m82qvkhrz3',
      admin: '',
      code_id: '118',
      contract_address: 'iq1emf0rwa3nfljdn6mq0mycy8vxcdaklgmzwam2s',
    });
  });
});
