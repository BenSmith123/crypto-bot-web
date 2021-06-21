/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import configuration from '../data/exampleConfiguration.json';


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
// const availableCurrencies = [
//   'BTC',
//   'DOGE',
//   'ETH',
//   'SHIB',
// ];


// "DOGE": {
//   "limitUSDT": 10,
//   "isHolding": true,
//   "orderDate": "10/06/2021, 05:00am",
//   "lastBuyPrice": 0.34533,
//   "timestamp": 1623258035687,
// "thresholds": {
//       "stopLossPercentage": -10,
//       "sellPercentage": 3,
//       "buyPercentage": -1
//   }
// }


export default function Account() {

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
    <>

      <h1>Account</h1>

      <h2>Configuration</h2>

      <div className="pageContent-textLeft">

        <form onSubmit={handleSubmit(onSubmit)}>

          <CryptoForm />

          <input type="submit" />

          <button
            type="button"
            onClick={() => {
              append(defaultCurrencyValues);
            }}
          >
            Watch new crypto currency
          </button>

        </form>

        <pre>
          <code>
            {/* {JSON.stringify(getValues(), null, 4)} */}
            {JSON.stringify(configuration, null, 4)}
          </code>
        </pre>


      </div>
    </>
  );


  function CryptoForm() {
    return (


      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>

            <input
              defaultValue={`${item.currencyCode}`} // make sure to set up defaultValue
              placeholder="currency code"
              {...register(`test.${index}.currencyCode`)}
            />

            <input
              defaultValue={`${item.sellPercentage}`}
              type="number"
              placeholder="sell percentage"
              {...register(`test.${index}.sellPercentage`)}
            />

            <input
              defaultValue={`${item.buyPercentage}`}
              type="number"
              placeholder="buy percentage"
              {...register(`test.${index}.buyPercentage`)}
            />

            <input
              defaultValue={`${item.limitUSDT}`}
              type="number"
              placeholder="limit USDT"
              {...register(`test.${index}.limitUSDT`)}
            />

            <input
              defaultValue={`${item.stopLossPercentage}`}
              type="number"
              placeholder="stop loss percentage"
              {...register(`test.${index}.stopLossPercentage`)}
            />

            <input
              defaultValue={`${item.warningPercentage}`}
              type="number"
              placeholder="warning percentage"
              {...register(`test.${index}.warningPercentage`)}
            />

            {/* <Controller
              render={({ field }) => <input {...field} />}
              name={`test.${index}.lastName`}
              control={control}
              defaultValue={item.lastName}
            /> */}

            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>


    );
  }

}
