/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../components/AppContext';
import Loader from '../components/Loader';
import ConfigurationContainer from '../components/ConfigurationContainer';


const PAGES = {
  configuration: 'configuration',
  transactions: 'transactions',
};


export default function Account(props) {

  const [page, setPage] = useState(PAGES.configuration);
  const { isSignedIn } = useContext(AppContext);

  const { config } = props;


  return (
    <div className="accountPage">
      <h1>Account</h1>

      {isSignedIn && config ? (
        <>
          <div className="tabButtons">
            <button type="button" onClick={() => setPage(PAGES.configuration)}>
              Bot configuration
            </button>
            <button type="button" onClick={() => setPage(PAGES.transactions)}>
              Transactions
            </button>
          </div>

          {/* user is signed in, show config or transactions page */}
          {page === PAGES.configuration ? (
            <>
              <ConfigurationContainer config={config} />
            </>
          ) : (
            <>
              <p>Page is currently under development :)</p>
              <Loader />
            </>
          )}
        </>

      ) : (

        /* user is either not logged in or still loading */
        <>
          {!isSignedIn ? (
            <p>
              Please <Link to="/signin">Sign in</Link> to view your account.
              {/*
                TODO add button here to allow users to see to preview app!
                i.e. load mock 'config' from JSON?
              */}
            </p>
          ) : (
            <Loader />
          )}
        </>
      )}

    </div>
  );

}
