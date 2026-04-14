import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  if (!token) return null; // hide navbar when not logged in

  return (
    <div style={styles.navbar}>
      <h2
        style={styles.logo}
        onClick={() => navigate(role === "admin" ? "/admin" : "/hotels")}
      >
        🏨 HotelBooking
      </h2>

      <div style={styles.links}>
        {role === "admin" ? (
          <span onClick={() => navigate("/admin")}>Admin Dashboard</span>
        ) : (
          <>
            <span onClick={() => navigate("/hotels")}>Hotels</span>
            <span onClick={() => navigate("/history")}>History</span>
          </>
        )}
        

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px",
    background: "#111",
    color: "white",
  },

  logo: {
    cursor: "pointer",
    margin: 0,
  },

  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    cursor: "pointer",
  },

  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Navbar;