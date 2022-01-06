import React, { useState, useContext } from "react";
import Store from "../context";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FriendList.css";
import DoS from "./DoS";

export default function FriendList() {
  const { state, dispatch } = useContext(Store);
  const [addFriendModal, setAddFriendModal] = useState({
    show: false,
    friendName: "",
    user: null,
    users: [],
  });

  const [dosModal, setDosModal] = useState({
    show: false,
    users: [],
  });

  if (state.users.length === 0) {
    return <></>;
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
            <br />
            <div className="row">
              <div className="col-md-8">
                <h5>User List</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <ul className="list-group">
              {state.users.map((user) => (
                <li
                  key={user.name}
                  className={
                    dosModal.users.includes(user.name)
                      ? "list-group-item selected"
                      : "list-group-item"
                  }
                  onClick={(e) => {
                    if (dosModal.users.includes(user.name)) {
                      dosModal.users.pop(user.name);
                    } else {
                      dosModal.users.push(user.name);
                    }
                    if (dosModal.users.length >= 2) {
                      setDosModal({ ...dosModal, show: true });
                    } else {
                      setDosModal({ users: dosModal.users, show: false });
                    }
                  }}
                >
                  {user.name} -&gt; {user.friends.join(", ")}
                  <button
                    className="float-right btn btn-secondary btn-sm"
                    style={{ marginLeft: 10 }}
                    onClick={() =>
                      setAddFriendModal({
                        ...addFriendModal,
                        user: user,
                        show: !addFriendModal.show,
                        users: state.users.filter(
                          (u) =>
                            user.name != u.name &&
                            !user.friends.includes(u.name)
                        ),
                      })
                    }
                  >
                    Add Friend
                  </button>
                  {/* <button
                    className="float-right btn btn-secondary btn-sm"
                    style={{ marginLeft: 10 }}
                  >
                    Show Friends
                  </button> */}
                </li>
              ))}
            </ul>

            <Modal
              isOpen={addFriendModal.show}
              toggle={() =>
                setAddFriendModal({ ...addFriendModal, show: false })
              }
            >
              <ModalHeader
                toggle={() =>
                  setAddFriendModal({ ...addFriendModal, show: false })
                }
              >
                Add friend
              </ModalHeader>
              <ModalBody>
                <div className="input-group">
                  <select
                    onChange={(e) =>
                      setAddFriendModal({
                        ...addFriendModal,
                        friendName: e.target.value,
                      })
                    }
                  >
                    <option disabled selected>
                      Select
                    </option>
                    modal.users.length === 0 ? ({}) : (
                    {addFriendModal.users.map((user) => (
                      <option>{user.name}</option>
                    ))}
                    )
                  </select>
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setAddFriendModal({ ...addFriendModal, show: false });
                        dispatch({
                          type: "ADD_FRIEND",
                          payload: {
                            userName: addFriendModal.user.name,
                            friendName: addFriendModal.friendName,
                          },
                        });
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </ModalBody>
            </Modal>

            <Modal
              isOpen={dosModal.show}
              toggle={() => setDosModal({ ...dosModal, show: false })}
              onClosed={() => setDosModal({ ...dosModal, users: [] })}
            >
              <ModalHeader
                toggle={() => setDosModal({ ...dosModal, show: false })}
              >
                Degree of seperation
              </ModalHeader>
              <ModalBody>
                <div id="dos">
                  {dosModal.users.length >= 2 ? (
                    <div>
                      <DoS
                        users={state.users}
                        user1={dosModal.users[0]}
                        user2={dosModal.users[1]}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
