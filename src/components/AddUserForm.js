import React, { useContext, useState } from "react";
import Store from "../context";

export default function AddUserForm() {
  const { dispatch } = useContext(Store);

  const [user, setUser] = useState({});

  function onUserNameChange(e) {
    setUser({ name: e.target.value, friends: [] });
  }

  function onAddUserClick() {
    dispatch({ type: "ADD_USER", payload: user });
    setUser({ name: "" });
  }

  function onSubmit(event) {
    if (event.keyCode === 13) onAddUserClick();
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <br />
        <div className="input-group">
          <input
            className="form-control"
            value={user.name}
            autoFocus={true}
            placeholder="Enter user name"
            onKeyUp={onSubmit}
            onChange={onUserNameChange}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={onAddUserClick}>
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
