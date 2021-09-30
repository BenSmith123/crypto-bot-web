
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';

import CryptoListItem from './CryptoListItem';
import { Label, LabelGreen } from './Label';


// actions for updating configuration
const ACTIONS = {
  SELL: 'SELL',
  REMOVE: 'REMOVE',
  PAUSE: 'PAUSE',
};


function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}


export default function ConfigurationContainer(props) {

  const { config } = props;
  const forceUpdate = useForceUpdate();

  // function to update and publish the config for all action buttons
  const updateConfig = (action, recordName) => {

    switch (action) { // eslint-disable-line default-case
      case ACTIONS.SELL: {
        config.records[recordName].forceSell = true;
        break;
      }
      case ACTIONS.PAUSE: {
        config.records[recordName].isPaused = true; // TODO - this isn't supported in the cryptobot!
        break;
      }
      case ACTIONS.REMOVE: {
        delete config.records[recordName];
        break;
      }
    }

    // TODO - publish config, display pop-up

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
          <CryptoListItem key={record} recordName={record} config={config} updateConfig={updateConfig} />
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
