// Rubik's Cube Class
class RubiksCube {
  constructor() {
    this.faces = {
      U: Array(9).fill('w'),
      D: Array(9).fill('y'),
      F: Array(9).fill('g'),
      B: Array(9).fill('b'),
      L: Array(9).fill('o'),
      R: Array(9).fill('r')
    };
    this.moveHistory = [];
  }

  rotateFace(face, clockwise = true) {
    const rotate = (arr) => clockwise
      ? [arr[6], arr[3], arr[0], arr[7], arr[4], arr[1], arr[8], arr[5], arr[2]]
      : [arr[2], arr[5], arr[8], arr[1], arr[4], arr[7], arr[0], arr[3], arr[6]];

    this.faces[face] = rotate(this.faces[face]);
    this.moveHistory.push(`${face}${clockwise ? "" : "'"}`);
  }

  scramble(moves = 20) {
    const faces = ['U', 'D', 'F', 'B', 'L', 'R'];
    for (let i = 0; i < moves; i++) {
      const face = faces[Math.floor(Math.random() * faces.length)];
      const clockwise = Math.random() > 0.5;
      this.rotateFace(face, clockwise);
    }
  }

  solveNaive() {
    for (let i = this.moveHistory.length - 1; i >= 0; i--) {
      const move = this.moveHistory[i];
      const face = move[0];
      const clockwise = move.length === 1;
      this.rotateFace(face, !clockwise);
    }
  }

  getCubeStateString() {
    return (
      this.faces.U.join('') +
      this.faces.R.join('') +
      this.faces.F.join('') +
      this.faces.D.join('') +
      this.faces.L.join('') +
      this.faces.B.join('')
    );
  }

  display() {
    const cubeString = this.getCubeStateString();
    const svg = getCubeSvg0(cubeString);
    document.getElementById("cube").innerHTML = svg;
  }
}

// Placeholder visualization method
function getCubeSvg0(cubeStr) {
  return `<pre style="background:#fff;border:1px solid #ccc;padding:10px;">Cube State:<br>${cubeStr}</pre>`;
}

// Instance and button handlers
const cube = new RubiksCube();

function displayCube() {
  cube.display();
}

function scrambleCube() {
  cube.scramble();
  cube.display();
}

function solveCube() {
  cube.solveNaive();
  cube.display();
}
