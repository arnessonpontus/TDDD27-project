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

  const draw = (canvas, ctx, drawing) => {
    if (!drawing.isCurrDrawing) {
      ctx.beginPath();
      return;
    }
    ctx.fillStyle = "deepskyblue";
    ctx.shadowColor = "dodgerblue";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.save();
    const rect = canvas.getBoundingClientRect();
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

  const onMouseMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const drawing = { x, y, isCurrDrawing: isDrawing };

    // Emit message
    socket.emit("drawing", drawing);
  };

  // TODO: Make canvas responsive
  return (
    <div className="column box game-heigt is-two-thirds">
      <canvas
        width={600}
        height={500}
        ref={canvasRef}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
      />
    </div>
  );
};

export default DrawingArea;
