import axios from 'axios';
import { useNavigate } from 'react-router';

export function PaymentSummary({ paymentSummary, loadCart }) {
  const navigate = useNavigate();

  const {
    totalItems,
    productCostCents,
    shippingCostCents,
    totalCostBeforeTaxCents,
    taxCents,
    totalCostCents,
  } = paymentSummary;

  function formatCurrency(amountCents) {
    return `$${(amountCents / 100).toFixed(2)}`;
  }

  async function placeOrder() {
    try {
      await axios.post('/api/orders');

      await loadCart();

      navigate('/orders');
    } catch (error) {
      console.error('Failed to place order:', error);
    }
  }

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">
        Payment Summary
      </div>

      <div
        className="payment-summary-row"
        data-testid="payment-summary-product-cost"
      >
        <div>Items ({totalItems}):</div>

        <div className="payment-summary-money">
          {formatCurrency(productCostCents)}
        </div>
      </div>

      <div
        className="payment-summary-row"
        data-testid="payment-summary-shipping-cost"
      >
        <div>Shipping &amp; handling:</div>

        <div className="payment-summary-money">
          {formatCurrency(shippingCostCents)}
        </div>
      </div>

      <div
        className="payment-summary-row subtotal-row"
        data-testid="payment-summary-total-before-tax"
      >
        <div>Total before tax:</div>

        <div className="payment-summary-money">
          {formatCurrency(totalCostBeforeTaxCents)}
        </div>
      </div>

      <div
        className="payment-summary-row"
        data-testid="payment-summary-tax"
      >
        <div>Estimated tax (10%):</div>

        <div className="payment-summary-money">
          {formatCurrency(taxCents)}
        </div>
      </div>

      <div
        className="payment-summary-row total-row"
        data-testid="payment-summary-total"
      >
        <div>Order total:</div>

        <div className="payment-summary-money">
          {formatCurrency(totalCostCents)}
        </div>
      </div>

      <button
        className="place-order-button button-primary"
        data-testid="place-order-button"
        onClick={placeOrder}
      >
        Place your order
      </button>
    </div>
  );
}