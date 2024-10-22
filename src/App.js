import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { Route, Routes } from "react-router-dom";
import Checkout from "./components/Checkout.js";

import CartContextProvider from "./store/shopping-cart-context.js";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </CartContextProvider>
  );
}

export default App;
