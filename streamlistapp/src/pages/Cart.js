import { useEffect } from 'react';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';
import { useCart } from '../hooks/useCart';
import { storageService } from '../services/storage';
import './Cart.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Save cart to local storage whenever it changes
  useEffect(() => {
    storageService.saveCart(cart);
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="page-container">
        <h2>
          <span className="material-symbols-outlined">shopping_cart</span>
          Shopping Cart
        </h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p className="text-muted\">Add items from the Movies page to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2>
        <span className="material-symbols-outlined">shopping_cart</span>
        Shopping Cart
      </h2>
      <div className="cart-layout">
        <div className="cart-items-section">
          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeFromCart}
              onQuantityChange={updateQuantity}
            />
          ))}
        </div>
        <CartSummary items={cart} />
      </div>
    </div>
  );
}
