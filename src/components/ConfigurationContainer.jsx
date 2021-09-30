
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useContext } from 'react';

import { useSnackbar } from 'react-simple-snackbar';

import AppContext from './AppContext';
import CryptoListItem from './CryptoListItem';
import { Label, LabelGreen } from './Label';

import { updateUserConfiguration } from '../api-interface';

import { CONFIG_ACTIONS } from '../helpers/constants';
import { SnackbarStyles } from '../styles/components/_inline';


function useForceUpdate() {
  const [value, setValue] = useState(0); // eslint-disable-line
  return () => setValue((value) => value + 1); // eslint-disable-line
}


export default function ConfigurationContainer(props) {

  const { config } = props;
  const { accessToken } = useContext(AppContext);
  const [openSnackbar] = useSnackbar(SnackbarStyles);

  const forceUpdate = useForceUpdate();

  // function to update and publish the config for all action buttons
  const updateConfig = async (action, recordName) => {

    switch (action) { // eslint-disable-line default-case
      case CONFIG_ACTIONS.SELL: {
        config.records[recordName].forceSell = true;
        break;
      }
      case CONFIG_ACTIONS.BUY: {
        config.records[recordName].forceBuy = true;
        break;
      }
      case CONFIG_ACTIONS.PAUSE: {
        config.records[recordName].isPaused = true; // TODO - this isn't supported in the cryptobot!
        break;
      }
      case CONFIG_ACTIONS.UNPAUSE: {
        config.records[recordName].isPaused = false; // TODO - this too ^
        break;
      }
      case CONFIG_ACTIONS.REMOVE: {
        delete config.records[recordName];
        break;
      }
    }

    // POST to publish config, display pop-up

    openSnackbar('Saving...');
    const result = await updateUserConfiguration(accessToken, config);

    if (result.error) {
      openSnackbar(`Error: ${result.errMessage}`);
      return;
    }

    openSnackbar('Saved!');

    forceUpdate(); // force component to re-render
  };


  if (!config) {
    return (<div>Loading...</div>);
  }

  if (!config.id || !config.records) {
    return (<div>Error</div>);
  }

  return (
    <>
      <ul className="cryptoItemsContainer">

        <div>Bot status: {config.isPaused ? <Label text="Paused" /> : <LabelGreen text="Active" />}</div>

        <div>Monitored currencies: {Object.keys(config.records).length}</div>
        <div>Estimate total funds: $... USD ($... NZD)</div>

        {Object.keys(config.records).map((record) => (
          <CryptoListItem
            key={record}
            recordName={record}
            config={config}
            updateConfig={updateConfig}
          />
        ))}

        <div className="cryptoItemsButtons">

          <button
            type="button"
            className="button-red"
          >
            Pause bot
          </button>

          <button
            type="button"
            className="button-blue"
            onClick={() => {
            // append(defaultCurrencyValues);
            }}
          >
            Add crypto currency
          </button>

        </div>

      </ul>
    </>
  );
}
