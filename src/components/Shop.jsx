import Product from "./Product.jsx";
import { CartContext } from "../store/shopping-cart-context";
import { useContext } from "react";
import { CircularProgress } from "@mui/material";

export default function Shop() {
  const { products, loading, error } = useContext(CartContext);

  console.log(products, loading);

  return (
    <section id="shop">
      <h2>Elegant Context For Everyone</h2>

      <ul id="products">
        {error && <p>{error}</p>}
        {!loading && products ? (
          products.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))
        ) : (
          <div id="loading">
            <CircularProgress size="10rem" color="inherit" />
            <p>Loading products...</p>
          </div>
        )}
      </ul>
    </section>
  );
}
