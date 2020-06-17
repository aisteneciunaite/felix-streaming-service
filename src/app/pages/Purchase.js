import React from 'react';

import Form from '../components/Form';
import Input from '../components/Input';
import Title from '../components/Title';
import RadioCard from '../components/RadioCard';
import PropTypes from 'prop-types';

import { createUserInputs, paymentInputs } from './purchaseForm.json';

function CardContent({ plan }) {
  const { term, pricePerMonth, discount } = plan;
  const termMonths = term.name === 'year' ? term.number * 12 : term.number;
  const oldPriceTotal = pricePerMonth * termMonths;
  const newPriceTotal = oldPriceTotal * (1 - discount / 100);
  // const termObject = {month: {}, year: {}}

  return (
    <>
      <Title level="3">
        {term.number}-{term.name} Plan
      </Title>
      <p>
        {pricePerMonth} $<br />
        per month
      </p>
      <div>
        <span>{discount}% off</span>
      </div>
      <p>
        <span>{oldPriceTotal.toFixed(2)}</span> {newPriceTotal.toFixed(2)} billed every{' '}
        {term.number} {term.number > 1 ? term.name + 's' : term.name}
      </p>
    </>
  );
}

CardContent.propTypes = {
  pricePerMonth: PropTypes.number,
  discount: PropTypes.number,
  term: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
  }),
};

const plansData = {
  short: {
    id: '1-month-plan',
    term: { name: 'month', number: 1 },
    pricePerMonth: 7.99,
    discount: 0,
  },
  medium: {
    id: '6-month-plan',
    term: { name: 'month', number: 6 },
    pricePerMonth: 6.99,
    discount: 13.5,
  },
  long: {
    id: '1-year-plan',
    term: { name: 'year', number: 1 },
    pricePerMonth: 5.99,
    discount: 25,
  },
};

function Purchase() {
  return (
    <div>
      <div id="createUser">
        <Form submitButtonText="Continue" inputs={createUserInputs} className="Purchase__Form">
          {createUserInputs.map(input => (
            <Input input={input} key={input.id} />
          ))}
        </Form>
      </div>
      <div id="pickPlan">
        <Form submitButtonText="Continue" className="Purchase__Form">
          <div className="Purchase__CardDeck">
            <RadioCard name="planOption" planId={plansData.medium.id}>
              <CardContent plan={plansData.medium} />
            </RadioCard>
            <RadioCard name="planOption" planId={plansData.long.id}>
              <CardContent plan={plansData.long} />
            </RadioCard>
            <RadioCard name="planOption" planId={plansData.short.id}>
              <CardContent plan={plansData.short} />
            </RadioCard>
          </div>
        </Form>
      </div>
      <div id="payment">
        <Form submitButtonText="Submit" className="Purchase__Form">
          {' '}
          {paymentInputs.map(input => (
            <Input input={input} key={input.id} />
          ))}
        </Form>
      </div>
    </div>
  );
}

export default Purchase;
