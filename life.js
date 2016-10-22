var recSize = 16;
var rowsNum = 40;
var columnsNum = 50;
var canvas = document.querySelector('#canvas');
canvas.width = recSize * columnsNum;
canvas.height = recSize * rowsNum;
var ctx = canvas.getContext('2d');


// 1 cell = 15px x 15px + 1px for border
/*
1 cell = 16px x 16px
Height = 744px
width = 1301px
*/
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

canvas.addEventListener('click', function(e){
  var x = e.clientX - canvas.getBoundingClientRect().left;
  var y = e.clientY - canvas.getBoundingClientRect().top;
  drawRect(x, y);
  x = (Math.floor(x/16) * 16) + .5;
  y = (Math.floor(y/16) * 16) + .5;
  if(aliveCells.length === 0){
    console.log('working in loop 1', aliveCells.length);
    aliveCells.push({x: x, y: y});
  } else  if(!containsElement(x, y)){
    aliveCells.push({x: x, y: y});
    console.log(aliveCells.length);
    }
});
function containsElement(x, y){
  for(var i = 0; i < aliveCells.length; i++){
    if(aliveCells[i].x === x && aliveCells[i].y === y){
      return true;
    }
  }
  return false;
}
var aliveCells = new Array;
function drawRect(x, y){
  ctx.fillStyle = 'aliceblue';
  x = (Math.floor(x/16) * 16) + .5;
  y = (Math.floor(y/16) * 16) + .5;
  console.log(x, y);
  ctx.fillRect(x, y, 15, 15);
  // aliveCells.push(x, y);
}
//Each cell with one or no neighbors dies, as if by solitude
var button = document.querySelector('#button');
button.addEventListener('click', function(e){
  live();

});
var body = document.body;
body.addEventListener('keydown', function(e){
  if(e.keyCode === 13){
    live();
  }
});
function live(){
  // debugger;
  for(var i = 0; i < aliveCells.length; i++){
    if(check(aliveCells[i], i)){
      console.log('has neighbour');
    } else{
      console.log('no neighbour');
      ctx.fillStyle = 'darkcyan';
      ctx.fillRect(aliveCells[i].x, aliveCells[i].y, 15, 15);
      // aliveCells.splice(i, 1);
    }
  }
}
// seems working
// Each cell with one or no neighbors dies, as if by solitude.
function check(cell, b){
  // debugger;
  var numOfNeighbours = 0;
  if(aliveCells.length <= 1){
    return false;
    numOfNeighbours = 0;
  }
  for(var i = 0; i < aliveCells.length; i++){
    if(i === b){continue;}
    if(Math.abs(aliveCells[i].x - cell.x) === 16 && Math.abs(aliveCells[i].y - cell.y) <= 16 || Math.abs(aliveCells[i].x - cell.x) <= 16 && Math.abs(aliveCells[i].y - cell.y) === 16){
      // console.log('cell has neighbour');
      numOfNeighbours += 1;
    }
  }
  if (numOfNeighbours <= 1 || numOfNeighbours >= 4) {
    return false;
  } else if(numOfNeighbours === 2 || 3){
    return true;
  }
}
function(){

}
/*
First rule is probably done. Second, 3rd & 4th rules have to be written to make things working properly
Done for now (18.10 23:39)
*/
// Each cell with two or three neighbors survives.
// function checkRule2(cell, b){
//   var numOfNeighbours = 0;
//   if(aliveCells.length)
// }

// Each cell with four or more neighbors dies, as if by overpopulation.
