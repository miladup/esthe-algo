# Automate Cellulaire Musical – p5.js

## Description

Ce projet est une visualisation musicale interactive réalisée en p5.js. Il combine un automate cellulaire et l’analyse en temps réel d’un fichier audio .mp3 pour créer un rendu fluide et esthétique.

Les cellules sont représentées par des cercles pulsants dont la taille, la couleur et la transparence évoluent au rythme de la musique, offrant un effet féérique et immersif.

Ces cercles peuvent être remplacés par des carrés en mettant ```rect(x, y, size, size);``` à la place de ```ellipse(x + size/2, y + size/2, size, size);``` dans sketch.js.

## Structure du projet
```
./index.html
├── ./libraries
│   ├── p5.js
│   └── p5.sound.js
├── music-fairy-fountain.mp3
├── readme.md
└── sketch.js
```
## Fonctionnement

- Canvas fullscreen adaptatif.
- Automate cellulaire probabiliste : naissance et mort des cellules influencées par la musique.
- Analyse audio avec FFT :
    - Bass → taille et apparition des cercles
    - Mid → couleur
    - Treble → couleur et transparence
- Cercles pulsants pour un effet fluide et vivant.
- Interaction utilisateur : clic pour démarrer la musique et l’animation.

## Utilisation

1. Ouvrir index.html dans un navigateur compatible.
2. Cliquer sur le canvas pour démarrer la musique et l’animation.
3. Observer les cercles qui pulsant et changent de couleur au rythme de la musique.

## Technologies et aide utilisée

- p5.js et p5.sound.js pour le dessin et l’analyse audio.
- Développement inspiré du Jeu de la Vie de Conway, adapté pour un rendu musical et fluide.
- ChatGPT : aide à la conception de l’automate cellulaire, à l’analyse audio (FFT) et à l’amélioration du rendu visuel et de la fluidité de l’animation.