import './StreamItem.css';

export default function StreamItem({ item, onRemove }) {
  return (
    <div className="stream-item">
      <span className="stream-item-title">{item.title}</span>
      <button
        className="stream-item-remove"
        onClick={() => onRemove(item.id)}
        aria-label="Remove item"
      >
        ✕
      </button>
    </div>
  );
}