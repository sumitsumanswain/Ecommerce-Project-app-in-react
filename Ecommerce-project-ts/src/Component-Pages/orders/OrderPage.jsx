import axios from 'axios';
import {useEffect,useState} from 'react';
import {Header} from '../../components/Header';
import {OrderGrides} from './Ordergride';
import './OrderPage.css';
export function OrderPage({cart,loadCart}){
  const [orders,setOrders] = useState([]);

  useEffect(()=>{
    const fatchOrderData = async ()=>{
      const response = await axios.get('api/orders?expand=products')
        setOrders(response.data);
    }
    fatchOrderData();
       
  },[]);

  return(
    <>
      <title>Orders</title>
      <Header cart={cart} />
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
       

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

         <OrderGrides orders={orders} loadCart={loadCart}/>
      </div>
    </>
  );
}