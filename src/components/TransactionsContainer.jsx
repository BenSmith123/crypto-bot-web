
import React, { useState, useEffect, useContext } from 'react';

import AppContext from './AppContext';
import Loader from './Loader';

import Transaction from './Transaction';
import { getUserTransactions } from '../api-interface';


export default function TransactionsContainer() {

  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const { accessToken } = useContext(AppContext);

  useEffect(async () => {
    try {
      const res = await getUserTransactions(accessToken);

      if (!res.data || !res.data.transactions) { throw new Error('No data found.'); }

      setTransactions(res.data.transactions);
    } catch (err) {
      setError(err);
    }
  }, []);

  if (!error && !transactions) {
    return <Loader />;
  }

  if (!transactions.length) {
    return <p>No transactions... YET!</p>;
  }

  return (
    <ul>

      {/* <div>Side</div>
      <div>Currency</div>
      <div>Amount</div>
      <div>Date</div> */}

      {transactions.map((transaction) => (
        <Transaction
          key={transaction.orderId}
          transaction={transaction}
        />
      ))}

      <button className="button-blue" type="button">Load more</button>

    </ul>
  );
}
