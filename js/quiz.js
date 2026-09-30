/* =============================================================
   QUIZ CORE — logique de génération et de scoring
   ============================================================= */

const QUESTIONS_PAR_QUIZ = 10;
const TEMPS_PAR_QUESTION = 15;

let questionsActuelles = [];
let questionActuelle = 0;
let score = 0;
let bonnesReponses = 0;
let historiqueTemps = [];
let serie = 0;
let meilleureSerie = 0;

let chronometre;
let tempsRestant = TEMPS_PAR_QUESTION;

const DIFFICULTES = ["easy", "medium", "hard"];

// Répartition souhaitée par promotion
const QUOTAS = {
    1: { easy: 7, medium: 3, hard: 0 },
    2: { easy: 4, medium: 5, hard: 1 },
    3: { easy: 2, medium: 6, hard: 2 },
    4: { easy: 1, medium: 5, hard: 4 },
    5: { easy: 0, medium: 4, hard: 6 }
};

// Catégories les plus proches d'une difficulté donnée.
// À égalité de distance on privilégie la difficulté INFÉRIEURE :
// une 1ère année ne doit jamais recevoir une question plus dure que prévu.
function prochesDe(difficulte) {
    const index = DIFFICULTES.indexOf(difficulte);
    return DIFFICULTES
        .map((d, i) => ({ d, distance: Math.abs(i - index) }))
        .sort((a, b) => a.distance - b.distance || a.d - b.d)
        .map(o => o.d);
}


// Mélanger un tableau (Fisher-Yates)
function melanger(tableau) {
    const copie = [...tableau];
    for (let i = copie.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copie[i], copie[j]] = [copie[j], copie[i]];
    }
    return copie;
}


// Générer un quiz aléatoire selon l'année en respectant les quotas de difficulté
function genererQuiz(annee) {

    const disponibles = questionPool.filter(q => q.years.includes(annee));
    const quotas = QUOTAS[annee] || { easy: 0, medium: 0, hard: 0 };

    // Paniers mélangés par difficulté
    const paniers = {};
    for (const d of DIFFICULTES) {
        paniers[d] = melanger(disponibles.filter(q => q.difficulty === d));
    }

    // 1. On prend le quota exact là où c'est possible
    const choix = {};
    for (const d of DIFFICULTES) choix[d] = paniers[d].splice(0, quotas[d]);

    const total = () => DIFFICULTES.reduce((n, d) => n + choix[d].length, 0);

    // 2. Quota non couvert : on complète avec la difficulté la plus proche.
    //    Garantit qu'une 1ère année ne reçoit jamais de question "hard", etc.
    for (const d of DIFFICULTES) {
        while (choix[d].length < quotas[d] && total() < QUESTIONS_PAR_QUIZ) {
            let emprunte = false;
            for (const proche of prochesDe(d)) {
                if (proche !== d && paniers[proche].length) {
                    choix[d].push(paniers[proche].pop());
                    emprunte = true;
                    break;
                }
            }
            if (!emprunte) break; // plus rien à proximité : on passe à la catégorie suivante
        }
    }

    // 3. Filet de sécurité : la banque est trop petite pour cette année
    if (total() < QUESTIONS_PAR_QUIZ) {
        for (const d of DIFFICULTES) {
            while (paniers[d].length && total() < QUESTIONS_PAR_QUIZ) choix[d].push(paniers[d].pop());
        }
    }

    // Mélange final : l'ordre de présentation est aléatoire
    questionsActuelles = melanger(DIFFICULTES.flatMap(d => choix[d])).slice(0, QUESTIONS_PAR_QUIZ);

    questionActuelle = 0;
    score = 0;
    bonnesReponses = 0;
    historiqueTemps = [];
    serie = 0;
    meilleureSerie = 0;
}


// Récupérer la question actuelle
function obtenirQuestionActuelle() {
    return questionsActuelles[questionActuelle];
}


// Calcul des points basé sur le temps restant et la difficulté
function calculerPoints(difficulte, tempsrestant) {
    let pointMax = 150;

    if (difficulte === "medium") pointMax = 300;
    else if (difficulte === "hard") pointMax = 450;

    // Calcul proportionnel : tempsrestant est entre 1 et 15.
    // Si tu réponds immédiatement (15s), tu as le max de points.
    return Math.floor((tempsrestant / TEMPS_PAR_QUESTION) * pointMax);
}