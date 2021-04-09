import React, { useRef, useState, useEffect } from "react";
import "./Canvas.scss";

//부모컴포넌트인 App 컴포넌트에서 paths와 setPaths를 받음
//부모 컴포넌트에서 merge, checkedPaths를 받음
const Canvas = ({ paths, setPaths, merge, checkedPaths }) => {
  const canvasRef = useRef(null); //useRef 사용
  //const contextRef = useRef(null); // 캔버스의 드로잉 컨텍스트를 참조

  const [ctx, setCtx] = useState(); //cavnas의 드로잉 컨텍스트 state값으로 설정
  const [isDrawing, setIsDrawing] = useState(false); // 마우스 조작을 알려주는 state 값 설정

  //현재 그려지고 있는 다각형의 경로를 저장.
  const [path, setPath] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current; //cavnas태그를 cavnas에 할당
    canvas.width = window.innerWidth * 0.8; //canvas 태그의 가로 크기
    canvas.height = window.innerHeight; //canvas 태그의 세로 크기

    const context = canvas.getContext("2d"); //cavnas의 드로잉 컨텍스트를 반환
    context.strokeStyle = "black"; // 선의 색
    context.lineWidth = 1.0; // 선의 굵기
    //contextRef.current = context;
    context.fillStyle = "white";

    setCtx(context); //render시, cavans.getContext('2d')의 값을 ctx에 저장

    reDrawing();
  }, [merge]); // merge의 값이(의존성) 바뀔 때마다 useEffect 재생성(re-render)

  //checkedPaths 를 가지고 그림
  const reDrawing = () => {
    let inside = []; //두 도형의 내부에 위치한 지점
    let outside = []; //두 도형의 외부에 위치한 지점
    let polygon1 = new Path2D(); //new Path2D로 새로운 객체 생성
    let polygon2 = new Path2D(); //new Path2D로 새로운 객체 생성

    if (!paths) {
      return;
    } else {
      if (checkedPaths.length > 0) {
        for (let i = 0; i < checkedPaths[0].length; i++) {
          //첫번째 도형의 경로를 polygon1에 기록
          polygon1.lineTo(checkedPaths[0][i][0], checkedPaths[0][i][1]);
        }
        //두번째 도형의 경로를 반복
        for (let i = 0; i < checkedPaths[1].length; i++) {
          //두번째 도형의 경로 중, 첫번쨰 도형의 내부에 들어가는 경로가 있다면
          if (ctx.isPointInPath(polygon1, ...checkedPaths[1][i])) {
            //inside 배열에 추가
            inside.push(checkedPaths[1][i]);
          } else {
            //아니라면 outside 배열에 추가
            outside.push(checkedPaths[1][i]);
          }
        }

        for (let i = 0; i < checkedPaths[1].length; i++) {
          //두번째 도형의 경로를 polygon2에 기록
          polygon2.lineTo(checkedPaths[1][i][0], checkedPaths[1][i][1]);
        }
        //첫번째 도형의 경로를 반복
        for (let i = 0; i < checkedPaths[0].length; i++) {
          //첫번째 도형의 경로 중, 두번째 도형의 내부에 들어가는 경로가 있다면
          if (ctx.isPointInPath(polygon2, ...checkedPaths[0][i])) {
            //inside 배열에 추가
            inside.push(checkedPaths[0][i]);
          } else {
            //아니라면 outside 배열에 추가
            outside.push(checkedPaths[0][i]);
          }
        }
        //병합하는 도형 그리기
        let polygon;
        for (let i = 0; i < checkedPaths.length; i++) {
          polygon = new Path2D();
          for (let j = 0; j < checkedPaths[i].length; j++) {
            polygon.lineTo(checkedPaths[i][j][0], checkedPaths[i][j][1]);
          }
          ctx.stroke(polygon);
        }
        //병합하는 도형에서 inside 지우기
        for (let i = 0; i < inside.length; i++) {
          ctx.clearRect(inside[i][0], inside[i][1], 10, 10);
        }
      }
    }
  };

  /*paths를 가지고 새로 그림 그리기
  const reDrawing = () => {
    if (!paths) {
      return;
    } else {
      let polygon;

      for (let i = 0; i < paths.length; i++) {
        //새로운 path2D 생성, 해당 객체는 드로잉 명령을 기록한다.
        //도형이 만들어질때마다 새로운 path2D 객체가 생성.
        polygon = new Path2D();
        for (let j = 0; j < paths[i].length; j++) {
          //path 2D 객첸인 polygon에 경로를 기록한다.
          polygon.lineTo(paths[i][j][0], paths[i][j][1]);
        }
        //기록한 경로를 stroke한다.
        //ctx.stroke(polygon)
        //기록한 경로를 칠한다. 현재 색은 'red'
        ctx.fill(polygon);
        ctx.globalCompositeOperation = "source-over";
      }
    }
  };*/

  /*paths를 가지고 새로 그림 그리기
  const reDrawing = () => {
    if (!paths) {
      return;
    } else {
      for (let i = 0; i < paths.length; i++) {
        //도형이 새로 그려질 때 해당 배열의 첫번째 값으로 이동
        ctx.moveTo(paths[i][0][0], paths[i][0][1]);
        for (let j = 0; j < paths[i].length; j++) {
          //시작점에서 x,y 값으로 선을 그린다.
          ctx.lineTo(paths[i][j][0], paths[i][j][1]);
          ctx.stroke();
          //하나의 도형을 그리는 것이 끝날 때
          if (paths[i].length - 1 === j) {
            //해당 도형이 마지막 도형일 때
            if (paths[i + 1] === undefined) {
              //경로를 초기화 한다.
              ctx.beginPath();
              //마지막 도형이 아니면 다음 도형으로 이동한다.
            } else {
              ctx.moveTo(paths[i + 1][0][0], paths[i + 1][0][1]);
            }
          }
        }
      }
    }
  };*/

  //마우스가 눌러졌을 때 isDrawing 값은 true
  const startDrawing = () => {
    setIsDrawing(true);
  };

  //마우스를 뗐을 때 isDrawing 값은 false
  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const [startingPoint, setStartingPoint] = useState([]); //그림을 그리기 시작할 때 시작점 설정

  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    //드로잉 컨텍스타가 있을 때
    if (ctx) {
      //마우스를 떼고 있을 때
      if (!isDrawing) {
        ctx.beginPath(); //그림의 경로를 초기화
        ctx.moveTo(offsetX, offsetY); //그림의 시작점을 offsetX와 offsetY로

        //그림을 그리다 마우스를 뗐을 때
        if (startingPoint.length > 0) {
          //그림의 시작점으로 줄을 긋고 실제로 그린다.
          ctx.lineTo(startingPoint[0], startingPoint[1]);
          ctx.stroke();

          //그려지고 있는 다각형의 경로를 path에 저장한다.
          //마지막 점은 시작점이기 때문에 startingPoint를 저장한다.
          setPath((path) => [...path, startingPoint]);

          //그림이 종료되었기에 완료된 다각형의 경로를 paths로 넘겨준다.
          //위에서 저장한 path의 값은 아직 변경되지 않았기에
          //state값이 아닌 state를 변형시켜 전달한다.
          setPaths((paths) => [...paths, [...path, startingPoint]]);

          //그림이 완료되며, 시작점을 초기화하여 다음 그림을 준비한다.
          setStartingPoint([]);
          //현재 그린 다각형의 경로를 초기화
          setPath([]);
        }
      }
      //마우스를 눌렀을 때
      else {
        //그림의 시작점을 기억
        if (startingPoint.length === 0) {
          setStartingPoint([offsetX, offsetY]);
        }
        ctx.lineTo(offsetX, offsetY); //시작점에서 offsetX와 offsetY 값으로 줄을 긋는다.
        ctx.stroke(); //그려진 줄을 실제로 픽셀로 그린다.

        //그려지고 있는 다각형의 경로를 path에 저장한다.
        //전개구문을 사용하여 새로운 배열을 path에 저장함.(기존의 배열을 변경시키지 않는다.)
        setPath((path) => [...path, [offsetX, offsetY]]);
      }
    }
  };

  return (
    <div className="canvas_wrap">
      {/*useRef 사용, 해당 태그를 참조*/}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing} // 마우스를 누를 때
        onMouseUp={finishDrawing} // 마우스를 뗼 때
        onMouseMove={drawing} // 마우스를 움직일 때
        onMouseLeave={finishDrawing} // 마우스가 벗어났을 때
      ></canvas>
    </div>
  );
};

export default Canvas;
