import React, { useEffect, useState } from "react";
import Slider from "react-input-slider";
import { connect } from "react-redux";
import { getAllWords } from "../../actions/wordActions";
import { setGameStarted } from "../../actions/gameActions";
import PropTypes from "prop-types";

const DrawingArea = (props) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [penSize, setPenSize] = useState(10);
  const [penColor, setPenColor] = useState("black");
  const [isCanvasdisabled, setIsCanvasdisabled] = useState(true);
  const [canvasWidth, setCanvasWidth] = useState(true);
  const [canvasHeight, setCanvasHeight] = useState(true);
  const [showDrawingWord, setShowDrawingWord] = useState(false);
  const [fadeWord, setFadeWord] = useState(false);
  const [gameWinner, setGameWinner] = useState("");

  const { category, gameStarted, drawingWord } = props.game;
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

    props.socket.on("gameEnd", (winner) => {
      setIsCanvasdisabled(true);
      setFadeWord(false);

      // Set winner if there is one
      if (winner) {
        setGameWinner(winner);
      }
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
      strokeColor: penColor,
    };

    // Emit message
    props.socket.emit("drawing", drawing);
  };

  const onChangeColor = (color) => {
    setPenColor(color);
  };

  const onChangeSize = (e) => {
    setPenSize(e.x);
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
        <button
          onClick={() => onChangeColor("Black")}
          className="button is-small is-black"
        >
          black
        </button>
        <button
          onClick={() => onChangeColor("red")}
          className="button is-small is-danger"
        >
          Red
        </button>
        <button
          onClick={() => onChangeColor("green")}
          className="button is-small is-primary"
        >
          green
        </button>
        <button
          onClick={() => onChangeColor("blue")}
          className="button is-small is-info"
        >
          Blue
        </button>
        <button
          onClick={() => onChangeColor("white")}
          className="button is-small is-light"
        >
          Eraser
        </button>

        <Slider
          axis="x"
          xstep={0.1}
          xmin={5}
          xmax={50}
          x={penSize}
          onChange={onChangeSize}
        />
        <button
          disabled={isCanvasdisabled}
          onClick={() => props.socket.emit("drawing", { shouldClear: true })}
          className="button is-small is-light"
        >
          Clear
        </button>
      </div>
      <span
        style={{
          left: "33%",
          userSelect: "none",
          position: "absolute",
          display: !gameStarted ? "" : "none",
        }}
        className={"is-size-1 has-text-primary"}
      >
        {gameWinner ? "Winner: " + gameWinner + "!" : ""}
      </span>
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
};

const mapStateToProps = (state) => ({
  word: state.word, // Get the word reducer from combine reducers
  game: state.game,
});

export default connect(mapStateToProps, {
  getAllWords,
  setGameStarted,
})(DrawingArea);
