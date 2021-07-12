
import React from 'react';
import Collapsible from 'react-collapsible';

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

          <CryptoListItem key={record} recordName={record} />


        ))}
      </ul>

    </>
  );
}


function CryptoListItem(props) {

  const { recordName } = props;
  const record = config.records[recordName];

  const { isHolding, isPaused } = record;
  const {
    buyPercentage,
    sellPercentage,
    stopLossPercentage,
    warningPercentage,
  } = record.thresholds;

  return (
    <Collapsible
      trigger={<CryptoListItemHeader record={record} recordName={recordName} />}
      transitionTime={160}
      onClick={console.log(props)}
    >

      <div className="editCryptoContainer">

        {/* STATIC DATA */}

        <div className="cryptoItemDetails">
          <div>Status: {isHolding ? 'Holding' : 'Waiting to buy'}</div>
          {isHolding
            ? <div>Last buy price: {record.lastBuyPrice}</div>
            : <div>Last sell price: {record.lastBuyPrice}</div>}
          <div>Last transaction: {record.orderDate}</div>
        </div>

        {/* INPUT FIELDS */}

        <div className="editCryptoInputItem">
          Sell percentage:
          <input
            defaultValue={buyPercentage}
            type="number"
            // placeholder="Sell percentage"
          />
        </div>
        <p>The increase that has to be met before selling the crypto-currency back into USDT</p>

        <div className="editCryptoInputItem">
          Buy percentage:
          <input
            defaultValue={sellPercentage}
            type="number"
            // placeholder="Sell percentage"
          />
        </div>
        <p>The decrease that has to be met before buying back into the crypto</p>


        <div className="editCryptoInputItem">
          Stop-loss percentage:
          <input
            defaultValue={stopLossPercentage}
            type="number"
            placeholder="optional"
          />
        </div>
        <p>
          Threshold to sell at a loss -
          once met your buy/sell percentages will be adjusted to break-even
        </p>


        <div className="editCryptoInputItem">
          Warning percentage:
          <input
            defaultValue={warningPercentage}
            type="number"
            placeholder="optional"
          />
        </div>
        <p>The decrease in % relative to the last purchase price</p>

        {/* BUTTONS */}

        {isHolding ? (
          <button
            type="button"
            className="button"
            onClick={() => console.log('hello')}
          >
            Sell
          </button>
        ) : (
          <button
            type="button"
            className="button-red"
            onClick={() => console.log('hello')}
          >
            Buy
          </button>
        )}

        {isPaused ? (
          <button
            type="button"
            className="button"
            onClick={() => console.log('hello')}
          >
            Unpause
          </button>
        ) : (
          <button
            type="button"
            className="button-red"
            onClick={() => console.log('hello')}
          >
            Pause
          </button>
        )}

        <button
          type="button"
          className="button-red"
          onClick={() => console.log('hello')}
        >
          Remove
        </button>

        <button
          type="button"
          className="button-blue"
          onClick={() => console.log('hello')}
        >
          Save
        </button>

      </div>


    </Collapsible>

  );
}


// header of crypto (expand/collapsible)
function CryptoListItemHeader(props) {

  const { recordName, record } = props;

  return (
    <li className={`cryptoListItemHeader${record.isHolding ? '-holding' : ''}`}>
      <div>{recordName}</div>
      <div>${record.limitUSDT} USD</div>
    </li>
  );
}


export default function ConfigurationContainer() {
  return renderContent();
}
