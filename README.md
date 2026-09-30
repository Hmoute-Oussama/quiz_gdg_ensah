# 🎯 GDG Quiz Tech — ENSAH

Quiz technique dynamique aux couleurs de Google, organisé par le **Google Developer Group ENSAH**.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Dépendances](https://img.shields.io/badge/d%C3%A9pendances-aucune-34A853?style=flat-square)

---

## ✨ Fonctionnalités

- **80 questions** classées par année (1ère → 5ème) et par difficulté (facile / moyen / difficile)
- **Quotas intelligents** : la répartition difficile/moyen/facile s'adapte au niveau de la promotion
- **15 secondes** par question, avec anneau de chronomètre circulaire
- **Scoring proportionnel** : plus vite = plus de points (jusqu'à 450 pts sur une question difficile)
- **Fond animé Google** : bulles canvas aux 4 couleurs de marque, arcs rotatifs, ondes, réaction au curseur
- **Confettis** à chaque bonne réponse et à la fin du quiz
- **Sons synthétisés** via Web Audio API (aucun fichier audio)
- **Raccourcis clavier** : `1` `2` `3` `4` pour répondre, `Entrée` pour la question suivante
- **Record sauvegardé** dans le navigateur (`localStorage`)
- **100 % responsive** — testé de 320 px à 1440 px, mode paysage inclus
- **Accessible** : contrastes vérifiés, `prefers-reduced-motion` respecté, navigation clavier

## 🎮 Jouer

```bash
git clone https://github.com/Hmoute-Oussama/quiz_gdg_ensah.git
cd quiz_gdg_ensah
python -m http.server 5173
```

Puis ouvrir <http://localhost:5173>

> Ouvrir `index.html` directement dans le navigateur fonctionne également.

## 📁 Structure

```
.
├── index.html            # Structure des 4 écrans
├── css/
│   ├── style.css         # Thème Google, fond dynamique, animations
│   └── responsive.css    # Breakpoints 1400 → 320 px + paysage
└── js/
    ├── questions.js      # Banque de 80 questions (données)
    ├── quiz.js           # Génération du quiz, quotas, scoring
    └── app.js            # Interface, animations, canvas, audio
```

## 🎨 Charte graphique

| Couleur | Hex | Usage |
| --- | --- | --- |
| Bleu | `#4285F4` | Bulles, bleu principal |
| Rouge | `#EA4335` | Bulles, erreurs |
| Jaune | `#FBBC05` | Bulles, combo 🔥 |
| Vert | `#34A853` | Bulles, bonnes réponses |

Typographie : **Plus Jakarta Sans** (titres), **Inter** (texte), **JetBrains Mono** (chiffres).

## 🏗️ Stack

HTML, CSS et JavaScript **natifs**. Aucune dépendance, aucun build, aucun bundler.
Le fond animé et les confettis sont rendus sur `<canvas>` ; les sons sont synthétisés
à la volée par l'API Web Audio.

## 🤝 Contributions

Les questions se modifient dans `js/questions.js` :

```js
{
  question: "Votre question ?",
  answers: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
  correct: 0,                 // index de la bonne réponse
  difficulty: "easy",         // "easy" | "medium" | "hard"
  years: [1, 2, 3]            // promotions concernées
}
```

---

Développé avec ❤️ par le **GDG ENSAH** — *Google Developer Group, École Nationale Supérieure d'Architecture et d'Ingénierie*