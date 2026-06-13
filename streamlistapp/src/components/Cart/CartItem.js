import './CartItem.css';

export default function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{item.title}</h4>
        <p className="cart-item-price">${item.price?.toFixed(2) || '0.00'}</p>
      </div>
      <div className="cart-item-quantity">
        <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
      </div>
      <div className="cart-item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      <button
        className="cart-item-remove"
        onClick={() => onRemove(item.id)}
        aria-label="Remove from cart"
      >
        Remove
      </button>
    </div>
  );
}