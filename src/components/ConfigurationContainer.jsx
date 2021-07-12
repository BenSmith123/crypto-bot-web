
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import Collapsible from 'react-collapsible';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';


import { isNegativeNum, isPositiveNum } from '../helpers/validations';


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
      <PopupExample />

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


/**
 * @param {object} errors
 * @param {string} recordName - BTC, DOGE, etc.
 * @param {string} fieldKey - 'buyPercentage', 'sellPercentage' etc.
 * @returns
 */
function getRecordError(errors, recordName, fieldKey) {
  return errors?.records?.[recordName].thresholds?.[fieldKey]?.message;
}


function CryptoListItem(props) {

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      ...config,
    },
  });

  const onSubmit = (data) => console.log(data);

  const { recordName } = props;
  const record = config.records[recordName];

  const { isHolding, isPaused } = record;
  const {
    buyPercentage,
    sellPercentage,
    stopLossPercentage,
    warningPercentage,
  } = record.thresholds;

  const registerFieldName = `records.${recordName}.thresholds`;

  return (
    <Collapsible
      trigger={<CryptoListItemHeader record={record} recordName={recordName} />}
      transitionTime={160}
    >

      <form className="editCryptoContainer" onSubmit={handleSubmit(onSubmit)}>

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
            defaultValue={sellPercentage}
            type="number"
            {...register(`${registerFieldName}.sellPercentage`, {
              validate: (v) => isPositiveNum(v),
            })}
          />
        </div>
        <div className="validationError">{getRecordError(errors, recordName, 'sellPercentage')}</div>
        <p>The increase that has to be met before selling the crypto-currency back into USDT</p>


        <div className="editCryptoInputItem">
          Buy percentage:
          <input
            defaultValue={buyPercentage}
            type="number"
            {...register(`${registerFieldName}.buyPercentage`, {
              validate: (v) => isNegativeNum(v),
            })}
          />
        </div>
        <div className="validationError">{getRecordError(errors, recordName, 'buyPercentage')}</div>
        <p>The decrease that has to be met before buying back into the crypto</p>


        <div className="editCryptoInputItem">
          Stop-loss percentage:
          <input
            defaultValue={stopLossPercentage}
            type="number"
            placeholder="optional"
            {...register(`${registerFieldName}.stopLossPercentage`, {
              validate: (v) => isNegativeNum(v, false),
            })}
          />
        </div>
        <div className="validationError">{getRecordError(errors, recordName, 'stopLossPercentage')}</div>
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
            {...register(`${registerFieldName}.warningPercentage`, {
              validate: (v) => isNegativeNum(v, false),
            })}
          />
        </div>
        <div className="validationError">{getRecordError(errors, recordName, 'warningPercentage')}</div>
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
          type="submit"
          className="button-blue"
        >
          Save
        </button>


      </form>


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


const PopupExample = () => (
  <Popup position="center center" modal nested trigger={<button type="button">Trigger</button>}>
    <div>Popup content here !!</div>
  </Popup>
);

// https://react-popup.elazizi.com/react-modal/
