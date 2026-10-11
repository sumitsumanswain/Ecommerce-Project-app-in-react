import {Routes, Route} from 'react-router'; {/*create react-router pathe  */}
import {HomePage} from './Component-Pages/HomePage'
import './App.css'

function App() {
   

  return (
    <Routes>
      <Route index element={<HomePage />} /> 
      <Route path="checkout" element={<p>Hello i am chekout page</p>} /> 
    </Routes>
      
  );
}

export default App
