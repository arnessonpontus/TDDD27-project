import React, { useEffect, useState } from "react";
import Slider from "react-input-slider";

const DrawingArea = (props) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [penSize, setPenSize] = useState(10);
  const [penColor, setPenColor] = useState("black");
  const [isCanvasdisabled, setIsCanvasdisabled] = useState(true);
  const [canvasWidth, setCanvasWidth] = useState(true);
  const [canvasHeight, setCanvasHeight] = useState(true);

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

    props.socket.on("gameEnd", () => {
      setIsCanvasdisabled(true);
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

  return (
    <div className="column box is-three-fifths is-paddingless" ref={parentRef}>
      <div className="buttons">
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
      <canvas
        width={canvasWidth}
        height={canvasHeight}
        ref={canvasRef}
        onTouchEnd={onMouseUp}
        onTouchStart={onMouseDown}
        onTouchMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseUp}
      />
    </div>
  );
};

export default DrawingArea;
