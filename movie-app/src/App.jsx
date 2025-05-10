import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Movies from './Pages/Movies';
import Home from './Pages/Home';
import Categories from './Pages/Categories';
import Profile from './Pages/Profile';
import ClickedMovie from './Pages/ClickedMovie';
import AuthModal from './Components/AuthModal';

import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3000); // Show modal after 10 seconds

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <>
      {/* Modal should appear above all */}
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}

      {/* Rest of the App */}
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:id" element={<ClickedMovie />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
