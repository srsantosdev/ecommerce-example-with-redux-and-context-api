import { CartComponent } from "./cart-component";
import { useECommerce } from "./useECommerce";

function App() {
  const { products, addToCart } = useECommerce();

  return (
    <div>
      <div>
        <h1>Produtos disponiveis</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <p>
                {product.name} - {product.brand} - R${product.price}
              </p>
              <button onClick={() => addToCart(product)}>
                Comprar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <CartComponent />
    </div>
  );
}

export default App;
