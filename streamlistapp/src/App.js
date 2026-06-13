import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Layout from './components/common/Layout';
import StreamListPage from './pages/StreamList';
import MoviesPage from './pages/Movies';
import CartPage from './pages/Cart';
import AboutPage from './pages/About';
import './App.css';

export default function App() {
  return (
    <AppProvider>
      <ErrorBoundary>
        <Layout>
          <Routes>
            <Route path="/" element={<StreamListPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </AppProvider>
  );
}
