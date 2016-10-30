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
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXX
  XXX tutaj dopisalem i tam nizej tez - zobacz czy skumasz o co kaman
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


  // if(aliveCells.length <= 1){
  //   numOfNeighbours = 0;
  // }
  // for(var i = 0; i < aliveCells.length; i++){
  //   if(i === b){continue;}
  //   if(Math.abs(aliveCells[i].x - cell.x) === 16 && Math.abs(aliveCells[i].y - cell.y) <= 16 || Math.abs(aliveCells[i].x - cell.x) <= 16 && Math.abs(aliveCells[i].y - cell.y) === 16){
  //     // console.log('cell has neighbour');
  //     numOfNeighbours += 1;
  //   }
  // }
}

function live(){
  // debugger;
  for(var i = 0; i < aliveCells.length; i++){
    // 1. 1-0 neighbors die
    // 2. 4+ die
    // 3. 2-3 survive
    var liveNeighboursNum = getLiveNeighboursNum(i);
    if (liveNeighboursNum <= 1 || liveNeighboursNum >= 4) {
      delete aliveCells[i]; // pewnie splice
    } else if (liveNeighboursNum === 2 && liveNeighboursNum === 3) {
      continue;
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
      }
      // END
    }
  }

    // check(aliveCells[i], i, function(callback){
    //   console.log('callback: ', callback);
    //   switch (callback) {
    //     case 'death':
    //       console.log('no neighbour');
    //       ctx.fillStyle = 'darkcyan';
    //       ctx.fillRect(aliveCells[i].x, aliveCells[i].y, 15, 15);
    //       break;
    //     case 'survival':
    //       console.log('has neighbour');
    //     break;
    //     case 'YUpAndDown':
    //       ctx.fillStyle = 'aliceblue';
    //       ctx.fillRect(aliveCells[i].x, aliveCells[i].y + 16, 15, 15);
    //       ctx.fillRect(aliveCells[i].x, aliveCells[i].y - 16, 15, 15);
    //     break;
    //     case 'XUpAndDown':
    //       ctx.fillStyle = 'aliceblue';
    //       ctx.fillRect(aliveCells[i].x + 16, aliveCells[i].y, 15, 15);
    //       ctx.fillRect(aliveCells[i].x - 16, aliveCells[i].y, 15, 15);
    //     break;
    //     case 'leftUpCrosswise':
    //       ctx.fillStyle = 'aliceblue';
    //       ctx.fillRect(aliveCells[i].x - 16, aliveCells[i].y - 16, 15, 15);
    //     break;
    //     case 'rightUpCrosswise':
    //       ctx.fillStyle = 'aliceblue';
    //       ctx.fillRect(aliveCells[i].x + 16, aliveCells[i].y - 16, 15, 15);
    //     break;
    //     case 'leftDownCrosswise':
    //       ctx.fillStyle = 'aliceblue';
    //       ctx.fillRect(aliveCells[i].x - 16, aliveCells[i].y + 16, 15, 15);
    //     break;
    //     case 'rightDownCrosswise':
    //       ctx.fillStyle = 'aliceblue';
    //       ctx.fillRect(aliveCells[i].x + 16, aliveCells[i].y + 16, 15, 15);
    //     break;
    //   }
    // })
  }
}
// seems working
// Each cell with one or no neighbors dies, as if by solitude.
function check(cell, b, callback){
  // debugger;
  var somenumberX = 0;
  var somenumberY = 0;
  var leftUpCrosswise = 0;
  var rightUpCrosswise = 0;
  var leftDownCrosswise = 0;
  var rightDownCrosswise = 0;
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
    return callback('death');
  } else if(numOfNeighbours === 2){
    for(var i = 0; i < aliveCells.length; i++){
      if(cell.x + 16 === aliveCells[i].x && cell.y === aliveCells[i].y){
        somenumberX += 1;
        rightUpCrosswise += 1;
        rightDownCrosswise += 1;
      } else if(cell.x - 16 === aliveCells[i].x && cell.y === aliveCells[i].y){
        somenumberX += 1;
        leftUpCrosswise += 1;
        leftDownCrosswise += 1;
      } else if(cell.y + 16 === aliveCells[i].y && cell.x === aliveCells[i].x){
        somenumberY += 1;
        rightDownCrosswise += 1;
        leftDownCrosswise += 1;
      } else if(cell.y - 16 === aliveCells[i].y && cell.x === aliveCells[i].x){
        somenumberY += 1;
        leftUpCrosswise += 1;
        rightUpCrosswise += 1;
      } else{
        return callback('survival');
      }
      // else if(cell.x - 16 === aliveCells[i].x && cell.y === aliveCells[i].y){
      //   leftUpCrosswise += 1;
      // } else if(cell.x === aliveCells[i].x && cell.y - 16 === aliveCells[i].y){
      //   rightUpCrosswise += 1;
      // }
    }
    if(somenumberX === 2){
      return callback('YUpAndDown');
    } else if(somenumberY === 2){
      return callback('XUpAndDown');
    } else if(leftUpCrosswise === 2){
      return callback('leftUpCrosswise');
    } else if(rightUpCrosswise === 2){
      return callback('rightUpCrosswise');
    } else if(leftDownCrosswise === 2){
      return callback('leftDownCrosswise');
    } else if(rightDownCrosswise === 2){
      return callback('rightDownCrosswise');
    } else{
      return callback('survival');
    }
  } else if(numOfNeighbours === 3){
    return callback('survival');
  }
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
// Each cell with three neighbors becomes populated.
