import {Routes, Route} from 'react-router'; {/*create react-router pathe  */}
import {useEffect,useState} from 'react';
import  axios  from "axios";
import {HomePage} from './Component-Pages/HomePage';
import {CheckoutPage} from './Component-Pages/Checkout/CheckoutPage';
import {OrderPage} from './Component-Pages/OrderPage';
import {TrackingPage} from './Component-Pages/TrackingPage';
import {NotFoundPage} from './Component-Pages/NotFoundpage';
import './App.css'

function App() {
  const [cart,setCart]=useState([]);
  useEffect(()=>{
    axios.get('/api/cart-items?expand=product')
      .then((response)=>{
        setCart(response.data);
      })
  }, []);

  return (
   
    <Routes>
      <Route index element={<HomePage cart={cart}/>} /> 
      <Route path="checkout" element={<CheckoutPage cart={cart} />} /> 
      <Route path="orders" element={<OrderPage cart={cart} />}/>
      <Route path="tracking" element={<TrackingPage />}/>
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
   
      
  );
}

export default App;
