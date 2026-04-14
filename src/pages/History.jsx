// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";

// function History() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await api.get("/bookings/my-bookings", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setBookings(res.data);
//     } catch (err) {
//       console.log(err);
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>📜 My Booking History</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         <div style={styles.grid}>
//           {bookings.map((b) => (
//             <div key={b.booking_id} style={styles.card}>
//               <h3>Booking #{b.booking_id}</h3>

//               <p><b>🏨 Hotel:</b> {b.hotel_name}</p>
//               <p><b>🛏 Room ID:</b> {b.room_id}</p>
//               <p><b>📅 Check-in:</b> {b.check_in}</p>
//               <p><b>📅 Check-out:</b> {b.check_out}</p>

//               <p>
//                 <b>Status:</b>{" "}
//                 <span
//                   style={{
//                     color:
//                       b.status === "CONFIRMED"
//                         ? "green"
//                         : b.status === "CANCELLED"
//                         ? "red"
//                         : "orange",
//                   }}
//                 >
//                   {b.status}
//                 </span>
//               </p>
//             </div>
//           ))}
//         </div>
//       )}

//       <button style={styles.button} onClick={() => navigate("/hotels")}>
//         ← Back to Hotels
//       </button>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: "30px",
//     minHeight: "100vh",
//     background: "#f4f6f8",
//   },

//   title: {
//     textAlign: "center",
//     marginBottom: "20px",
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
//     marginTop: "20px",
//     padding: "10px 20px",
//     background: "black",
//     color: "white",
//     border: "none",
//     cursor: "pointer",
//     display: "block",
//     marginLeft: "auto",
//     marginRight: "auto",
//   },
// };

// export default History;













import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function History() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/bookings/my-bookings");
      setBookings(res.data);
    } catch (err) {
      console.log("Error fetching history:", err);
    }
    setLoading(false);
  };

  const cancelBooking = async (bookingId) => {
    try {
      setCancellingId(bookingId);

      await api.put(`/bookings/cancel/${bookingId}`);

      // 🔥 Update UI instantly (no refresh needed)
      setBookings((prev) =>
        prev.map((b) =>
          b.booking_id === bookingId
            ? { ...b, status: "CANCELLED" }
            : b
        )
      );
    } catch (err) {
      console.log("Cancel error:", err);
      alert("Failed to cancel booking");
    }

    setCancellingId(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📜 My Booking History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div style={styles.grid}>
          {bookings.map((b) => (
            <div key={b.booking_id} style={styles.card}>
              <h3>Booking #{b.booking_id}</h3>

              <p><b>🏨 Hotel:</b> {b.hotel_name}</p>
              <p><b>🛏 Room ID:</b> {b.room_id}</p>
              <p><b>📅 Check-in:</b> {b.check_in}</p>
              <p><b>📅 Check-out:</b> {b.check_out}</p>

              <p>
                <b>Status:</b>{" "}
                <span
                  style={{
                    color:
                      b.status === "CONFIRMED"
                        ? "green"
                        : b.status === "CANCELLED"
                        ? "red"
                        : "orange",
                  }}
                >
                  {b.status}
                </span>
              </p>

              {/* 🚨 CANCEL BUTTON */}
              {b.status === "CONFIRMED" && (
                <button
                  style={styles.cancelBtn}
                  disabled={cancellingId === b.booking_id}
                  onClick={() => cancelBooking(b.booking_id)}
                >
                  {cancellingId === b.booking_id
                    ? "Cancelling..."
                    : "Cancel Booking"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <button style={styles.button} onClick={() => navigate("/hotels")}>
        ← Back to Hotels
      </button>
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
  },

  cancelBtn: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  button: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
};

export default History;