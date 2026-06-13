import { useState } from 'react';
import './StreamForm.css';

export default function StreamForm({ onAdd }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="stream-form">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new movie or show."
        aria-label="Add new stream item"
      />
      <button type="submit">Add</button>
    </form>
  );
}