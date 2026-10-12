import {Routes, Route} from 'react-router'; {/*create react-router pathe  */}
import {HomePage} from './Component-Pages/HomePage';
import {CheckoutPage} from './Component-Pages/CheckoutPage';
import {OrderPage} from './Component-Pages/OrderPage';
import './App.css'

function App() {
   

  return (
   
    <Routes>
      <Route index element={<HomePage />} /> 
      <Route path="checkout" element={<CheckoutPage />} /> 
      <Route path="orders" element={<OrderPage/>}/>
    </Routes>
   
      
  );
}

export default App;
