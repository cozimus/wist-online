const users = [];

//Add a user to the list and return all users in the room
function addUser(newUser) {
  users.push(newUser);
  return users.filter((users) => users.roomId == newUser.roomId);
}

//Get the room for an id
function getRoom(id) {
  let room = "";
  if (users.find((users) => users.userId == id)) {
    room = users.find((users) => users.userId == id).roomId;
  }
  return room;
}

//Remove a user from the listand return all users in the old room
function removeUser(id) {
  const index = users.findIndex((users) => users.userId == id);
  const oldRoom = getRoom(id);
  if (index !== -1) {
    users.splice(index, 1);
    return users.filter((users) => users.roomId == oldRoom);
  }
}

//Get people in the room
function playersInRoom(roomId) {
  return users.filter((users) => users.roomId == roomId);
}

function getUsers() {
  return users;
}

function setNotReady(roomId) {
  users
    .filter((users) => users.roomId == roomId)
    .forEach((user) => (user.ready = false));
  return users.filter((users) => users.roomId == roomId);
}

function updateUsers(newUsers) {
  newUsers.map((newUser) =>
    users.find((oldUser) => oldUser.userId === newUser.userId)
      ? (users[
          users.findIndex((oldUser) => oldUser.userId === newUser.userId)
        ] = newUser)
      : users.push(newUser)
  );
  return users.filter((users) => users.roomId == newUsers[0].roomId);
}

export {
  addUser,
  removeUser,
  getRoom,
  playersInRoom,
  getUsers,
  setNotReady,
  updateUsers,
};
// { userName, userId, roomId, host, ready}
