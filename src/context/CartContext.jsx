import { createContext, useState, useEffect } from "react";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
  const [cartList, setCartList] = useState(() => {
    try {
      const productosEnLocalStorage = localStorage.getItem("cartProducts");
      return productosEnLocalStorage ? JSON.parse(productosEnLocalStorage) : [];
    } catch (error) {
      return [];
    }
  });

  const addToCart = (product) => {
    const existingProductIndex = cartList.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      const updatedCart = [...cartList];
      updatedCart[existingProductIndex].quantity += product.quantity;
      setCartList(updatedCart);
    } else {
      const newCartItem = {
        ...product,
        uniqueIdentifier: `${product.id}`,
        quantity: product.quantity,
      };
      setCartList([...cartList, newCartItem]);
    }
  };

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartList));
  }, [cartList]);

  const removeList = () => {
    setCartList([]);
  };

  const removeItem = (id) => {
    const filterCart = cartList.filter((item) => item.id !== id);
    setCartList(filterCart);
  };
  const [favs, setFavs] = useState([]);
  
  const favList = (favs) => {
    setFavs(favs) 
  }

  return (
    <CartContext.Provider
      value={{ cartList, addToCart, removeItem, removeList, favList, favs }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
