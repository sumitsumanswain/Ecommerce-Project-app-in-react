import axios from "axios";
import { useEffect, useState } from "react";

import "./CheckoutPage.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummery } from "./OrderSummery";
import { PaymentSummary } from "./PaymentSummary";

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [error, setError] = useState("");

  // Load delivery options
  useEffect(() => {
    let isActive = true;

    async function fetchCheckoutData() {
      try {
        const response = await axios.get(
          "/api/delivery-options?expand=estimatedDeliveryTime",
        );

        if (isActive) {
          setDeliveryOptions(response.data);
        }
      } catch (err) {
        console.error("Failed to load delivery options:", err);
        if (isActive) {
          setError("Could not load delivery options. Please try again.");
        }
      }
    }

    fetchCheckoutData();

    return () => {
      isActive = false;
    };
  }, []);

  // Refresh payment summary when cart changes
  useEffect(() => {
    let isActive = true;

    async function fetchPaymentSummary() {
      try {
        const response = await axios.get("/api/payment-summary");

        if (isActive) {
          setPaymentSummary(response.data);
          setError("");
        }
      } catch (err) {
        console.error("Failed to load payment summary:", err);
        if (isActive) {
          setError("Could not load payment summary. Please try again.");
        }
      }
    }

    fetchPaymentSummary();

    return () => {
      isActive = false;
    };
  }, [cart]);

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        {error && <p role="alert">{error}</p>}

        <div className="checkout-grid">
          <OrderSummery
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />

          {paymentSummary ? (
            <PaymentSummary
              paymentSummary={paymentSummary}
              loadCart={loadCart}
            />
          ) : (
            <p>Loading payment summary...</p>
          )}
        </div>
      </div>
    </>
  );
}
