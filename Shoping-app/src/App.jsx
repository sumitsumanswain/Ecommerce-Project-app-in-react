import {Routes, Route} from 'react-router'; {/*create react-router pathe  */}
import {HomePage} from './Component-Pages/HomePage';
import {CheckoutPage} from './Component-Pages/CheckoutPage';
import './App.css'

function App() {
   

  return (
   
    <Routes>
      <Route index element={<HomePage />} /> 
      <Route path="CheckoutPage" element={<CheckoutPage />} /> 
    </Routes>
   
      
  );
}

export default App;
