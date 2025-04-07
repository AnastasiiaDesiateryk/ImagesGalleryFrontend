import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../images/logo.svg";
import { Container } from "react-bootstrap";

const Header = ({ title }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ backgroundColor: "black" }}>
      <Container>
        <nav className="navbar navbar-expand-lg px-0">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            {/* Logo + menu */}
            <div className="d-flex align-items-center gap-4">
              <a className="navbar-brand d-flex align-items-center" href="/">
                <Logo
                  alt={title}
                  style={{ maxWidth: "10rem", maxHeight: "2rem" }}
                />
              </a>
              <ul className="navbar-nav flex-row gap-3">
                <li className="nav-item">
                  <a
                    className="nav-link nav-button btn btn-link text-white me-2"
                    href="/"
                    style={{
                      maxHeight: "2.2rem",
                      padding: "0.4rem 1rem",
                      borderRadius: "50px",
                      fontWeight: "500",
                      fontSize: "1rem",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link nav-button btn btn-link text-white"
                    href="/gallery"
                    style={{
                      maxHeight: "2.2rem",
                      padding: "0.4rem 1rem",
                      borderRadius: "50px",
                      fontWeight: "500",
                      fontSize: "1rem",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                  >
                    My gallery
                  </a>
                </li>
              </ul>
            </div>

            {/* Login/Register / Logout */}

            <div className="d-flex gap-2">
              {!token ? (
                <>
                  <a
                    className={
                      "btn btn-sm " +
                      (window.location.pathname === "/login"
                        ? "btn-light text-dark"
                        : "btn-outline-light text-white")
                    }
                    href="/login"
                  >
                    Login
                  </a>
                  <a
                    className={
                      "btn btn-sm " +
                      (window.location.pathname === "/register"
                        ? "btn-light text-dark"
                        : "btn-dark")
                    }
                    href="/register"
                  >
                    Register
                  </a>
                </>
              ) : (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Header;
