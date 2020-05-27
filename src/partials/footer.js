import React from 'react';
import icons from './payment-icons.svg';

function Footer() {
  return (
    <footer>
      <span>We care about your entertainment. Copyright © 2019–2020 felix.com</span>
      <img src={icons} alt="" />
    </footer>
  );
}

export default Footer;
