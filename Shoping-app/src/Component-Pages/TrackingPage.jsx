import {Header} from '../components/Header';
import {Link,useParams} from 'react-router';
import './TrackingPage.css';
export function TrackingPage({cart}){
  const { orderId, productId } = useParams();
  return(
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/png" href="/tracking-favicon.png" />
      <Header cart={cart}/>

      <div className="tracking-page">
        <div className="order-tracking">
            <Link className="back-to-orders-link link-primary" to="/orders">
              View all orders
            </Link>

            <div className="delivery-date">
              Order ID: {orderId}
            </div>

            <div className="product-info">
              Product ID: {productId}
            </div>

            <div className="product-info">
              Quantity: 1
            </div>

            <img className="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg" />

            <div className="progress-labels-container">
              <div className="progress-label">
                Preparing
              </div>
              <div className="progress-label current-status">
                Shipped
              </div>
              <div className="progress-label">
                Delivered
              </div>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar"></div>
            </div>
        </div>
      </div>
    </>
  )
}