const users = [];

// Join user to room
function userJoin(id, name, room) {
  const user = { id, name, room };

  users.push(user);
  return user;
}

function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = { userJoin, userLeave, getRoomUsers };
