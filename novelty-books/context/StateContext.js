"use client";

import React, { createContext, useContext, useState } from "react";
import { useLocalstorage } from "./useLocalStorage";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [cartItems, setCartItems] = useLocalstorage("cartItems", []);
  const [totalPrice, setTotalPrice] = useLocalstorage("totalPrice", 0);
  const [totalQuantities, setTotalQuantities] = useLocalstorage(
    "totalQuantities",
    0
  );
  const [qty, setQty] = useState(1);
  const [user, setUser] = useState({});
  const [totalBooks, setTotalBooks] = useState({});

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item?._id === product?._id
    );

    if (checkProductInCart) {
      const updateCartItems = cartItems.map((cartProduct) => {
        if (cartProduct?._id === product?._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updateCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );

    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        user,
        totalBooks,
        setTotalBooks,
        setUser,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
