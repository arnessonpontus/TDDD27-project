import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const DrawingArea = () => {
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = React.useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    socket.on("drawing", (drawing) => {
      draw(canvas, context, drawing);
    });
  }, []);

  function draw(canvas, ctx, drawing) {
    ctx.fillStyle = "deepskyblue";
    ctx.shadowColor = "dodgerblue";
    ctx.shadowBlur = 20;
    ctx.save();
    const rect = canvas.getBoundingClientRect();
    ctx.fillRect(drawing.x - rect.left, drawing.y - rect.top, 5, 5);
    ctx.restore();
  }

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
