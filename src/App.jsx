import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import axios from 'axios';


import { slide as Menu } from 'react-burger-menu';

import Topics from './views/Home';
import Account from './views/Account';
import Commands from './views/Commands';
import Changelog from './views/Changelog';


const mobileScreenWidth = 918; // width in px that is mobile


export default function App() {

  const [isMobile, setIsMobile] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const [supportedCrypto, setSupportedCrypto] = useState(null);

  async function getInstrumentsFromApi() {
    const a = await axios('https://api.crypto.com/v2/public/get-instruments');

    const { instruments } = a.data.result;

    return instruments.map((instrument) => instrument.base_currency);
  }


  useEffect(async () => {

    setSupportedCrypto(await getInstrumentsFromApi());

    function handleResize() {
      if (window.innerWidth < mobileScreenWidth) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    handleResize(); // set isMobile on initial page load

    window.addEventListener('resize', handleResize);
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
            isOpen={!isMobile || menuOpen}
            disableOverlayClick={!isMobile}
            disableCloseOnEsc
            noOverlay
            styles={{ display: isMobile ? 'none' : 'hidden' }}
            onStateChange={({ isOpen }) => {
              setMenuOpen(isOpen); // ensure state is changed every time the menu is open/closed
            }}
          >

            <li>
              <Link to="/" className="navLink" onClick={() => navItemSelected()}>Home</Link>
            </li>
            <li>
              <Link to="/about" className="navLink" onClick={() => navItemSelected()}>Account</Link>
            </li>
            <li>
              <Link to="/crypto-assistant" className="navLink" onClick={() => navItemSelected()}>Crypto assistant</Link>
            </li>
            <li>
              <Link to="/changelog" className="navLink" onClick={() => navItemSelected()}>Changelog</Link>
            </li>
            <li>
              <Link to="/topics" className="navLink" onClick={() => navItemSelected()}>About</Link>
            </li>

          </Menu>
        </div>


        <div className="pageContent">

          {!supportedCrypto || (<div>{JSON.stringify(supportedCrypto)}</div>)}


          <Switch>

            <Route path="/about">
              <Account />
            </Route>

            <Route path="/crypto-assistant">
              <Commands />
            </Route>

            <Route path="/changelog">
              <Changelog />
            </Route>

            <Route path="/">

              <Topics />
            </Route>

          </Switch>
        </div>

      </Router>


    </div>
  );
}

