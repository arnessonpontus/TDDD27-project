currentWords = [];
gameModes = [];
rooms = [];

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

function addRoom(room) {
  rooms.push(room);
  return room;
}

function removeRoom(room) {
  rooms.pop(room);
  return room;
}

function getRooms() {
  return rooms;
}

function doesContainRoom(room) {
  const index = rooms.findIndex((savedRoom) => savedRoom === room);
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
};
