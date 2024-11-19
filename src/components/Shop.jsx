import Product from "./Product.jsx";
import { CartContext } from "../store/shopping-cart-context";
import { useContext, useState, useRef, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Modal from "./Modal.js";
import Cart from "./Cart.jsx";

export default function Shop() {

  const { products, loading, error } = useContext(CartContext);

  const modalRef = useRef();
  const openModal = () => modalRef.current.open();

  const searchInput = useRef(""); // Usado para capturar o valor do input
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (products) {
      setFilteredItems(products);
    }
  }, [products]);

  // Função para pesquisar na lista
  function handleSearch() {
    const searchTerm = searchInput.current.value.toLowerCase();
    setFilteredItems(
      products.filter((item) => item.title.toLowerCase().includes(searchTerm))
    );
  }

  // Função para limpar a pesquisa
  const clearSearch = () => {
    searchInput.current.value = "";
    setFilteredItems(products);
  };

  return (
    <section id="shop">
      <Modal ref={modalRef}>
        <Cart />
      </Modal>
      <h2>Elegant Context For Everyone</h2>

      <div className="search-container">
        <div className="search-box">
          <input
            ref={searchInput}
            type="text"
            placeholder="Type to search..."
            onChange={handleSearch}
            className="search-input"
          />
          <button onClick={clearSearch} className="clear-button">
            CLEAR
          </button>
        </div>
      </div>

      <ul id="products">
        {error && <p>{error}</p>}
        {loading && 
          <div id="loading">
            <CircularProgress size="10rem" color="inherit" />
            <p>Loading products...</p>
          </div>
        }
        {!loading && !error && filteredItems.length > 0 ? (
          filteredItems.map((product) => (
            <li key={product.id}>
              <Product {...product} openModal={openModal} />
            </li>
          ))
        ) : (
          <p className="warning">Not found!</p>
        )}
      </ul>
    </section>
  );
}
