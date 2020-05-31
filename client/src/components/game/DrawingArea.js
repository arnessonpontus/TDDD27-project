import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { getAllWords } from "../../actions/wordActions";
import {
  setGameStarted,
  addGamePoints,
  setCurrentDrawer,
  setDrawingWord,
} from "../../actions/gameActions";
import PropTypes from "prop-types";
import { CirclePicker } from "react-color";

const DrawingArea = (props) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [penSize, setPenSize] = useState(20);
  const [penColor, setPenColor] = useState("black");
  const [isCanvasdisabled, setIsCanvasdisabled] = useState(true);
  const [canvasWidth, setCanvasWidth] = useState(true);
  const [canvasHeight, setCanvasHeight] = useState(true);
  const [showDrawingWord, setShowDrawingWord] = useState(false);
  const [fadeWord, setFadeWord] = useState(false);
  const [gameWinner, setGameWinner] = useState("");
  const [prevWord, setPrevWord] = useState("");

  const { category, gameStarted, drawingWord, currentDrawer } = props.game;
  const { user } = props.auth;
  // Init reference
  const canvasRef = React.useRef(null);
  const parentRef = React.useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const parent = parentRef.current;

    // Set canvas dimensions to same as parent
    setCanvasHeight(parent.clientHeight);
    setCanvasWidth(parent.clientWidth);

    props.socket.on("gameStart", ({ currentDrawer, currentWord }) => {
      props.setCurrentDrawer(currentDrawer);
      props.setDrawingWord(currentWord);
      props.setGameStarted(true);
      setGameWinner("");
    });

    props.socket.on("gameEnd", (winner) => {
      setIsCanvasdisabled(true);
      setFadeWord(false);

      // Add points to drawer and gueser
      if (winner.user) {
        if (winner.user.email === user.email) {
          props.addGamePoints(winner.user.email, 20);
        } else if (winner.drawingUser.email === user.email) {
          props.addGamePoints(winner.drawingUser.email, 10);
        }

        setGameWinner(winner.user.name);
      }
      // Set the prev word so it can be displayed
      setPrevWord(winner.word);
    });

    props.socket.on("AllowDraw", () => {
      setIsCanvasdisabled(false);
    });

    // Receive drawing from server
    props.socket.on("drawing", (drawing) => {
      draw(canvas, context, drawing);
    });
  }, []);

  // Main drawing function
  const draw = (canvas, ctx, drawing) => {
    if (drawing.shouldClear) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    if (!drawing.isCurrDrawing) {
      ctx.beginPath();
      return;
    }
    ctx.lineWidth = drawing.strokeWidth;
    ctx.lineCap = "round";
    ctx.save();
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = drawing.strokeColor;
    ctx.lineTo(drawing.x - rect.left, drawing.y - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(drawing.x - rect.left, drawing.y - rect.top);
    ctx.restore();
  };

  const onMouseDown = (e) => {
    setIsDrawing(true);
  };

  const onMouseUp = (e) => {
    setIsDrawing(false);
  };

  // Get params for drawing and send to server
  const onMouseMove = (e) => {
    if (isCanvasdisabled) return;
    const x = e.clientX;
    const y = e.clientY;

    const drawing = {
      x,
      y,
      isCurrDrawing: isDrawing,
      strokeWidth: penSize,
      strokeColor: "#" + penColor,
    };

    // Emit message
    props.socket.emit("drawing", drawing);
  };

  // Remove # since svg do not want that in fill color
  const onChangeColor = (color) => {
    setPenColor(color.hex.substring(1));
  };

  const onChangeSize = (size) => {
    setPenSize(size);
  };

  const onGameStart = () => {
    const { allWords } = props.word;

    // Check which category it is
    let wordList = [];
    if (category !== "All") {
      wordList = allWords.filter(
        (word) => word.category === category.toLowerCase()
      );
    } else {
      wordList = allWords;
    }

    //Get random word from the list of words
    const currentWord = wordList[Math.floor(Math.random() * wordList.length)];

    props.socket.emit("gameStart", {
      currentWord: currentWord.name,
      name: user.name,
      email: user.email,
    });
    props.setGameStarted(true);
    setGameWinner("");

    setShowDrawingWord(true);

    setTimeout(() => {
      setFadeWord(true);
    }, 1000);

    setTimeout(() => {
      setShowDrawingWord(false);
    }, 3000);
  };

  // TODO: Fix with correct canvas dims
  // TODO: Fix position of winner text
  return (
    <div className="column box is-three-fifths is-paddingless" ref={parentRef}>
      <div style={{ padding: 5 }} className="buttons has-background-light">
        <CirclePicker
          onChangeComplete={onChangeColor}
          circleSize={15}
          circleSpacing={10}
          width={120}
          colors={[
            "#000000",
            "#e61717",
            "#f5db67",
            "#3af736",
            "#2afaf0",
            "#0070e0",
            "#f29cff",
            "#967a62",
          ]}
        />
        <span
          style={{ cursor: "pointer", marginRight: 15 }}
          onClick={() => onChangeColor({ hex: "#ffffff" })}
        >
          <i className="fas fa-eraser is-large"></i>
        </span>
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="container"
        >
          <svg
            className="pen-size"
            onClick={() => onChangeSize(10)}
            height="14"
            width="14"
          >
            <circle cx="7" cy="7" r="5" fill={"#" + penColor} />
          </svg>
          <svg
            className="pen-size"
            onClick={() => onChangeSize(20)}
            height="24"
            width="24"
          >
            <circle cx="12" cy="12" r="10" fill={"#" + penColor} />
          </svg>
          <svg
            className="pen-size"
            onClick={() => onChangeSize(40)}
            height="44"
            width="44"
          >
            <circle cx="22" cy="22" r="20" fill={"#" + penColor} />
          </svg>
        </div>
        <button
          disabled={isCanvasdisabled}
          onClick={() => props.socket.emit("drawing", { shouldClear: true })}
          className="button is-small is-warning is-rounded"
        >
          <span style={{ marginRight: 4 }}>
            <p> Clear</p>
          </span>
          <span>
            <i className="fas fa-broom is-large"></i>
          </span>
        </button>
        <button
          disabled={isCanvasdisabled}
          onClick={() => props.socket.emit("userGameEnd")}
          className="button is-small is-danger is-rounded"
        >
          {props.isMobile() ? (
            <span>
              <p> X</p>
            </span>
          ) : (
            <Fragment>
              <span style={{ marginRight: 4 }}>
                <p> Give up</p>
              </span>
              <span>
                <i className="fas fa-skull is-large"></i>
              </span>
            </Fragment>
          )}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            marginTop: 50,
            userSelect: "none",
            position: "absolute",
            display: !gameStarted ? "" : "none",
          }}
          className={`is-size-1 ${
            gameWinner ? "has-text-primary" : "has-text-danger"
          }`}
        >
          {gameWinner
            ? gameWinner + " won! The word was: " + prevWord
            : prevWord
            ? "No winner. The word was: " + prevWord
            : ""}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            userSelect: "none",
            position: "absolute",
            display: showDrawingWord ? "" : "none",
          }}
          className={
            fadeWord ? "gameword hide is-size-1" : "gameword is-size-1"
          }
        >
          Draw: {drawingWord}
        </span>
        <button
          style={{
            position: "absolute",
            display: gameStarted ? "none" : "",
            boxShadow: "2px 2px 2px 2px #d1d1d1",
          }}
          className="button is-primary is-large"
          onClick={onGameStart}
        >
          {" "}
          Start game
        </button>
        <canvas
          style={{
            cursor: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='44' width='44' %0Acolor-rendering='optimizeQuality' %3E%3Ccircle cx='22' cy='22' r='${
              penSize / 2
            }' fill = '%23${penColor}' /%3E%3C/svg%3E") 22 22, pointer`,
          }}
          className="canvas"
          width={canvasWidth}
          height={canvasHeight}
          ref={canvasRef}
          onPointerDown={onMouseDown}
          onPointerUp={onMouseUp}
          onPointerMove={onMouseMove}
        />
      </div>
    </div>
  );
};

DrawingArea.propTypes = {
  getAllWords: PropTypes.func.isRequired,
  setGameStarted: PropTypes.func.isRequired,
  addGamePoints: PropTypes.func.isRequired,
  setCurrentDrawer: PropTypes.func.isRequired,
  setDrawingWord: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  word: state.word, // Get the word reducer from combine reducers
  game: state.game,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getAllWords,
  setGameStarted,
  addGamePoints,
  setCurrentDrawer,
  setDrawingWord,
})(DrawingArea);
