/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import ConfigurationContainer from '../components/ConfigurationContainer';


const exampleCurrencyValues = {
  currencyCode: 'BTC',
  sellPercentage: 5,
  buyPercentage: -3,
  limitUSDT: 100,
  stopLossPercentage: -20,
  warningPercentage: -10,
};


const defaultCurrencyValues = {
  currencyCode: '',
  sellPercentage: '',
  buyPercentage: '',
  limitUSDT: '',
  stopLossPercentage: '',
  warningPercentage: '',
};

const availableCurrencies = [
  'BTC',
  'DOGE',
  'ETH',
  'SHIB',
];

const PAGES = {
  configuration: 'configuration',
  transactions: 'transactions',
};


export default function Account(props) {

  const [page, setPage] = useState(PAGES.configuration);
  const { config } = props;

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      test: [
        { ...exampleCurrencyValues },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: 'test',
    },
  );

  const onSubmit = (data) => console.log(data);

  return (
    <div className="accountPage">
      <h1>Account</h1>

      {/* <h2>Bot configuration</h2> */}

      <div className="tabButtons">
        <button type="button" onClick={() => setPage(PAGES.configuration)}>
          Bot configuration
        </button>
        <button type="button" onClick={() => setPage(PAGES.transactions)}>
          Transactions
        </button>
      </div>

      {page === PAGES.configuration ? (
        <ConfigurationContainer config={config} />
      ) : (
        <div>transactions</div>
      )}

      <div className="pageContent-textLeft">

        <form onSubmit={handleSubmit(onSubmit)}>
          <CryptoForm />
        </form>

      </div>
    </div>
  );


  function CryptoForm() {
    return (

      <div>
        {fields.map((item, i) => (
          <div className="inputBlock" key={item.id}>

            <select
              {...register(`test.${i}.currencyCode`)}
            >
              {availableCurrencies.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="inputDescription">Crypto-currency code</div>


            <input
              defaultValue={`${item.sellPercentage}`}
              type="number"
              placeholder="Sell percentage"
              {...register(`test.${i}.sellPercentage`)}
            />
            <div className="inputDescription">
              The increase that has to be met before selling the crypto-currency
              back into USDT
            </div>


            <input
              defaultValue={`${item.buyPercentage}`}
              type="number"
              placeholder="Buy percentage"
              {...register(`test.${i}.buyPercentage`)}
            />
            <div className="inputDescription">
              The decrease that has to be met before buying back into the crypto
            </div>


            <input
              defaultValue={`${item.limitUSDT}`}
              type="number"
              placeholder="Limit USDT"
              {...register(`test.${i}.limitUSDT`)}
            />
            <div className="inputDescription">
              <div className="label-blue">optional</div>
              The amount of USDT to use when trading the given crypto.
              The limit will be adjusted on every sell transaction to continue trading with
              additional gains/losses.
              <br />
              WARNING: If no amount is specified, all available USDT will be used.
            </div>


            <input
              defaultValue={`${item.stopLossPercentage}`}
              type="number"
              placeholder="Stop loss percentage"
              {...register(`test.${i}.stopLossPercentage`)}
            />
            <div className="inputDescription">
              <div className="label-blue">optional</div>
              Threshold to sell at a loss. Once met your buy/sell percentages
              will be adjusted to break-even
            </div>


            <input
              defaultValue={`${item.warningPercentage}`}
              type="number"
              placeholder="Warning percentage"
              {...register(`test.${i}.warningPercentage`)}
            />
            <div className="inputDescription">
              <div className="label-blue">optional</div>
              The increase that has to be met before selling the crypto-currency
              back into USDT
            </div>

            {/* <Controller
              render={({ field }) => <input {...field} />}
              name={`test.${index}.lastName`}
              control={control}
              defaultValue={item.lastName}
            /> */}

            <button
              type="button"
              className="button-red"
              onClick={() => remove(i)}
            >
              Remove
            </button>

            <input
              type="submit"
              value="Save"
              className="button-blue"
            />

            <button
              type="button"
              className="button-blue"
              onClick={() => {
                append(defaultCurrencyValues);
              }}
            >
              Add new crypto currency
            </button>
          </div>
        ))}
      </div>


    );
  }

}
