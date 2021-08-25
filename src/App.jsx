import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Amplify, { Auth } from 'aws-amplify';

import { slide as Menu } from 'react-burger-menu';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSmile,
  AiOutlineMenuUnfold,
  AiOutlineInfoCircle,
  // AiOutlineLock,
} from 'react-icons/ai';
import awsconfig from './aws-exports';

import AppContext from './components/AppContext';
import NavItem from './components/NavItem';

import Topics from './views/Home';
import Account from './views/Account';
import Commands from './views/Commands';
import Changelog from './views/Changelog';
import Signin from './views/Signin';

import { getChangelog, getCommands } from './api-interface';
import config from './data/exampleConfiguration.json';


Amplify.configure(awsconfig); // TODO - replace with API call


const mobileScreenWidth = 918; // width in px that is mobile


export default function App() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < mobileScreenWidth);
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState(null);

  const [apiChangelog, setApiChangelog] = useState(null);
  const [apiCommands, setApiCommands] = useState(null);

  console.log(user);


  function handleSignout() {
    Auth.signOut(user);
    setUser(null);
  }


  useEffect(async () => {

    function handleResize() {
      if (window.innerWidth < mobileScreenWidth) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    handleResize(); // set isMobile on initial page load

    window.addEventListener('resize', handleResize);

    setUser(await Auth.currentAuthenticatedUser());

    // stack promises and make all API calls asynchronously
    const apiPromiseArr = [
      getChangelog(),
      getCommands(),
    ];

    const [changelog, commands] = await Promise.all(apiPromiseArr);

    // load all API data upfront
    setApiChangelog(changelog);
    setApiCommands(commands);

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

            <NavItem
              title="About"
              link="/about"
              icon={<AiOutlineInfoCircle className="icon" />}
              onClick={navItemSelected}
            />

            {user ? (
              <NavItem
                title="Sign out"
                link="/signin"
                icon={<AiOutlineInfoCircle className="icon" />}
                onClick={handleSignout}
              />
            ) : (
              <NavItem
                title="Sign in"
                link="/signin"
                icon={<AiOutlineInfoCircle className="icon" />}
                onClick={navItemSelected}
              />
            )}

          </Menu>

        </div>


        <div className="pageContent">

          {/* provide app context to all pages */}
          <AppContext.Provider value={isMobile}>

            <Switch>
              <Route path="/account">
                <Account config={config} />
              </Route>

              <Route path="/crypto-assistant">
                <Commands apiCommands={apiCommands} />
              </Route>

              <Route path="/changelog">
                <Changelog apiChangelog={apiChangelog} />
              </Route>

              <Route path="/signin">
                <Signin setUser={setUser} />
              </Route>

              <Route path="/">
                {/* TODO */}
                <Topics />
              </Route>
            </Switch>

          </AppContext.Provider>

        </div>

      </Router>


    </div>
  );
}

