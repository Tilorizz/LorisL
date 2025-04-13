window.onload = () => {
    afficherQuestion(0); // Charge les questions
    const bruteforceBtn = document.getElementById("bruteforce-btn");
    
    if (bruteforceBtn) {
        bruteforceBtn.addEventListener("click", handleBruteforceClick);
    } else {
        console.error("Le bouton bruteforce-btn n'existe pas !");
    }
};

let bruteforceClickCount = 0; // Compteur de clics pour le bruteforce

// Fonction pour gérer les clics sur le bouton bruteforce
function handleBruteforceClick() {
    bruteforceClickCount++; // Incrémente le compteur de clics

    // Affichage du nombre de clics en rouge
    const clickCountElement = document.getElementById("click-count");
    if (clickCountElement) {
        clickCountElement.textContent = `Nombre de clics: ${bruteforceClickCount}`;
    }

    const bruteforceBtn = document.getElementById("bruteforce-btn");

    if (bruteforceClickCount >= 10) {
        // Rediriger après 10 clics
        window.location.href = "A1_3-A2_1-A3_4-A4_2.html"; // Remplace "nouvellePage.html" par le chemin de la page vers laquelle tu veux rediriger
    } 

    // Une fois que les 10 clics sont atteints, tu peux retirer le bouton pour éviter de continuer à cliquer
    if (bruteforceClickCount >= 10) {
        bruteforceBtn.disabled = true; // Désactive le bouton après 10 clics
    }
}

// Structure du questionnaire
const questionnaire = [
    {
        qlabel: "Quel est le prénom de du personnage que l'on possède ?",
        qid: 1,
        reponses: [
            { rlabel: "Chara", rid: 1 },
            { rlabel: "Sans", rid: 2 },
            { rlabel: "Frisk", rid: 3 },
            { rlabel: "Kris", rid: 4 }
        ]
    },
    {
        qlabel: "Combien y'a t-il de fin dans Undertale le préquel de Deltarune ?",
        qid: 2,
        reponses: [
            { rlabel: "3", rid: 1 },
            { rlabel: "5", rid: 2 },
            { rlabel: "1", rid: 3 },
            { rlabel: "2", rid: 4 }
        ]
    },
    {
        qlabel: "Quand est-ce que sorte le chap 3 et 4 de Deltarune ?",
        qid: 3,
        reponses: [
            { rlabel: "2026", rid: 1 },
            { rlabel: "fin décembre", rid: 2 },
            { rlabel: "Jamais x)", rid: 3 },
            { rlabel: "le 5 juin", rid: 4 }
        ]
    },
    {
        qlabel: "comment s'apelle le personnage qui a pour musique megalovania ?",
        qid: 4,
        reponses: [
            { rlabel: "Flowey", rid: 1 },
            { rlabel: "Sans", rid: 2 },
            { rlabel: "Asgore", rid: 3 },
            { rlabel: "Undyne", rid: 4 }
        ]
    }
];

let reponses = "";
let questionIndex = 0;

// Affiche une question et ses réponses
function afficherQuestion(index) {
    const question = questionnaire[index];
    const questionElement = document.getElementById("question");
    const reponseElement = document.getElementById("reponses");
    const resultElement = document.getElementById("result");

    questionElement.innerHTML = question.qlabel;
    reponseElement.innerHTML = "";
    resultElement.innerHTML = "";

    question.reponses.forEach((reponse) => {
        const button = document.createElement("button");
        button.textContent = reponse.rlabel;
        button.className = "btn btn-primary";
        button.onclick = () => handleReponseClick(question.qid, reponse.rid);
        reponseElement.appendChild(button);
    });
}

// Gère le clic sur une réponse
function handleReponseClick(qid, rid) {
    reponses += (reponses ? "-" : "") + `A${qid}_${rid}`;
    questionIndex++;

    if (questionIndex < questionnaire.length) {
        afficherQuestion(questionIndex);
    } else {
        verifierReponses();
    }
}

// Vérifie les réponses et affiche un message de résultat
function verifierReponses() {
    const resultElement = document.getElementById("result");
    const questionElement = document.getElementById("question");
    const reponseElement = document.getElementById("reponses");

    const bonnesReponses = "A1_3-A2_1-A3_4-A4_2";

    if (reponses === bonnesReponses) {
        location.href = reponses + ".html";
    } else {
        resultElement.innerHTML = `<p class="text-red-600 font-bold text-center">Tu n'as pas les bonnes réponses pour me contacter.</p>`;
        questionElement.innerHTML = "";
        const bruteforceBtn = document.getElementById("bruteforce-btn");
        bruteforceBtn.classList.add("hidden");
        reponseElement.innerHTML = "";

        const retryButton = document.createElement("button");
        retryButton.textContent = "Recommencer";
        retryButton.className = "cursor-pointer rounded-md mt-6 bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2";
        retryButton.onclick = recommencer;
        resultElement.appendChild(retryButton);
    }
}

// Fonction pour recommencer
function recommencer() {
    const bruteforceBtn = document.getElementById("bruteforce-btn");
    bruteforceBtn.classList.remove("hidden");
    reponses = "";
    questionIndex = 0;
    afficherQuestion(0);
}
