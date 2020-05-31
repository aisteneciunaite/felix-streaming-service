import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.scss';

import Footer from './partials/footer';
import Header from './partials/header';
import App from './app';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <App />
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
