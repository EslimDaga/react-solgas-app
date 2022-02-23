import { Navigate, Outlet } from "react-router-dom";
import cache from "../../helpers/cache";

const useAuth = () => {
  const user = cache.getItem("user");
  return user;
}

const PrivateRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;