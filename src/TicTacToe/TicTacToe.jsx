function TicTacToe() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold">Tic Tac Toe</h1>
      <div className="grid w-fit mx-auto mt-10 grid-cols-3 grid-rows-3 justify-items-center border-2">
        <div className="cell size-24 border-2 flex justify-center items-center">
          0
        </div>
        <div className="cell size-24 border-2 flex justify-center items-center">
          0
        </div>
        <div className="cell size-24 border-2 flex justify-center items-center">
          0
        </div>
        <div className="cell size-24 border-2 flex justify-center items-center">
          0
        </div>
        <div className="cell size-24 border-2 flex justify-center items-center">
          0
        </div>
        <div className="cell size-24 border-2 flex justify-center items-center">
          0
        </div>
        <div className="cell size-24 border-2 flex justify-center items-center">
          0
        </div>
        <div className="cell size-24 border-2 flex justify-center items-center">
          0
        </div>
        <div className="cell size-24 border-2 flex justify-center items-center">
          0
        </div>
      </div>
      <div className="mt-2 text-xl font-bold">
        Turn: <span></span>
      </div>
      <button className="btn mt-2 font-semibold">
        Restart
        <i className="bi bi-arrow-clockwise ml-2"></i>
      </button>
    </>
  );
}

export default TicTacToe;
