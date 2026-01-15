# Fractales, solides de Platon - p5.js

## Description

Ce projet est une visualisation interactive réalisée en p5.js, inspirée des solides de Platon (tétraèdre, cube, octaèdre, icosaèdre et dodécaèdre).

Chaque solide est représenté sous forme de projection géométrique 2D, puis transformé en structure fractale par autosimilarité : la forme est répétée à plus petite échelle au centre et sur chacun de ses sommets.

La complexité des fractales évolue en temps réel en fonction de la position de la souris sur l’axe horizontal, créant un effet de déploiement et de repli en gardant une esthétique mathématique rigoureuse et symétrique.

## Structure du projet
```
./index.html
├── ./libraries
│   └── p5.js
├── readme.md
└── fractals.js
```

## Fonctionnement

- Canvas horizontal centré, fond sombre pour un contraste optimal.
- Visualisation de 5 solides de Platon :
    - Tétraèdre (triangle)
    - Cube (carré incliné)
    - Octaèdre (carré avec diagonales)
    - Icosaèdre (pentagone avec diagonales et cercle)
    - Dodécaèdre (décagone avec cercle)
- Fractales récursives :
    - Répétition de la forme sur chaque sommet
    - Répétition au centre
    - Autosimilarité conservée à chaque niveau
- Interaction utilisateur :
    - Souris (axe X) → contrôle la profondeur de récursion
    - Vers la droite : complexité croissante
    - Vers la gauche : retour progressif à la forme simple

## Utilisation

1. Ouvrir index.html dans un navigateur compatible (Chrome, Firefox).
2. Déplacer la souris horizontalement sur la fenêtre.
3. Observer les solides se transformer progressivement en structures fractales.
4. Revenir vers la gauche pour simplifier les formes.

## Technologies et aide utilisée

- p5.js pour le dessin, la géométrie et l’interaction.
- Mathématiques géométriques :
    - Polygones réguliers
    - Symétries radiales
    - Autosimilarité fractale
- Inspirations :
    - Solides de Platon
    - Projections géométriques 2D
    - Fractales récursives
- ChatGPT :
    - Aide à la conception des structures fractales
    - Organisation du code
    - Commentaires et documentation du projet