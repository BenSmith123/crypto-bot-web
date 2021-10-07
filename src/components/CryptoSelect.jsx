
import React from 'react';
import Popup from 'reactjs-popup';

import { PopupSelector } from './PopupDialog';


export default function CryptoSelect(props) {

  const { addNewCrypto } = props;

  return (
    <Popup
      position="center center"
      modal
      nested
      trigger={(
        <button
          type="button"
          className="button-blue"
        >
          Add crypto currency
        </button>
        )}
    >
      {(close) => (
        <PopupSelector
          close={close}
          title="Select a new crypto currency"
          acceptFunc={(record) => addNewCrypto(record)}
        />
      )}
    </Popup>
  );
}
