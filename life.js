// 1 cell = 15px x 15px + 1px for border
/*
1 cell = 16px x 16px
Height = 744px
width = 1301px
*/
var recSize = 16;
var rowsNum = 38;
var columnsNum = 50;
var canvas = document.querySelector('#canvas');
canvas.width = recSize * columnsNum;
canvas.height = recSize * rowsNum;
var ctx = canvas.getContext('2d');
//axis parameters
lineColor = '#f3f3f3'
var x = 0;
//loop x right
for(var i = 0; i <= rowsNum; i++){
  //x axis line
  ctx.beginPath();
  ctx.moveTo(0, x);
  ctx.lineTo(recSize*columnsNum, x);
  ctx.strokeStyle = lineColor;
  ctx.stroke();
  x += recSize;
}
var y = 0;
//loop y down
for(var i = 0; i <= columnsNum; i++){
  ctx.beginPath();
  ctx.moveTo(y, 0);
  ctx.lineTo(y, recSize*rowsNum);
  ctx.strokeStyle = lineColor;
  ctx.stroke();
  y += recSize;
}
var aliveCells = new Array;
canvas.addEventListener('click', function(e){
  var x = e.clientX - canvas.getBoundingClientRect().left;
  var y = e.clientY - canvas.getBoundingClientRect().top;
  drawRect(x, y);
  x = (Math.floor(x/16) * 16) + .5;
  y = (Math.floor(y/16) * 16) + .5;
  if(aliveCells.length === 0){
    aliveCells.push({x: x, y: y});
  } else  if(!containsElement(aliveCells, x, y)){
    aliveCells.push({x: x, y: y});
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
function drawRect(x, y){
  ctx.fillStyle = 'aliceblue';
  x = (Math.floor(x/16) * 16) + .5;
  y = (Math.floor(y/16) * 16) + .5;
  console.log(x, y);
  ctx.fillRect(x, y, 15, 15);
}
var x;
function interval(){
  x = setInterval(live, 1000);
}
var inpt = document.querySelector('input');
var interval;
var clicked = true;
var playButton = document.getElementById('playButton');
playButton.addEventListener('click', function(e){
  if(clicked){
    interval = setInterval(live, 750);
    clicked = false;
  } else{
    clearInterval(interval);
    clicked = true;
  }
  if(playButton.innerText === 'Let it live!'){
    playButton.innerText = 'Let it STOP!';
    playButton.setAttribute('style', 'width: 83px;');
    document.querySelector('.playButtonContainer').setAttribute('style', 'left: -8px');
  } else{
    clearInterval(interval);
    playButton.innerText = 'Let it live!';
    playButton.setAttribute('style', 'width: 67px;');
    document.querySelector('.playButtonContainer').setAttribute('style', 'left: 0px');
  }
});
var clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', function(e){
  for(var i = 0; i < aliveCells.length; i++){
    ctx.fillStyle = 'darkcyan';
    ctx.fillRect(aliveCells[i].x, aliveCells[i].y, 15, 15);
  }
  aliveCells = [];
})
var body = document.body;
body.addEventListener('keydown', function(e){
  if(e.keyCode === 13){
    if(clicked){
      interval = setInterval(live, 750);
      clicked = false;
    } else{
      clearInterval(interval);
      clicked = true;
    }
    if(playButton.innerText === 'Let it live!'){
      playButton.innerText = 'Let it STOP!';
      playButton.setAttribute('style', 'width: 83px; left: 84px;');
    } else{
      clearInterval(interval);
      playButton.innerText = 'Let it live!';
      playButton.setAttribute('style', 'width: 67px; left: 92px;');
    }
  }
});
function getLiveNeighboursNum(arr, index) {
  var cell = arr[index];
  var liveNum = 0;
  for(var i = 0; i < aliveCells.length; i++){
    var c = aliveCells[i];
    if ( (cell.x - 16 === c.x && cell.y === c.y) ||
         (cell.x + 16 === c.x && cell.y === c.y) ||
         (cell.x === c.x && cell.y - 16 === c.y) ||
         (cell.x === c.x && cell.y + 16 === c.y) ||
         (cell.x - 16 === c.x && cell.y - 16 === c.y) ||
         (cell.x - 16 === c.x && cell.y + 16 === c.y) ||
         (cell.x + 16 === c.x && cell.y - 16 === c.y) ||
         (cell.x + 16 === c.x && cell.y + 16 === c.y)
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
      ctx.fillStyle = 'darkcyan';
      ctx.fillRect(aliveCells[i].x + .5, aliveCells[i].y + .5, 14, 14);
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
        ctx.fillStyle = 'aliceblue';
        ctx.fillRect(neighbour.x + .5, neighbour.y + .5, 14, 14);
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
  return [{x: cell.x - 16, y:  cell.y}, {x: cell.x + 16, y: cell.y}, {x: cell.x, y: cell.y - 16}, {x: cell.x, y: cell.y + 16}, {x: cell.x - 16, y: cell.y - 16}, {x: cell.x - 16, y: cell.y + 16}, {x: cell.x + 16, y: cell.y - 16}, {x: cell.x + 16, y: cell.y + 16}];
}
