import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { changeUser } from "../features/user-slice";
import { status_blocked } from "../assets/constants";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const authAxios = axios.create({
    baseURL: "https://simpledashboard.herokuapp.com",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  const getUsers = () => {
    authAxios
      .get("/api/users")
      .then((res) => {
        const users = res.data.map((el) => ({ ...el, checked: false }));
        setUsers(users);

        users.forEach((el) => {
          if (el.email === user.email && el.status === status_blocked) {
            dispatch(changeUser({}));
            alert("Your account is blocked");
            navigate("/login");
          }
        });
      })
      .catch((err) => console.log(err));
  };

  const onSingleSelect = (e) => {
    const index = users.findIndex((item) => item._id === e.target.id);
    const newUsers = [...users];
    newUsers[index].checked = e.target.checked;

    setUsers(newUsers);
  };

  const onSelectAll = (e) => {
    const newUsers = users.map((el) => ({ ...el, checked: e.target.checked }));

    setUsers(newUsers);
  };

  const onClickAction = (param) => {
    const ids = [];

    users.forEach((el) => {
      if (el.checked === true) {
        ids.push(el._id);
      }
    });

    if (ids.length <= 0) {
      return alert("Please select at least one user.");
    }

    let isConfirmed = window.confirm("Confirm your action?");

    if (isConfirmed) {
      authAxios
        .get(`/api/users/${param}`, {
          params: {
            id: ids,
          },
        })
        .then((res) => {
          getUsers();
          alert(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getUsers();

    if (user.status === status_blocked) {
      alert("Your account is blocked!");
      return navigate("/login");
    }
  }, []);

  return (
    <div className="w-75 mx-auto mt-5 bg-light p-3 rounded">
      {console.log(user)}
      <div className="d-flex justify-content-end">
        <button
          onClick={() => onClickAction("block")}
          type="button"
          className="btn btn-danger me-2"
        >
          Block
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-lock ms-1"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
          </svg>
        </button>

        <button
          onClick={() => onClickAction("active")}
          type="button"
          className="btn btn-primary me-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-unlock"
            viewBox="0 0 16 16"
          >
            <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
          </svg>
        </button>

        <button
          onClick={() => onClickAction("delete")}
          type="button"
          className="btn btn-danger "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="white"
            className="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
          </svg>
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  checked={
                    users.length <= 0
                      ? false
                      : users.every((el) => el.checked === true)
                  }
                  id="flexCheckDefault"
                  onChange={onSelectAll}
                />
              </div>
            </th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">Last login time</th>
            <th scope="col">Registration time</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={user.checked}
                    id={user._id}
                    onChange={onSingleSelect}
                  />
                </div>
              </td>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.login_time?.toString().slice(0, 10)}</td>
              <td>{user.reg_time.toString().slice(0, 10)}</td>
              <td
                style={
                  user.status === "ACTIVE"
                    ? { color: "green" }
                    : { color: "red" }
                }
              >
                {user.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
