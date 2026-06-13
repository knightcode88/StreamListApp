import StreamForm from './StreamForm';
import StreamItem from './StreamItem';
import './StreamList.css';

export default function StreamListComponent({ items, onAdd, onRemove }) {
  return (
    <div className="streamlist-component">
      <h2>
        <span className="material-symbols-outlined">queue_music</span>
        Your StreamList
      </h2>
      <StreamForm onAdd={onAdd} />
      <div className="stream-items">
        {items.length === 0 ? (
          <p className="empty-message">No items yet. Add one to get started!</p>
        ) : (
          items.map(item => (
            <StreamItem key={item.id} item={item} onRemove={onRemove} />
          ))
        )}
      </div>
    </div>
  );
}