let t = 0;

function setup() {
  createCanvas(640, 480);
  colorMode(HSB, 360, 100, 100, 100); // pour du pastel
  noFill();
}

function draw() {
  background(0, 0, 0); // fond noir

  let n = 0;
  let d = 1;
  let x = width;
  let y = height;

  t += 0.016; // vitesse couleurs

  while (n < y) {

    d = d + 1;
    strokeWeight(d);

    // pastel = saturation faible, luminosité forte
    let hue = (t * 60 + d * 8) % 360;
    let sat = 30;
    let bri = 95;

    stroke(hue, sat, bri, 80);

    n = n + d + 1;
    x = x - d - 10;
    y = y - d - 10;

    rect(n, n, x - n, y - n);
  }
}