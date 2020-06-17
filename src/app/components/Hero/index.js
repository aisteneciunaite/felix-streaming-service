import React from 'react';
import Title from '../Title';
import PropTypes from 'prop-types';
import './index.scss';

function Hero({ title, background, children, className }) {
  const classes = className ? `Hero ${className}` : 'Hero';
  let backgroundImage = `linear-gradient(0deg, rgba(123, 0, 0, 0.3), rgba(16, 2, 2, 0.3)), url(${background}) center`;
  return (
    <>
      <section className={classes} style={{ background: backgroundImage }}>
        <Title level="1">{title}</Title>
        {children}
      </section>
      <hr />
    </>
  );
}

Hero.propTypes = {
  title: PropTypes.string,
  background: PropTypes.string.isRequired,
};

export default Hero;
