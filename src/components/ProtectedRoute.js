import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requireAdmin = false }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (requireAdmin && role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;