// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";

// function Hotels() {
//   const [hotels, setHotels] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchHotels();
//   }, []);

//   const fetchHotels = async () => {
//     try {
//       const res = await api.get("/hotels/all");
//       setHotels(res.data);
//     } catch (err) {
//       console.log("Error fetching hotels:", err);
//     }
//   };

//   // ✅ LOGOUT FUNCTION
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div style={styles.container}>
      
//       {/* HEADER BAR */}
//       <div style={styles.header}>
//         <h2 style={styles.title}>🏨 Available Hotels</h2>

//         <button style={styles.logoutBtn} onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//       {/* HOTELS GRID */}
//       <div style={styles.grid}>
//         {hotels.map((hotel) => (
//           <div key={hotel.hotel_id} style={styles.card}>
//             <h3>{hotel.name}</h3>
//             <p>{hotel.location}</p>

//             <button
//               style={styles.button}
//               onClick={() => navigate(`/rooms/${hotel.hotel_id}`)}
//             >
//               View Rooms
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: "30px",
//     background: "#f4f6f8",
//     minHeight: "100vh",
//   },

//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "20px",
//   },

//   title: {
//     margin: 0,
//   },

//   logoutBtn: {
//     background: "red",
//     color: "white",
//     border: "none",
//     padding: "10px 15px",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//     gap: "20px",
//   },

//   card: {
//     background: "white",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//   },

//   button: {
//     marginTop: "10px",
//     padding: "10px",
//     background: "green",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     width: "100%",
//   },
// };

// export default Hotels;








import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels();
  }, []);

  // ✅ GET ALL HOTELS
  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await api.get("/hotels/all");
      setHotels(res.data);
    } catch (err) {
      console.log("Error fetching hotels:", err);
    }
    setLoading(false);
  };

  // 🔍 SEARCH HOTELS BY CITY
  const searchHotels = async () => {
    if (!searchCity.trim()) {
      fetchHotels();
      return;
    }

    setLoading(true);
    try {
      const res = await api.get(
        `/hotels/search?city=${searchCity}`
      );
      setHotels(res.data);
    } catch (err) {
      console.log("Search error:", err);
      setHotels([]);
    }
    setLoading(false);
  };

  // 🔄 RESET SEARCH
  const resetSearch = () => {
    setSearchCity("");
    fetchHotels();
  };

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2>🏨 Available Hotels</h2>

        
      </div>

      {/* SEARCH BAR */}
      <div style={styles.searchBox}>
        <input
          style={styles.input}
          placeholder="Search by city (e.g. Goa, Delhi)"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />

        <button style={styles.searchBtn} onClick={searchHotels}>
          Search
        </button>

        <button style={styles.resetBtn} onClick={resetSearch}>
          Reset
        </button>
      </div>

      {/* LOADING */}
      {loading && <p>Loading hotels...</p>}

      {/* HOTEL LIST */}
      <div style={styles.grid}>
        {hotels.length === 0 && !loading ? (
          <p>No hotels found</p>
        ) : (
          hotels.map((hotel) => (
            <div key={hotel.hotel_id} style={styles.card}>
              <h3>{hotel.name}</h3>
              <p>📍 {hotel.city}</p>
              <p>⭐ {hotel.rating}</p>

              <button
                style={styles.button}
                onClick={() =>
                  navigate(`/rooms/${hotel.hotel_id}`)
                }
              >
                View Rooms
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f4f6f8",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  logoutBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  searchBtn: {
    background: "green",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
  },

  resetBtn: {
    background: "gray",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
    width: "100%",
  },
};

export default Hotels;