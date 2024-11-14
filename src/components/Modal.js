// Modal.js
import { useState, forwardRef, useImperativeHandle } from "react";
import { Link } from "react-router-dom";

const Modal = forwardRef(({ children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  // Permite ao componente pai abrir e fechar o modal com a ref
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <div>
          <button className="modal-close" onClick={() => setIsOpen(false)}>
            CLOSE
          </button>
          <Link to="/checkout">
            <button className="modal-checkout" onClick={() => setIsOpen(false)}>
              CHECKOUT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Modal;
