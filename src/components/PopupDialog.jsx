
import React, { useState, useEffect } from 'react';

import CryptoIcon from './CryptoIcon';
import { getCurrencies } from '../api-interface';

import Loader from './Loader';

export function PopupDialog(props) {

  const {
    close,
    questionDialog,
    title,
    confirmText,
    description,
    acceptFunc,
  } = props;

  return (
    <>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="dialogButtonContainer">
        {questionDialog && (
        <button type="button" className="button-red button-dialog" onClick={() => { acceptFunc(); close(); }}>{confirmText || 'Yes'}</button>
        )}
        <button type="button" className="button button-dialog" onClick={() => close()}>Cancel</button>
      </div>
    </>
  );
}


// TODO - abstract to a component passed as prop if this component is needed elsewhere
export function PopupSelector(props) {

  const {
    close,
    title,
    acceptFunc,
  } = props;

  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      const res = await getCurrencies();
      if (!res.data || !res.data.length) { throw new Error('No currencies found.'); }

      setCurrencies(res.data);
    } catch (err) {
      setError(err);
    }
  }, []);


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!error && !currencies.length) {
    return <Loader />;
  }

  return (
    <>
      <h3>{title}</h3>

      <div>{currencies.length} currencies available</div>

      <div className="newCurrencyContainer">

        {currencies.map((currency) => (

          // eslint-disable-next-line
          <div key={currency.base_currency} onClick={() => { acceptFunc(currency.base_currency); close(); }}>

            <div className="selectableCrypto">
              <CryptoIcon name={currency.base_currency} />
              {currency.base_currency}
            </div>
          </div>
        ))}

      </div>

      <button type="button" className="button button-dialog" onClick={() => close()}>Cancel</button>
    </>
  );
}
