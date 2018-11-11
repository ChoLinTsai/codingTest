const board = [["ABCE"], ["SFCS"], ["ADEE"]];
const coordinate = [];
const splitBoard = board.map(i =>
  i.map(j => j.split("")).map(k => k.map(x => x))
);

const getFirstLayer = splitBoard[0].map(i => {
  i.map((j, index) => {
    let obj = {
      letter: j,
      coordinate: [0, index]
    };
    coordinate.push(obj);
  });
});

const getSecondLayer = splitBoard[1].map(i => {
  i.map((j, index) => {
    let obj = {
      letter: j,
      coordinate: [1, index]
    };
    coordinate.push(obj);
  });
});

const getThirdLayer = splitBoard[2].map(i => {
  i.map((j, index) => {
    let obj = {
      letter: j,
      coordinate: [2, index]
    };
    coordinate.push(obj);
  });
});

const CheckBtn = document.querySelector("#check");

CheckBtn.addEventListener("click", () => {
  let userInput = document.querySelector("#input").value;
  if (!isNaN(Number(`${userInput}`))) return alert("Please Enter Words");
  let getInput = userInput.toUpperCase().split("");
  let usedDirs = [];
  let newDirs = [];
  let newMatchLetters = [];

  let getMatchList = getInput.map(i => {
    return coordinate.find(j => j.letter === i);
  });

  let checkIfUndefined = getMatchList.every(k => k !== undefined);
  if (!checkIfUndefined) {
    let getOuput = document.querySelector("#output");
    console.log(123123, "found undfined");
    return (getOuput.innerHTML = "false");
  }

  if (checkIfUndefined) {
    getMatchList.map((setAnchor, index) => {
      if (index === 0) {
        getPossibleDirs(setAnchor);

        newDirs.map(newDirs => {
          coordinate.map(k => {
            if (Number(newDirs.join("")) === Number(k.coordinate.join(""))) {
              newMatchLetters.push(k);
            }
          });
        });
      }

      if (index > 0) {
        let hasNewMatch = newMatchLetters.some(
          newLetters => newLetters.letter === setAnchor.letter
        );
        console.log(123, hasNewMatch);

        if (hasNewMatch) {
          newMatchLetters = [];
          getPossibleDirs(setAnchor);
          newDirs.map(newDirs => {
            coordinate.map(k => {
              if (newDirs.join("") === k.coordinate.join("")) {
                newMatchLetters.push(k);
              }
            });
          });
        }

        console.log(55555, newDirs);
        console.log(66666, usedDirs);
        let newDir1 = [];
        newDirs.forEach((newDirsitem, index1) => {
          return usedDirs.forEach(usedDirsItem => {
            if (newDirsitem.join("") === usedDirsItem.join("")) {
              return newDirs.splice(index1, 1);
            }
          });
        });
        console.log(456, `This is newDir after rm usedDirs : `);
        console.log(456, newDirs);
        // console.log(789, `This is current coord : `);
        // console.log(789, setAnchor.coordinate);
      }

      // let setAnchor = i;
      // getPossibleDirs(setAnchor);

      // newDirs.map(i => {
      //   coordinate.map(k => {
      //     if (Number(i.join("")) === Number(k.coordinate.join(""))) {
      //       newMatchLetters.push(k);
      //     }
      //   });
      // });
    });
  }

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

  // if (setAnchor === undefined) {
  //   let getOuput = document.querySelector("#output");
  //   return (getOuput.innerHTML = "false");
  // }

  // if (setAnchor) {
  //   usedDirs.push(setAnchor.coordinate);
  //   document.querySelector("#output").innerHTML = "";
  //   getPossibleDirs(setAnchor.coordinate);
  // }

  // let newInput = getInput.slice(1, getInput.length);

  // newDirs.map(i => {
  //   console.log(`This is newDirs : ${i}`);

  //   coordinate.map(k => {
  //     if (Number(i.join("")) === Number(k.coordinate.join(""))) {
  //       newMatchLetters.push(k);
  //     }

  //     console.log(`This is coordinate : ${k.coordinate}`);
  //     console.log(111111, i.join(""));
  //     console.log(222222, k.coordinate.join(""));
  //     console.log(333333, k.letter);
  //   });
  // });

  // console.log(123, newInput);
  console.log(888, `This is newDirs : `);
  console.log(888, newDirs);
  console.log(777, `This is usedDirs`);
  console.log(777, usedDirs);
  console.log(666, `This is newMatchLetters : `);
  console.log(666, newMatchLetters);
  // console.log(999, `This is anchor coords : ${setAnchor.coordinate}`);
  console.log(1111, `This is Match list`);
  console.log(1111, getMatchList);
  // console.log(333, `User input : `);
  // console.log(333, getInput);
  // console.log(coordinate);
});
