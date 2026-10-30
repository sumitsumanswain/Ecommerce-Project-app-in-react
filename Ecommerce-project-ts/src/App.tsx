import { Routes, Route } from "react-router";
{
  /*create react-router pathe  */
}
import { useEffect, useState } from "react";
import axios from "axios";
import { HomePage } from "./Component-Pages/home/HomePage";
import { CheckoutPage } from "./Component-Pages/Checkout/CheckoutPage";
import { OrderPage } from "./Component-Pages/orders/OrderPage";
import { TrackingPage } from "./Component-Pages/TrackingPage";
import { NotFoundPage } from "./Component-Pages/NotFoundpage";
import "./App.css";

 
function App() {
  const [cart, setCart] = useState([]);
  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    let ignore = false;

    const fetchCart = async () => {
      try {
        const response = await axios.get("/api/cart-items?expand=product");

        if (!ignore) {
          setCart(response.data);
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };

    fetchCart();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart}/>} />
      <Route path="orders" element={<OrderPage cart={cart} loadCart={loadCart}/>} />
      <Route
        path="tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      />
      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
  );
}

export default App;
