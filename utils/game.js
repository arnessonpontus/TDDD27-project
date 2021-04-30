let currentWords = [];
let gameModes = [];
let rooms = [];

// Set current word to guess
function addCurrentWord(currWord, currentDrawer, room) {
  const currentWord = { word: currWord, drawer: currentDrawer, room: room };

  currentWords.push(currentWord);
  return currentWord.word;
}

function removeCurrentWord(room) {
  const index = currentWords.findIndex(
    (currentWord) => currentWord.room === room
  );

  if (index !== -1) {
    return currentWords.splice(index, 1)[0];
  }
}
// Get current word to guess
function getCurrentWord(room) {
  return currentWords.find((currentWord) => currentWord.room === room);
}

function addRoom(room, name, id) {
  rooms.push({ name: room, leader: { name: name, leaderId: id } });
  return room;
}

function removeRoom(roomName) {
  const index = rooms.findIndex((room) => room.name === roomName);

  if (index !== -1) {
    return rooms.splice(index, 1)[0];
  }
  return rooms;
}

function getRoomLeader(roomName) {
  const room = rooms.find((room) => room.name === roomName);
  return { name: room.leader.name, leaderId: room.leader.leaderId };
}

function setRoomLeader(roomName, leader) {
  const room = rooms.find((room) => room.name === roomName);
  room.leader = leader;
  return leader;
}

function getRooms() {
  return rooms;
}

function doesContainRoom(roomName) {
  const index = rooms.findIndex((savedRoom) => savedRoom.name === roomName);
  if (index !== -1) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  addCurrentWord,
  removeCurrentWord,
  getCurrentWord,
  addRoom,
  removeRoom,
  getRooms,
  doesContainRoom,
  getRoomLeader,
  setRoomLeader,
};
