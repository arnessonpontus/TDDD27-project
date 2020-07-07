const users = [];

// Join user to room
function userJoin(socketId, name, id, room) {
  const user = { socketId, name, id, room };

  users.push(user);
  return user;
}

function userLeave(id) {
  const index = users.findIndex((user) => user.socketId === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.socketId === id);
}

function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = { userJoin, getCurrentUser, userLeave, getRoomUsers };
