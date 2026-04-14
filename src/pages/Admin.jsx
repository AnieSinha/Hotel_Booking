import { useEffect, useState } from "react";
import api from "../services/api";

function Admin() {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingHotel, setEditingHotel] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);

  const [hotelForm, setHotelForm] = useState({
    name: "",
    city: "",
    rating: "",
    price_per_night: "",
  });

  const [roomForm, setRoomForm] = useState({
    hotel_id: "",
    room_type: "",
    price: "",
    capacity: "",
  });

  // ✅ FIXED useEffect (NO dependency issues)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [hotelRes, roomRes] = await Promise.all([
          api.get("/admin/hotels"),
          api.get("/admin/rooms"),
        ]);

        setHotels(hotelRes.data);
        setRooms(roomRes.data);
      } catch (err) {
        console.log("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddHotel = () => {
    setEditingHotel(null);
    setHotelForm({ name: "", city: "", rating: "", price_per_night: "" });
    setShowHotelForm(true);
  };

  const handleEditHotel = (hotel) => {
    setEditingHotel(hotel);
    setHotelForm({
      name: hotel.name,
      city: hotel.city,
      rating: hotel.rating,
      price_per_night: hotel.price_per_night,
    });
    setShowHotelForm(true);
  }

  const deleteHotel = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const relatedRooms = rooms.filter((room) => room.hotel_id === id);

        if (relatedRooms.length > 0) {
          await Promise.all(
            relatedRooms.map((room) =>
              api.delete(`/admin/rooms/${room.room_id}`)
            )
          );
        }

        await api.delete(`/admin/hotels/${id}`);

        setHotels((prev) => prev.filter((h) => h.hotel_id !== id));
        setRooms((prev) => prev.filter((r) => r.hotel_id !== id));

        alert("Hotel deleted successfully!");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleAddRoom = () => {
    setEditingRoom(null);
    setRoomForm({ hotel_id: "", room_type: "", price: "", capacity: "" });
    setShowRoomForm(true);
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setRoomForm({
      hotel_id: room.hotel_id,
      room_type: room.room_type,
      price: room.price,
      capacity: room.capacity,
    });
    setShowRoomForm(true);
  };

  
  const deleteRoom = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/admin/rooms/${id}`);
        setRooms((prev) => prev.filter((r) => r.room_id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👑 Admin Dashboard</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>🏨 Hotels</h3>
          <button style={styles.addBtn} onClick={handleAddHotel}>
            + Add Hotel
          </button>

          <table style={styles.table}>
            <tbody>
              {hotels.map((h) => (
                <tr key={h.hotel_id}>
                  <td>{h.name}</td>
                  <td>{h.city}</td>
                  <td>
                    <button onClick={() => handleEditHotel(h)}>Edit</button>
                    <button onClick={() => deleteHotel(h.hotel_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>🛏️ Rooms</h3>
          <button style={styles.addBtn} onClick={handleAddRoom}>
            + Add Room
          </button>

          <table style={styles.table}>
            <tbody>
              {rooms.map((r) => (
                <tr key={r.room_id}>
                  <td>{r.room_type}</td>
                  <td>{r.price}</td>
                  <td>
                    <button onClick={() => handleEditRoom(r)}>Edit</button>
                    <button onClick={() => deleteRoom(r.room_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  title: { textAlign: "center" },
  table: { width: "100%", marginTop: "10px" },
  addBtn: { marginBottom: "10px" },
};

export default Admin;