import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthenticationProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const authState = useContext(authContext);
  const [message, setMessage] = useState("");

  console.log(authState.name);

  const handleLogout = () => {
    setTimeout(() => {
      setMessage("");
      authState.setAuth(false);
      authState.setId("");
      authState.setName("");
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            GUVI
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {!authState.auth && (
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">
                    Login
                  </Link>
                </li>
              )}
              {!authState.auth && (
                <li>
                  <Link
                    to="/reg"
                    className="nav-link active"
                    aria-current="page"
                  >
                    SignUp
                  </Link>
                </li>
              )}
              {authState.auth && (
                <li className="nav-item">
                  <Link
                    to="/profile"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Profile
                  </Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ms-auto">
              {authState.auth && (
                <li className="nav-item">
                  <span className="ms-2 text-light">{`${authState.name} `}</span>
                  <button
                    className="btn btn-outline-light"
                    onClick={handleLogout}
                    disabled={!authState.auth}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
