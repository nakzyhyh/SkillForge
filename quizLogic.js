'use strict';

import * as LernlogikService from './services/lernlogik.service.js';
import * as ui from './uiLogic.js';

window.activeQuiz = {};

/**
 * =====================================================================================
 * FUNKTION: startQuiz (Version 3.0)
 * =====================================================================================
 * Logik: Bereitet das Quiz vor, ohne Ressourcen abzuziehen. Der Start ist
 * für den Nutzer völlig kosten- und risikofrei.
 * =====================================================================================
 */
export function startQuiz(wissensbaustein) {
    if (window.user.hearts <= 0) {
        ui.showNotification('Du hast keine Herzen mehr! ❤️ Lerne, um neue zu verdienen.');
        return;
    }

    const quizContent = wissensbaustein.prüfen;
    if (!quizContent || !quizContent.source || quizContent.source.length === 0) {
        ui.showNotification(`Fehler: Keine Fragen für Thema "${wissensbaustein.titel}" gefunden!`);
        console.error("Quiz-Start fehlgeschlagen: Keine Fragen in wissensbaustein.prüfen.source gefunden für", wissensbaustein);
        return;
    }

    window.activeQuiz = {
        wissensbausteinId: wissensbaustein.wissensbausteinId,
        isBoss: wissensbaustein.titel.includes("Meilenstein-Prüfung"),
        questions: shuffleArray([...quizContent.source]),
        currentQuestionIndex: 0,
        score: 0,
        userAnswers: [],
        isReviewing: false
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
 * FUNKTION: nextQuestion (Version 3.0)
 * =====================================================================================
 * Logik: Herzabzug komplett entfernt. Die Funktion ist nur noch für die Navigation
 * zwischen den Fragen zuständig.
 * =====================================================================================
 */
export function nextQuestion() {
    if (window.activeQuiz.userAnswers[window.activeQuiz.currentQuestionIndex] === undefined && !window.activeQuiz.isReviewing) {
        ui.showNotification('Bitte wähle eine Antwort aus!');
        return;
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
 * KORRIGIERTE FUNKTION: endQuiz (Version 3.0)
 * =====================================================================================
 * Behobene Probleme:
 * 1. Implementiert die neue Logik: Ein Herz wird NUR DANN abgezogen, wenn das
 * Quiz NICHT bestanden wurde (warErfolgreich === false).
 * 2. Bei Bestehen gibt es Belohnungen, ohne Herzverlust.
 * =====================================================================================
 */
export function endQuiz() {
    const totalQuestions = window.activeQuiz.questions.length;
    const score = window.activeQuiz.score;
    const percentage = (totalQuestions > 0) ? (score / totalQuestions) * 100 : 0;
    const warErfolgreich = percentage >= 50;
    
    let stars = 0, coins = 0, xp = 0;

    if (warErfolgreich) {
        // Belohnungen bei Erfolg
        if (percentage >= 90) { stars = 3; }
        else if (percentage >= 70) { stars = 2; }
        else if (percentage >= 50) { stars = 1; }
        
        coins = 5 + Math.floor(percentage / 10) * 5;
        xp = 10 + Math.floor(percentage / 10) * 7;

        window.user.coins += coins;
        window.user.xp += xp;

    } else {
        // Bestrafung bei Misserfolg
        if (window.user.hearts > 0) {
            window.user.hearts--;
            ui.showNotification("Quiz nicht bestanden. -1 Herz ❤️");
        }
    }
    
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