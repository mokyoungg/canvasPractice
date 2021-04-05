import React, { useRef, useState, useEffect } from "react";
import "./Canvas.scss";

const Canvas = () => {
  const canvasRef = useRef(null); //useRef 사용
  const contextRef = useRef(null); // 캔버스의 드로잉 컨텍스트를 참조

  const [ctx, setCtx] = useState(); //캔버스의 드로잉 컨텍스트
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    context.strokeStyle = "black"; // 선의 색
    context.lineWidth = 2.5; // 선의 굵기
    contextRef.current = context;

    setCtx(context);
  }, []);

  const startDrawing = () => {
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    //canvas.getContext('2d')의 값이 있을 때
    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  return (
    <div className="canvas_wrap">
      {/*useRef 사용*/}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={drawing}
        onMouseLeave={finishDrawing}
      ></canvas>
    </div>
  );
};

export default Canvas;

/*
const [ctx, setCtx] = useState();
const [isDrawing, setIsDrawing] = useState(false);

useEffect(() => {
  const canvas = canvasRef.current;
  canvas.width = window.innerWidth * 0.5;
  canvas.height = window.innerHeight;

  const context = canvas.getContext("2d");
  context.strokeStyle = "black";
  context.lineWidth = 2.5;
  contextRef.current = context;

  setCtx(contextRef.current);
}, []);
*/
