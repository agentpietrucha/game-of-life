/*
1 cell = 15px x 15px + 1px for border
1 cell = 16px x 16px
Height = 744px
width = 1301px
*/

switch (window.innerWidth) {
  case 1024:
    var recSize = 14;
    var rowsNum = 38;
    var columnsNum = 40;
  break;
  case 1301:
    var recSize = 16;
    var rowsNum = 38;
    var columnsNum = 50;
  break;
  case 980:
    var recSize = 12;
    var rowsNum = 32;
    var columnsNum = 40;
  break;
  default:
    var recSize = 14;
    var rowsNum = 38;
    var columnsNum = 40;

}
var canvas = document.querySelector('#canvas');
canvas.width = recSize * columnsNum;
canvas.height = recSize * rowsNum;
var ctx = canvas.getContext('2d');
//axis parameters
lineColor = '#f3f3f3'
var x = 0;
var y = 0;
//loop x right
(function drawBoard(){
  for(var i = 0; i <= rowsNum; i++){
    //x axis line
    ctx.beginPath();
    ctx.moveTo(0, x);
    ctx.lineTo(recSize*columnsNum, x);
    ctx.strokeStyle = lineColor;
    ctx.stroke();
    x += recSize;
  }
  //loop y down
  for(var i = 0; i <= columnsNum; i++){
    ctx.beginPath();
    ctx.moveTo(y, 0);
    ctx.lineTo(y, recSize*rowsNum);
    ctx.strokeStyle = lineColor;
    ctx.stroke();
    y += recSize;
  }
})();
var aliveCells = new Array;
canvas.addEventListener('click', function(e){
  var clicked = true;
  var x = getParameter(e.clientX - canvas.getBoundingClientRect().left);
  var y = getParameter(e.clientY - canvas.getBoundingClientRect().top);
  drawRect(x, y, 'aliceblue');
  if(!containsElement(aliveCells, x, y)){
      aliveCells.push({x: x, y: y});
      console.log('length: ', aliveCells.length);
      clicked = !clicked;
    }
    if(clicked){
      for(var i = 0; i < aliveCells.length; i++){
        if(aliveCells[i].x === x && aliveCells[i].y === y){
          drawRect(aliveCells[i].x, aliveCells[i].y, 'darkcyan');
          aliveCells.splice(i, 1);
          console.log('length: ', aliveCells.length);
        }
      }
    }
});
function containsElement(arr, x, y){
  for(var i = 0; i < arr.length; i++){
    if(arr[i].x === x && arr[i].y === y){
      return true;
    }
  }
  return false;
}
function getParameter(p){
  var param = (Math.floor(p/recSize) * recSize) + .5;
  return param;
}
function drawRect(x, y, colour){
  ctx.fillStyle = colour;
  ctx.fillRect(x, y, recSize - 1, recSize - 1);
}
var timeInput = document.querySelector('.timeInput');
var interval;
var clicked = true;
var playButton = document.getElementById('playButton');
playButton.addEventListener('click', function(e){
  var time;
  if(timeInput.value === ''){
    time = 750;
  } else {
    time = parseInt(timeInput.value);
  }
  if(clicked){
    playButton.innerText = 'Let it STOP!';
    playButton.setAttribute('style', 'width: 83px;');
  } else{
    clearInterval(interval);
    playButton.innerText = 'Let it live!';
    playButton.setAttribute('style', 'width: 67px;');
  }
  if(clicked){
    interval = setInterval(live, time);
    clicked = false;
  } else{
    clearInterval(interval);
    clicked = true;
  }
});
var clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', function(e){
  for(var i = 0; i < aliveCells.length; i++){
    drawRect(aliveCells[i].x, aliveCells[i].y, 'darkcyan');
  }
  aliveCells = [];
});
var body = document.body;
body.addEventListener('keydown', function(e){
  var time;
  if(timeInput.value === ''){
    time = 750;
  } else {
    time = parseInt(timeInput.value);
  }
  if(e.keyCode === 13){
    if(clicked){
      playButton.innerText = 'Let it STOP!';
      playButton.setAttribute('style', 'width: 83px;');
    } else{
      clearInterval(interval);
      playButton.innerText = 'Let it live!';
      playButton.setAttribute('style', 'width: 67px;');
    }
    if(clicked){
      interval = setInterval(live, time);
      clicked = false;
    } else{
      clearInterval(interval);
      clicked = true;
    }
  }
});
function getLiveNeighboursNum(arr, index) {
  var cell = arr[index];
  var liveNum = 0;
  for(var i = 0; i < aliveCells.length; i++){
    var c = aliveCells[i];
    if ( (cell.x - recSize === c.x && cell.y === c.y) ||
         (cell.x + recSize === c.x && cell.y === c.y) ||
         (cell.x === c.x && cell.y - recSize === c.y) ||
         (cell.x === c.x && cell.y + recSize === c.y) ||
         (cell.x - recSize === c.x && cell.y - recSize === c.y) ||
         (cell.x - recSize === c.x && cell.y + recSize === c.y) ||
         (cell.x + recSize === c.x && cell.y - recSize === c.y) ||
         (cell.x + recSize === c.x && cell.y + recSize === c.y)
       ) {
      liveNum++;
    }
  }
  return liveNum;
}
function live(){
  var newAliveCells = [];
  for(var i = 0; i < aliveCells.length; i++){
    var liveNeighboursNum = getLiveNeighboursNum(aliveCells, i);
    if (liveNeighboursNum <= 1 || liveNeighboursNum >= 4) {
      drawRect(aliveCells[i].x, aliveCells[i].y, 'darkcyan');
      continue;
    } else if (liveNeighboursNum === 2 || liveNeighboursNum === 3) {
      newAliveCells.push(aliveCells[i]);
    }
  }
  for(var i = 0; i < aliveCells.length; i++){
    var neighbours = getNeighbours(i);
    for(var a = 0; a < neighbours.length; a++) {
      var neighbour = neighbours[a];
      var liveNeighboursNum = getLiveNeighboursNum(neighbours, a);
      if (liveNeighboursNum === 3) {
        drawRect(neighbour.x, neighbour.y, 'aliceblue');
        if(!containsElement(newAliveCells, neighbour.x, neighbour.y)){
          newAliveCells.push(neighbour);
          }
        continue;
      }
    }
  }
  aliveCells = newAliveCells;
}
function getNeighbours(index){
  cell = aliveCells[index];
  return [{x: cell.x - recSize, y:  cell.y}, {x: cell.x + recSize, y: cell.y},
          {x: cell.x, y: cell.y - recSize}, {x: cell.x, y: cell.y + recSize},
          {x: cell.x - recSize, y: cell.y - recSize}, {x: cell.x - recSize, y: cell.y + recSize},
          {x: cell.x + recSize, y: cell.y - recSize}, {x: cell.x + recSize, y: cell.y + recSize}];
}
