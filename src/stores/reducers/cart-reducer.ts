import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductToCart } from "../../useECommerce";

const INITIAL_STATE: { cart: ProductToCart[] } = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    incrementProductToCart: ({ cart }, action: PayloadAction<number>) => {
      const productIndex = cart.findIndex(
        (product) => product.id === action.payload
      );

      if (productIndex === -1) {
        return;
      }

      const copyCart = cart.slice();
      copyCart[productIndex].quantity += 1;
      cart = copyCart;
    },
    decrementProductToCart: ({ cart }, action: PayloadAction<number>) => {
      const productIndex = cart.findIndex(
        (product) => product.id === action.payload
      );

      if (productIndex === -1) {
        return;
      }

      const copyCart = cart.slice();
      const product = copyCart[productIndex];

      if (product.quantity === 0) {
        return;
      }

      product.quantity -= 1;
      copyCart[productIndex] = product;
      cart = copyCart;
    },
    addToCart: ({ cart }, action: PayloadAction<Product>) => {
      const productIndex = cart.findIndex(
        (productInCart) => productInCart.id === action.payload.id
      );

      if (productIndex === -1) {
        cart = [...cart, { ...action.payload, quantity: 1 }];
        return;
      }

      const copyCart = cart.slice();
      copyCart[productIndex].quantity += 1;
      cart = copyCart;
    },
  },
});
