import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { changeUser } from "../features/user-slice";
import { status_active } from "../assets/constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://simpledashboard.herokuapp.com/api/login", formData)
      .then((response) => {
        const { status } = response.data;

        dispatch(changeUser(response.data));

        if (status === status_active) {
          navigate("/dashboard");
        } else {
          alert("Your account is blocked!");
          dispatch(changeUser({}));
        }
      })
      .catch((error) => alert(error.response.data.error));
  };

  return (
    <div className="w-25 mx-auto my-5 bg-light rounded p-4">
      <h2 className="text-center">Login</h2>

      <form action="#" onSubmit={onSubmit}>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            required
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            onChange={onChange}
            value={email}
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            required
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            onChange={onChange}
            value={password}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3 w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
