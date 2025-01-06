import { useState, useEffect } from "react";

function TicTacToe() {
  const [gameStatus, setGameStatus] = useState({
    currentTurn: "user1",
    cellsStatus: {
      a1: null,
      a2: null,
      a3: null,
      b1: null,
      b2: null,
      b3: null,
      c1: null,
      c2: null,
      c3: null,
    },
  });

  useEffect(() => {
    checkForWin();
  }, [gameStatus]);

  function restartGame() {
    setGameStatus({
      currentTurn: "user1",
      cellsStatus: {
        a1: null,
        a2: null,
        a3: null,
        b1: null,
        b2: null,
        b3: null,
        c1: null,
        c2: null,
        c3: null,
      },
    });
  }

  function gameOver(player) {
    setTimeout(() => {
      window.alert(player + " won the game");
      restartGame();
    }, 500);
  }

  function winingLogic(cell1, cell2, cell3) {
    const data = gameStatus.cellsStatus;
    if (
      data[cell1] != null &&
      data[cell2] != null &&
      data[cell3] != null &&
      data[cell1] == data[cell2] &&
      data[cell1] == data[cell3]
    ) {
      data[cell1] === "cross" ? gameOver("User1") : gameOver("User2");
    } else if (Object.keys(data).every((cell) => data[cell] != null)) {
      window.alert("Game Draw");
      restartGame();
    }
  }

  const winningCombination = [
    ["a1", "a2", "a3"],
    ["b1", "b2", "b3"],
    ["c1", "c2", "c3"],
    ["a1", "b2", "c1"],
    ["a2", "b2", "b2"],
    ["c3", "b3", "c3"],
    ["a1", "b2", "c3"],
    ["a3", "b2", "c1"],
  ];

  function checkForWin() {
    winningCombination.forEach((c) => {
      winingLogic(c[0], c[1], c[2]);
    });
  }

  function markBox(cell) {
    if (gameStatus.cellsStatus[cell] == null) {
      if (gameStatus.currentTurn === "user1") {
        setGameStatus({
          ...gameStatus,
          currentTurn: "user2",
          cellsStatus: {
            ...gameStatus.cellsStatus,
            [cell]: "cross",
          },
        });
      } else if (gameStatus.currentTurn === "user2") {
        setGameStatus({
          ...gameStatus,
          currentTurn: "user1",
          cellsStatus: {
            ...gameStatus.cellsStatus,
            [cell]: "zero",
          },
        });
      }
      checkForWin();
    }
  }

  return (
    <>
      <h1 className="text-center text-3xl font-bold">Tic Tac Toe</h1>
      <div className="grid w-fit mx-auto mt-10 grid-cols-3 grid-rows-3 justify-items-center border-2">
        <div
          className="tic-tac-toe-cell"
          onClick={() => {
            markBox("a1");
          }}
        >
          {gameStatus.cellsStatus.a1 == null ? (
            ""
          ) : gameStatus.cellsStatus.a1 === "zero" ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
        <div
          className="tic-tac-toe-cell"
          onClick={() => {
            markBox("a2");
          }}
        >
          {gameStatus.cellsStatus.a2 == null ? (
            ""
          ) : gameStatus.cellsStatus.a2 === "zero" ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
        <div
          className="tic-tac-toe-cell"
          onClick={() => {
            markBox("a3");
          }}
        >
          {gameStatus.cellsStatus.a3 == null ? (
            ""
          ) : gameStatus.cellsStatus.a3 === "zero" ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
        <div
          className="tic-tac-toe-cell"
          onClick={() => {
            markBox("b1");
          }}
        >
          {gameStatus.cellsStatus.b1 == null ? (
            ""
          ) : gameStatus.cellsStatus.b1 === "zero" ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
        <div
          className="tic-tac-toe-cell"
          onClick={() => {
            markBox("b2");
          }}
        >
          {gameStatus.cellsStatus.b2 == null ? (
            ""
          ) : gameStatus.cellsStatus.b2 === "zero" ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
        <div
          className="tic-tac-toe-cell"
          onClick={() => {
            markBox("b3");
          }}
        >
          {gameStatus.cellsStatus.b3 == null ? (
            ""
          ) : gameStatus.cellsStatus.b3 === "zero" ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
        <div
          className="tic-tac-toe-cell"
          onClick={() => {
            markBox("c1");
          }}
        >
          {gameStatus.cellsStatus.c1 == null ? (
            ""
          ) : gameStatus.cellsStatus.c1 === "zero" ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
        <div
          className="tic-tac-toe-cell"
          onClick={() => {
            markBox("c2");
          }}
        >
          {gameStatus.cellsStatus.c2 == null ? (
            ""
          ) : gameStatus.cellsStatus.c2 === "zero" ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
        <div
          className="tic-tac-toe-cell"
          onClick={() => {
            markBox("c3");
          }}
        >
          {gameStatus.cellsStatus.c3 == null ? (
            ""
          ) : gameStatus.cellsStatus.c3 === "zero" ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
      </div>
      <div className="mt-2 text-xl font-bold">
        Turn: <span>{gameStatus.currentTurn}</span>
        <span className="block text-sm">
          Symbol:&nbsp;&nbsp;
          {gameStatus.currentTurn == "user1" ? (
            <i className="bi bi-x-lg"></i>
          ) : (
            <i className="bi bi-circle"></i>
          )}
        </span>
      </div>
      <button className="btn mt-2 font-semibold" onClick={restartGame}>
        Restart
        <i className="bi bi-arrow-clockwise ml-2"></i>
      </button>
    </>
  );
}

export default TicTacToe;
