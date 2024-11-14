import { CartContext } from "../store/shopping-cart-context";
import { useContext } from "react";

export default function Product({
  id,
  thumbnail,
  title,
  price,
  description,
  openModal,
}) {

  const { addItemToCart } = useContext(CartContext);

  const handleClick = () => {
    addItemToCart(id);
    openModal();
  };

  return (
    <article className="product">
      <img src={thumbnail} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button onClick={handleClick}>ADD TO CART</button>
        </p>
      </div>
    </article>
  );
}
