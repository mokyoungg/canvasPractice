import React, { useRef, useState, useEffect } from "react";
import "./Canvas.scss";

const Canvas = ({ paths, setPaths, merge, checkedPaths }) => {
  const canvasRef = useRef(null); //useRef 사용
  const contextRef = useRef(null); // 캔버스의 드로잉 컨텍스트를 참조

  const [ctx, setCtx] = useState(); //캔버스의 드로잉 컨텍스트
  const [isDrawing, setIsDrawing] = useState(false);
  const [startingPoint, setStartingPoint] = useState([]);
  const [path, setPath] = useState([]);

  // const [can, setCan] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    context.strokeStyle = "black"; // 선의 색
    context.lineWidth = 1; // 선의 굵기
    contextRef.current = context;

    // //context.fillStyle = "red";
    // context.fillStyle = "rgba(255, 0, 0, 0.5)";

    setCtx(context);

    // reDrawing();

    //mergeDrawing();
  }, [merge]);

  const reDrawing = () => {
    if (!paths) {
      return;
    } else {
      let polygon;

      for (let i = 0; i < paths.length; i++) {
        polygon = new Path2D();
        for (let j = 0; j < paths[i].length; j++) {
          polygon.lineTo(paths[i][j][0], paths[i][j][1]);
          //ctx.stroke(polygon);
        }
        ctx.fill(polygon);
        ctx.stroke(polygon);
      }
    }
  };

  const mergeDrawing = () => {
    let inside = [];
    let outside = [];
    let outside1 = [];
    let outside2 = [];

    if (!paths) {
      return;
    } else {
      let polygon;
      let polygon1;
      let polygon2;

      for (let i = 0; i < checkedPaths.length; i++) {
        if (i === 0) {
          polygon1 = new Path2D();
          for (let j = 0; j < checkedPaths[0].length; j++) {
            polygon1.lineTo(checkedPaths[0][j][0], checkedPaths[0][j][1]);
          }
          for (let j = 0; j < checkedPaths[1].length; j++) {
            if (ctx.isPointInPath(polygon1, ...checkedPaths[1][j])) {
              inside.push(checkedPaths[1][j]);
            } else {
              outside1.push(checkedPaths[1][j]);
            }
          }
        } else if (i === 1) {
          polygon2 = new Path2D();
          for (let j = 0; j < checkedPaths[1].length; j++) {
            polygon2.lineTo(checkedPaths[1][j][0], checkedPaths[1][j][1]);
          }
          for (let j = 0; j < checkedPaths[0].length; j++) {
            if (ctx.isPointInPath(polygon2, ...checkedPaths[0][j])) {
              inside.push(checkedPaths[0][j]);
            } else {
              outside2.push(checkedPaths[0][j]);
            }
          }
        }
      }

      // for (let i = 0; i < checkedPaths.length; i++) {
      //   polygon = new Path2D();
      //   for (let j = 0; j < checkedPaths[i].length; j++) {
      //     polygon.lineTo(checkedPaths[i][j][0], checkedPaths[i][j][1]);
      //     ctx.stroke(polygon);
      //   }
      // }

      // const canvasWidth = window.innerWidth * 0.8;
      // const canvasHeight = window.innerHeight;

      //인사이드 없애기(현재 이게 가능)
      //선 굵기와 색을 이용하여 위에 덧붙임
      // for (let i = 0; i < inside.length; i++) {
      //   //ctx.moveTo(inside[i][0], inside[i][1]);
      //   // ctx.clearRect(inside[i][0], inside[i][1], 40, 40);
      //   ctx.lineWidth = 3;
      //   ctx.strokeStyle = "white";
      //   ctx.lineTo(inside[i][0], inside[i][1]);
      //   ctx.stroke();
      //   //ctx.fill();
      // }

      outside = outside1.concat(outside2);
      polygon = new Path2D();

      for (let i = 0; i < outside.length; i++) {
        //ctx.beginPath();
        // ctx.moveTo(outside[i][0], outside[i][1]);
        // ctx.lineTo(outside[i][0], outside[i][1]);
        // ctx.stroke();
        //ctx.beginPath();
        ctx.moveTo(...outside[i]);
        ctx.lineTo(...outside[i]);
        //ctx.arc(...outside[i], 5, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // //아웃 사이드 그리기
      // for (let i = 0; i < outside.length; i++) {
      //   polygon = new Path2D();
      //   for (let j = 0; j < outside[i].length - 1; j++) {
      //     polygon.lineTo(outside[i][j][0], outside[i][j][1]);
      //     polygon.lineTo(outside[i][j][0], outside[i][j][1]);
      //     ctx.stroke(polygon);
      //     ctx.beginPath();
      //   }
      // }
    }
    console.log("ouside :", outside);
  };

  /*
  const reDrawing = () => {
    if (!paths) {
      return;
    } else {
      for (let i = 0; i < paths.length; i++) {
        for (let j = 0; j < paths[i].length; j++) {
          //ctx.fillStyle = "blue";
          ctx.lineTo(paths[i][j][0], paths[i][j][1]);
          ctx.stroke();
          //하나의 도형을 그리는 것이 끝날 때
          if (paths[i].length - 1 === j) {
            //합쳐지긴 하지만 내부에 선이 남는다.
            //ctx.fill();
            //ctx.globalCompositeOperation = "xor";

            // //해당 도형이 마지막 도형일 때
            if (path[i + 1] === undefined) {
              ctx.beginPath();
            } else {
              ctx.moveTo(paths[i + 1][0][0], paths[i + 1][0][1]);
            }
          }
        }
      }
    }
  };*/

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
        if (startingPoint.length > 0) {
          ctx.lineTo(startingPoint[0], startingPoint[1]);
          ctx.stroke(); // 왜 이 선 색은 회색이지?

          setPath((path) => [...path, startingPoint]);
          setPaths((paths) => [...paths, [...path, startingPoint]]);
          setStartingPoint([]);
          setPath([]);
        }
      } else {
        if (startingPoint.length === 0) {
          setStartingPoint([offsetX, offsetY]);
        }
        setPath((path) => [...path, [offsetX, offsetY]]);
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
