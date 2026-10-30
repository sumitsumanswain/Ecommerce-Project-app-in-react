import { Header } from "../components/Header";
import dayjs from "dayjs";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import "./TrackingPage.css";
export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await axios.get(
          `/api/orders/${orderId}?expand=products`,
        );

        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchTrackingData();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  const orderProduct = order.products.find((item) => {
    return String(item.product.id) === String(productId);
  });

  if (!orderProduct) {
    return <div>Product not found in this order.</div>;
  }

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
   

  deliveryPercent = Math.max(0, Math.min(100, deliveryPercent));

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent >= 100;
  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/png" href="/tracking-favicon.png" />
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? "Delivered on" : "Arriving on"}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>
        </div>

        <div className="product-info">
          {orderProduct.product.name}
          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${isPreparing ? "current-status" : ""}`}
            >
              Preparing
            </div>

            <div
              className={`progress-label ${isShipped ? "current-status" : ""}`}
            >
              Shipped
            </div>

            <div
              className={`progress-label ${isDelivered ? "current-status" : ""}`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
