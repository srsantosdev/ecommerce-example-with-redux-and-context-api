import axios from "axios";
import {
  useState,
  useEffect,
  useCallback,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";

export const api = axios.create({
  baseURL: "https://mks-challenge-api-frontend.herokuapp.com/api/v1",
});

export type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  photo: string;
  price: string;
};

export type ProductToCart = Product & {
  quantity: number;
};

type EcommerceContextProps = {
  incrementProductToCart: (id: number) => void;
  decrementProductToCart: (id: number) => void;
  addToCart: (product: Product) => void;
  getCartValue: () => number;
  products: Product[];
  cart: ProductToCart[];
};

const EcommerceContext = createContext({} as EcommerceContextProps);

export const EcommerceProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<ProductToCart[]>([]);

  useEffect(() => {
    (async () => {
      const response = await api.get<{ products: Product[] }>("/products", {
        params: {
          page: 1,
          rows: 8,
          sortBy: "id",
          orderBy: "ASC",
        },
      });

      setProducts(response.data.products);
    })();
  }, []);

  const incrementProductToCart = useCallback(
    (id: number) => {
      const productIndex = cart.findIndex((product) => product.id === id);

      if (productIndex === -1) {
        return;
      }

      const copyCart = cart.slice();
      copyCart[productIndex].quantity += 1;
      setCart(copyCart);
    },
    [cart]
  );

  const decrementProductToCart = useCallback(
    (id: number) => {
      const productIndex = cart.findIndex((product) => product.id === id);

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

      setCart(copyCart);
    },
    [cart]
  );

  const addToCart = useCallback(
    (product: Product) => {
      const productIndex = cart.findIndex(
        (productInCart) => productInCart.id === product.id
      );

      if (productIndex === -1) {
        setCart((state) => [...state, { ...product, quantity: 1 }]);
        return;
      }

      incrementProductToCart(product.id);
    },
    [cart, incrementProductToCart]
  );

  const getCartValue = useCallback(() => {
    const isEmptyCart = cart.length === 0;
    if (isEmptyCart) {
      return 0;
    }

    return cart.reduce((accumulator, product) => {
      const subTotal = Number(product.price) * product.quantity;

      return accumulator + subTotal;
    }, 0);
  }, [cart]);

  return (
    <EcommerceContext.Provider
      value={{
        products,
        cart,
        addToCart,
        incrementProductToCart,
        decrementProductToCart,
        getCartValue,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};

export function useECommerce() {
  const context = useContext(EcommerceContext);

  return context;
}
