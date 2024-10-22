import Product from './Product.jsx';
import { CartContext } from "../store/shopping-cart-context";
import { useContext } from "react";

export default function Shop() {

  const { products } = useContext(CartContext);

  return (
    <section id="shop">
      <h2>Elegant Context For Everyone</h2>

      <ul id="products">
        {products.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
