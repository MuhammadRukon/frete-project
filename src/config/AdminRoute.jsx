import { Navigate } from "react-router-dom";
import useAdmin from "../hook/useAdmin";
import useAuth from "../hook/useAuth";
import CircularProgress from "@mui/material/CircularProgress";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isLoading] = useAdmin();
  console.log(isAdmin, "isAdmin");
  if (!user || loading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <CircularProgress />
      </div>
    );
  if (!isAdmin && isLoading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <CircularProgress />
      </div>
    );
  if (isAdmin) return children;
  return <Navigate to="/" />;
};

export default AdminRoute;
