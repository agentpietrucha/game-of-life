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

function getLiveNeighboursNum(index) {
  // START
  // radze skomitowac to :-)
  //  XXX tutaj dopisalem i tam nizej tez - zobacz czy skumasz o co kaman,
  // YOYOYO

  var cell = aliveCells[index];
  var liveNum  = 0;
  for(var i = 0; i < aliveCells.length; i++){
    var c = aliveCells[i];
    if ( (cell.x - 1 === c.x && cell.y === c.y) ||
         (cell.x + 1 === c.x && cell.y === c.y) ||
         (cell.x === c.x && cell.y - 1 === c.y) ||
         (cell.x === c.x && cell.y + 1 === c.y) ||
         (cell.x - 1 === c.x && cell.y - 1 === c.y) ||
         (cell.x - 1 === c.x && cell.y + 1 === c.y) ||
         (cell.x + 1 === c.x && cell.y - 1 === c.y) ||
         (cell.x + 1 === c.x && cell.y + 1 === c.y)
       ) {
      liveNum++;
    }
  }
  return liveNum;
  // END
}

function live(){
  // debugger;
  var newAliveCells = [];
  for(var i = 0; i < aliveCells.length; i++){
    // 1. 1-0 neighbors die
    // 2. 4+ die
    // 3. 2-3 survive
    var liveNeighboursNum = getLiveNeighboursNum(i);
    if (liveNeighboursNum <= 1 || liveNeighboursNum >= 4) {
      // aliveCells[i].splice(i, 1); // pewnie splice
      ctx.fillStyle = 'darkcyan';
      ctx.fillRect(aliveCells[i].x, aliveCells[i].y, 15, 15);
      continue;
    } else if (liveNeighboursNum === 2 && liveNeighboursNum === 3) {
      // continue;
      newAliveCells.push(aliveCells[i]);
    }
  }

  for(var i = 0; i < aliveCells.length; i++){
    // 4. 3 neighbours gets populated
    var neighbours = getNeighbours(i);
    for(var a = 0; a < neighbours.length; a++) {
      // START
      var neighbour = neighbours[i];
      var liveNeighboursNum = getLiveNeighboursNum(i);
      if (liveNeighboursNum === 3) {
        // add to aliveCells
        newAliveCells.push(neighbour);
      }
      // END
    }
  }
  aliveCells = newAliveCells;
  }


function getNeighbours(index){
  cell = aliveCells[index];
  console.log(cell[index]);
  return [{x: cell.x - 16, y:  cell.y}, {x: cell.x + 16, y: cell.y}, {x: cell.x, y: cell.y - 16}, {x: cell.x, y: cell.y + 16}, {x: cell.x - 16, y: cell.y - 16}, {x: cell.x - 16, y: cell.y + 16}, {x: cell.x + 16, y: cell.y - 16}, {x: cell.x + 16, y: cell.y + 16}];
}
// Each cell with one or no neighbors dies, as if by solitude.
