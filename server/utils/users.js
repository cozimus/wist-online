const users = [];

//Add a user to the list and return all users in the room
function addUser(newUser) {
  users.push(newUser);
  return users.filter((users) => users.roomId === newUser.roomId);
}

//Get the room for the userId
function getRoom(userId) {
  let room = "";
  if (users.find((users) => users.userId === userId)) {
    room = users.find((users) => users.userId === userId).roomId;
  }
  return room;
}

//Remove a user from the listand return all users in the old room
function removeUser(id) {
  const index = users.findIndex((users) => users.userId === id);
  const oldRoom = getRoom(id);
  if (index !== -1) {
    users.splice(index, 1);
    return users.filter((users) => users.roomId === oldRoom);
  }
}

function getRoomBySocket(socketId) {
  let room = "";
  if (users.find((users) => users.socketId === socketId)) {
    room = users.find((users) => users.socketId === socketId).roomId;
  }
  return room;
}

function removeUserBySocket(socketId) {
  const index = users.findIndex((users) => users.socketId === socketId);
  const oldRoom = getRoomBySocket(socketId);
  if (index !== -1) {
    users.splice(index, 1);
    return users.filter((users) => users.roomId === oldRoom);
  }
}

//Get people in the room
function playersInRoom(roomId) {
  return users.filter((users) => users.roomId === roomId);
}

function getUsers() {
  return users;
}

function setNotReady(roomId) {
  users
    .filter((users) => users.roomId === roomId)
    .forEach((user) => (user.ready = false));
  return users.filter((users) => users.roomId === roomId);
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
  removeUserBySocket,
  getRoomBySocket,
};
// { userName, userId, roomId, host, ready}
