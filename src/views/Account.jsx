/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link, NavLink,
} from 'react-router-dom';


import AppContext from '../components/AppContext';
import Loader from '../components/Loader';
import ConfigurationContainer from '../components/ConfigurationContainer';
import TransactionsContainer from '../components/TransactionsContainer';


export default function Account(props) {

  const { isSignedIn } = useContext(AppContext);
  const { config } = props;


  return (
    <div className="accountPage">
      <h1>Account</h1>

      {/* user is signed in, show config or transactions page */}
      {isSignedIn && config ? (
        <>
          <Router>

            <div className="tabButtonContainer">

              <NavLink
                to="/account"
                exact
                className="tabButton"
                activeClassName="tabButton-active"
              >
                <>
                  Configuration
                </>
              </NavLink>

              <NavLink
                to="/account/transactions"
                exact
                className="tabButton"
                activeClassName="tabButton-active"
              >
                <>
                  Transactions
                </>
              </NavLink>
            </div>


            <Switch>
              <Route path="/account" exact>
                <ConfigurationContainer config={config} />
              </Route>

              <Route path="/account/transactions">
                <div className="cryptoItemsContainer">
                  <TransactionsContainer userId={config.id} />
                </div>
              </Route>
            </Switch>

          </Router>

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
