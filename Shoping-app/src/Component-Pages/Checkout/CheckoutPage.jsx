import axios from 'axios';
import {useEffect,useState} from 'react';

import {CheckoutHeader} from './CheckoutHeader';
import './CheckoutPage.css';
 
import {OrderSummery} from './OrderSummery';
import {PaymentSummary} from './PaymentSummary';
export function CheckoutPage({cart}){
  const [deliveryOptions,setDeliveryOptions] = useState([]);
  const [paymentSummary,setPaymentSummary] = useState([null]);

  useEffect(()=>{
    axios.get('api/delivery-options?expand=estimatedDeliveryTime')
      .then((response)=>{
        setDeliveryOptions(response.data);
      })
    axios.get('api/payment-summary')
      .then((response)=>{
        setPaymentSummary(response.data);
      })
  },[]);
  return(

    <>
      <title>Checkout</title>
      <CheckoutHeader />
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />

       

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
           <OrderSummery cart={cart} deliveryOptions = {deliveryOptions}/>

           <PaymentSummary paymentSummary={paymentSummary}/>
        </div>
      </div>
    </>
  );
}
 