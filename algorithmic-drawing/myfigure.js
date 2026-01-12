let xScale = 0.015;
let yScale = 0.02;
let tScale = 0.01;   // vitesse du mouvement
let t = 0;

let gap = 20;

function setup() {
  createCanvas(600, 600);
  noStroke();
  fill(0);
}

function draw() {
  background(255);

  // le temps avance doucement
  t += tScale;

  for (let x = gap / 2; x < width; x += gap) {
    for (let y = gap / 2; y < height; y += gap) {

      // noise 3D : position fixe + temps
      let n = noise(
        x * xScale,
        y * yScale,
        t
      );

      let diameter = n * gap;
      circle(x, y, diameter);
    }
  }
}