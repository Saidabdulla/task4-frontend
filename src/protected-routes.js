import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useAuth = () => {
  const user = useSelector((state) => state.user.value);
  return user && user.token;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
