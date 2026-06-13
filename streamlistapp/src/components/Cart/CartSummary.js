import './CartSummary.css';

export default function CartSummary({ items }) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      <div className="summary-row">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Tax (10%):</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="summary-row total">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className="checkout-btn">Proceed to Checkout</button>
    </div>
  );
}