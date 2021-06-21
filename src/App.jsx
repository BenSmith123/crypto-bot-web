import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from 'react-router-dom';


import { slide as Menu } from 'react-burger-menu';

import Account from './views/Account';
import Commands from './views/Commands';
import Changelog from './views/Changelog';


const mobileScreenWidth = 918; // width in px that is mobile


export default function App() {

  const [isMobile, setIsMobile] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {

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
              <Link to="/" className="navLink" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/about" className="navLink" onClick={() => setMenuOpen(false)}>Account</Link>
            </li>
            <li>
              <Link to="/crypto-assistant" className="navLink" onClick={() => setMenuOpen(false)}>Crypto assistant</Link>
            </li>
            <li>
              <Link to="/changelog" className="navLink" onClick={() => setMenuOpen(false)}>Changelog</Link>
            </li>
            <li>
              <Link to="/topics" className="navLink" onClick={() => setMenuOpen(false)}>About</Link>
            </li>

          </Menu>
        </div>


        <div className="pageContent">

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

            <Route path="/topic">
              <Topics />
            </Route>

            <Route path="/">
              <Home />
            </Route>

          </Switch>
        </div>

      </Router>


    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Topics() {
  const match = useRouteMatch();

  return (
    <>

      <h2>
        Topics
        {' '}
      </h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </>
  );
}

function Topic() {
  const { topicId } = useParams();
  return (
    <h3>
      Requested topic ID:
      {' '}
      {topicId}
    </h3>
  );
}
