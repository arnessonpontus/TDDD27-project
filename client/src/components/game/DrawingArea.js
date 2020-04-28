import React, { useEffect, useState } from "react";

const PlayGround = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);

  const canvasRef = React.useRef(null);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    setCtx(context);
  }, [canvasRef]);

  const onMouseDown = (e) => {
    setIsDrawing(true);
    console.log(e.target);
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = "#FF0000";
    const penWidth = 10;
    ctx.fillRect(x - penWidth / 2, y - penWidth / 2, penWidth, penWidth);
  };

  const onMouseUp = (e) => {
    setIsDrawing(false);
  };

  // Make canvas responsive
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

export default PlayGround;
