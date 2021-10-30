/* eslint-disable camelcase */

import React from 'react';
import moment from 'moment-timezone';
import Collapsible from 'react-collapsible';

import { LabelBlue, LabelGreen } from './Label';
import CryptoIcon from './CryptoIcon';


export default function Transaction(props) {
  const { transaction } = props;
  const {
    side,
    cumulative_quantity,
    avg_price,
    instrument_name,
  } = transaction.order_info;

  const dateTime = moment(transaction.timestamp);

  return (
    <Collapsible
      className="transactionCollapsable"
      trigger={(
        <li className="transactionsHeader">
          <div className="cryptoIconLabel">
            <CryptoIcon name={instrument_name.replace('_USDT', '')} />
            <span>{instrument_name.replace('_USDT', '')}</span>
          </div>
          <>
            { side === 'BUY' ? <LabelBlue text={side} /> : <LabelGreen text={side} /> }
          </>
          {/* <div>
            {cumulative_quantity * avg_price}
          </div> */}
          <span>
            {/* {moment(transaction.timestamp).format('DD/MM/YYYY h:mm a')} */}
            {/* {dateTime.format('DD/MM/YYYY h:mm a')} ({dateTime.fromNow()}) */}
            { dateTime.fromNow() }
          </span>
        </li>
      )}
      transitionTime={160}
    >
      <code>
        {JSON.stringify(transaction, null, 4)}
      </code>
    </Collapsible>


  );
}
