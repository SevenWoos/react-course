import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary';

vi.mock('axios');

describe('PaymentSummary component tests', () => {
  let paymentSummary;
  let loadCart;
  let user;

  beforeEach(() => {
    paymentSummary = {
      totalItems: 7, 
      productCostCents: 15862, 
      shippingCostCents: 499, 
      totalCostBeforeTaxCents: 16361, 
      taxCents: 1636, 
      totalCostCents: 17997
    };

    loadCart = vi.fn();
    user = userEvent.setup();
  });

  it('displays the correct payment summary details', () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>  
    );

    expect(
      screen.getByText('Items (7):')
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId('payment-summary-product-cost'))
        .getByText('$158.62')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('payment-summary-shipping-cost')
    ).toHaveTextContent('$4.99');

    expect(
      screen.getByTestId('payment-summary-total-before-tax')
    ).toHaveTextContent('$163.61');

    expect(
      screen.getByTestId('payment-summary-tax')
    ).toHaveTextContent('$16.36');

    expect(
      screen.getByTestId('payment-summary-total')
    ).toHaveTextContent('$179.97');
  });

  it('places an order', async() => {
    function Location() {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>;
    };

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>
    );

    const placeOrderButton = screen.getByTestId('place-order-button');
    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(loadCart).toHaveBeenCalled();
    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
  });
});