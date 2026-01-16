let angles = {};
let speeds = {};

// SETUP
// Initialisation du canvas et du style graphique
function setup() {
  createCanvas(1100, 280);      // Taille de la scène
  stroke(255);                 // Couleur des traits : BLANC
  strokeWeight(0.7);           // Épaisseur fine, style schéma
  noFill();                    // Pas de remplissage
}

// DRAW
// Boucle de rendu principale
function draw() {
  background(8);               // Fond sombre pour contraste
  translate(0, height / 2);    // Centre verticalement les formes

  // Profondeur fractale contrôlée par la souris (axe X)
  let maxDepth = 4;
  let depth = floor(map(mouseX, 0, width, 0, maxDepth));
  depth = constrain(depth, 0, maxDepth);

  // Appel des fractales (solides de Platon)
  fractalTetra(110, 0, 55, depth, "tetra");
  fractalCube(330, 0, 55, depth, "cube");
  fractalOcta(550, 0, 55, depth, "octa");
  fractalIcosa(770, 0, 55, depth, "icosa");   
  fractalDodeca(990, 0, 55, depth, "dodeca");
}

// Gestion de la rotation au survol de la souris
function updateRotation(id, x, y, r) {
  if (!(id in angles)) angles[id] = 0;
  if (!(id in speeds)) speeds[id] = 0;

  let correctedMouseY = mouseY - height / 2;
  let d = dist(mouseX, correctedMouseY, x, y);

  let targetSpeed = d < r ? 0.01 : 0;
  speeds[id] = lerp(speeds[id], targetSpeed, 0.05);
  angles[id] += speeds[id];
}

// TÉTRAÈDRE
function fractalTetra(x, y, r, depth, id) {
  updateRotation(id, x, y, r);

  push();
  translate(x, y);
  rotate(angles[id]);

  // Dessin de la forme de base (triangle)
  drawPolyAt(0, 0, 3, r, -PI / 2);

  // Condition d'arrêt de la récursion
  if (depth <= 0) {
    pop();
    return;
  }

  // Facteur d'échelle pour les sous-formes
  let scale = 0.45;

  // Répétition sur chaque sommet
  for (let i = 0; i < 3; i++) {
    let a = TWO_PI / 3 * i - PI / 2;
    fractalTetra(
      cos(a) * r,
      sin(a) * r,
      r * scale,
      depth - 1,
      id
    );
  }

  // Répétition au centre
  fractalTetra(0, 0, r * scale, depth - 1, id);

  pop();
}

// CUBE
function fractalCube(x, y, r, depth, id) {
  updateRotation(id, x, y, r);

  push();
  translate(x, y);
  rotate(angles[id]);

  // Projection 2D du cube (carré incliné)
  drawPolyAt(0, 0, 4, r, PI / 4);

  if (depth <= 0) {
    pop();
    return;
  }

  let scale = 0.5;

  // Sous-cubes sur chaque sommet
  for (let i = 0; i < 4; i++) {
    let a = TWO_PI / 4 * i + PI / 4;
    fractalCube(
      cos(a) * r,
      sin(a) * r,
      r * scale,
      depth - 1,
      id
    );
  }

  // Cube central
  fractalCube(0, 0, r * scale, depth - 1, id);

  pop();
}

// OCTAÈDRE
function fractalOcta(x, y, r, depth, id) {
  updateRotation(id, x, y, r);

  push();
  translate(x, y);
  rotate(angles[id]);

  // Carré + diagonales (projection de l'octaèdre)
  drawPolyAt(0, 0, 4, r, PI / 4);
  drawDiagonals(0, 0, 4, r);

  if (depth <= 0) {
    pop();
    return;
  }

  let scale = 0.45;

  // Répétition fractale sur les sommets
  for (let i = 0; i < 4; i++) {
    let a = TWO_PI / 4 * i + PI / 4;
    fractalOcta(
      cos(a) * r,
      sin(a) * r,
      r * scale,
      depth - 1,
      id
    );
  }

  // Répétition centrale
  fractalOcta(0, 0, r * scale, depth - 1, id);

  pop();
}

// ICOSAÈDRE
function fractalIcosa(x, y, r, depth, id) {
  updateRotation(id, x, y, r);

  push();
  translate(x, y);
  rotate(angles[id]);

  // Pentagone + diagonales (structure interne)
  drawPolyAt(0, 0, 5, r, PI / 5);
  drawDiagonals(0, 0, 5, r);

  // Cercle structurel (projection sphérique)
  ellipse(0, 0, r * 1.6);

  if (depth <= 0) {
    pop();
    return;
  }

  let scale = 0.42;

  // Sous-icosaèdres sur chaque sommet
  for (let i = 0; i < 5; i++) {
    let a = TWO_PI / 5 * i + PI / 5;
    fractalIcosa(
      cos(a) * r,
      sin(a) * r,
      r * scale,
      depth - 1,
      id
    );
  }

  // Icosaèdre central
  fractalIcosa(0, 0, r * scale, depth - 1, id);

  pop();
}

// DODÉCAÈDRE
function fractalDodeca(x, y, r, depth, id) {
  updateRotation(id, x, y, r);

  push();
  translate(x, y);
  rotate(angles[id]);

  // Décagone (projection du dodécaèdre)
  drawPolyAt(0, 0, 10, r, PI / 10);

  // Cercle de structure externe
  ellipse(0, 0, r * 1.7);

  if (depth <= 0) {
    pop();
    return;
  }

  let scale = 0.5;

  // Répétition sur chaque sommet
  for (let i = 0; i < 10; i++) {
    let a = TWO_PI / 10 * i + PI / 10;
    fractalDodeca(
      cos(a) * r,
      sin(a) * r,
      r * scale,
      depth - 1,
      id
    );
  }

  // Dodécaèdre central
  fractalDodeca(0, 0, r * scale, depth - 1, id);

  pop();
}

// OUTILS

// Dessine un polygone régulier centré avec rotation
function drawPolyAt(x, y, sides, r, rot) {
  push();
  rotate(rot);
  beginShape();
  for (let i = 0; i < sides; i++) {
    let a = TWO_PI / sides * i;
    vertex(cos(a) * r, sin(a) * r);
  }
  endShape(CLOSE);
  pop();
}

// Dessine toutes les diagonales internes d’un polygone
function drawDiagonals(x, y, sides, r) {
  let pts = [];

  // Calcul des sommets
  for (let i = 0; i < sides; i++) {
    let a = TWO_PI / sides * i;
    pts.push(createVector(
      cos(a) * r,
      sin(a) * r
    ));
  }

  // Connexion des sommets non adjacents
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 2; j < pts.length; j++) {
      if (j !== (i + sides - 1) % sides) {
        line(pts[i].x, pts[i].y, pts[j].x, pts[j].y);
      }
    }
  }
}