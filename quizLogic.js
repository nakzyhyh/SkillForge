'use strict';

/**
 * quizLogic.js
 * -----------------------------------------------------------------------------
 * Herz-Logik (final):
 * - Kein Herzabzug bei startQuiz() oder nextQuestion().
 * - Ein Herzabzug NUR bei falsch beantworteter Frage – und zwar pro Frage
 *   höchstens einmal (Guard per penalized[]).
 * - Boss-Quiz: Start nur mit mind. 1 Herz; normale Quizzes starten immer.
 *
 * Die Datei ist defensiv implementiert und nutzt die UI-Schicht (uiLogic.js):
 * - ui.openQuizModal(), ui.displayQuestion(), ui.updateQuizScore(), ui.showExplanation(),
 *   ui.showResultsModal(), ui.showNotification(), ui.updateUI()
 *
 * Kompatibilität:
 * - Fragen können verschiedene Strukturen haben:
 *   - { text, options[], answer }  (answer = Index)
 *   - { question, answers[], correctIndex } (correctIndex = Index)
 *   - { prompt, choices[], correctOptionIndex }
 * -----------------------------------------------------------------------------
 */

import * as ui from './uiLogic.js';
// TODO: Überprüfen – ursprünglicher Code: Wird der Service hier wirklich genutzt?
// Falls ja, kannst du unten in buildQuestionSet() die Service-Funktion aktivieren.
import * as LernlogikService from './services/lernlogik.service.js';

window.activeQuiz = {}; // globaler, zustandsführender Container

/* -------------------------------------------------------------------------- */
/* Hilfsfunktionen                                                            */
/* -------------------------------------------------------------------------- */

function asArray(x) {
  return Array.isArray(x) ? x : (x != null ? [x] : []);
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function getCorrectIndex(q) {
  // unterstützt verschiedene Schemas
  if (typeof q.answer === 'number') return q.answer;
  if (typeof q.correctIndex === 'number') return q.correctIndex;
  if (typeof q.correctOptionIndex === 'number') return q.correctOptionIndex;
  // Fallback: wenn es eine Property "correct" mit Index gibt
  if (typeof q.correct === 'number') return q.correct;
  return -1;
}

function getQuestionText(q) {
  return q.text ?? q.question ?? q.prompt ?? '';
}

function getOptionsArray(q) {
  return asArray(q.options ?? q.answers ?? q.choices ?? []);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function isBoss(wissensbaustein) {
  // TODO: Überprüfen – ursprünglicher Code:
  // Passe diese Heuristik an deine Daten an (Flag/Feldname).
  return Boolean(
    wissensbaustein?.isBoss ||
    wissensbaustein?.boss === true ||
    wissensbaustein?.kategorie === 'boss' ||
    wissensbaustein?.type === 'boss'
  );
}

/**
 * Ermittelt die Fragenmenge. Versucht mehrere Quellen, um robust zu sein.
 */
function buildQuestionSet(wissensbaustein) {
  // 1) Direkt am Objekt
  let questions =
    wissensbaustein?.quiz ??
    wissensbaustein?.fragen ??
    wissensbaustein?.questions ??
    null;

  // 2) Optional: Service nutzen, falls vorhanden
  if (!questions && typeof LernlogikService?.getQuiz === 'function') {
    try {
      questions = LernlogikService.getQuiz(wissensbaustein);
    } catch (e) {
      console.warn('[quiz] LernlogikService.getQuiz() fehlgeschlagen:', e);
    }
  }

  questions = asArray(questions).map(q => ({
    // Normalisiere intern, ohne das Original zu verändern:
    __raw: q,
    text: getQuestionText(q),
    options: getOptionsArray(q),
    correct: getCorrectIndex(q)
  }));

  // Entferne unvollständige Fragen
  questions = questions.filter(q => q.text && q.options.length > 0 && q.correct >= 0);

  return questions;
}

/* -------------------------------------------------------------------------- */
/* API                                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Startet ein Quiz **ohne** Herzabzug.
 * Boss-Quiz: Start nur bei mind. 1 Herz (Blockade, aber kein Abzug).
 */
export function startQuiz(wissensbaustein) {
  const boss = isBoss(wissensbaustein);
  const hearts = Number(window?.user?.hearts ?? 0);

  if (boss && hearts <= 0) {
    ui.showNotification('Keine Herzen verfügbar – Boss-Quiz später erneut versuchen.');
    return;
  }

  const questions = buildQuestionSet(wissensbaustein);
  if (questions.length === 0) {
    ui.showNotification('Für diesen Baustein sind aktuell keine Fragen verfügbar.');
    return;
  }

  // Optionales Mischen
  // TODO: Überprüfen – ursprünglicher Code: war Shuffling gewünscht?
  // const shuffled = shuffleArray([...questions]);
  const shuffled = questions;

  // State initialisieren – KEIN Herzabzug
  window.activeQuiz = {
    isBoss: boss,
    questions: shuffled,
    currentQuestionIndex: 0,
    score: 0,
    userAnswers: Array(shuffled.length).fill(null),
    penalized: Array(shuffled.length).fill(false), // Herzabzug pro Frage maximal 1×
    isReviewing: false
  };

  ui.openQuizModal();
  ui.displayQuestion();
  ui.updateQuizScore(0, 1, shuffled.length);
}

/**
 * Auswahl einer Antwortoption.
 * - Bewertet die Auswahl.
 * - Zieht **ein Herz** ab **nur wenn** falsch **und** noch nicht penalized.
 * - Markiert die korrekte/falsche Option.
 */
export function selectAnswer(index) {
  const aq = window.activeQuiz;
  if (!aq?.questions?.length) return;

  const qIndex = clamp(aq.currentQuestionIndex, 0, aq.questions.length - 1);
  const q = aq.questions[qIndex];
  const options = document.querySelectorAll('.answer-option');

  // Doppel-Klick Guard: wenn bereits irgendwas markiert ist, ignoriere weitere Klicks
  if (document.querySelector('.answer-option.selected, .answer-option.correct, .answer-option.incorrect')) {
    return;
  }

  aq.userAnswers[qIndex] = index;

  // Markiere Auswahl (für Feedback)
  options.forEach(opt => {
    opt.style.pointerEvents = 'none';
  });

  const isCorrect = index === q.correct;
  const correctText = q.options[q.correct] ?? '';

  // Visuelles Feedback
  setTimeout(() => {
    const chosen = options[index];
    if (chosen) chosen.classList.add(isCorrect ? 'correct' : 'incorrect');
    if (!isCorrect && options[q.correct]) {
      options[q.correct].classList.add('correct');
    }

    // Herz‑Logik: Abzug nur bei falscher Antwort und nur 1× pro Frage
    if (!isCorrect && aq.penalized[qIndex] !== true) {
      // Benutzer vorhanden? Dann Herz abziehen, aber nicht < 0
      if (window.user && typeof window.user.hearts === 'number') {
        window.user.hearts = Math.max(0, window.user.hearts - 1);
        ui.updateUI(window.user); // Anzeige aktualisieren
        ui.showNotification('Falsch beantwortet – ein Herz verloren.');
      }
      aq.penalized[qIndex] = true;
    }

    // Score aktualisieren
    if (isCorrect) {
      aq.score += 1;
    }
    ui.updateQuizScore(aq.score, qIndex + 1, aq.questions.length);
    ui.showExplanation(isCorrect
      ? `Richtig!`
      : `Leider falsch. Korrekt wäre: <b>${correctText}</b>.`
    );
  }, 150);
}

/**
 * Nächste Frage anzeigen – KEIN Herzabzug!
 */
export function nextQuestion() {
  const aq = window.activeQuiz;
  if (!aq?.questions?.length) return;

  if (aq.currentQuestionIndex < aq.questions.length - 1) {
    aq.currentQuestionIndex += 1;
    ui.displayQuestion();
    ui.updateQuizScore(aq.score, aq.currentQuestionIndex + 1, aq.questions.length);
  } else {
    endQuiz();
  }
}

/**
 * Vorherige Frage (nur in Review)
 */
export function previousQuestion() {
  const aq = window.activeQuiz;
  if (aq?.isReviewing && aq.currentQuestionIndex > 0) {
    aq.currentQuestionIndex -= 1;
    ui.displayQuestion();
    ui.updateQuizScore(aq.score, aq.currentQuestionIndex + 1, aq.questions.length);
  }
}

/**
 * Beendet das Quiz und zeigt ein Ergebnis‑Modal
 */
export function endQuiz() {
  const aq = window.activeQuiz;
  if (!aq?.questions?.length) return;

  aq.isReviewing = true;

  const total = aq.questions.length;
  const score = aq.score;

  // Belohnungen (Beispielwerte)
  const coins = score * 2;
  const xp    = score * 5;
  const stars = score >= Math.ceil(total * 0.8) ? 3 :
                score >= Math.ceil(total * 0.6) ? 2 :
                score >= Math.ceil(total * 0.4) ? 1 : 0;

  // Userwerte anheben, **ohne** an Herzen zu rühren
  if (window.user) {
    window.user.coins = (window.user.coins ?? 0) + coins;
    window.user.xp    = (window.user.xp    ?? 0) + xp;
    // Level‑Up Logik optional
    // TODO: Überprüfen – ursprünglicher Code: Levelberechnung / XP‑Balken?
  }

  ui.updateUI(window.user);
  ui.showResultsModal({ score, total, stars, coins, xp });
}

/**
 * Modal schließen & State aufräumen
 */
export function closeQuiz() {
  window.activeQuiz = {};
}

/* -------------------------------------------------------------------------- */
/* (Optional) Öffentliche Utils                                               */
/* -------------------------------------------------------------------------- */

export function getActiveQuiz() {
  return window.activeQuiz;
}
