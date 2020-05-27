import React from 'react';
import Title from '../Title';
import './index.css';

function Hero({ title, background, children }) {
  let backgroundImage = `linear-gradient(0deg, rgba(123, 0, 0, 0.3), rgba(16, 2, 2, 0.3)), url(${background}) center`;
  return (
    <>
      <section className="Hero" style={{ background: backgroundImage }}>
        <Title level="1">{title}</Title>
        {children}
      </section>
      <hr />
    </>
  );
}

export default Hero;
