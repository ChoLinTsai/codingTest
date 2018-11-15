const board = [["ABCE"], ["SFCS"], ["ADEE"]];
const coordinate = [];
const splitBoard = board.map(i =>
  i.map(j => j.split("")).map(k => k.map(x => x))
);

// Create coordinate array
splitBoard.map((i, index1) => {
  i.map(j =>
    j.map((k, index2) => {
      let obj = {
        letter: k,
        coordinate: [index1, index2]
      };
      coordinate.push(obj);
    })
  );
});

module.exports = function inputValidattion(getUserInput) {
  let result;
  let userInput = getUserInput;

  // check if userinput is longer than 12 chars, then return false
  if (userInput.length > 12) {
    alert("Maximum Words reached, please enter 1-12 words");
    return (result = false);
  }

  // check if userinput is number, then return false;
  if (!isNaN(Number(`${userInput}`))) {
    alert("Please Enter Words");
    return (result = false);
  }

  let getInput = userInput.toUpperCase().split("");
  let usedDirs = [];
  let newDirs = [];
  let newMatchLetters = [];

  // get userInput to match our board letters
  let getMatchList = getInput.map(i => {
    return coordinate.find(j => j.letter === i);
  });

  // check after match and if there is an undefined, return false
  let checkIfUndefined = getMatchList.every(k => k !== undefined);
  if (!checkIfUndefined) {
    return false;
  }

  // check if userInput all matched, then start to check all letters
  if (checkIfUndefined) {
    getMatchList.map((setAnchor, index) => {
      let needToStop = false;
      if (needToStop) return;

      // set first letter to anchor and get new directions
      if (index === 0) {
        getPossibleDirs(setAnchor);
        newDirs.map(newDirs => {
          coordinate.map(k => {
            if (Number(newDirs.join("")) === Number(k.coordinate.join(""))) {
              newMatchLetters.push(k);
            }
          });
        });
        return (result = true);
      }

      // set anchor letter starts with the second letter
      if (index > 0) {
        // check current anchor letter with newMatchLetters
        let checkIsMatch = newMatchLetters.some(newLetter => {
          return newLetter.letter === setAnchor.letter;
        });

        /*
          if there is a match
          set new anchor
          get next possible letters
          remove used letter
          get a new set of newMatchLetters
        */
        if (checkIsMatch) {
          let getAnchor = newMatchLetters.filter(newLetter => {
            return newLetter.letter === setAnchor.letter;
          })[0];
          getPossibleDirs(getAnchor);

          newDirs.map((newDirsitem, index1) => {
            return usedDirs.map(usedDirsItem => {
              if (newDirsitem.join("") === usedDirsItem.join("")) {
                return newDirs.splice(index1, 1);
              }
            });
          });

          newMatchLetters = [];
          let getNewLetters = newDirs.map(newDirsitem => {
            return coordinate.filter(coordsItem => {
              return newDirsitem.join("") === coordsItem.coordinate.join("");
            });
          });
          getNewLetters.map(i => i.map(j => newMatchLetters.push(j)));
          return (result = true);
        } else {
          needToStop = true;
          return (result = false);
        }
      }
    });
    return result;
  }
  return result;

  // function to get possible directions
  function getPossibleDirs(setAnchor) {
    newDirs = [];
    let coords = setAnchor.coordinate;
    usedDirs.push(coords);
    return coords.map((i, index) => {
      switch (index) {
        case 0:
          if (i - 1 >= 0) {
            newDirs.push([i - 1, setAnchor.coordinate[index + 1]]);
          }
          if (i + 1 < 3) {
            newDirs.push([i + 1, setAnchor.coordinate[index + 1]]);
          }
          break;
        case 1:
          if (i - 1 >= 0) {
            newDirs.push([setAnchor.coordinate[index - 1], i - 1]);
          }
          if (i + 1 <= 3) {
            newDirs.push([setAnchor.coordinate[index - 1], i + 1]);
          }
          break;
        default:
          return;
      }
    });
  }
};
