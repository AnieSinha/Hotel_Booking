// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await api.post("/auth/register", {
//         email,
//         password,
//       });

//     alert("Registration successful!");
//     console.log(res.data);

//       setMessage("Registration successful! Redirecting to login...");

//       setTimeout(() => {
//         navigate("/");
//       }, 1500);
//     } catch (err) {
//       console.log(err);

//       if (err.response?.data?.detail) {
//         setMessage(err.response.data.detail);
//       } else {
//         setMessage("Registration failed");
//       }
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2>Register</h2>

//         <input
//           style={styles.input}
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           style={styles.input}
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button style={styles.button} onClick={handleRegister} disabled={loading}>
//           {loading ? "Registering..." : "Register"}
//         </button>

//         {message && <p style={styles.message}>{message}</p>}

//         <p style={{ marginTop: "10px" }}>
//           Already have an account?{" "}
//           <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/")}>
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//     background: "#f5f5f5",
//   },
//   card: {
//     padding: "30px",
//     background: "white",
//     borderRadius: "10px",
//     boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//     width: "300px",
//     textAlign: "center",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     margin: "10px 0",
//   },
//   button: {
//     width: "100%",
//     padding: "10px",
//     background: "green",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//   },
//   message: {
//     marginTop: "10px",
//     color: "red",
//   },
// };

// export default Register;








import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/auth/register", {
        email,
        password,
      });

      console.log(res.data);

      setMessage("Registration successful! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.detail || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account ✨</h2>
        <p style={styles.subtitle}>Sign up to start booking hotels</p>

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

        <button
          style={styles.button}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {message && <p style={styles.message}>{message}</p>}

        <p style={styles.footerText}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/")}>
            Login
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
  },

  message: {
    marginTop: "10px",
    color: "red",
    fontSize: "12px",
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

export default Register;