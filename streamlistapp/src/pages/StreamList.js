import { useState } from "react";

export default function StreamList() {
  const [item, setItem] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    if (!item.trim()) return;
    console.log("Added:", item);
    setItem("");
  };

  return (
    <>
      <h2><span className="material-symbols-outlined">queue_music</span> Your StreamList</h2>
      <form onSubmit={addItem}>
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Add a new movie or show."
        />
        <button type="submit">Add</button>
      </form>
      <p>Under construction - content will appear soon!</p>
    </>
  );
}
