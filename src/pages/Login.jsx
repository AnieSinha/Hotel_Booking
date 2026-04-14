import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login({ isAdminLogin = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const isAdminCredentials =
      email.trim().toLowerCase() === "admin@gmail.com" && password === "admin";

    try {
      if (isAdminCredentials) {
        localStorage.setItem("token", "admin-token");
        localStorage.setItem("role", "admin");
        alert("Admin login successful!");
        navigate("/admin");
        return;
      }

      if (isAdminLogin) {
        alert("Invalid admin credentials");
        return;
      }

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", "user");

      alert("Login successful!");
      navigate("/hotels");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isAdminLogin ? "Admin Login 👑" : "Welcome Back 👋"}</h2>
        <p style={styles.subtitle}>
          {isAdminLogin
            ? "Login with admin credentials to open the admin dashboard"
            : "Login to continue booking hotels"}
        </p>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.footerText}>
          Don’t have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/register")}>
            Register
          </span>
        </p>

        <p style={styles.footerText}>
          Are you admin?{" "}
          <span style={styles.link} onClick={() => navigate("/admin-login")}>
            Admin Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    background: "white",
    padding: "40px",
    borderRadius: "15px",
    width: "320px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
  },

  title: {
    marginBottom: "5px",
    color: "#333",
  },

  subtitle: {
    fontSize: "12px",
    color: "gray",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "15px",
    transition: "0.3s",
  },

  footerText: {
    marginTop: "15px",
    fontSize: "12px",
    color: "gray",
  },

  link: {
    color: "#667eea",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;