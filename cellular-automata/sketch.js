let cols, rows;
let resolution = 20;
let grid = [];
let next = [];

let song, fft;
let frameInterval = 10;
let frameCountUpdate = 0;

let smoothBass = 0;
let smoothMid = 0;
let smoothTreble = 0;

let started = false; // pour savoir si la musique a démarré

function preload() {
    song = loadSound('music-fairy-fountain.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    initializeGrid();
    fft = new p5.FFT();
}

function draw() {
    background(10, 10, 30);

    if (!started) {
        // message avant que l'utilisateur clique
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(24);
        text("Cliquez pour démarrer la musique et l'automate", width/2, height/2);
        return;
    }

    let spectrum = fft.analyze();
    let bass = fft.getEnergy("bass");
    let mid = fft.getEnergy("mid");
    let treble = fft.getEnergy("treble");

    // lissage pour fluidité
    smoothBass = lerp(smoothBass, bass, 0.1);
    smoothMid = lerp(smoothMid, mid, 0.1);
    smoothTreble = lerp(smoothTreble, treble, 0.1);

    frameCountUpdate++;
    if (frameCountUpdate % frameInterval == 0) {
        updateGrid(smoothBass / 255, smoothTreble / 255); // valeurs 0 à 1
    }

    drawGrid();
}

// clic pour démarrer la musique
function mousePressed() {
    if (!started) {
        userStartAudio(); // débloque l'audio sur navigateur
        song.loop();      // joue en boucle
        song.setVolume(0.5);
        started = true;
    }
}

// initialise la grille
function initializeGrid() {
    cols = floor(width / resolution);
    rows = floor(height / resolution);
    grid = [];
    next = [];

    for (let i = 0; i < cols; i++) {
        grid[i] = [];
        next[i] = [];
        for (let j = 0; j < rows; j++) {
            grid[i][j] = random() < 0.3 ? 1 : 0; // densité initiale faible
            next[i][j] = 0;
        }
    }
}

// mise à jour de l'automate
function updateGrid(bass, treble) {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            let neighbors = countNeighbors(grid, i, j);

            // règles esthétiques :
            // - naissance probabiliste selon basses
            // - mort rare selon aigus
            if (state == 0 && random() < bass * 0.3) {
                next[i][j] = 1;
            } else if (state == 1 && random() < 0.02) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        }
    }

    // échange les grilles
    let temp = grid;
    grid = next;
    next = temp;
}

// dessine les cellules
function drawGrid() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                // couleur pulsante selon la musique
                let r = map(smoothMid, 0, 255, 50, 200);
                let g = map(smoothBass, 0, 255, 50, 180);
                let b = map(smoothTreble, 0, 255, 100, 255);
                let alpha = map(smoothBass, 0, 255, 100, 255);

                fill(r, g, b, alpha);
                noStroke();

                // taille pulsante
                let size = resolution * map(smoothBass, 0, 255, 0.5, 1.5);
                ellipse(x + size/2, y + size/2, size, size);
            }
        }
    }
}

// compte les voisins vivants
function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

// adapte le canvas si la fenêtre change
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    initializeGrid();
}