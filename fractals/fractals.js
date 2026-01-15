// SETUP
// Initialisation du canvas et du style graphique
function setup() {
  createCanvas(1100, 280);      // Taille de la scène
  stroke(255);                 // Couleur des traits : BLANC
  strokeWeight(0.7);           // Épaisseur fine, style schéma
  noFill();                    // Pas de remplissage (formes filaires)
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
  fractalTetra(110, 0, 55, depth);
  fractalCube(330, 0, 55, depth);
  fractalOcta(550, 0, 55, depth);
  fractalIcosa(770, 0, 55, depth);   
  fractalDodeca(990, 0, 55, depth);
}

/* TÉTRAÈDRE */
function fractalTetra(x, y, r, depth) {
  // Dessin de la forme de base (triangle)
  drawPolyAt(x, y, 3, r, -PI / 2);

  // Condition d'arrêt de la récursion
  if (depth <= 0) return;

  // Facteur d'échelle pour les sous-formes
  let scale = 0.45;

  // Répétition sur chaque sommet
  for (let i = 0; i < 3; i++) {
    let a = TWO_PI / 3 * i - PI / 2;
    fractalTetra(
      x + cos(a) * r,
      y + sin(a) * r,
      r * scale,
      depth - 1
    );
  }

  // Répétition au centre
  fractalTetra(x, y, r * scale, depth - 1);
}


/* CUBE */
function fractalCube(x, y, r, depth) {
  // Projection 2D du cube (carré incliné)
  drawPolyAt(x, y, 4, r, PI / 4);

  if (depth <= 0) return;

  let scale = 0.5;

  // Sous-cubes sur chaque sommet
  for (let i = 0; i < 4; i++) {
    let a = TWO_PI / 4 * i + PI / 4;
    fractalCube(
      x + cos(a) * r,
      y + sin(a) * r,
      r * scale,
      depth - 1
    );
  }

  // Cube central
  fractalCube(x, y, r * scale, depth - 1);
}

/* OCTAÈDRE */
function fractalOcta(x, y, r, depth) {
  // Carré + diagonales (projection de l'octaèdre)
  drawPolyAt(x, y, 4, r, PI / 4);
  drawDiagonals(x, y, 4, r);

  if (depth <= 0) return;

  let scale = 0.45;

  // Répétition fractale sur les sommets
  for (let i = 0; i < 4; i++) {
    let a = TWO_PI / 4 * i + PI / 4;
    fractalOcta(
      x + cos(a) * r,
      y + sin(a) * r,
      r * scale,
      depth - 1
    );
  }

  // Répétition centrale
  fractalOcta(x, y, r * scale, depth - 1);
}

/* ICOSAÈDRE */
function fractalIcosa(x, y, r, depth) {
  // Pentagone + diagonales (structure interne)
  drawPolyAt(x, y, 5, r, PI / 5);
  drawDiagonals(x, y, 5, r);

  // Cercle structurel (projection sphérique)
  ellipse(x, y, r * 1.6);

  if (depth <= 0) return;

  let scale = 0.42;

  // Sous-icosaèdres sur chaque sommet
  for (let i = 0; i < 5; i++) {
    let a = TWO_PI / 5 * i + PI / 5;
    fractalIcosa(
      x + cos(a) * r,
      y + sin(a) * r,
      r * scale,
      depth - 1
    );
  }

  // Icosaèdre central
  fractalIcosa(x, y, r * scale, depth - 1);
}

/* DODÉCAÈDRE */
function fractalDodeca(x, y, r, depth) {
  // Décagone (projection du dodécaèdre)
  drawPolyAt(x, y, 10, r, PI / 10);

  // Cercle de structure externe
  ellipse(x, y, r * 1.7);

  if (depth <= 0) return;

  let scale = 0.5;

  // Répétition sur chaque sommet
  for (let i = 0; i < 10; i++) {
    let a = TWO_PI / 10 * i + PI / 10;
    fractalDodeca(
      x + cos(a) * r,
      y + sin(a) * r,
      r * scale,
      depth - 1
    );
  }

  // Dodécaèdre central
  fractalDodeca(x, y, r * scale, depth - 1);
}

/* OUTILS */

// Dessine un polygone régulier centré avec rotation
function drawPolyAt(x, y, sides, r, rot) {
  push();
  translate(x, y);
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
      x + cos(a) * r,
      y + sin(a) * r
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