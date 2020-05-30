currentWords = [];

// Set current word to guess
function addCurrentWord(currWord, room) {
  const currentWord = { word:currWord, room:room };

  currentWords.push(currentWord);
  return currentWord.word;
}

function removeCurrentWord(room) {

  const index = currentWords.findIndex((currentWord) => currentWord.room === room);

  if (index !== -1) {
    return currentWords.splice(index, 1)[0];
  }
}
// Get current word to guess
function getCurrentWord(room) {

  return currentWords.find((currentWord) => currentWord.room === room);
}

module.exports = { addCurrentWord, removeCurrentWord, getCurrentWord };
