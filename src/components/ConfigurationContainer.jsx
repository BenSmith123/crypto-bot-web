
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import { withSnackbar } from 'react-simple-snackbar';

import AppContext from './AppContext';
import CryptoSelect from './CryptoSelect';
import CryptoListItem from './CryptoListItem';
import { Label, LabelGreen } from './Label';

import { updateUserConfiguration } from '../api-interface';

import { CONFIG_ACTIONS } from '../helpers/constants';
import { SnackbarStyles } from '../styles/components/_inline';


// eslint-disable-next-line react/prefer-stateless-function
class ConfigurationContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      config: props.config,
    };
  }

  static getDerivedStateFromProps(props, state) {
    // update component state when config hasn't been loaded yet (API response from parent)
    if (state.config === null) {
      state.config = props.config; // eslint-disable-line no-param-reassign
    }
    return state;
  }


  render() {

    const { accessToken } = this.context;
    const { openSnackbar } = this.props;

    const { config } = this.state;

    // function to update and publish the config for all action buttons
    const updateConfig = async (action, recordName) => {

      const updatedConfig = { ...config };

      switch (action) { // eslint-disable-line default-case
        case CONFIG_ACTIONS.SELL: {
          updatedConfig.records[recordName].forceSell = true;
          break;
        }
        case CONFIG_ACTIONS.BUY: {
          updatedConfig.records[recordName].forceBuy = true;
          break;
        }
        case CONFIG_ACTIONS.PAUSE: {
          updatedConfig.records[recordName].isPaused = true;
          break;
        }
        case CONFIG_ACTIONS.UNPAUSE: {
          updatedConfig.records[recordName].isPaused = false;
          break;
        }
        case CONFIG_ACTIONS.REMOVE: {
          const newRecords = { ...config.records };
          delete newRecords[recordName];
          updatedConfig.records = newRecords;
          break;
        }
        case CONFIG_ACTIONS.PAUSE_ALL: {
          updatedConfig.isPaused = true;
          break;
        }
        case CONFIG_ACTIONS.UNPAUSE_ALL: {
          updatedConfig.isPaused = false;
          break;
        }
      }

      // POST to publish config, display pop-up

      openSnackbar('Saving...');

      const result = await updateUserConfiguration(accessToken, updatedConfig);

      if (result.error) {
        openSnackbar(`Error: ${result.errMessage}`);
        return;
      }

      // API returns the updated config, save it to state

      this.setState({ config: result });

      openSnackbar('Saved!');
    };

    const addNewCrypto = (record) => {

      // TODO - ensure record isn't already in config

      console.log('FIRED', record);

      config.records.ZZZ = {
        lastSellPrice: 0.29153,
        orderDate: '30/05/2021, 03:00am',
        timestamp: 1622300405158,
        isHolding: false,
        forceSell: false, // optional - flag set to force sell the crypto
        forceBuy: false, // optional
        thresholds: {
          buyPercentage: -5,
          sellPercentage: 3,
          warningPercentage: -10,
          stopLossPercentage: -10, // optional
        },
      };

      this.setState({ config });
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

            {config.isPaused ? (
              <>
                <button
                  type="button"
                  className="button-red"
                  onClick={() => updateConfig(CONFIG_ACTIONS.UNPAUSE_ALL)}
                >
                  Unpause bot
                </button>
              </>
            ) : (
              <button
                type="button"
                className="button-red"
                onClick={() => updateConfig(CONFIG_ACTIONS.PAUSE_ALL)}
              >
                Pause bot
              </button>
            )}

            <CryptoSelect addNewCrypto={addNewCrypto} />

          </div>

        </ul>
      </>
    );
  }
}

ConfigurationContainer.contextType = AppContext;

export default withSnackbar(ConfigurationContainer, SnackbarStyles);
