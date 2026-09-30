/* =============================================================
   APP — interface, animations, effets sonores et confettis
   ============================================================= */

/* -------------------------------------------------------------
   1. RÉFÉRENCES DOM
   ------------------------------------------------------------- */
const ecranAccueil = document.getElementById("start-screen");
const ecranAnnee = document.getElementById("year-screen");
const ecranQuiz = document.getElementById("quiz-screen");
const ecranResultat = document.getElementById("result-screen");

const boutonLancerSelection = document.getElementById("start-btn");
const boutonContinuer = document.getElementById("continue-btn");
const boutonRejouer = document.getElementById("restart-btn");
const boutonSon = document.getElementById("sound-toggle");

const boutonsAnnee = document.querySelectorAll(".year-btn, .year-card");

const numeroQuestion = document.getElementById("question-number");
const elementQuestion = document.getElementById("question");
const elementReponses = document.getElementById("answers");

const elementScore = document.getElementById("score");
const elementChronometre = document.getElementById("timer");
const anneauTimer = document.getElementById("timer-ring");
const widgetTimer = document.getElementById("timer-widget");

const elementDifficulte = document.getElementById("difficulty");
const elementFeedback = document.getElementById("feedback");
const feedbackTexte = elementFeedback.querySelector(".feedback-text");
const boutonSuivant = document.getElementById("next-btn");

const pastilleSerie = document.getElementById("streak-pill");
const compteurSerie = document.getElementById("streak-count");

const barreProgression = document.getElementById("progress-bar");

const scoreFinal = document.getElementById("final-score");
const elementBonnesReponses = document.getElementById("correct-answers");
const elementTempsMoyen = document.getElementById("average-time");
const elementMeilleureSerie = document.getElementById("best-streak");
const elementMeilleurScore = document.getElementById("best-score");
const elementPourcentage = document.getElementById("result-pct");
const elementRange = document.getElementById("result-ring");
const elementBadge = document.getElementById("result-badge");
const elementTitre = document.getElementById("result-rank");
const messageResultat = document.getElementById("result-message");

const LETTRES = ["A", "B", "C", "D", "E", "F"];
const CIRCONFERENCE_TIMER = 2 * Math.PI * 20;
const CIRCONFERENCE_RESULTAT = 2 * Math.PI * 52;

let anneeEtudiant = null;


/* -------------------------------------------------------------
   2. SONS (Web Audio API — aucun fichier externe)
   ------------------------------------------------------------- */
const SFX = (() => {
    let ctx = null;
    let actif = localStorage.getItem("gdg-quiz-sound") !== "off";

    function assurer() {
        if (!ctx) {
            try {
                ctx = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                ctx = null;
            }
        }
        if (ctx && ctx.state === "suspended") ctx.resume();
        return ctx;
    }

    function note(freq, depart, duree, type = "sine", volume = 0.05) {
        const c = assurer();
        if (!c || !actif) return;

        const osc = c.createOscillator();
        const gain = c.createGain();
        const t = c.currentTime + depart;

        osc.type = type;
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(volume, t + 0.014);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + duree);

        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(t);
        osc.stop(t + duree + 0.03);
    }

    return {
        get actif() { return actif; },
        set actif(v) {
            actif = v;
            localStorage.setItem("gdg-quiz-sound", v ? "on" : "off");
            if (v) this.clic();
        },
        clic() { note(520, 0, 0.07, "triangle", 0.035); },
        survol() { note(880, 0, 0.04, "sine", 0.012); },
        tic() { note(1180, 0, 0.04, "square", 0.016); },
        bonneReponse() {
            [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => note(f, i * 0.055, 0.24, "sine", 0.05));
        },
        mauvaiseReponse() {
            note(200, 0, 0.16, "sawtooth", 0.03);
            note(148, 0.09, 0.28, "sawtooth", 0.028);
        },
        tempsEcoule() {
            note(320, 0, 0.12, "square", 0.025);
            note(240, 0.1, 0.22, "square", 0.02);
        },
        victoire() {
            [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => note(f, i * 0.1, 0.42, "triangle", 0.055));
        }
    };
})();


/* -------------------------------------------------------------
   3. FOND ANIMÉ — bulles Google + constellation
   ------------------------------------------------------------- */
const ArrierePlan = (() => {
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    const reduire = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Les 4 couleurs de marque Google
    const TEINTES = [
        { rgb: "66,133,244", nom: "bleu" },
        { rgb: "234,67,53", nom: "rouge" },
        { rgb: "251,188,5", nom: "jaune" },
        { rgb: "52,168,83", nom: "vert" }
    ];

    let bulles = [];
    let particules = [];
    let lueurs = [];
    let ondes = [];
    let largeur = 0, hauteur = 0;
    let enCours = false;
    let temps = 0;
    let prochainOnde = 0;
    let dernierDessin = 0;
    let pointeur = { x: -999, y: -999, actif: false };

    // Le fond reste fluide même sur machines modestes
    const IPS_MAX = 50;
    const INTERVALLE = 1000 / IPS_MAX;

    /* ---------- création ---------- */

    // Grands halos de couleur qui dérivent (rendu canvas = pas de filtre CSS coûteux)
    function creerLueurs() {
        const zone = { l: largeur, h: hauteur };
        return TEINTES.map((teinte, i) => ({
            teinte,
            x: zone.l * (0.1 + 0.26 * i),
            y: zone.h * (0.12 + 0.22 * (i % 2)),
            r: Math.max(largeur, hauteur) * (0.42 + i * 0.05),
            vx: (Math.random() - 0.5) * 0.09,
            vy: (Math.random() - 0.5) * 0.07
        }));
    }

    function creerBulle(i, total) {
        const teinte = TEINTES[i % TEINTES.length];
        const diametre = 70 + Math.random() * 250;

        return {
            x: Math.random() * largeur,
            y: Math.random() * hauteur,
            r: diametre / 2,
            vx: (Math.random() - 0.5) * 0.32,
            vy: (Math.random() - 0.5) * 0.32,
            teinte,
            lw: 1 + Math.random() * 1.6,
            base: 0.16 + Math.random() * 0.16,
            arc: 0.5 + Math.random() * 1.5,
            rot: Math.random() * Math.PI * 2,
            vr: (Math.random() - 0.5) * 0.011,
            phase: Math.random() * Math.PI * 2,
            vitesse: 0.006 + Math.random() * 0.014,
            halo: Math.random() > 0.45,
            exterieur: total > 8 && i % 3 === 0
        };
    }

    function redimensionner() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        largeur = canvas.clientWidth;
        hauteur = canvas.clientHeight;
        canvas.width = largeur * dpr;
        canvas.height = hauteur * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const surface = largeur * hauteur;
        const nbBulles = Math.max(7, Math.min(18, Math.round(surface / 78000)));
        bulles = Array.from({ length: nbBulles }, (_, i) => creerBulle(i, nbBulles));

        const densite = Math.min(Math.round(surface / 20000), 70);
        particules = Array.from({ length: densite }, () => ({
            x: Math.random() * largeur,
            y: Math.random() * hauteur,
            vx: (Math.random() - 0.5) * 0.24,
            vy: (Math.random() - 0.5) * 0.24,
            r: Math.random() * 1.7 + 0.6,
            c: TEINTES[Math.floor(Math.random() * TEINTES.length)].rgb
        }));

        lueurs = creerLueurs();
    }

    /* ---------- ondes ---------- */

    function onde(x, y, teinte, force = 1) {
        ondes.push({
            x, y, teinte,
            r: 6,
            max: 220 + Math.random() * 260 * force,
            alpha: 0.42 * force,
            lw: 2.2
        });
    }

    /* ---------- dessin ---------- */

    function dessinerLueurs() {
        ctx.globalCompositeOperation = "lighter";

        for (const l of lueurs) {
            const gradient = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r);
            gradient.addColorStop(0, `rgba(${l.teinte.rgb},0.17)`);
            gradient.addColorStop(0.45, `rgba(${l.teinte.rgb},0.07)`);
            gradient.addColorStop(1, `rgba(${l.teinte.rgb},0)`);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, largeur, hauteur);
        }

        ctx.globalCompositeOperation = "source-over";
    }

    function dessinerOndes() {
        ondes = ondes.filter(o => {
            const p = o.r / o.max;
            if (p >= 1) return false;

            ctx.beginPath();
            ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${o.teinte.rgb},${o.alpha * (1 - p)})`;
            ctx.lineWidth = o.lw * (1 - p * 0.65);
            ctx.stroke();
            return true;
        });
    }

    function dessinerBulle(b, tempsActuel) {
        // rayon qui respire
        const r = b.r * (1 + Math.sin(tempsActuel * b.vitesse + b.phase) * 0.045);
        const proximity = pointeur.actif
            ? Math.max(0, 1 - Math.hypot(pointeur.x - b.x, pointeur.y - b.y) / 260)
            : 0;
        const rFinal = r * (1 + proximity * 0.07);
        const intensite = b.base + proximity * 0.3;

        ctx.save();

        // halo intérieur
        if (b.halo) {
            const halo = ctx.createRadialGradient(b.x, b.y, rFinal * 0.2, b.x, b.y, rFinal);
            halo.addColorStop(0, `rgba(${b.teinte.rgb},${0.1 + intensite * 0.35})`);
            halo.addColorStop(0.72, `rgba(${b.teinte.rgb},${intensite * 0.1})`);
            halo.addColorStop(1, `rgba(${b.teinte.rgb},0)`);
            ctx.fillStyle = halo;
            ctx.beginPath();
            ctx.arc(b.x, b.y, rFinal, 0, Math.PI * 2);
            ctx.fill();
        }

        // anneau principal
        ctx.beginPath();
        ctx.arc(b.x, b.y, rFinal, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${b.teinte.rgb},${intensite})`;
        ctx.lineWidth = b.lw;
        ctx.stroke();

        // arc lumineux en rotation
        ctx.beginPath();
        ctx.arc(b.x, b.y, rFinal, b.rot, b.rot + b.arc);
        ctx.strokeStyle = `rgba(${b.teinte.rgb},${Math.min(1, intensite * 2.4)})`;
        ctx.lineWidth = b.lw * 1.9;
        ctx.lineCap = "round";
        ctx.stroke();

        // anneau intérieur (style Material)
        ctx.beginPath();
        ctx.arc(b.x, b.y, rFinal * 0.78, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${b.teinte.rgb},${intensite * 0.34})`;
        ctx.lineWidth = b.lw * 0.7;
        ctx.stroke();

        // reflet spéculaire
        ctx.beginPath();
        ctx.arc(b.x, b.y, rFinal * 0.93, Math.PI * 1.15, Math.PI * 1.42);
        ctx.strokeStyle = `rgba(255,255,255,${0.05 + proximity * 0.08})`;
        ctx.lineWidth = b.lw * 1.4;
        ctx.stroke();

        ctx.restore();
    }

    function dessinerParticules() {
        ctx.fillStyle = "rgba(190,205,235,0.4)";
        for (const p of particules) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function majParticules() {
        for (const p of particules) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < -20) p.x = largeur + 20;
            if (p.x > largeur + 20) p.x = -20;
            if (p.y < -20) p.y = hauteur + 20;
            if (p.y > hauteur + 20) p.y = -20;
        }
    }

    function majBulles() {
        for (const b of bulles) {
            b.x += b.vx;
            b.y += b.vy;
            b.rot += b.vr;

            const marge = b.r + 70;
            if (b.x < -marge) b.x = largeur + marge;
            if (b.x > largeur + marge) b.x = -marge;
            if (b.y < -marge) b.y = hauteur + marge;
            if (b.y > hauteur + marge) b.y = -marge;

            // parallaxe douce + répulsion du curseur
            if (pointeur.actif) {
                const dx = b.x - pointeur.x;
                const dy = b.y - pointeur.y;
                const d = Math.hypot(dx, dy);
                const zone = b.r + 150;
                if (d < zone && d > 0) {
                    const force = (1 - d / zone) * 0.85;
                    b.x += (dx / d) * force;
                    b.y += (dy / d) * force;
                }
            }
        }
    }

    function majLueurs() {
        for (const l of lueurs) {
            l.x += l.vx;
            l.y += l.vy;

            if (l.x < -l.r) l.x = largeur + l.r;
            if (l.x > largeur + l.r) l.x = -l.r;
            if (l.y < -l.r) l.y = hauteur + l.r;
            if (l.y > hauteur + l.r) l.y = -l.r;
        }
    }

    function dessiner(maintenant) {
        // Plafond d'images : le décor reste fluide sans saturer le CPU
        if (maintenant - dernierDessin < INTERVALLE - 1) {
            enCours = requestAnimationFrame(dessiner);
            return;
        }
        dernierDessin = maintenant;

        temps += 1;
        ctx.clearRect(0, 0, largeur, hauteur);

        if (!reduire) {
            majBulles();
            majLueurs();
            majParticules();

            // ondes spontanées
            if (temps > prochainOnde) {
                prochainOnde = temps + 90 + Math.random() * 190;
                const b = bulles[Math.floor(Math.random() * bulles.length)];
                onde(b.x, b.y, b.teinte, 0.75);
            }
        }

        dessinerLueurs();
        dessinerParticules();
        for (const b of bulles) dessinerBulle(b, temps);
        dessinerOndes();

        if (!reduire) enCours = requestAnimationFrame(dessiner);
    }

    function gerbeAuPointeur(x, y) {
        const melange = [...bulles].sort((a, c) =>
            Math.hypot(a.x - x, a.y - y) - Math.hypot(c.x - x, c.y - y));
        for (let i = 0; i < 3 && i < melange.length; i++) {
            onde(melange[i].x, melange[i].y, melange[i].teinte, 1.2);
        }
    }

    function demarrer() {
        redimensionner();
        dernierDessin = 0;
        if (reduire) { dessiner(performance.now()); return; }
        if (!enCours) { enCours = true; requestAnimationFrame(dessiner); }
    }

    window.addEventListener("resize", redimensionner);
    window.addEventListener("pointermove", e => {
        pointeur.x = e.clientX;
        pointeur.y = e.clientY;
        pointeur.actif = true;
    });
    window.addEventListener("pointerleave", () => { pointeur.actif = false; });
    window.addEventListener("pointerdown", e => gerbeAuPointeur(e.clientX, e.clientY));

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            if (enCours) cancelAnimationFrame(enCours);
            enCours = false;
        } else if (!enCours && !reduire) {
            enCours = true;
            requestAnimationFrame(dessiner);
        }
    });

    return { demarrer };
})();


/* -------------------------------------------------------------
   4. CONFETTIS
   ------------------------------------------------------------- */
const Confettis = (() => {
    const canvas = document.getElementById("fx-canvas");
    const ctx = canvas.getContext("2d");
    const COULEURS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#8AB4F8", "#FFFFFF"];
    let morceaux = [];
    let raf = null;

    function redimensionner() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function gerbe(x, y, quantite, force = 1) {
        for (let i = 0; i < quantite; i++) {
            const angle = Math.random() * Math.PI * 2;
            const vitesse = (3 + Math.random() * 9) * force;
            morceaux.push({
                x, y,
                vx: Math.cos(angle) * vitesse,
                vy: Math.sin(angle) * vitesse - 3 * force,
                w: Math.random() * 8 + 4,
                h: Math.random() * 5 + 3,
                r: Math.random() * Math.PI,
                vr: (Math.random() - 0.5) * 0.35,
                c: COULEURS[Math.floor(Math.random() * COULEURS.length)],
                vie: 130,
                forme: Math.random() > 0.45 ? "carre" : "cercle"
            });
        }
        if (!raf) boucle();
    }

    function boucle() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        morceaux = morceaux.filter(m => {
            m.vie--;
            m.x += m.vx;
            m.y += m.vy;
            m.vy += 0.16;
            m.vx *= 0.99;
            m.r += m.vr;

            if (m.y > window.innerHeight + 40) return false;

            ctx.save();
            ctx.translate(m.x, m.y);
            ctx.rotate(m.r);
            ctx.globalAlpha = Math.max(0, Math.min(1, m.vie / 40));
            ctx.fillStyle = m.c;
            if (m.forme === "carre") ctx.fillRect(-m.w / 2, -m.h / 2, m.w, m.h);
            else { ctx.beginPath(); ctx.arc(0, 0, m.w / 2, 0, Math.PI * 2); ctx.fill(); }
            ctx.restore();
            return true;
        });

        if (morceaux.length) raf = requestAnimationFrame(boucle);
        else { raf = null; ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); }
    }

    window.addEventListener("resize", redimensionner);
    redimensionner();

    return {
        auCentre: (q, f) => gerbe(window.innerWidth / 2, window.innerHeight * 0.42, q, f),
        depuis: (el, q, f) => {
            const r = el.getBoundingClientRect();
            gerbe(r.left + r.width / 2, r.top + r.height / 2, q, f);
        }
    };
})();


/* -------------------------------------------------------------
   5. TRANSITION ENTRE ÉCRANS
   ------------------------------------------------------------- */
function changerEcran(cible, apres) {
    const actuel = document.querySelector(".screen.active");
    if (actuel === cible) { if (apres) apres(); return; }

    if (actuel) {
        actuel.classList.add("leaving");
        setTimeout(() => {
            actuel.classList.remove("active", "leaving");
            cible.classList.add("active");
            window.scrollTo({ top: 0, behavior: "smooth" });
            if (apres) apres();
        }, 260);
    } else {
        cible.classList.add("active");
        if (apres) apres();
    }
}


/* -------------------------------------------------------------
   6. NAVIGATION
   ------------------------------------------------------------- */
boutonLancerSelection.addEventListener("click", () => {
    SFX.clic();
    changerEcran(ecranAnnee);
});

document.querySelectorAll("[data-goto]").forEach(bouton => {
    bouton.addEventListener("click", () => {
        SFX.clic();
        changerEcran(document.getElementById(bouton.dataset.goto));
    });
});

boutonsAnnee.forEach(bouton => {
    bouton.addEventListener("click", () => {
        SFX.clic();

        boutonsAnnee.forEach(btn => btn.classList.remove("selected"));
        bouton.classList.add("selected");

        anneeEtudiant = parseInt(bouton.dataset.year, 10);
        boutonContinuer.disabled = false;
    });

    bouton.addEventListener("mouseenter", () => SFX.survol());
});

boutonContinuer.addEventListener("click", () => {
    if (!anneeEtudiant) return;
    SFX.clic();
    genererQuiz(anneeEtudiant);
    changerEcran(ecranQuiz, afficherQuestion);
});

boutonRejouer.addEventListener("click", () => {
    SFX.clic();
    reinitialiser();
    changerEcran(ecranAccueil);
});

boutonSon.addEventListener("click", () => {
    SFX.actif = !SFX.actif;
    boutonSon.setAttribute("aria-pressed", String(SFX.actif));
    boutonSon.setAttribute("aria-label", SFX.actif ? "Couper le son" : "Activer le son");
});

boutonSon.setAttribute("aria-pressed", String(SFX.actif));

function reinitialiser() {
    anneeEtudiant = null;
    boutonsAnnee.forEach(btn => btn.classList.remove("selected"));
    boutonContinuer.disabled = true;

    barreProgression.style.width = "0%";
    elementScore.textContent = "0";
    elementScore.classList.remove("bump");
    pastilleSerie.hidden = true;
    widgetTimer.classList.remove("warning");
    elementReponses.innerHTML = "";
    reinitialiserAnneauResultat();
}


/* -------------------------------------------------------------
   7. AFFICHER UNE QUESTION
   ------------------------------------------------------------- */
function afficherQuestion() {
    clearInterval(chronometre);

    const question = obtenirQuestionActuelle();
    const numero = questionActuelle + 1;

    numeroQuestion.textContent = `${String(numero).padStart(2, "0")} / ${QUESTIONS_PAR_QUIZ}`;
    elementScore.textContent = score;

    elementQuestion.textContent = question.question;
    elementQuestion.classList.remove("anim-in");
    void elementQuestion.offsetWidth;
    elementQuestion.classList.add("anim-in");

    const libelles = { easy: "Facile", medium: "Moyen", hard: "Difficile" };
    elementDifficulte.textContent = libelles[question.difficulty];
    elementDifficulte.className = `difficulty ${question.difficulty}`;

    reinitialiserFeedback();
    boutonSuivant.classList.add("hidden");

    barreProgression.style.width = `${(numero / QUESTIONS_PAR_QUIZ) * 100}%`;

    // Construction des réponses mélangées
    elementReponses.innerHTML = "";
    const melangees = melanger(question.answers.map((rep, index) => ({ rep, index })));

    melangees.forEach((element, position) => {
        const bouton = document.createElement("button");
        bouton.type = "button";
        bouton.className = "answer-btn in";
        bouton.style.setProperty("--i", position);
        bouton.dataset.index = element.index;
        bouton.innerHTML = `<span class="answer-key">${LETTRES[position] || "?"}</span><span class="answer-text"></span>`;
        bouton.querySelector(".answer-text").textContent = element.rep;

        bouton.addEventListener("click", () => verifierReponse(element.index, bouton));

        elementReponses.appendChild(bouton);
    });

    demarrerChronometre();
}


/* -------------------------------------------------------------
   8. CHRONOMÈTRE
   ------------------------------------------------------------- */
function majAnneauTimer() {
    anneauTimer.style.strokeDasharray = CIRCONFERENCE_TIMER;
    anneauTimer.style.strokeDashoffset = CIRCONFERENCE_TIMER * (1 - tempsRestant / TEMPS_PAR_QUESTION);
}

function demarrerChronometre() {
    tempsRestant = TEMPS_PAR_QUESTION;
    elementChronometre.textContent = tempsRestant;
    widgetTimer.classList.remove("warning");
    majAnneauTimer();

    chronometre = setInterval(() => {
        tempsRestant--;
        elementChronometre.textContent = Math.max(0, tempsRestant);
        majAnneauTimer();

        if (tempsRestant <= 5 && tempsRestant > 0) {
            widgetTimer.classList.add("warning");
            SFX.tic();
        }

        if (tempsRestant <= 0) {
            clearInterval(chronometre);
            historiqueTemps.push(TEMPS_PAR_QUESTION);
            SFX.tempsEcoule();

            afficherFeedback("Temps écoulé — 0 point", false);
            montrerBonneReponse();
            desactiverReponses();
            boutonSuivant.classList.remove("hidden");
        }
    }, 1000);
}


/* -------------------------------------------------------------
   9. VÉRIFICATION DE LA RÉPONSE
   ------------------------------------------------------------- */
function verifierReponse(indexSelectionne, bouton) {
    clearInterval(chronometre);
    desactiverReponses();

    const question = obtenirQuestionActuelle();
    const tempsMis = TEMPS_PAR_QUESTION - tempsRestant;
    historiqueTemps.push(tempsMis);

    if (indexSelectionne === question.correct) {
        const pointsObtenus = calculerPoints(question.difficulty, tempsRestant);

        bouton.classList.add("correct");
        bonnesReponses++;
        serie++;
        meilleureSerie = Math.max(meilleureSerie, serie);

        score += pointsObtenus;
        animerScore();
        animerSerie();

        afficherFeedback(`Bonne réponse ! +${pointsObtenus} points`, true);
        SFX.bonneReponse();
        Confettis.depuis(bouton, 26, 0.85);

        assombrirAutres(bouton);
    } else {
        bouton.classList.add("wrong");
        serie = 0;
        majSerie();

        afficherFeedback("Mauvaise réponse — 0 point", false);
        SFX.mauvaiseReponse();
        montrerBonneReponse();
    }

    boutonSuivant.classList.remove("hidden");
}

function assombrirAutres(choisi) {
    elementReponses.querySelectorAll(".answer-btn").forEach(b => {
        if (b !== choisi && !b.classList.contains("correct")) b.classList.add("dim");
    });
}

function animerScore() {
    elementScore.textContent = score;
    elementScore.classList.add("bump");
    setTimeout(() => elementScore.classList.remove("bump"), 320);
}

function animerSerie() {
    majSerie();
    pastilleSerie.hidden = false;
    pastilleSerie.style.animation = "none";
    void pastilleSerie.offsetWidth;
    pastilleSerie.style.animation = "";
}

function majSerie() {
    compteurSerie.textContent = serie;
    pastilleSerie.hidden = serie < 2;
}

function reinitialiserFeedback() {
    elementFeedback.className = "feedback";
    elementFeedback.classList.remove("show", "correct", "wrong");
    feedbackTexte.textContent = "";
}

function afficherFeedback(texte, correct) {
    reinitialiserFeedback();
    elementFeedback.classList.add("show", correct ? "correct" : "wrong");
    requestAnimationFrame(() => elementFeedback.classList.add("show"));
    feedbackTexte.textContent = texte;
}

function montrerBonneReponse() {
    const question = obtenirQuestionActuelle();
    elementReponses.querySelectorAll(".answer-btn").forEach(bouton => {
        if (parseInt(bouton.dataset.index, 10) === question.correct) bouton.classList.add("correct");
    });
}

function desactiverReponses() {
    elementReponses.querySelectorAll(".answer-btn").forEach(bouton => {
        bouton.disabled = true;
        bouton.classList.remove("in");
    });
}


/* -------------------------------------------------------------
   10. QUESTION SUIVANTE
   ------------------------------------------------------------- */
boutonSuivant.addEventListener("click", () => {
    SFX.clic();
    questionActuelle++;

    if (questionActuelle >= QUESTIONS_PAR_QUIZ) {
        afficherResultats();
        return;
    }
    afficherQuestion();
});


/* -------------------------------------------------------------
   11. RÉSULTATS
   ------------------------------------------------------------- */
function reinitialiserAnneauResultat() {
    if (elementRange) elementRange.style.strokeDashoffset = CIRCONFERENCE_RESULTAT;
}

function afficherResultats() {
    clearInterval(chronometre);
    widgetTimer.classList.remove("warning");

    // Score
    const record = parseInt(localStorage.getItem("gdg-quiz-best") || "0", 10);
    const nouveauRecord = score > record;
    if (nouveauRecord && score > 0) localStorage.setItem("gdg-quiz-best", String(score));

    const moyenne = (historiqueTemps.reduce((a, b) => a + b, 0) / QUESTIONS_PAR_QUIZ).toFixed(1);
    const pourcentage = Math.round((bonnesReponses / QUESTIONS_PAR_QUIZ) * 100);
    const info = infoResultat(bonnesReponses);

    messageResultat.textContent = info.message;
    elementBadge.textContent = info.badge;
    elementBadge.style.color = info.couleur;
    elementBadge.style.borderColor = info.couleur + "66";
    elementBadge.style.background = info.couleur + "22";
    elementTitre.textContent = info.titre;
    elementPourcentage.textContent = pourcentage;
    elementBonnesReponses.textContent = bonnesReponses;
    elementTempsMoyen.textContent = moyenne;
    elementMeilleureSerie.textContent = meilleureSerie;
    elementMeilleurScore.textContent = Math.max(record, score);

    elementRange.style.stroke = info.couleur;
    elementRange.style.filter = `drop-shadow(0 0 9px ${info.couleur})`;

    document.querySelectorAll(".rstat").forEach((el, i) => el.style.setProperty("--i", i));

    changerEcran(ecranResultat, () => {
        reinitialiserAnneauResultat();
        animerScoreFinal(score);
        requestAnimationFrame(() => {
            elementRange.style.strokeDashoffset =
                CIRCONFERENCE_RESULTAT * (1 - bonnesReponses / QUESTIONS_PAR_QUIZ);
        });

        if (bonnesReponses >= 6) {
            Confettis.auCentre(bonnesReponses >= 9 ? 180 : 110, bonnesReponses >= 9 ? 1.25 : 1);
            if (bonnesReponses >= 9) SFX.victoire();
        }
    });
}

function animerScoreFinal(cible) {
    const debut = performance.now();
    const duree = 1300;

    function pas(maintenant) {
        const t = Math.min((maintenant - debut) / duree, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        scoreFinal.textContent = Math.round(cible * ease);

        if (t < 1) requestAnimationFrame(pas);
        else scoreFinal.textContent = cible;
    }
    requestAnimationFrame(pas);
}

function infoResultat(n) {
    if (n === 10) return { badge: "Score parfait", titre: "Invaincu", couleur: "#FBBC05", message: "10/10. Aucun détail n'a échappé à votre esprit critique. Le GDG ENSAH vous salue, champion." };
    if (n === 9) return { badge: "Exceptionnel", titre: "Or", couleur: "#FBBC05", message: "Une seule hésitation. Vous maîtrisez le sujet — la tech n'a plus de secret pour vous." };
    if (n >= 8) return { badge: "Excellent", titre: "Top tech", couleur: "#34A853", message: "Très solide. Continuez sur cette lancée, le podium n'est plus très loin." };
    if (n >= 6) return { badge: "Bien joué", titre: "Confirmé", couleur: "#34A853", message: "Bonne maîtrise des fondamentaux. Quelques notions méritent encore un passage en revue." };
    if (n >= 4) return { badge: "En progrès", titre: "Apprenti", couleur: "#4285F4", message: "Belle énergie. Revenez une deuxième fois, la progression vient avec la constance." };
    if (n > 0) return { badge: "Débriefing", titre: "Novice", couleur: "#4285F4", message: "C'est en tombant qu'on apprend. Relancez le quiz, vos scores vont suivre la pente." };
    return { badge: "Raté", titre: "À revoir", couleur: "#EA4335", message: "Zéro aujourd'hui, mais tout le monde a commencé par un zéro. On recommence ensemble ?" };
}


/* -------------------------------------------------------------
   12. RACCOURCIS CLAVIER
   ------------------------------------------------------------- */
document.addEventListener("keydown", e => {
    if (!ecranQuiz.classList.contains("active")) return;

    if (e.key === "Enter" || e.key === " ") {
        if (!boutonSuivant.classList.contains("hidden")) {
            e.preventDefault();
            boutonSuivant.click();
        }
        return;
    }

    const position = parseInt(e.key, 10) - 1;
    if (position >= 0 && position < 9) {
        const bouton = elementReponses.querySelectorAll(".answer-btn")[position];
        if (bouton && !bouton.disabled) {
            e.preventDefault();
            bouton.click();
        }
    }
});


/* -------------------------------------------------------------
   13. DÉMARRAGE
   ------------------------------------------------------------- */
ArrierePlan.demarrer();

// Repli visuel si l'image du logo distant est indisponible
const logo = document.getElementById("brand-logo");
if (logo) {
    logo.addEventListener("error", () => {
        logo.removeAttribute("src");
        logo.style.background = "var(--grad-brand)";
        logo.alt = "GDG";
    });
}