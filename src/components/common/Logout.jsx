import { useEffect } from "react";
import cache from "../../helpers/cache";

const Logout = () => {
	useEffect(() => {
		cache.removeItem("user");
		window.location.href = "/";
	}, []);
	return null;
};

export default Logout;
