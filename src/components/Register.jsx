import { useState } from "react";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // ✅ просто сообщение и редирект
        setMessage("Registration successful");
        navigate("/gallery");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (err) {
      setMessage("Network error");
    }
  };
  return (
    <>
      <Header />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          padding: "3rem",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-dark">
                Register
              </button>
            </div>
          </form>
          {message && (
            <p
              className="text-danger text-center mt-3"
              style={{ fontSize: "0.9rem" }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </>

    // <>
    //   <Header />
    //   <div style={{ padding: "2rem" }}>
    //     <h2>Register</h2>
    //     <form onSubmit={handleRegister}>
    //       <input
    //         placeholder="Username"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //       />
    //       <br />
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       <br />
    //       <button type="submit">Register</button>
    //     </form>
    //     <p>{message}</p>
    //   </div>
    // </>
  );
}
