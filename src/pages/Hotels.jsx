import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ SAFE useEffect (no dependency issues)
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const res = await api.get("/hotels/all");
        setHotels(res.data);
      } catch (err) {
        console.log("Error fetching hotels:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // 🔍 SEARCH HOTELS
  const searchHotels = async () => {
    if (!searchCity.trim()) {
      resetSearch();
      return;
    }

    try {
      setLoading(true);
      const res = await api.get(`/hotels/search?city=${searchCity}`);
      setHotels(res.data);
    } catch (err) {
      console.log("Search error:", err);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 RESET
  const resetSearch = async () => {
    setSearchCity("");

    try {
      setLoading(true);
      const res = await api.get("/hotels/all");
      setHotels(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>🏨 Available Hotels</h2>
      </div>

      {/* SEARCH */}
      <div style={styles.searchBox}>
        <input
          style={styles.input}
          placeholder="Search by city"
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

      {loading && <p>Loading hotels...</p>}

      {/* HOTELS LIST */}
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
                onClick={() => navigate(`/rooms/${hotel.hotel_id}`)}
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