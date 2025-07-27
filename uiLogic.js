'use strict';

import * as LernlogikService from './services/lernlogik.service.js';
import * as ui from './uiLogic.js';

window.activeQuiz = {};

/**
 * =====================================================================================
 * FINALE FUNKTION: startQuiz (Version 5.0)
 * =====================================================================================
 * Logik: Prüft, ob es ein Boss-Quiz ist. Blockiert den Start NUR, wenn es
 * ein Boss-Quiz ist UND der User keine Herzen hat. Für normale Quizzes
 * gibt es keine Blockade mehr.
 * =====================================================================================
 */
export function startQuiz(wissensbaustein) {
    const isBoss = wissensbaustein.titel.includes("Meilenstein-Prüfung");
    const quizContent = wissensbaustein.prüfen;

    // Blockiere den Start nur, wenn es ein Boss-Quiz ist und keine Herzen vorhanden sind.
    if (isBoss && window.user.hearts <= 0) {
        ui.showNotification('Du hast keine Herzen für diese Meilenstein-Prüfung! ❤️');
        return;
    }

    if (!quizContent || !quizContent.source || quizContent.source.length === 0) {
        ui.showNotification(`Fehler: Keine Fragen für Thema "${wissensbaustein.titel}" gefunden!`);
        console.error("Quiz-Start fehlgeschlagen...", wissensbaustein);
        return;
    }

    window.activeQuiz = {
        wissensbausteinId: wissensbaustein.wissensbausteinId,
        isBoss: isBoss, // isBoss-Flag für spätere Logik speichern
        questions: shuffleArray([...quizContent.source]),
        currentQuestionIndex: 0,
        score: 0,
        userAnswers: [],
        isReviewing: false,
        heartSpent: false
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
 * FINALE FUNKTION: nextQuestion (Version 5.0)
 * =====================================================================================
 * Logik: Zieht ein Herz NUR ab, wenn es ein Boss-Quiz ist, und zwar nur
 * einmalig beim Klick auf "Weiter" nach der ersten Frage.
 * =====================================================================================
 */
export function nextQuestion() {
    if (window.activeQuiz.userAnswers[window.activeQuiz.currentQuestionIndex] === undefined && !window.activeQuiz.isReviewing) {
        ui.showNotification('Bitte wähle eine Antwort aus!');
        return;
    }

    // Herzabzug-Logik: Gilt NUR für Boss-Quizzes
    if (window.activeQuiz.isBoss && window.activeQuiz.currentQuestionIndex === 0 && !window.activeQuiz.isReviewing && !window.activeQuiz.heartSpent) {
        if (window.user.hearts > 0) {
            window.user.hearts--;
            window.activeQuiz.heartSpent = true;
            ui.showNotification("Meilenstein-Prüfung gestartet. -1 Herz ❤️");
            ui.updateUI(window.user);
            if (window.saveUser) window.saveUser();
        } else {
            // Failsafe, falls User mit 0 Herzen reingekommen ist
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
 * FINALE FUNKTION: endQuiz (Version 5.0)
 * =====================================================================================
 * Logik: Die Herz-Logik wurde komplett entfernt. Die Funktion ist nur noch
 * für die Auswertung und Belohnungsvergabe zuständig.
 * =====================================================================================
 */
export function endQuiz() {
    const totalQuestions = window.activeQuiz.questions.length;
    const score = window.activeQuiz.score;
    const percentage = (totalQuestions > 0) ? (score / totalQuestions) * 100 : 0;
    const warErfolgreich = percentage >= 50;
    
    let stars = 0, coins = 0, xp = 0;

    // Belohnungen werden immer vergeben, egal ob bestanden oder nicht
    if (percentage >= 90) { stars = 3; }
    else if (percentage >= 70) { stars = 2; }
    else if (percentage >= 50) { stars = 1; }
    
    coins = 5 + Math.floor(percentage / 10) * 5;
    xp = 10 + Math.floor(percentage / 10) * 7;

    window.user.coins += coins;
    window.user.xp += xp;

    LernlogikService.updateLernfortschritt(window.user, window.activeQuiz.wissensbausteinId, warErfolgreich, stars);
    
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

export function closeQuiz() {
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