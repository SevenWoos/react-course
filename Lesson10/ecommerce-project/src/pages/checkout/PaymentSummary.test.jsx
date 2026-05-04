import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { PaymentSummary } from './PaymentSummary';

describe('PaymentSummary component tests', () => {
  let paymentSummary;
  let loadCart;

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
  });

  it('displays the correct payment summary details', () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    );

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
});