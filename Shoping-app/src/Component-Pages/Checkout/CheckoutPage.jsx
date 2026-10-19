import axios from 'axios';
import {useEffect,useState} from 'react';

import './CheckoutPage.css';
import {CheckoutHeader} from './CheckoutHeader';
 
import {OrderSummery} from './OrderSummery';
import {PaymentSummary} from './PaymentSummary';
export function CheckoutPage({cart,loadCart}){
  const [deliveryOptions,setDeliveryOptions] = useState([]);
  const [paymentSummary,setPaymentSummary] = useState(null);

  useEffect(()=>{
    const fatchChekoutData = async ()=>{
      let response = await axios.get('api/delivery-options?expand=estimatedDeliveryTime')
        setDeliveryOptions(response.data);
      
       response = await axios.get('api/payment-summary')
        setPaymentSummary(response.data);
    }
    fatchChekoutData();
      
  },[cart]);
  return(

    <>
      <title>Checkout</title>
      <CheckoutHeader cart={cart}/>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />

       

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
           <OrderSummery cart={cart} deliveryOptions = {deliveryOptions} loadCart={loadCart}/>

           <PaymentSummary paymentSummary={paymentSummary}/>
        </div>
      </div>
    </>
  );
}
 