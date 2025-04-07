import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ImageGallery from "./components/ImageGallery";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/gallery" element={<ImageGallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
