// import { useRef } from "react";
// import CartModal from "./CartModal.jsx";
import { CartContext } from "../store/shopping-cart-context";
import { useContext } from "react";
import { Link } from "react-router-dom";

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -10,
    top: 0,
    border: `2px solid #000`,
    padding: "0 4px",
    backgroundColor: "#fff",
  },
}));

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
            {/* <button>Cart ({cartQuantity})</button> */}
            <IconButton aria-label="cart" size="large">
              <StyledBadge badgeContent={cartQuantity}>
                <ShoppingCartIcon size="large" />
              </StyledBadge>
            </IconButton>
          </Link>
        </p>
      </header>
    </>
  );
}
