
import React, { useState, useEffect } from 'react';

import { getUserTransactions } from '../api-interface';
import Loader from './Loader';


export default function TransactionContainer(props) {

  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const { userId } = props;

  useEffect(async () => {
    try {
      const res = await getUserTransactions();
      if (!res.data || !res.data.length) { throw new Error('No transactions found.'); }

      setTransactions(res.data);
    } catch (err) {
      setError(err);
    }
  }, []);

  // TODO
  //   if (error) {
  //     return <div>Error: {error.message}</div>;
  //   }

  if (!error && !transactions.length) {
    return <Loader />;
  }

  return (
    <>
      <p>Page is currently under development :)</p>
      <Loader />
    </>
  );
}
