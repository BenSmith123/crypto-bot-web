
import React from 'react';
import PropTypes from 'prop-types';

import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';


const sections = [
  {
    id: 'purpose',
    title: 'Purpose',
    content: (
      <>
        <p>
          Take advantage of the volatile crypto currency market by automating crypto currency
          trading/monitoring via a bot.
        </p>
        <p>
          The main purpose of the bot is to make higher % returns based on the crypto currency price
          by buying low and selling high.
        </p>
        <p>
          This strategy relies heavily on the crypto currency price fluctuations,
          as opposed to a buying and holding strategy or relying on technical indicators
          - potentially securing profit regardless of the actual crypto currency value.
          In a bearish market the bot can also be utilised to prevent losses.
        </p>
      </>
    ),
  },
  {
    id: 'how-it-works',
    title: 'How it works',
    content: (
      <>
        <p>
          Each user has their own customizable crypto currency bot which monitors crypto currencies
          using the
          {' '}
          <a href="https://crypto.com/exchange">Crypto.com Exchange</a>
          .
        </p>
        <p>
          Choose which crypto currencies to invest in, the amount per crypto,
          thresholds to buy/sell at, when to pull out etc.
          <br />
          <br />

          You can configure your bot via your
          {' '}
          <Link to="/account">Account</Link>
          {' '}
          or using the
          {' '}
          <Link to="/crypto-assistant">Discord slash commands.</Link>
        </p>
      </>
    ),
  },
  {
    id: 'getting-started',
    title: 'Getting started',
    content: (
      <p>
        Sorry!
        <br />
        We are currently in early development and are not taking any more crypto-bot users.
      </p>
    ),
  },
  {
    id: 'features',
    title: 'Features',
    content: (
      <ul className="liDotted">
        <li>24/7 monitoring (running every 15 minutes)</li>
        <li>Logging to Discord of every decision/transaction</li>
        <li>Warning/alert notifications</li>
        <li>170+ supported crypto currencies</li>
      </ul>
    ),
  },
  {
    id: 'examples',
    title: 'Examples',
    content: 'TO DO',
  },
];


function Section({ title, id, content }) {

  return (
    <section id={id}>
      <h2>{title}</h2>

      <>
        {content}
      </>
    </section>
  );
}


export default function Topics() {

  return (
    <div className="pageContent-textLeft">

      <h1>Welcome to CryptoBot NZ!</h1>

      <div className="tableOfContents-container">
        <TableOfContents />
      </div>

      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          content={section.content}
        />
      ))}

    </div>
  );
}


function TableOfContents() {
  return (
    <>
      {sections.map((section) => (
        <li key={section.id} className="tableOfContents-item">
          <HashLink smooth to={`/#${section.id}`}>{section.title}</HashLink>
        </li>
      ))}
    </>
  );
}


Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
