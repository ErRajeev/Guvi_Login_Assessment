import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../context/AuthenticationProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const authState = useContext(authContext);
  // console.log(authState.auth);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email.toLowerCase(),
        password: password,
      });
      const result = response.data;

      if (response.status == 200) {
        console.log(result);
        // console.log(result.id);

        authState.setAuth(true);
        authState.setId(result.id);
        authState.setName(result.success);

        setSuccess(result.success);
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        console.log("Failed to login");
        setError(result.error);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      const err = await error.response.data.error;
      setTimeout(() => {
        setError("");
      }, 2000);
      setError(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      {success && (
        <div className="alert alert-success text-center" role="alert">
          {success}
        </div>
      )}

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn btn-success" onClick={handleLogin}>
        Login
      </button>
      <br />
      <div className="mt-3">
        <strong>
          Don't have an account ?
          <Link to="/reg" className="btn btn-link">
            Sign Up
          </Link>
        </strong>
      </div>
    </div>
  );
};

export default Login;
