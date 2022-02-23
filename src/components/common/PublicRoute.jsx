import { Navigate, Outlet } from "react-router-dom";
import cache from "../../helpers/cache";

const useAuth = () => {
  const user = cache.getItem("user");
  return user;
}

const PublicRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/events" /> : <Outlet />;
}

export default PublicRoute;