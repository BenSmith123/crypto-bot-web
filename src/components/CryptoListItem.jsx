
import React, { useContext } from 'react';

import Collapsible from 'react-collapsible';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';
import toast from 'react-hot-toast';

import AppContext from './AppContext';
import { PopupDialog } from './PopupDialog';
import CryptoListItemHeader from './CryptoListItemHeader';
import { Loading, Error } from './Toasts';

import { updateUserConfiguration } from '../api-interface';
import {
  isNegativeNum, isPositiveNum, isOneOrMore, getRecordError,
} from '../helpers/validations';

import { CONFIG_ACTIONS } from '../helpers/constants';


const popupOptions = {
  position: 'center center',
  modal: true,
  nested: true,
};


export default function CryptoListItem(props) {

  const { config, updateConfig } = props;

  const { accessToken } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ...config,
    },
  });

  const onSubmit = async (data) => {

    const toastId = toast(<Loading text="Saving..." />);

    const results = await updateUserConfiguration(accessToken, data);

    toast.dismiss(toastId);

    if (results.error) {
      toast(<Error text={results.errMessage} />);
      return;
    }

    reset(data); // reset form (sets isDirty false etc.)

    toast('Saved!');
  };

  const { recordName } = props;
  const record = config.records[recordName];

  const { isHolding, isPaused, limitUSDT } = record;
  const {
    buyPercentage, sellPercentage, stopLossPercentage, warningPercentage,
  } = record.thresholds;

  const registerFieldName = `records.${recordName}.thresholds`;

  return (

    <Collapsible
      open={false} // TODO
      trigger={<CryptoListItemHeader record={record} recordName={recordName} />}
      transitionTime={160}
    >

      <form className={isHolding ? 'editCryptoContainer-holding' : 'editCryptoContainer'} onSubmit={handleSubmit(onSubmit)}>

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
              valueAsNumber: true,
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
              valueAsNumber: true,
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
              valueAsNumber: true,
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
              valueAsNumber: true,
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
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="validationError">{getRecordError(errors, recordName, 'warningPercentage')}</div>
        <p>The decrease in % relative to the last purchase price</p>


        {/* BUTTONS */}


        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className={isDirty && isValid ? 'button-blue' : 'button'}
        >
          Save
        </button>

        {isHolding ? (
          <Popup
            {...popupOptions}
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
                acceptFunc={() => updateConfig(CONFIG_ACTIONS.SELL, recordName)}
              />
            )}
          </Popup>
        ) : (
          <Popup
            {...popupOptions}
            trigger={(<button type="button" className="button-red">Buy</button>)}
          >
            {(close) => (
              <PopupDialog
                close={close}
                questionDialog
                title="Are you sure?"
                confirmText="Buy"
                description={(<p>The bot will buy <b>{recordName}</b> when it is next run.</p>)}
                acceptFunc={() => updateConfig(CONFIG_ACTIONS.BUY, recordName)}
              />
            )}
          </Popup>
        )}

        {isPaused ? (
          <Popup
            {...popupOptions}
            trigger={(<button type="button" className="button-red">Unpause</button>)}
          >
            {(close) => (
              <PopupDialog
                close={close}
                questionDialog
                title="Are you sure?"
                confirmText="Unpause"
                description={`Pausing ${recordName} will prevent the bot from making any further transactions`}
                acceptFunc={() => updateConfig(CONFIG_ACTIONS.UNPAUSE, recordName)}
              />
            )}
          </Popup>
        ) : (
          <Popup
            {...popupOptions}
            trigger={(<button type="button" className="button-blue">Pause</button>)}
          >
            {(close) => (
              <PopupDialog
                close={close}
                questionDialog
                title="Are you sure?"
                confirmText="Pause"
                description={`Pausing ${recordName} will prevent the bot from making any further transactions`}
                acceptFunc={() => updateConfig(CONFIG_ACTIONS.PAUSE, recordName)}
              />
            )}
          </Popup>
        )}


        <Popup
          {...popupOptions}
          trigger={(<button type="button" className="button-blue">Remove</button>)}
        >
          {(close) => (
            <PopupDialog
              close={close}
              questionDialog
              title="Are you sure?"
              confirmText="Remove"
              description={(
                <p>Removing <b>{recordName}</b> will stop the bot
                  from monitoring/trading in it but will not sell
                </p>
              )}
              acceptFunc={() => updateConfig(CONFIG_ACTIONS.REMOVE, recordName)}
            />
          )}
        </Popup>

      </form>

    </Collapsible>

  );
}
