// import { useEffect, useState } from "react";
// import api from "../services/api";

// function Admin() {
//   const [hotels, setHotels] = useState([]);
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     fetchHotels();
//     fetchRooms();
//   }, []);

//   const fetchHotels = async () => {
//     try {
//       const res = await api.get("/admin/hotels");
//       setHotels(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const fetchRooms = async () => {
//     try {
//       const res = await api.get("/admin/rooms");
//       setRooms(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteHotel = async (id) => {
//     await api.delete(`/admin/hotels/${id}`);
//     fetchHotels();
//   };

//   const deleteRoom = async (id) => {
//     await api.delete(`/admin/rooms/${id}`);
//     fetchRooms();
//   };

//   return (
//     <div style={styles.container}>
//       <h2>👑 Admin Dashboard</h2>

//       {/* HOTELS */}
//       <h3>🏨 Hotels</h3>
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>City</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {hotels.map((h) => (
//             <tr key={h.hotel_id}>
//               <td>{h.hotel_id}</td>
//               <td>{h.name}</td>
//               <td>{h.city}</td>
//               <td>
//                 <button
//                   style={styles.deleteBtn}
//                   onClick={() => deleteHotel(h.hotel_id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ROOMS */}
//       <h3 style={{ marginTop: "30px" }}>🛏️ Rooms</h3>

//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Hotel ID</th>
//             <th>Type</th>
//             <th>Price</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {rooms.map((r) => (
//             <tr key={r.room_id}>
//               <td>{r.room_id}</td>
//               <td>{r.hotel_id}</td>
//               <td>{r.room_type}</td>
//               <td>{r.price}</td>
//               <td>
//                 <button
//                   style={styles.deleteBtn}
//                   onClick={() => deleteRoom(r.room_id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: "30px",
//     background: "#f4f6f8",
//     minHeight: "100vh",
//   },

//   table: {
//     width: "100%",
//     background: "white",
//     borderCollapse: "collapse",
//     marginTop: "10px",
//   },

//   deleteBtn: {
//     background: "red",
//     color: "white",
//     border: "none",
//     padding: "5px 10px",
//     cursor: "pointer",
//   },
// };

// export default Admin;












import { useEffect, useState } from "react";
import api from "../services/api";

function Admin() {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [showRoomForm, setShowRoomForm] = useState(false);
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchHotels(), fetchRooms()]);
    setLoading(false);
  };

  const fetchHotels = async () => {
    try {
      const res = await api.get("/admin/hotels");
      setHotels(res.data);
    } catch (err) {
      console.log("Hotels error:", err);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await api.get("/admin/rooms");
      setRooms(res.data);
    } catch (err) {
      console.log("Rooms error:", err);
    }
  };

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
  };

  const handleSaveHotel = async () => {
    try {
      if (editingHotel) {
        await api.put(`/admin/hotels/${editingHotel.hotel_id}`, hotelForm);
        alert("Hotel updated successfully!");
      } else {
        await api.post("/admin/hotels", hotelForm);
        alert("Hotel created successfully!");
      }
      setShowHotelForm(false);
      fetchHotels();
    } catch (err) {
      console.log("Save hotel error:", err);
      alert("Failed to save hotel");
    }
  };

  const deleteHotel = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const relatedRooms = rooms.filter((room) => room.hotel_id === id);
        if (relatedRooms.length > 0) {
          await Promise.all(
            relatedRooms.map((room) => api.delete(`/admin/rooms/${room.room_id}`))
          );
        }

        await api.delete(`/admin/hotels/${id}`);
        setHotels((prev) => prev.filter((h) => h.hotel_id !== id));
        setRooms((prev) => prev.filter((room) => room.hotel_id !== id));
        alert("Hotel deleted successfully!");
      } catch (err) {
        console.log("Delete hotel error:", err);
        alert("Failed to delete hotel");
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

  const handleSaveRoom = async () => {
    try {
      if (editingRoom) {
        await api.put(`/admin/rooms/${editingRoom.room_id}`, roomForm);
        alert("Room updated successfully!");
      } else {
        await api.post("/admin/rooms", roomForm);
        alert("Room created successfully!");
      }
      setShowRoomForm(false);
      fetchRooms();
    } catch (err) {
      console.log("Save room error:", err);
      alert("Failed to save room");
    }
  };

  const deleteRoom = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/admin/rooms/${id}`);
        setRooms((prev) => prev.filter((r) => r.room_id !== id));
        alert("Room deleted successfully!");
      } catch (err) {
        console.log("Delete room error:", err);
        alert("Failed to delete room");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👑 Admin Dashboard</h2>

      {loading ? (
        <p>Loading admin data...</p>
      ) : (
        <>
          {/* HOTELS SECTION */}
          <div style={styles.section}>
            <div style={styles.headerWithBtn}>
              <h3>🏨 Hotels</h3>
              <button style={styles.addBtn} onClick={handleAddHotel}>
                + Add Hotel
              </button>
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>Rating</th>
                  <th>Price/Night</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {hotels.map((h) => (
                  <tr key={h.hotel_id}>
                    <td>{h.hotel_id}</td>
                    <td>{h.name}</td>
                    <td>{h.city}</td>
                    <td>{h.rating}</td>
                    <td>{h.price_per_night}</td>
                    <td>
                      <button
                        style={styles.editBtn}
                        onClick={() => handleEditHotel(h)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => deleteHotel(h.hotel_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ROOMS SECTION */}
          <div style={styles.section}>
            <div style={styles.headerWithBtn}>
              <h3>🛏️ Rooms</h3>
              <button style={styles.addBtn} onClick={handleAddRoom}>
                + Add Room
              </button>
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Hotel ID</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Capacity</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {rooms.map((r) => (
                  <tr key={r.room_id}>
                    <td>{r.room_id}</td>
                    <td>{r.hotel_id}</td>
                    <td>{r.room_type}</td>
                    <td>{r.price}</td>
                    <td>{r.capacity}</td>
                    <td>
                      <button
                        style={styles.editBtn}
                        onClick={() => handleEditRoom(r)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => deleteRoom(r.room_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* HOTEL FORM MODAL */}
          {showHotelForm && (
            <div style={styles.modal}>
              <div style={styles.modalContent}>
                <h3>{editingHotel ? "Edit Hotel" : "Add New Hotel"}</h3>
                <input
                  style={styles.input}
                  placeholder="Hotel Name"
                  value={hotelForm.name}
                  onChange={(e) =>
                    setHotelForm({ ...hotelForm, name: e.target.value })
                  }
                />
                <input
                  style={styles.input}
                  placeholder="City"
                  value={hotelForm.city}
                  onChange={(e) =>
                    setHotelForm({ ...hotelForm, city: e.target.value })
                  }
                />
                <input
                  style={styles.input}
                  type="number"
                  placeholder="Rating"
                  value={hotelForm.rating}
                  onChange={(e) =>
                    setHotelForm({ ...hotelForm, rating: e.target.value })
                  }
                />
                <input
                  style={styles.input}
                  type="number"
                  placeholder="Price Per Night"
                  value={hotelForm.price_per_night}
                  onChange={(e) =>
                    setHotelForm({
                      ...hotelForm,
                      price_per_night: e.target.value,
                    })
                  }
                />
                <div style={styles.modalButtons}>
                  <button style={styles.saveBtn} onClick={handleSaveHotel}>
                    Save
                  </button>
                  <button
                    style={styles.cancelBtn}
                    onClick={() => setShowHotelForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ROOM FORM MODAL */}
          {showRoomForm && (
            <div style={styles.modal}>
              <div style={styles.modalContent}>
                <h3>{editingRoom ? "Edit Room" : "Add New Room"}</h3>
                <input
                  style={styles.input}
                  type="number"
                  placeholder="Hotel ID"
                  value={roomForm.hotel_id}
                  onChange={(e) =>
                    setRoomForm({ ...roomForm, hotel_id: e.target.value })
                  }
                />
                <input
                  style={styles.input}
                  placeholder="Room Type"
                  value={roomForm.room_type}
                  onChange={(e) =>
                    setRoomForm({ ...roomForm, room_type: e.target.value })
                  }
                />
                <input
                  style={styles.input}
                  type="number"
                  placeholder="Price"
                  value={roomForm.price}
                  onChange={(e) =>
                    setRoomForm({ ...roomForm, price: e.target.value })
                  }
                />
                <input
                  style={styles.input}
                  type="number"
                  placeholder="Capacity"
                  value={roomForm.capacity}
                  onChange={(e) =>
                    setRoomForm({ ...roomForm, capacity: e.target.value })
                  }
                />
                <div style={styles.modalButtons}>
                  <button style={styles.saveBtn} onClick={handleSaveRoom}>
                    Save
                  </button>
                  <button
                    style={styles.cancelBtn}
                    onClick={() => setShowRoomForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f4f6f8",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
  },

  section: {
    marginBottom: "40px",
  },

  headerWithBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },

  table: {
    width: "100%",
    background: "white",
    borderCollapse: "collapse",
    marginTop: "10px",
  },

  addBtn: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "14px",
  },

  editBtn: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "5px",
    marginRight: "5px",
  },

  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "5px",
  },

  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  modalContent: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontFamily: "Arial, sans-serif",
  },

  modalButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },

  saveBtn: {
    flex: 1,
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
  },

  cancelBtn: {
    flex: 1,
    background: "#6c757d",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Admin;