'use strict';

import * as LernlogikService from './services/lernlogik.service.js';
import * as ui from './uiLogic.js';

window.activeQuiz = {};

/**
 * =====================================================================================
 * KORRIGIERTE FUNKTION: startQuiz
 * =====================================================================================
 * Behobene Probleme:
 * 1. Der sofortige Herzabzug wurde entfernt. Das Herz wird jetzt erst bei Bestätigung
 * der ersten Frage in `nextQuestion` abgezogen.
 * 2. Die Benachrichtigung über den Herzverlust wurde ebenfalls nach `nextQuestion`
 * verschoben, um den Nutzer nur dann zu informieren, wenn die Aktion irreversibel ist.
 * =====================================================================================
 */
export function startQuiz(wissensbaustein) {
    if (window.user.hearts <= 0) {
        ui.showNotification('Du hast keine Herzen mehr! ❤️');
        return;
    }

    const quizContent = wissensbaustein.prüfen;
    if (!quizContent || !quizContent.source || quizContent.source.length === 0) {
        ui.showNotification(`Fehler: Keine Fragen für Thema "${wissensbaustein.titel}" gefunden!`);
        console.error("Quiz-Start fehlgeschlagen: Keine Fragen in wissensbaustein.prüfen.source gefunden für", wissensbaustein);
        return;
    }
    
    // HERZABZUG HIER ENTFERNT

    window.activeQuiz = {
        wissensbausteinId: wissensbaustein.wissensbausteinId,
        isBoss: wissensbaustein.titel.includes("Meilenstein-Prüfung"),
        questions: shuffleArray([...quizContent.source]),
        currentQuestionIndex: 0,
        score: 0,
        userAnswers: [],
        isReviewing: false,
        heartSpent: false // NEU: Dieser Schalter steuert den Herzabzug
    };
    
    ui.openQuizModal();
    ui.displayQuestion();
}

export function selectAnswer(index) {
    if (document.querySelector('.answer-option.selected, .answer-option.correct, .answer-option.incorrect')) {
        return;
    }

    const question = window.activeQuiz.questions[window.activeQuiz.currentQuestionIndex];
    window.activeQuiz.userAnswers[window.activeQuiz.currentQuestionIndex] = index;
    const options = document.querySelectorAll('.answer-option');
    options.forEach(opt => opt.style.pointerEvents = 'none'); 

    const isCorrect = (index === question.answer);
    const correctAnswerText = question.choices[question.answer];

    setTimeout(() => {
        if (isCorrect) {
            window.activeQuiz.score++;
            options[index].classList.add('correct');
        } else {
            options[index].classList.add('incorrect');
            if (options[question.answer]) {
                options[question.answer].classList.add('correct');
            }
        }
        ui.updateQuizScore(window.activeQuiz.score);
        ui.showExplanation(isCorrect, correctAnswerText);
    }, 300);
}

/**
 * =====================================================================================
 * KORRIGIERTE FUNKTION: nextQuestion
 * =====================================================================================
 * Behobene Probleme:
 * 1. Implementiert den verzögerten Herzabzug. Nur wenn die erste Frage beantwortet
 * wird und der Nutzer auf "Weiter" klickt, wird das Herz verbraucht.
 * =====================================================================================
 */
export function nextQuestion() {
    if (window.activeQuiz.userAnswers[window.activeQuiz.currentQuestionIndex] === undefined && !window.activeQuiz.isReviewing) {
        ui.showNotification('Bitte wähle eine Antwort aus!');
        return;
    }

    // Erst wenn die erste Frage beantwortet und "weiter" geklickt wird, gilt das Herz als final verbraucht.
    if (window.activeQuiz.currentQuestionIndex === 0 && !window.activeQuiz.isReviewing && !window.activeQuiz.heartSpent) {
        if (window.user.hearts > 0) {
            window.user.hearts--;
            window.activeQuiz.heartSpent = true;
            ui.showNotification("Quiz gestartet. -1 Herz ❤️");
            ui.updateUI(window.user);
            if (window.saveUser) window.saveUser();
        } else {
            // Sollte nicht passieren wegen der Prüfung in startQuiz, aber als Absicherung
            ui.showNotification("Nicht genügend Herzen, um fortzufahren.");
            closeQuiz();
            return;
        }
    }

    if (window.activeQuiz.currentQuestionIndex < window.activeQuiz.questions.length - 1) {
        window.activeQuiz.currentQuestionIndex++;
        ui.displayQuestion();
    } else {
        if (window.activeQuiz.isReviewing) {
            ui.backToMap(window.user);
        } else {
            endQuiz();
        }
    }
}

/**
 * =====================================================================================
 * KORRIGIERTE FUNKTION: endQuiz
 * =====================================================================================
 * Behobene Probleme:
 * 1. Der Aufruf an `updateLernfortschritt` wurde korrigiert, sodass die verdienten
 * Sterne korrekt an den Lernlogik-Service übergeben und gespeichert werden können.
 * =====================================================================================
 */
export function endQuiz() {
    const totalQuestions = window.activeQuiz.questions.length;
    const score = window.activeQuiz.score;
    const percentage = (totalQuestions > 0) ? (score / totalQuestions) * 100 : 0;
    const warErfolgreich = percentage >= 50;
    
    let stars = 0, coins = 0, xp = 0;
    if (percentage >= 90) { stars = 3; }
    else if (percentage >= 70) { stars = 2; }
    else if (percentage >= 50) { stars = 1; }
    
    // Belohnungen werden immer vergeben
    coins = 5 + Math.floor(percentage / 10) * 5; // 5-55 Münzen
    xp = 10 + Math.floor(percentage / 10) * 7;  // 10-80 XP

    // KORRIGIERTER AUFRUF: Übergibt jetzt die Sterne
    LernlogikService.updateLernfortschritt(window.user, window.activeQuiz.wissensbausteinId, warErfolgreich, stars);

    window.user.coins += coins;
    window.user.xp += xp;
    
    ui.closeQuizModal();
    ui.showResultsModal({ score: score, total: totalQuestions, stars, coins, xp });
    
    if (window.saveUser) window.saveUser();
    ui.updateUI(window.user);
}

export function reviewAnswers() {
    window.activeQuiz.isReviewing = true;
    window.activeQuiz.currentQuestionIndex = 0;
    ui.closeResultsModal();
    ui.openQuizModal();
    ui.displayQuestion();
}

/**
 * =====================================================================================
 * KORRIGIERTE FUNKTION: closeQuiz
 * =====================================================================================
 * Behobene Probleme:
 * 1. Die Logik zur Herz-Rückerstattung wurde entfernt. Da das Herz erst in `nextQuestion`
 * abgezogen wird, ist eine Rückerstattung nicht mehr nötig. Das vereinfacht den Code.
 * =====================================================================================
 */
export function closeQuiz() {
    // Die Logik zur Herz-Rückerstattung ist nicht mehr notwendig,
    // da das Herz erst bei Bestätigung der ersten Frage abgezogen wird.
    // Ein einfacher Abbruch verbraucht somit kein Herz mehr.
    ui.closeQuizModal();
}

export function previousQuestion() {
    if (window.activeQuiz.isReviewing && window.activeQuiz.currentQuestionIndex > 0) {
        window.activeQuiz.currentQuestionIndex--;
        ui.displayQuestion();
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}