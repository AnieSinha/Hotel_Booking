import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function Rooms() {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, [hotelId]);

  const fetchRooms = async () => {
    try {
      const res = await api.get(`/rooms/${hotelId}/all`);
      setRooms(res.data);
    } catch (err) {
      console.log("Error fetching rooms:", err.response?.data || err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛏️ Rooms</h2>

      <div style={styles.grid}>
        {rooms.map((room) => (
          <div key={room.room_id} style={styles.card}>
            <h3>{room.room_type}</h3>

            <p>💰 ₹{room.price}</p>

            <p>
              {room.available ? (
                <span style={{ color: "green" }}>Available</span>
              ) : (
                <span style={{ color: "red" }}>Booked</span>
              )}
            </p>


            <button
              style={styles.button}
              disabled={!room.available}
              onClick={() => navigate(`/booking/${room.room_id}`)}
            >
              Book Now
            </button>

            
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    minHeight: "100vh",
    background: "#f4f6f8",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
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
    textAlign: "center",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Rooms;