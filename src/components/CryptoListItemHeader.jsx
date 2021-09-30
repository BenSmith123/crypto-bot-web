
import React from 'react';

import CryptoIcon from './CryptoIcon';


// header of crypto (expand/collapsible)
export default function CryptoListItemHeader(props) {

  const { recordName, record } = props;

  return (
    <li className={`cryptoListItemHeader${record.isHolding ? '-holding' : ''}`}>
      <div className="cryptoIconLabel">
        <CryptoIcon name={recordName} />
        <span>{recordName}</span>
      </div>
      <span>${record.limitUSDT} USD</span>
    </li>
  );
}

