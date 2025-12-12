import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CataloguePage from './pages/CataloguePage';
import ContactPage from './pages/ContactPage';
import BikeDetailPage from './pages/BikeDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen --bg-gray-900 text-white">
        <Navbar />
        <main className="pt-16 z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/bike/:id" element={<BikeDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;