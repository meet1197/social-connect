import React, { useContext, useReducer } from "react";

import Store from "./context";
import reducer from "./reducer";

import { usePersistedContext, usePersistedReducer } from "./usePersist";

import FriendList from "./components/FriendList";
import AddUserForm from "./components/AddUserForm";
import { Header } from "./components/Header";

function App() {
  // create a global store to store the state
  const globalStore = usePersistedContext(useContext(Store), "state");

  // `todos` will be a state manager to manage state.
  const [state, dispatch] = usePersistedReducer(
    useReducer(reducer, globalStore),
    "state" // The localStorage key
  );

  return (
    // State.Provider passes the state and dispatcher to the down
    <Store.Provider value={{ state, dispatch }}>
      <Header />
      <AddUserForm />
      <FriendList />
    </Store.Provider>
  );
}

export default App;
