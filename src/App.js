import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth/";
import EventPage from "./pages/events";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<AuthPage/>}/>
        <Route exact path="/events" element={<EventPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
