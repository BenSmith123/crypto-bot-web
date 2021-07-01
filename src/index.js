import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import './styles/home.scss';
import './styles/burger-menu.scss';
import './styles/account.scss';


import App from './App';

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
