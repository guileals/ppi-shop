// import { useRef } from "react";
// import CartModal from "./CartModal.jsx";
import { CartContext } from "../store/shopping-cart-context";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const { items } = useContext(CartContext);

  // const modal = useRef();

  const cartQuantity = items.length;

  // function handleOpenCartClick() {
  //   modal.current.open();
  // }

  return (
    <>
      {/* <CartModal ref={modal} title="Your Cart" cartQuantity={cartQuantity} /> */}
      <header id="main-header">
        <div id="main-title">
          {/* <img src="logo.png" alt="Elegant model" /> */}
          <h1>Elegant Context</h1>
        </div>
        <p>
          <Link to="/checkout">
            {/* <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button> */}
            <button>Cart ({cartQuantity})</button>
          </Link>
        </p>
      </header>
    </>
  );
}
