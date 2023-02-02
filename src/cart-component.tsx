import React from "react";
import { useECommerce } from "./useECommerce";
import { getPriceBRL } from "./utils";

export const CartComponent: React.FC = () => {
  const { cart, incrementProductToCart, decrementProductToCart, getCartValue } =
    useECommerce();

  return (
    <div>
      <h1>{`Carrinho - ${getPriceBRL(getCartValue())}`}</h1>
      <ul>
        {cart.map((product) => (
          <li>
            <p>
              {product.name} - {product.brand} - R${product.price}
            </p>
            <button
              type="button"
              onClick={() => decrementProductToCart(product.id)}
            >
              -
            </button>
            <span>{product.quantity}</span>
            <button
              type="button"
              onClick={() => incrementProductToCart(product.id)}
            >
              +
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
