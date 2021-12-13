import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth/";
import EventPage from "./pages/events";
import NotFound from "./pages/404";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/login"/>} />
        <Route exact path="/login" element={<AuthPage/>}/>
        <Route exact path="/events" element={<EventPage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
