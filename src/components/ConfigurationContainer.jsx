
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import { withSnackbar } from 'react-simple-snackbar';

import AppContext from './AppContext';
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
    const updatedConfig = { ...config };

    // function to update and publish the config for all action buttons
    const updateConfig = async (action, recordName) => {

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
      }

      // POST to publish config, display pop-up

      openSnackbar('Saving...');

      const result = await updateUserConfiguration(accessToken, updatedConfig);

      if (result.error) {
        console.log(result);
        openSnackbar(`Error: ${result.errMessage}`);
        return;
      }

      // API returns the updated config, save it to state

      this.setState({ config: result });

      openSnackbar('Saved!');
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
}

ConfigurationContainer.contextType = AppContext;

export default withSnackbar(ConfigurationContainer, SnackbarStyles);
