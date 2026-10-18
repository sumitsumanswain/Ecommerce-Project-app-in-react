import {Routes, Route} from 'react-router'; {/*create react-router pathe  */}
import {useEffect,useState} from 'react';
import  axios  from "axios";
import {HomePage} from './Component-Pages/home/HomePage';
import {CheckoutPage} from './Component-Pages/Checkout/CheckoutPage';
import {OrderPage} from './Component-Pages/orders/OrderPage';
import {TrackingPage} from './Component-Pages/TrackingPage';
import {NotFoundPage} from './Component-Pages/NotFoundpage';
import './App.css'

function App() {
  const [cart,setCart]=useState([]);
  useEffect(()=>{
    const fatchAppData = async () => {
      const response = await axios.get('/api/cart-items?expand=product')
        setCart(response.data);
    }
      fatchAppData();
  }, []);

  return (
   
    <Routes>
      <Route index element={<HomePage cart={cart}/>} /> 
      <Route path="checkout" element={<CheckoutPage cart={cart} />} /> 
      <Route path="orders" element={<OrderPage cart={cart} />}/>
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart}/>}/>
      <Route path="*" element={<NotFoundPage cart={cart}/>}/>
    </Routes>
   
      
  );
}

export default App;
