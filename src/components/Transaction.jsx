/* eslint-disable camelcase */

import React from 'react';
import moment from 'moment-timezone';
import Collapsible from 'react-collapsible';

import { LabelBlue, LabelGreen } from './Label';
import CryptoIcon from './CryptoIcon';
import TransactionDetails from './TransactionDetails';


export default function Transaction(props) {
  const { transaction } = props;
  const { side, instrument_name } = transaction.order_info;
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
            { dateTime.fromNow() }
          </span>
        </li>
      )}
      transitionTime={160}
    >
      <TransactionDetails transaction={transaction} />
    </Collapsible>


  );
}
