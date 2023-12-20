import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Profile from "./components/profile/Profile";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
import AuthProvider from "./components/context/AuthenticationProvider";

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/" element={<Login />} />
          </Routes>
        </AuthProvider>
        <Routes>
          <Route path="/reg" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
