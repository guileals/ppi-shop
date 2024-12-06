import { createContext, useReducer } from "react";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

export const CartContext = createContext({
  items: [],
  products: [],
  loading: false,
  error: "",
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  session: null,
  sessionLoading: false,
  sessionError: "",
  handleSignUp: () => {},
  handleSignIn: () => {},
  handleLogout: () => {},
});

function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = action.payload.products.find(
        (product) => product.id === action.payload.id
      );
      updatedItems.push({
        id: action.payload.id,
        thumbnail: product.thumbnail,
        title: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.id
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  // FETCH DATA
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionError, setSessionError] = useState(null);

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      const { data: products, error } = await supabase
        .from("products")
        .select();
      if (products.length > 1) {
        setProducts(products);
      } else {
        setError(`Fetching products failed! ${error}`);
      }
      setLoading(false);
    }

    getProducts();

    // User Session

    // Verifica a sessão ativa
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    // Cleanup da inscrição
    return () => subscription.subscription.unsubscribe();

    // async function fetchProducts() {
    //   setLoading(true);
    //   const response = await fetch(
    //     "https://dummyjson.com/products/category/fragrances?limit=12&select=id,thumbnail,title,price,description"
    //   );
    //   if (!response.ok) {
    //     setError("Fetching products failed!");
    //   } else {
    //     const result = await response.json();
    //     setProducts(result.products);
    //   }
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 2000);
    // }

    // fetchProducts();
  }, []);

  //useReducer
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: { id, products },
    });
  }

  function handleUpdateCartItemQuantity(id, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: { id, amount },
    });
  }

  const handleSignUp = async (firstName, lastName, email, password) => {
    setSessionLoading(true);
    setSessionError(null);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (data && data.user) {
      // Check if the user got created
      if (data.user.identities && data.user.identities?.length > 0) {
        // success
        alert(
          "Signed Up! Check and verify your email to confirm subscription!"
        );
      } else {
        // failed, the email address is taken
        setSessionError("E-mail already taken. Try to log in!");
      }
    }
    setSessionLoading(false);
  };

  const handleSignIn = async (email, password) => {
    setSessionLoading(true);
    setSessionError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setSessionLoading(false);
    if (error) setSessionError(error.message);
  };

  function handleLogout() {
    setSession(null);
  }

  const ctx = {
    items: shoppingCartState.items,
    products: products,
    loading: loading,
    error: error,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
    session: session,
    sessionLoading: sessionLoading,
    sessionError: sessionError,
    handleSignUp: handleSignUp,
    handleSignIn: handleSignIn,
    handleLogout: handleLogout,
  };

  return <CartContext.Provider value={ctx}>{children}</CartContext.Provider>;
}
