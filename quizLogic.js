'use strict';

import * as LernlogikService from './services/lernlogik.service.js';
import * as ui from './uiLogic.js';

window.activeQuiz = {};

/**
 * KORREKTUR: Stellt sicher, dass die Fragen korrekt aus der `prüfen`-Sektion
 * des `wissensgraph`-Objekts geladen werden.
 */
export function startQuiz(wissensbaustein) {
    if (window.user.hearts <= 0) {
        ui.showNotification('Du hast keine Herzen mehr! ❤️');
        return;
    }

    // Greife direkt auf das 'prüfen'-Objekt des übergebenen Bausteins zu.
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
        isReviewing: false,
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

export function endQuiz() {
    const totalQuestions = window.activeQuiz.questions.length;
    const percentage = (totalQuestions > 0) ? (window.activeQuiz.score / totalQuestions) * 100 : 0;
    const warErfolgreich = percentage >= 50;
    LernlogikService.updateLernfortschritt(window.user, window.activeQuiz.wissensbausteinId, warErfolgreich, percentage);
    let stars = 0, coins = 0, xp = 0;
    if (percentage >= 90) { stars = 3; coins = 50; xp = 75; }
    else if (percentage >= 70) { stars = 2; coins = 30; xp = 50; }
    else if (percentage >= 50) { stars = 1; coins = 15; xp = 25; }
    else { coins = 5; xp = 10; }
    window.user.coins += coins;
    window.user.xp += xp;
    if (!warErfolgreich) {
        window.user.hearts--;
    }
    ui.closeQuizModal();
    ui.showResultsModal({ score: window.activeQuiz.score, total: totalQuestions, stars, coins, xp });
    window.saveUser();
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
    if (!window.activeQuiz.isReviewing && window.activeQuiz.userAnswers && window.activeQuiz.userAnswers.length > 0) {
        if (window.user.hearts > 0) {
            window.user.hearts--;
            ui.showNotification("Quiz abgebrochen. -1 Herz");
        }
        ui.updateUI(window.user);
        window.saveUser();
    }
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