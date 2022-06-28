import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import AuthPage from "./pages/auth/";
import EventPage from "./pages/events";
import HistoryPage from "./pages/history";
import NotFound from "./pages/404";
import Logout from "./components/common/Logout";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";
import Checkpoint from "./pages/checkpoint";
import DriverPage from "./pages/drivers";
import UnitPage from "./pages/units";
import CompliancePage from "./pages/compliance";

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<PublicRoute />}>
					<Route exact path="/" element={<Navigate to="/login" />} />
					<Route exact path="/login" element={<AuthPage />} />
				</Route>
				<Route element={<PrivateRoute />}>
					<Route exact path="/events" element={<EventPage />} />
					<Route exact path="/history" element={<HistoryPage />} />
					<Route exact path="/checkpoint" element={<Checkpoint />} />
					<Route exact path="/drivers" element={<DriverPage />} />
					<Route exact path="/units" element={<UnitPage />} />
					<Route exact path="/compliance" element={<CompliancePage />} />
					<Route exact path="/logout" element={<Logout />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
