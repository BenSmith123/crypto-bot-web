
import React from 'react';


import config from '../data/exampleConfiguration.json';


function renderContent() {

  if (!config) {
    return (<div>Loading...</div>);
  }

  if (!config.id || !config.records) {
    return (<div>Error</div>);
  }

  return (
    <>
      <div>
        Status: {config.isPaused ? 'Paused' : 'Active'}
      </div>

      <ul className="cryptoItemsContainer">
        {Object.keys(config.records).map((record) => (
          <CryptoItem recordName={record} />
        ))}
      </ul>

    </>
  );
}


function CryptoItem(props) {

  const { recordName } = props;
  const record = config.records[recordName];

  return (
    <li className={`cryptoListItem${record.isHolding ? '-holding' : ''}`}>
      <div>{recordName}</div>
      <div>${record.limitUSDT} USD</div>
      {/* <div>{record.isHolding ? '[holding]' : '[waiting]'}</div>
      <div>{record.orderDate}</div> */}

    </li>
  );
}


export default function ConfigurationContainer() {
  return renderContent();
}
