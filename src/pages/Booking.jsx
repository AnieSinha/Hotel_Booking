// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../services/api";

// function Booking() {
//   const { roomId } = useParams();
//   const navigate = useNavigate();

//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleBooking = async () => {
//     setLoading(true);
//     setMessage("");

//     try {
//       const token = localStorage.getItem("token");

//       const res = await api.post(
//         `/bookings/book-room-proc`,
//         null, // no body (your backend uses query params)
//         {
//           params: {
//             room_id: roomId,
//             check_in: checkIn,
//             check_out: checkOut,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage(res.data.message);

//       setTimeout(() => {
//         navigate("/history");
//       }, 1500);
//     } catch (err) {
//       console.log(err);

//       setMessage(
//         err.response?.data?.detail || "Booking failed"
//       );
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2>🏨 Book Room</h2>

//         <p>Room ID: {roomId}</p>

//         <input
//           type="date"
//           style={styles.input}
//           onChange={(e) => setCheckIn(e.target.value)}
//         />

//         <input
//           type="date"
//           style={styles.input}
//           onChange={(e) => setCheckOut(e.target.value)}
//         />

//         <button
//           style={styles.button}
//           onClick={handleBooking}
//           disabled={loading}
//         >
//           {loading ? "Booking..." : "Confirm Booking"}
//         </button>

//         {message && <p style={styles.message}>{message}</p>}

//         <p
//           style={{ cursor: "pointer", color: "blue" }}
//           onClick={() => navigate("/hotels")}
//         >
//           ← Back to Hotels
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
//     background: "#f4f6f8",
//   },
//   card: {
//     padding: "30px",
//     background: "white",
//     borderRadius: "10px",
//     width: "320px",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
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

// export default Booking;










import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function Booking() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    setLoading(true);
    setMessage("");

    // ✅ basic validation
    if (!checkIn || !checkOut) {
      setMessage("Please select check-in and check-out dates");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post(
        "/bookings/book-room-proc",
        null,
        {
          params: {
            room_id: roomId,
            check_in: checkIn,
            check_out: checkOut,
          },
        }
      );

      setMessage(res.data.message || "Booking successful!");

      setTimeout(() => {
        navigate("/history");
      }, 1500);

    } catch (err) {
      console.log(err);

      setMessage(
        err.response?.data?.detail || "Booking failed"
      );
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🏨 Book Room</h2>

        <p>Room ID: {roomId}</p>

        <input
          type="date"
          style={styles.input}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        <input
          type="date"
          style={styles.input}
          onChange={(e) => setCheckOut(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleBooking}
          disabled={loading}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>

        {message && <p style={styles.message}>{message}</p>}

        <p
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => navigate("/hotels")}
        >
          ← Back to Hotels
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6f8",
  },
  card: {
    padding: "30px",
    background: "white",
    borderRadius: "10px",
    width: "320px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  message: {
    marginTop: "10px",
    color: "red",
  },
};

export default Booking;