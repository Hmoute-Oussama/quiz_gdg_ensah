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

    // Filtrer par année
    const disponibles = questionPool.filter(q => q.years.includes(annee));

    // Séparer par difficulté
    let faciles = melanger(disponibles.filter(q => q.difficulty === "easy"));
    let moyennes = melanger(disponibles.filter(q => q.difficulty === "medium"));
    let difficiles = melanger(disponibles.filter(q => q.difficulty === "hard"));

    // Définir les quotas selon l'année
    let quotas = { easy: 0, medium: 0, hard: 0 };

    if (annee === 1) quotas = { easy: 7, medium: 3, hard: 0 };
    else if (annee === 2) quotas = { easy: 4, medium: 5, hard: 1 };
    else if (annee === 3) quotas = { easy: 2, medium: 6, hard: 2 };
    else if (annee === 4) quotas = { easy: 1, medium: 5, hard: 4 };
    else if (annee === 5) quotas = { easy: 0, medium: 4, hard: 6 };

    let selection = [];

    // On extrait le nombre exact si on l'a (splice retire les éléments du tableau source)
    selection = selection.concat(faciles.splice(0, quotas.easy));
    selection = selection.concat(moyennes.splice(0, quotas.medium));
    selection = selection.concat(difficiles.splice(0, quotas.hard));

    // Fallback : si pour une raison quelconque une catégorie n'avait pas assez de questions
    // on rassemble le reste et on complète au besoin pour atteindre 10 questions.
    let resteDispo = melanger([...faciles, ...moyennes, ...difficiles]);
    while (selection.length < QUESTIONS_PAR_QUIZ && resteDispo.length > 0) {
        selection.push(resteDispo.pop());
    }

    // Mélanger le mix final
    questionsActuelles = melanger(selection).slice(0, QUESTIONS_PAR_QUIZ);

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