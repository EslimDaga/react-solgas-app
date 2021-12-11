import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth/";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<AuthPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
