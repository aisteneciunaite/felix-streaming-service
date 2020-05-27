import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './partials/footer';
import './index.css';
import App from './app';
import Header from './partials/header';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <App />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);
