// import { useRef } from "react";
// import CartModal from "./CartModal.jsx";
import { CartContext } from "../store/shopping-cart-context";
import { useContext } from "react";
import { Link } from "react-router-dom";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Login } from "@mui/icons-material";

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
  const { session, items } = useContext(CartContext);

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
          <Link to="/" className="link_home">
            <h1>Elegant Context</h1>
          </Link>
          {session && (
            <Link to="/auth" className="link_auth">
              <h3>Welcome, {session.user.user_metadata.first_name} {session.user.user_metadata.last_name}</h3>
            </Link>
          )}
        </div>
        <div>
          <Link to="/auth">
            <IconButton aria-label="cart" size="large" className="iconbutton">
              <Login />
            </IconButton>
          </Link>
          <Link to="/checkout">
            <IconButton aria-label="cart" size="large" className="iconbutton">
              <StyledBadge badgeContent={cartQuantity}>
                <ShoppingCartIcon size="large" />
              </StyledBadge>
            </IconButton>
          </Link>
        </div>
      </header>
    </>
  );
}
