import { Tx } from './Tx';

describe('Tx', () => {
  it('deserializes', () => {
    const txAmino: Tx.Amino = {
      type: 'core/StdTx',
      value: {
        msg: [
          {
            type: 'wasm/MsgExecuteContract',
            value: {
              sender: 'iq15d7zke8yrwvz360es5gr97y8upktm79q6j33de',
              contract: 'iq1a06dgl27rhujjphsn4drl242ufws267qxypptx',
              execute_msg: {
                adjust_premium: {
                  asset_tokens: [
                    'iq15t9afkpj0wnh8m74n8n2f8tspkn7r65vnru45s',
                    'iq1qre9crlfnulcg0m68qqywqqstplgvrzywsg3am',
                    'iq1p50j2k5vyw3q2tgywqvxyz59z8csh9p7x8dk5m',
                    'iq18gphn8r437p2xmjpw7a79hgsglf5y4t0x7s5ee',
                    'iq1csr22xvxs6r3gkjsl7pmjkmpt39mwjsrm0e2r8',
                    'iq1ys4dwwzaenjg2gy02mslmc96f267xvpsjat7gx',
                    'iq16vfxm98rxlc8erj4g0sj5932dvylgmdufnugk0',
                    'iq1avryzxnsn2denq7p2d7ukm6nkck9s0rz2llgnc',
                    'iq1zeyfhurlrun6sgytqfue555e6vw2ndxt2j7jhd',
                    'iq12saaecsqwxj04fn0jsv4jmdyp6gylptf5tksge',
                    'iq15dr4ah3kha68kam7a907pje9w6z2lpjpnrkd06',
                    'iq14gq9wj0tt6vu0m4ec2tkkv4ln3qrtl58lgdl2c',
                    'iq104tgj4gc3pp5s240a0mzqkhd3jzkn8v0u07hlf',
                    'iq1qg9ugndl25567u03jrr79xur2yk9d632fke3h2',
                    'iq13myzfjdmvqkama2tt3v5f7quh75rv78w8kq6u6',
                    'iq12s2h8vlztjwu440khpc0063p34vm7nhu25w4p9',
                    'iq1djnlav60utj06kk9dl7defsv8xql5qpryzvm3h',
                    'iq18yx7ff8knc98p07pdkhm3u36wufaeacv47fuha',
                    'iq1fdkfhgk433tar72t4edh6p6y9rmjulzc83ljuw',
                    'iq1nslem9lgwx53rvgqwd8hgq7pepsry6yr3wsen4',
                    'iq1ax7mhqahj6vcqnnl675nqq2g9wghzuecy923vy',
                    'iq1fucmfp8x4mpzsydjaxyv26hrkdg4vpdzdvf647',
                    'iq1ftefjmtpnk2fctsa8xkv8naven65z5qtgq83nu',
                    'iq1fs6c6y65c65kkjanjwvmnrfvnm2s58ph88t9ky',
                    'iq18qs6704f4ujnwus9x9vxcxrrm0du0f232kpnd6',
                    'iq1qk0cd8576fqf33paf40xy3rt82p7yluwtxz7qx',
                    'iq179na3xcvjastpptnh9g6lnf75hqqjnsv9mqm3j',
                  ],
                },
              },
              coins: [],
            },
          },
        ],
        fee: { amount: [{ denom: 'ubusd', amount: '1417500' }], gas: '9450000' },
        signatures: [],
        memo: '',
        timeout_height: '0',
      },
    };

    expect(Tx.fromAmino(txAmino)).toBeTruthy();
  });
});
