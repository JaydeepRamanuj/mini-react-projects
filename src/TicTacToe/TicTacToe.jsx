import { useState, useEffect } from 'react';

function TicTacToe() {
  const [gameStatus, setGameStatus] = useState({
    currentTurn: 'user1',
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
      currentTurn: 'user1',
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
      window.alert(player + ' won the game');
      restartGame();
    }, 500);
  }

  function winingLogic(cell1, cell2, cell3) {
    if (
      cell1 != null &&
      cell2 != null &&
      cell3 != null &&
      cell1 == cell2 &&
      cell1 == cell3
    ) {
      return true;
    } else {
      return false;
    }
  }

  function checkForWin() {
    if (
      winingLogic(
        gameStatus.cellsStatus.a1,
        gameStatus.cellsStatus.a2,
        gameStatus.cellsStatus.a3
      )
    ) {
      gameStatus.cellsStatus.a1 === 'cross'
        ? gameOver('User1')
        : gameOver('User2');
    } else if (
      winingLogic(
        gameStatus.cellsStatus.b1,
        gameStatus.cellsStatus.b2,
        gameStatus.cellsStatus.b3
      )
    ) {
      gameStatus.cellsStatus.b1 === 'cross'
        ? gameOver('User1')
        : gameOver('User2');
    } else if (
      winingLogic(
        gameStatus.cellsStatus.c1,
        gameStatus.cellsStatus.c2,
        gameStatus.cellsStatus.c3
      )
    ) {
      gameStatus.cellsStatus.c1 === 'cross'
        ? gameOver('User1')
        : gameOver('User2');
    } else if (
      winingLogic(
        gameStatus.cellsStatus.a1,
        gameStatus.cellsStatus.b1,
        gameStatus.cellsStatus.c1
      )
    ) {
      gameStatus.cellsStatus.a1 === 'cross'
        ? gameOver('User1')
        : gameOver('User2');
    } else if (
      winingLogic(
        gameStatus.cellsStatus.a2,
        gameStatus.cellsStatus.b2,
        gameStatus.cellsStatus.c2
      )
    ) {
      gameStatus.cellsStatus.a2 === 'cross'
        ? gameOver('User1')
        : gameOver('User2');
    } else if (
      winingLogic(
        gameStatus.cellsStatus.a3,
        gameStatus.cellsStatus.b3,
        gameStatus.cellsStatus.c3
      )
    ) {
      gameStatus.cellsStatus.a3 === 'cross'
        ? gameOver('User1')
        : gameOver('User2');
    } else if (
      winingLogic(
        gameStatus.cellsStatus.a1,
        gameStatus.cellsStatus.b2,
        gameStatus.cellsStatus.c3
      )
    ) {
      gameStatus.cellsStatus.a1 === 'cross'
        ? gameOver('User1')
        : gameOver('User2');
    } else if (
      winingLogic(
        gameStatus.cellsStatus.a3,
        gameStatus.cellsStatus.b2,
        gameStatus.cellsStatus.c1
      )
    ) {
      gameStatus.cellsStatus.a3 === 'cross'
        ? gameOver('User1')
        : gameOver('User2');
    } else if (
      Object.keys(gameStatus.cellsStatus).every(
        (cell) => gameStatus.cellsStatus[cell] != null
      )
    ) {
      console.log('Draw');
    }
  }

  function markBox(cell) {
    // console.log(gameStatus);

    if (gameStatus.cellsStatus[cell] == null) {
      if (gameStatus.currentTurn === 'user1') {
        setGameStatus({
          ...gameStatus,
          currentTurn: 'user2',
          cellsStatus: {
            ...gameStatus.cellsStatus,
            [cell]: 'cross',
          },
        });
      } else if (gameStatus.currentTurn === 'user2') {
        setGameStatus({
          ...gameStatus,
          currentTurn: 'user1',
          cellsStatus: {
            ...gameStatus.cellsStatus,
            [cell]: 'zero',
          },
        });
      }
    }

    checkForWin();
  }

  return (
    <>
      <h1 className="text-center text-3xl font-bold">Tic Tac Toe</h1>
      <div className="grid w-fit mx-auto mt-10 grid-cols-3 grid-rows-3 justify-items-center border-2">
        <div
          className="cell size-24 border-2 flex justify-center items-center"
          // className={`cell size-24 border-2 flex justify-center items-center bg-gray-300 active:scale-95 text-3xl ${
          //   gameStatus.cellsStatus.a1 !== null &&
          //   gameStatus.cellsStatus.a1 === 'zero'
          //     ? 'bg-blue-200'
          //     : 'bg-purple-200'
          // }`}
          onClick={() => {
            markBox('a1');
          }}
        >
          {gameStatus.cellsStatus.a1 == null ? (
            ''
          ) : gameStatus.cellsStatus.a1 === 'zero' ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
        <div
          className="cell size-24 border-2 flex justify-center items-center"
          onClick={() => {
            markBox('a2');
          }}
        >
          {gameStatus.cellsStatus.a2 == null ? (
            ''
          ) : gameStatus.cellsStatus.a2 === 'zero' ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
        <div
          className="cell size-24 border-2 flex justify-center items-center"
          onClick={() => {
            markBox('a3');
          }}
        >
          {gameStatus.cellsStatus.a3 == null ? (
            ''
          ) : gameStatus.cellsStatus.a3 === 'zero' ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
        <div
          className="cell size-24 border-2 flex justify-center items-center"
          onClick={() => {
            markBox('b1');
          }}
        >
          {gameStatus.cellsStatus.b1 == null ? (
            ''
          ) : gameStatus.cellsStatus.b1 === 'zero' ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
        <div
          className="cell size-24 border-2 flex justify-center items-center"
          onClick={() => {
            markBox('b2');
          }}
        >
          {gameStatus.cellsStatus.b2 == null ? (
            ''
          ) : gameStatus.cellsStatus.b2 === 'zero' ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
        <div
          className="cell size-24 border-2 flex justify-center items-center"
          onClick={() => {
            markBox('b3');
          }}
        >
          {gameStatus.cellsStatus.b3 == null ? (
            ''
          ) : gameStatus.cellsStatus.b3 === 'zero' ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
        <div
          className="cell size-24 border-2 flex justify-center items-center"
          onClick={() => {
            markBox('c1');
          }}
        >
          {gameStatus.cellsStatus.c1 == null ? (
            ''
          ) : gameStatus.cellsStatus.c1 === 'zero' ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
        <div
          className="cell size-24 border-2 flex justify-center items-center"
          onClick={() => {
            markBox('c2');
          }}
        >
          {gameStatus.cellsStatus.c2 == null ? (
            ''
          ) : gameStatus.cellsStatus.c2 === 'zero' ? (
            <i className="bi bi-circle"></i>
          ) : (
            <i className="bi bi-x-lg"></i>
          )}
        </div>
        <div
          className="cell size-24 border-2 flex justify-center items-center"
          onClick={() => {
            markBox('c3');
          }}
        >
          {gameStatus.cellsStatus.c3 == null ? (
            ''
          ) : gameStatus.cellsStatus.c3 === 'zero' ? (
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
          {gameStatus.currentTurn == 'user1' ? (
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
