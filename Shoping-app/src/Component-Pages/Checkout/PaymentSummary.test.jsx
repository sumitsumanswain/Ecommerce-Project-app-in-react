import {
  it,
  expect,
  describe,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';

import {
  render,
  screen,
  within,
  cleanup,
  waitFor,
} from '@testing-library/react';

import { MemoryRouter, useLocation } from 'react-router';

import userEvent from '@testing-library/user-event';

import axios from 'axios';

import { PaymentSummary } from './PaymentSummary';

vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('PaymentSummary component', () => {
  let paymentSummary;
  let loadCart;
  let user;

  beforeEach(() => {
    paymentSummary = {
      totalItems: 3,
      productCostCents: 4275,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 4774,
      taxCents: 477,
      totalCostCents: 5251,
    };

    loadCart = vi.fn().mockResolvedValue(undefined);

    user = userEvent.setup();

    axios.post.mockReset();

    axios.post.mockResolvedValue({
      data: {},
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('displays the correct details', () => {
    render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCart={loadCart}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Items (3):')
    ).toBeInTheDocument();

    expect(
      within(
        screen.getByTestId('payment-summary-product-cost')
      ).getByText('$42.75')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('payment-summary-shipping-cost')
    ).toHaveTextContent('$4.99');

    expect(
      screen.getByTestId('payment-summary-total-before-tax')
    ).toHaveTextContent('$47.74');

    expect(
      screen.getByTestId('payment-summary-tax')
    ).toHaveTextContent('$4.77');

    expect(
      screen.getByTestId('payment-summary-total')
    ).toHaveTextContent('$52.51');
  });

  it('places an order', async () => {
    function Location() {
      const location = useLocation();

      return (
        <div data-testid="url-path">
          {location.pathname}
        </div>
      );
    }

    render(
      <MemoryRouter initialEntries={['/checkout']}>
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCart={loadCart}
        />

        <Location />
      </MemoryRouter>
    );

    const placeOrderButton = screen.getByTestId(
      'place-order-button'
    );

    await user.click(placeOrderButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        '/api/orders'
      );
    });

    expect(loadCart).toHaveBeenCalledTimes(1);

    expect(
      screen.getByTestId('url-path')
    ).toHaveTextContent('/orders');
  });

  it('does not load the cart when placing an order fails', async () => {
    axios.post.mockRejectedValueOnce(
      new Error('Order request failed')
    );

    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCart={loadCart}
        />
      </MemoryRouter>
    );

    await user.click(
      screen.getByTestId('place-order-button')
    );

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalled();
    });

    expect(loadCart).not.toHaveBeenCalled();

    consoleError.mockRestore();
  });
});