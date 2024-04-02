import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup";
import Create from "./pages/Create";
import Study from "./pages/Study";
import Stats from "./pages/Stats";
import Library from "./pages/Library";
import "./styles/navbar.css";
import "./styles/signup.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<Create />} />
        <Route path="/study" element={<Study />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

function Navigation({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        FlippIt
      </Link>
      <div className="links">
        <ul>
          {isLoggedIn && (
            <>
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li>
                <Link to="/study">Study</Link>
              </li>
              <li>
                <Link to="/stats">Stats</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default App;
