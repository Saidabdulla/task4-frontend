import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeUser } from "../features/user-slice";

const Navbar = () => {
  const { name } = useSelector((state) => state.user.value) || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(changeUser({}));
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-lg navbar-light bg-light px-5 d-flex justify-content-end">
      <h3 className="me-auto">{name}</h3>

      {!name ? (
        <>
          <Link className="navbar-brand btn me-2" to="/login">
            Login
          </Link>
          <Link className="navbar-brand btn me-2" to="/register">
            Register
          </Link>
        </>
      ) : null}

      {name ? (
        <button className="navbar-brand btn" onClick={logout}>
          Log out
        </button>
      ) : null}
    </nav>
  );
};

export default Navbar;
