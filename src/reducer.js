export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER":
      // return current state if empty
      if (!action.payload) {
        return state;
      }
      // return current state if duplicate
      if (state.users.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "ADD_FRIEND":
      let user = state.users.find((u) => u.name === action.payload.userName);
      if (!user.friends.includes(action.payload.friendName)) {
        user.friends.push(action.payload.friendName);
      }

      let friend = state.users.find(
        (f) => f.name === action.payload.friendName
      );

      if (!friend.friends.includes(user.name)) {
        friend.friends.push(user.name);
      }

      return { ...state };
    default:
      return state;
  }
}
