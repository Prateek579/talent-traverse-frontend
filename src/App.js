import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobStoreState from "./context/JobStoreState";
import Login from "./Components/login/Login";
import SignUp from "./Components/signup/SignUp";
import Home from "./Components/home/Home";
import Alert from "./Components/alert/Alert";

function App() {
  return (
    <Router>
      <JobStoreState>
        <Alert/>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </JobStoreState>
    </Router>
  );
}

export default App;
