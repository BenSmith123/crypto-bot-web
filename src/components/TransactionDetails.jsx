/* eslint-disable camelcase */

import React from 'react';

import moment from 'moment-timezone';


export default function TransactionDetails(props) {

  const { transaction } = props;
  const {
    orderId, status, order_info, trade_list,
  } = transaction;

  const {
    instrument_name,
    avg_price,
    side,
    cumulative_quantity,
    create_time,
    update_time,
    cumulative_value,
    type,
  } = order_info;

  const currencyCode = instrument_name.replace('_USDT', '');

  const dateTime = moment(create_time);


  return (
    <div className="transactionDetails">

      <h3>Order {orderId}</h3>
      <hr />

      <div className="transactionList">

        {/* list of labels */}
        <ul className="listLeft">

          <li>Name</li>
          <li>Side</li>
          <li>Quantity</li>
          <li>Average price</li>
          <li>Value</li>

          <hr />

          <li>Create time</li>
          <li>Update time</li>

          <li>Status</li>
          <li>Type</li>

          <hr />

          <pre>
            <code>{JSON.stringify({ ...order_info }, null, 2).replace(/"|,|\[|\]|\{|\}/g, '')}</code>
          </pre>

        </ul>

        {/* list of data */}
        <ul className="listRight">

          <li>{instrument_name}</li>
          <li>{side}</li>
          <li>{cumulative_quantity + currencyCode}</li>
          <li>{`$${avg_price} USD`}</li>
          <li>${cumulative_value.toFixed(2)} USD</li>

          <hr />
          <li>{dateTime.format('DD/MM/YYYY h:mm:ss a')} ({dateTime.fromNow()})</li>
          <li>{update_time - create_time}ms</li>

          <li>{status}</li>
          <li>{type}</li>

          <hr />

          <pre>
            <code>{JSON.stringify({ trade_list }, null, 2).replace(/"|,|\[|\]|\{|\}/g, '')}</code>
          </pre>


        </ul>

      </div>


    </div>
  );
}
