const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

//Default 스타일 값 지정
ctx.strokeStyle = "blue"; //선의 색
ctx.lineWidth = 25; //선의 굵기
ctx.lineCap = "round"; //선의 끝 모양

let painting = false;

function startPainting(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  ctx.beginPath(); //경로 초기화
  ctx.moveTo(x, y); //출발점 옮기기
  painting = true;
}

function stopPainting() {
  ctx.closePath(); //하위 경로의 시작점과 연결
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    return;
  }
  ctx.lineTo(x, y); //도착점 설정
  ctx.stroke(); //그리기
}

/*
  if (!painting) {
    //console.log('creating path in', x, y)
    ctx.beginPath(); //출발점을 계속 초기화
    ctx.moveTo(x, y); //출발점을 좌표로 옮김
  } else {
    ctx.lineTo(x, y); //도착점을 좌표로 옮김
    ctx.stroke(); //그림
  }
}*/

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //마우스가 움직일 때
  canvas.addEventListener("mousedown", startPainting); //마우스 버튼을 눌렀을 때
  canvas.addEventListener("mouseup", stopPainting); //마우스 버튼을 땠을 때
  canvas.addEventListener("mouseleave", stopPainting); //마우스가 캔버스를 벗어났을 때
}

//console.log(event)
/*
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    //console.log('creating path in', x, y)
    ctx.beginPath(); //출발점을 계속 초기화
    ctx.moveTo(x, y); //출발점을 좌표로 옮김
  } else {
    ctx.lineTo(x, y); //도착점을 좌표로 옮김
    ctx.stroke(); //그림
  }*/
