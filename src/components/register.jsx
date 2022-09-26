import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://simpledashboard.herokuapp.com/api/register", formData)
      .then((response) => navigate("/login"))
      .catch((error) => alert(error.response.data.error));
  };

  return (
    <div className="w-25 mx-auto my-5 bg-light rounded p-4">
      <h2 className="text-center">Registration</h2>

      <form action="#" onSubmit={onSubmit}>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={onChange}
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            required
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={onChange}
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
            value={password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3 w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
