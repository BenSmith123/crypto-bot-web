/* eslint-disable camelcase */

import React from 'react';
import moment from 'moment-timezone';
import Collapsible from 'react-collapsible';


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
      open={false} // TODO
      trigger={<div>Hello</div>}
      transitionTime={160}
    >

      <>
        <div>
          {side}
        </div>
        <div>
          {instrument_name.replace('_USDT', '')}
        </div>
        <div>
          {cumulative_quantity * avg_price}
        </div>
        <div>

          {/* {moment(transaction.timestamp).format('DD/MM/YYYY h:mm a')} */}
          {dateTime.format('DD/MM/YYYY h:mm a')} ({dateTime.fromNow()})
        </div>
        {/* <div>
        {status}
      </div> */}
      </>

    </Collapsible>


  );
}
