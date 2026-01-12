function setup() {
  createCanvas(640, 480);
  background(255);
  stroke(0);
  noFill();

  let data = [
    [0, 0],
    [0, 2],
    [2, -1]
  ];

  // tableaux X%() et Y%() 
  let xp = [];
  let yp = [];

  // lecture des données
  for (let i = 0; i <= 2; i++) {
    let Xv = data[i][0];
    let Yv = data[i][1];

    xp[i] = Xv * width / 15;
    yp[i] = Yv * width / 15;
  }

  // boucle principale
  let X = 1;
  while (X <= 1100) {

    line(
      X / 2,
      X / 10 * sin(X / 20) + X / 20 + height / 5,
      50 * sin(width / X / 70) + height / 2,
      X / 4 * sin(X / 120) + width / 5
    );

    X = X + 4;
  }
}