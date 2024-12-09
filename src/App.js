import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { Route, Routes } from "react-router-dom";
import Checkout from "./components/Checkout.js";

import CartContextProvider from "./store/shopping-cart-context.js";
import Auth from "./components/Auth.js";
import Signup from "./components/Signup.js";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </CartContextProvider>
  );
}

export default App;
