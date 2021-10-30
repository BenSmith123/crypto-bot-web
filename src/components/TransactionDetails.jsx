/* eslint-disable camelcase */

import React from 'react';

export default function TransactionDetails(props) {

  const { transaction } = props;
  const { status, order_info } = transaction;

  const {
    instrument_name,
    avg_price,
    side,
    quantity,
  } = order_info;

  const isBuy = side === 'BUY';

  return (
    <div className="transactionDetails">
      <div>Name</div>{instrument_name}
      <div>Status</div>{status}
      <div>Quantity</div>{isBuy
        ? quantity / avg_price
        : (quantity * avg_price).toFixed(2)}

      <code>
        {JSON.stringify(transaction, null, 4)}
      </code>
    </div>
  );
}


// status: string,
// timestamp: number,
// user: string,
// order_info: {
//     side: 'SELL' | 'BUY',
//     cumulative_quantity: number,
//     quantity: number,
//     create_time: number,
//     fee_currency: string,
//     avg_price: number,
//     exec_inst: 'POST_ONLY' | '',
//     client_oid: string,
//     type: 'LIMIT' | 'MARKET' | 'STOP_LOSS' | 'STOP_LIMIT',
//     update_time: number,
//     time_in_force: 'GOOD_TILL_CANCEL' | 'IMMEDIATE_OR_CANCEL' | 'FILL_OR_KILL',
//     instrument_name: string,
//     price: number,
//     cumulative_value: number,
//     order_id: string,
//     status: 'ACTIVE' | 'CANCELED' | 'FILLED' | 'REJECTED' | 'EXPIRED'
// },
// trade_list: [
//     {
//         liquidity_indicator: 'MAKER' | 'TAKER',
//         side: 'SELL' | 'BUY',
//         trade_id: string,
//         create_time: number,
//         instrument_name: 'SUSHI_USDT',
//         fee: number,
//         fee_currency: string,
//         traded_quantity: number,
//         client_oid: string,
//         traded_price: number,
//         order_id: string
//     }
// ]
