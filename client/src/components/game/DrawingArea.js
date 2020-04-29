import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const DrawingArea = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);

  const canvasRef = React.useRef(null);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    setCtx(context);

    socket.on("drawing", (drawing) => {
      draw(drawing);
    });
  }, [canvasRef]);

  const draw = (drawing) => {
    console.log(drawing);

    //ctx.fillStyle = "#FF0000";
    //const penWidth = 10;
    //ctx.fillRect(x - penWidth / 2, y - penWidth / 2, penWidth, penWidth);
  };

  const onMouseDown = (e) => {
    setIsDrawing(true);

    const x = e.clientX;
    const y = e.clientY;

    const drawing = { x, y };

    // Emit message
    socket.emit("drawing", drawing);
  };

  const onMouseUp = (e) => {
    setIsDrawing(false);
  };

  // TODO: Make canvas responsive
  return (
    <div className="column box game-heigt is-two-thirds">
      <canvas
        width={600}
        height={500}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    </div>
  );
};

export default DrawingArea;
