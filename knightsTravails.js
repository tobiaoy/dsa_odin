// we want to get the shortest path between two points on a chess board using only knight movement
// we need to represent this as a graph
// each spot/node is a vertex with edges to possible next spots (also vertices)
// our chess board is an 8x8 grid (zero indexed so 0x0 - 7x7)
// invalid moves will be less than 0,0 or more than 7,7
// we can use an adjacency list to represent our graph
const n = 64;
const generatePossibleMoves = (square) => {
    // a square is in the format [x,y]
    let x = square[0];
    let y = square[1];
    let possibleMoves = [];

    // upperleft moves
    let ulOne = [x-1,y+2];
    let ulTwo = [x-2,y+1];

    // upperright moves
    let urOne = [x+1,y+2];
    let urTwo = [x+2,y+1];

    // lowerleft moves
    let llOne = [x-1,y-2];
    let llTwo = [x-2,y-1];

    // lowerright moves
    let lrOne = [x+1,y-2];
    let lrTwo = [x+2,y-1];

    // check if moves are invalid or not - x/y can't be less than 0 or more than 7
    possibleMoves.push(ulOne, ulTwo, urOne, urTwo, llOne, llTwo, lrOne, lrTwo);

    // get valid moves
    validMoves = [];

    for (let i = 0; i < possibleMoves.length; i++){
        let vertex = possibleMoves[i];
        if ((vertex[0] > 7 || vertex[1] > 7) || (vertex[0] < 0 || vertex[1] < 0)) {
            continue;
        } else {
            validMoves.push(vertex);
        }
    }
    return validMoves;
}

// knightmoves is meant to find the shortest path to the end point from the start point
// every step should add to a count
// we should also get the steps taken in our return
// base case -> if we're already on the end spot
const knightMoves = (start, end) => {
  // initialize a boolean list of spots
	let prev = solve(start);
    let path = reconstructPath(start, end, prev);
    console.log(`You made it in ${path.length - 1} moves! Here's your path: \n`);
    for (let p of path){
        console.log(`[${p}] \n`);
    }
}

const chessBoard = {};
for (let i = 0; i < 8; i++){
  for (let j = 0; j < 8; j++){
  chessBoard[`${[i,j]}`] = generatePossibleMoves([i,j]);
  }
}

const solve = (s) => {
	let q = [];
  q.push(s);
  
  visited = {}
  for (let i = 0; i < 8; i++){
  	for (let j = 0; j < 8; j++){
	  	visited[`${[i,j]}`] = false;
  	}
	}
  visited[s] = true;
  
  prev = {}
    for (let i = 0; i < 8; i++){
  		for (let j = 0; j < 8; j++){
	  		prev[`${[i,j]}`] = null;
  	}
	}
  
  while (q.length){
  	let node = q.shift();
  	let neighbours = chessBoard[node];
    
    for (let next of neighbours){
    	if (!visited[next]){
      	q.push(next);
        visited[next] = true;
        prev[next] = node;
      }
    }
  }
return prev;
}

const reconstructPath = (s, e, prev) => {
    path = []
    for (let at = e; at != null; at = prev[at]){
        path.push(at);
    }

    path = path.reverse();

    if (path[0] == s){
        return path;
    }
    return [];
}

/* console.log(chessBoard); */

// test the generate function
/* let test = [0,0];
test = generatePossibleMoves(test);
console.log(test); */

// test
knightMoves([3,3], [4,3]);