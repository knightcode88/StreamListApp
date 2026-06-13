import './About.css';

export default function AboutPage() {
  return (
    <div className="page-container">
      <h2>
        <span className="material-symbols-outlined">info</span>
        About StreamList App
      </h2>
      <div className="about-content">
        <section className="about-section">
          <h3>Welcome to StreamList</h3>
          <p>
            StreamList is your personal streaming companion, designed to help you keep track of
            movies and shows you want to watch. Create your watchlist, browse our movie collection,
            and add items to your cart for later viewing.
          </p>
        </section>

        <section className="about-section">
          <h3>Features</h3>
          <ul>
            <li>Create and manage your personal stream list</li>
            <li>Browse our extensive movie catalog</li>
            <li>Add items to your shopping cart</li>
            <li>Persistent storage using local storage</li>
            <li>Clean, modern, dark-themed interface</li>
          </ul>
        </section>

        <section className="about-section">
          <h3>How to Use</h3>
          <ol>
            <li>Visit the <strong>StreamList</strong> tab to create your personal watchlist</li>
            <li>Browse <strong>Movies</strong> to see available content</li>
            <li>Add movies to your <strong>Cart</strong> to save them for later</li>
            <li>Your data is automatically saved to your device</li>
          </ol>
        </section>

        <section className="about-section">
          <h3>Technology Stack</h3>
          <p>
            Built with <strong>React 19</strong>, <strong>React Router v7</strong>, and modern
            JavaScript. Features a context-based state management system for efficient data handling.
          </p>
        </section>

        <section className="about-section footer-section">
          <p>&copy; 2026 StreamList App. All rights reserved.</p>
          <p className="version-info\">Version 2.0.0 | Part 2 Refactored</p>
        </section>
      </div>
    </div>
  );
}
