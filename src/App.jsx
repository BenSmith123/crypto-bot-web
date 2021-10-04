import React, { useState, useEffect } from 'react';
import SnackbarProvider from 'react-simple-snackbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Amplify, { Auth } from 'aws-amplify';

import { slide as Menu } from 'react-burger-menu';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSmile,
  AiOutlineMenuUnfold,
  // AiOutlineInfoCircle,
  AiOutlineLogin,
  AiOutlineLogout,
} from 'react-icons/ai';
import awsconfig from './aws-exports';

import AppContext from './components/AppContext';
import NavItem from './components/NavItem';

import Topics from './views/Home';
import Account from './views/Account';
import Commands from './views/Commands';
import Changelog from './views/Changelog';
import Signin from './views/Signin';

import { getChangelog, getCommands, getUserConfiguration } from './api-interface';
import { getSessionFromAmplify, formatUserAuth } from './helpers/userSession';
import { MOBILE_SCREEN_WIDTH } from './helpers/constants';


Amplify.configure(awsconfig); // TODO - replace with API call


export default function App() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_SCREEN_WIDTH);
  const [menuOpen, setMenuOpen] = useState(false);

  const [userSession, setUserSession] = useState(null);

  const [apiChangelog, setApiChangelog] = useState(null);
  const [apiCommands, setApiCommands] = useState(null);
  const [apiUserConfig, setApiUserConfig] = useState(null);


  async function handleSignout() {
    // await to ensure the signin component doesn't try to re-render user is signed out
    await Auth.signOut();
    setUserSession(null);
    setApiUserConfig(null); // remove user configuration data
  }

  const handleUserLogin = (user) => {
    if (!user || !user.attributes) { return; }

    const userFormatted = formatUserAuth(user);

    setUserSession(userFormatted);

    // no need to await, set data when available
    getUserConfiguration(userFormatted.auth.access_token)
      .then((userConfig) => {
        setApiUserConfig(userConfig);
      });
    // .catch((err) => { console.log(err); });
  };

  useEffect(async () => {

    function handleResize() {
      if (window.innerWidth < MOBILE_SCREEN_WIDTH) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    handleResize(); // set isMobile on initial page load

    window.addEventListener('resize', handleResize);

    // stack promises and make all API calls asynchronously
    const apiPromiseArr = [
      getChangelog(),
      getCommands(),
      getSessionFromAmplify(),
    ];

    const [changelog, commands, user] = await Promise.all(apiPromiseArr);

    // load all API data upfront
    setApiChangelog(changelog);
    setApiCommands(commands);

    // if a session is open, store user auth
    handleUserLogin(user);

    return () => window.removeEventListener('resize', handleResize);

  }, []);


  // close the nav bar (mobile only) and scroll to top of page
  function navItemSelected() {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }


  return (
    <div className="pageWrapper">

      {/* show burger menu icon if mobile */}
      {/* {!isMobile || (
      <div>
        <div onClick={() => setMenuOpen(!menuOpen)} className="menu-item--small"></div>
      </div>
      )} */}


      <Router>

        <div className="sideNav">

          <div className="mobileHeader" />
          <Menu
            noTransition // why doesn't this work
            isOpen={!isMobile || menuOpen}
            disableOverlayClick={!isMobile}
            disableCloseOnEsc
            noOverlay
            styles={{ display: isMobile ? 'none' : 'hidden' }}
            onStateChange={({ isOpen }) => {
              setMenuOpen(isOpen); // ensure state is changed every time the menu is open/closed
            }}
          >

            <>
              <div className="navSpacer" />
            </>

            <NavItem
              title="Home"
              link="/"
              icon={<AiOutlineHome className="icon" />}
              onClick={navItemSelected}
            />

            <NavItem
              title="Account"
              link="/account"
              icon={<AiOutlineUser className="icon" />}
              onClick={navItemSelected}
            />

            <NavItem
              title="Crypto Assistant"
              link="/crypto-assistant"
              icon={<AiOutlineSmile className="icon" />}
              onClick={navItemSelected}
            />

            <NavItem
              title="Changelog"
              link="/changelog"
              icon={<AiOutlineMenuUnfold className="icon" />}
              onClick={navItemSelected}
            />

            {/* <NavItem
              title="About"
              link="/about"
              icon={<AiOutlineInfoCircle className="icon" />}
              onClick={navItemSelected}
            /> */}

            {userSession ? (
              <NavItem
                title="Sign out"
                link="/signin"
                icon={<AiOutlineLogout className="icon" />}
                onClick={handleSignout}
              />
            ) : (
              <NavItem
                title="Sign in"
                link="/signin"
                icon={<AiOutlineLogin className="icon" />}
                onClick={navItemSelected}
              />
            )}

          </Menu>

        </div>


        <div className="pageContent">

          {/* provide app context to all pages */}
          <AppContext.Provider value={{
            isMobile,
            accessToken: userSession?.auth?.access_token,
            isSignedIn: !!userSession?.username,
          }}
          >

            <SnackbarProvider>

              <Switch>
                <Route path="/account">
                  <Account config={apiUserConfig} />
                </Route>

                <Route path="/crypto-assistant">
                  <Commands apiCommands={apiCommands} />
                </Route>

                <Route path="/changelog">
                  <Changelog apiChangelog={apiChangelog} />
                </Route>

                <Route path="/signin">
                  <Signin setUser={handleUserLogin} userSession={userSession} />
                </Route>

                <Route path="/">
                  {/* TODO */}
                  <Topics />
                </Route>
              </Switch>

            </SnackbarProvider>

          </AppContext.Provider>

        </div>

      </Router>


    </div>
  );
}

