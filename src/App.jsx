import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ReadQuran from './pages/ReadQuran';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/readquran" element={<ReadQuran />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
