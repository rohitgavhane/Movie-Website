import Navbar from './Components/Navbar';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Movies from './Pages/Movies';
import Home from './Pages/Home';
import Categories from './Pages/Categories';
import Profile from './Pages/Profile';
import Footer from './Components/Footer';
import ClickedMovie from './Pages/ClickedMovie';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/movie/:id' element={<ClickedMovie></ClickedMovie>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
