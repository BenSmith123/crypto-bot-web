
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import Collapsible from 'react-collapsible';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';

import PopupDialog from './PopupDialog';

import { isNegativeNum, isPositiveNum, isOneOrMore } from '../helpers/validations';

import CryptoIcon from './CryptoIcon';


/**
 * @param {object} errors
 * @param {string} recordName - BTC, DOGE, etc.
 * @param {string} fieldKey - 'buyPercentage', 'sellPercentage' etc.
 * @returns
 */
function getRecordError(errors, recordName, fieldKey) {
  // if the field doesn't exist in the .record.BTC.thresholds,
  // check if the key is in .record.BTC.
  if (!Object.keys(errors).length) return null;

  if (errors?.records?.[recordName]?.[fieldKey]) {
    return errors?.records?.[recordName]?.[fieldKey].message;
  }

  if (errors?.records?.[recordName].thresholds?.[fieldKey]) {
    return errors?.records?.[recordName].thresholds?.[fieldKey].message;
  }

  return null;
}


function CryptoListItem(props) {

  const { config } = props;

  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      ...config,
    },
  });

  const onSubmit = (data) => console.log(data);

  const { recordName } = props;
  const record = config.records[recordName];

  const { isHolding, isPaused, limitUSDT } = record;
  const {
    buyPercentage, sellPercentage, stopLossPercentage, warningPercentage,
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
          <div>Initial amount: $xx</div>
          <div>Estimate amount: $xx</div>
          {isHolding
            ? <div>Last buy price: {record.lastBuyPrice}</div>
            : <div>Last sell price: {record.lastBuyPrice}</div>}
          <div>Last transaction: {record.orderDate}</div>
        </div>

        <hr />

        {/* INPUT FIELDS */}

        <div className="editCryptoInputItem">
          Limit (USDT):
          <input
            defaultValue={limitUSDT}
            type="number"
            placeholder="optional"
            {...register(`records.${recordName}.limitUSDT`, {
              validate: (v) => isOneOrMore(Number(v), false),
            })}
          />
        </div>
        <div className="validationError">{getRecordError(errors, recordName, 'limitUSDT')}</div>
        <p>
          The amount of USDT to use when trading the given crypto. The limit will be adjusted on
          every sell transaction to continue trading with additional gains/losses.
        </p>

        <div className="editCryptoInputItem">
          Sell percentage:
          <input
            defaultValue={sellPercentage}
            type="number"
            {...register(`${registerFieldName}.sellPercentage`, {
              validate: (v) => isPositiveNum(Number(v)),
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
              validate: (v) => isNegativeNum(Number(v)),
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
              validate: (v) => isNegativeNum(Number(v), false),
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
              validate: (v) => isNegativeNum(Number(v), false),
            })}
          />
        </div>
        <div className="validationError">{getRecordError(errors, recordName, 'warningPercentage')}</div>
        <p>The decrease in % relative to the last purchase price</p>

        {/* BUTTONS */}

        {isHolding ? (
          <Popup
            position="center center"
            modal
            nested
            trigger={(<button type="button" className="button-red">Sell</button>)}
          >
            {(close) => (
              <PopupDialog
                close={close}
                questionDialog
                title="Are you sure?"
                confirmText="Sell"
                description={(
                  <>
                    <p>The bot will sell your <b>{recordName}</b> when it is next run.</p>
                    <p>
                      The bot will keep record of the sell price and continue to
                      monitor <b>{recordName}</b> and buy back in when the buy percentage is met.
                    </p>
                  </>
)}
                acceptFunc={() => console.log('hello')}
              />
            )}
          </Popup>
        ) : (
          <Popup
            position="center center"
            modal
            nested
            trigger={(<button type="button" className="button-red">Pause</button>)}
          >
            {(close) => (
              <PopupDialog
                close={close}
                questionDialog
                title="Are you sure?"
                confirmText="Sell"
                description={`Pausing ${recordName} will prevent the bot from making any further transactions`}
                acceptFunc={() => console.log('hello')}
              />
            )}
          </Popup>
        )}

        {isPaused ? (
          <Popup
            position="center center"
            modal
            nested
            trigger={(<button type="button" className="button-red">Unpause</button>)}
          >
            {(close) => (
              <PopupDialog
                close={close}
                questionDialog
                title="Are you sure?"
                confirmText="Unpause"
                description={`Pausing ${recordName} will prevent the bot from making any further transactions`}
                acceptFunc={() => console.log('hello')}
              />
            )}
          </Popup>
        ) : (
          <Popup
            position="center center"
            modal
            nested
            trigger={(<button type="button" className="button">Pause</button>)}
          >
            {(close) => (
              <PopupDialog
                close={close}
                questionDialog
                title="Are you sure?"
                confirmText="Pause"
                description={`Pausing ${recordName} will prevent the bot from making any further transactions`}
                acceptFunc={() => console.log('hello')}
              />
            )}
          </Popup>
        )}

        <Popup
          position="center center"
          modal
          nested
          trigger={(<button type="button" className="button">Remove</button>)}
        >
          {(close) => (
            <PopupDialog
              close={close}
              questionDialog
              title="Are you sure?"
              confirmText="Remove"
              description={`Removing ${recordName} will stop the bot from monitoring/trading in it but will not sell`}
              acceptFunc={() => console.log('hello')}
            />
          )}
        </Popup>

        <Popup
          position="center center"
          modal
          nested
          trigger={(
            <button
              type="submit"
              disabled={!(isDirty && isValid)}
              className={isDirty && isValid ? 'button-blue' : 'button'}
            >Save
            </button>
)}
        >
          {(close) => (
            <PopupDialog
              close={close}
              title="Saving..."
              acceptFunc={() => console.log('hello')}
            />
          )}
        </Popup>


      </form>

    </Collapsible>

  );
}


// header of crypto (expand/collapsible)
function CryptoListItemHeader(props) {

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


export default function ConfigurationContainer(props) {
  const { config } = props;

  if (!config) {
    return (<div>Loading...</div>);
  }

  if (!config.id || !config.records) {
    return (<div>Error</div>);
  }

  return (
    <>
      <ul className="cryptoItemsContainer">

        <div>Bot status: {config.isPaused ? 'Paused' : 'Active'}</div>
        <div>Monitored currencies: {Object.keys(config.records).length}</div>
        <div>Estimate total funds: $... USD ($... NZD)</div>

        {Object.keys(config.records).map((record) => (
          <CryptoListItem key={record} recordName={record} config={config} />
        ))}

      </ul>
    </>
  );
}
