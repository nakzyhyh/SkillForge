'use strict';

/**
 * uiLogic.js
 * -----------------------------------------------------------------------------
 * Zweck:
 * - Stellt alle UI-Funktionen bereit, die von main.js, quizLogic.js und
 *   zusatzModuleLogic.js erwartet werden.
 * - Diese Datei ist bewusst robust gegen fehlende DOM-Elemente implementiert:
 *   Jede Funktion prüft zunächst auf Element‑Existenz (No‑Op bei Abwesenheit),
 *   um Laufzeitfehler zu vermeiden und die App in Previews stabil zu halten.
 *
 * HINWEIS:
 * - Diese Version ersetzt eine fehlerhafte Variante, in der versehentlich
 *   Quiz‑Code in uiLogic.js kopiert wurde und ein Selbst‑Import
 *   (`import * as ui from './uiLogic.js'`) eine Zirkularreferenz erzeugte.
 * - Hier sind ausschließlich UI‑Hilfsfunktionen enthalten.
 *
 * TODO: Prüfen – ursprüngliche UI‑Spezifikationen/Markup‑IDs aus der
 *       finalen App-DOM-Struktur gegen diese robusten Implementierungen
 *       abgleichen und bei Bedarf konkretisieren.
 * -----------------------------------------------------------------------------
 */

import * as quiz from './quizLogic.js'; // zyklische Abhängigkeit ui<->quiz ist akzeptabel, da nur zur Laufzeit genutzt wird.

/* -------------------------------------------------------------------------- */
/* Utilitys                                                                   */
/* -------------------------------------------------------------------------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function show(el) { if (el) el.style.display = ''; }
function hide(el) { if (el) el.style.display = 'none'; }

/** Safeguard: loggt nur in DevTools, stört aber nicht in Produktion */
function devLog(...args) {
  if (typeof window !== 'undefined' && window.DEBUG_UI) {
    console.log('[ui]', ...args);
  }
}

/** Erzeugt einen Container, falls nicht vorhanden */
function ensureElement(id, htmlFactory) {
  let el = document.getElementById(id);
  if (!el && typeof htmlFactory === 'function') {
    el = htmlFactory();
    if (el) document.body.appendChild(el);
  }
  return el;
}

/* -------------------------------------------------------------------------- */
/* Globale UI‑Benachrichtigungen                                              */
/* -------------------------------------------------------------------------- */
export function showNotification(message, timeoutMs = 2600) {
  const cont = ensureElement('toastContainer', () => {
    const c = document.createElement('div');
    c.id = 'toastContainer';
    c.style.position = 'fixed';
    c.style.left = '50%';
    c.style.bottom = '20px';
    c.style.transform = 'translateX(-50%)';
    c.style.zIndex = '9999';
    return c;
  });

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = String(message ?? '');
  // leichte Standardstyles
  toast.style.background = 'rgba(0,0,0,0.8)';
  toast.style.color = '#fff';
  toast.style.padding = '10px 14px';
  toast.style.marginTop = '8px';
  toast.style.borderRadius = '10px';
  toast.style.fontSize = '14px';
  toast.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
  cont.appendChild(toast);

  if (timeoutMs > 0) {
    setTimeout(() => cont.contains(toast) && cont.removeChild(toast), timeoutMs);
  }
}

/* -------------------------------------------------------------------------- */
/* Screen‑Routing                                                             */
/* -------------------------------------------------------------------------- */
export function showScreen(screenId) {
  const screens = $$('.screen');
  let target = document.getElementById(screenId);
  if (!target) {
    // Fallback: akzeptiere data-screen Attribut
    target = screens.find(s => s.id === screenId || s.dataset.screen === screenId);
  }

  screens.forEach(s => hide(s));
  show(target);

  // Bottom‑Nav aktivieren (falls vorhanden)
  const navItems = $$('.bottom-nav .nav-item');
  navItems.forEach(item => {
    const isActive = item.dataset.screen === screenId;
    item.classList.toggle('active', isActive);
  });

  devLog('showScreen', screenId);
}

/* -------------------------------------------------------------------------- */
/* Header/Stats aktualisieren                                                 */
/* -------------------------------------------------------------------------- */
export function updateUI(user) {
  // IDs sind beispielhaft – robust gegen Nichtvorhandensein
  const levelEl  = $('#userLevel');
  const xpBar    = $('#xpBarInner');
  const coinsEl  = $('#coinsValue');
  const heartsEl = $('#heartsValue');
  const gemsEl   = $('#gemsValue');

  if (levelEl)  levelEl.textContent  = String(user?.level ?? '');
  if (coinsEl)  coinsEl.textContent  = String(user?.coins ?? '');
  if (heartsEl) heartsEl.textContent = String(user?.hearts ?? '');
  if (gemsEl)   gemsEl.textContent   = String(user?.gems ?? '');

  if (xpBar) {
    // Annahme: xp zu Level Fortschritt 0–100
    const pct = Math.max(0, Math.min(100, Number(user?.xp ?? 0)));
    xpBar.style.width = pct + '%';
  }
}

/* -------------------------------------------------------------------------- */
/* Lernpfad, Profil, Shop, Zusatzmodule                                       */
/* -------------------------------------------------------------------------- */
export function renderLearningPath(user) {
  showScreen('mapScreen');
  const host = document.getElementById('mapScreen') || document.getElementById('mapContainer');
  if (!host) return;

  // Wenn der Container leer ist, einfache Platzhalterkarte darstellen.
  if (!host.dataset.initialized) {
    host.dataset.initialized = '1';
    if (!host.querySelector('.learning-path-placeholder')) {
      const card = document.createElement('div');
      card.className = 'learning-path-placeholder';
      card.style.minHeight = '200px';
      card.style.borderRadius = '16px';
      card.style.background = 'linear-gradient(180deg,#e0f7fa,#e8f5e9)';
      card.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
      card.style.margin = '16px';
      card.style.padding = '16px';
      card.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:40px;height:40px;border-radius:12px;background:#334155;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700">LF</div>
          <div>
            <div style="font-weight:700">Lernpfad</div>
            <div id="xpBar" style="width:200px;height:8px;background:#e2e8f0;border-radius:9999px;overflow:hidden;margin-top:6px">
              <div id="xpBarInner" style="height:100%;width:0%"></div>
            </div>
          </div>
        </div>
      `;
      host.appendChild(card);
    }
  }
  updateUI(user);
}

export function renderProfile(user) {
  showScreen('profileScreen');
  const host = document.getElementById('profileScreen') || document.getElementById('profileContent');
  if (!host) return;
  if (!host.querySelector('.profile-basic')) {
    const box = document.createElement('div');
    box.className = 'profile-basic';
    box.style.margin = '16px';
    box.innerHTML = `
      <h3>Profil</h3>
      <div><b>Name:</b> ${user?.username ?? '—'}</div>
      <div><b>Level:</b> ${user?.level ?? 1}</div>
      <div><b>XP:</b> ${user?.xp ?? 0}</div>
    `;
    host.appendChild(box);
  }
}

export function renderShop(user) {
  showScreen('shopScreen');
  // Inhalte optional – No‑Op wenn kein Container vorhanden
  const host = document.getElementById('shopScreen') || document.getElementById('shopContent');
  if (!host) return;
  if (!host.querySelector('.shop-basic')) {
    const box = document.createElement('div');
    box.className = 'shop-basic';
    box.style.margin = '16px';
    box.innerHTML = `<h3>Shop</h3><div>Coins: ${user?.coins ?? 0}</div>`;
    host.appendChild(box);
  }
}

export function renderZusatzModule() {
  // Welcher Screenname? Versuche mehrere bekannte Varianten.
  const candidates = ['pruefungPlusScreen', 'zusatzModuleScreen', 'zusatzScreen'];
  const id = candidates.find(x => document.getElementById(x)) || candidates[0];
  showScreen(id);
}

/* Navigation Hilfsfunktionen */
export function backToMap() { showScreen('mapScreen'); }

/* LModal/Quiz‑Modal‑Helfer – defensiv */
export function closeLernModal() {
  hide(document.getElementById('lernModal'));
}
export function closeQuizModal() {
  hide(document.getElementById('quizModal'));
}
export function closeResultsModal() {
  hide(document.getElementById('resultsModal'));
}

/* Tabs innerhalb des Lern‑Modals – Stub */
export function showLernTab(tabName) {
  // optional: .lern-tabs button[data-tab="<name>"]
  const tabs = $$('.lern-tabs [data-tab]');
  tabs.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabName));
  const panels = $$('.lern-panel');
  panels.forEach(p => hide(p));
  const panel = document.getElementById(tabName) || $(`.lern-panel[data-tab="${tabName}"]`);
  show(panel);
}

/* -------------------------------------------------------------------------- */
/* Quiz‑UI                                                                    */
/* -------------------------------------------------------------------------- */
export function openQuizModal() {
  const modal = ensureElement('quizModal', () => {
    const m = document.createElement('div');
    m.id = 'quizModal';
    m.style.position = 'fixed';
    m.style.left = '0';
    m.style.top = '0';
    m.style.right = '0';
    m.style.bottom = '0';
    m.style.background = 'rgba(0,0,0,0.45)';
    m.style.display = 'none';
    m.style.zIndex = '9990';

    const inner = document.createElement('div');
    inner.id = 'quizModalInner';
    inner.style.maxWidth = '780px';
    inner.style.margin = '5vh auto';
    inner.style.background = '#fff';
    inner.style.borderRadius = '14px';
    inner.style.padding = '16px';
    inner.style.boxShadow = '0 25px 60px rgba(0,0,0,0.25)';
    inner.innerHTML = `
      <div id="quizHeader" style="display:flex;justify-content:space-between;gap:12px;align-items:center">
        <div id="quizStatus">Frage 1/1 • Score 0</div>
        <button id="quizCloseBtn" title="Schließen">×</button>
      </div>
      <div id="quizQuestion" style="margin:14px 0;font-weight:600"></div>
      <div id="answerOptions" class="answer-options" style="display:grid;gap:10px"></div>
      <div id="quizExplanation" style="display:none;margin-top:10px;padding:10px;border-radius:8px;background:#f1f5f9"></div>
      <div id="quizNav" style="display:flex;gap:10px;justify-content:flex-end;margin-top:12px">
        <button id="quizPrevBtn">Zurück</button>
        <button id="quizNextBtn">Weiter</button>
        <button id="quizSubmitBtn">Abschließen</button>
      </div>
    `;
    m.appendChild(inner);
    return m;
  });

  $('#quizCloseBtn', modal)?.addEventListener('click', () => {
    hide(modal);
    quiz.closeQuiz?.();
  });

  show(modal);
}

export function displayQuestion() {
  const modal = document.getElementById('quizModal');
  if (!modal || !window.activeQuiz) return;

  const qArea = $('#quizQuestion', modal);
  const options = $('#answerOptions', modal);
  const status = $('#quizStatus', modal);
  const exp    = $('#quizExplanation', modal);

  const aq = window.activeQuiz;
  const total = aq.questions?.length ?? 0;
  const idx = Math.max(0, Math.min(aq.currentQuestionIndex ?? 0, total - 1));
  const q = aq.questions?.[idx] ?? {};

  // Frage
  const text = q.text ?? q.question ?? '—';
  if (qArea) qArea.textContent = text;

  // Antworten
  if (options) {
    options.innerHTML = '';
    const opts = q.answers ?? q.options ?? [];
    opts.forEach((t, i) => {
      const btn = document.createElement('button');
      btn.className = 'answer-option';
      btn.textContent = String(t);
      btn.dataset.index = String(i);
      btn.addEventListener('click', () => quiz.selectAnswer?.(i));
      options.appendChild(btn);
    });
  }

  // Status/Score
  updateQuizScore(aq.score ?? 0, idx + 1, total);

  // Navigation
  $('#quizPrevBtn', modal)?.addEventListener('click', () => quiz.previousQuestion?.());
  $('#quizNextBtn', modal)?.addEventListener('click', () => quiz.nextQuestion?.());
  $('#quizSubmitBtn', modal)?.addEventListener('click', () => quiz.endQuiz?.());

  // Erklärung ausblenden bis zur Lösung
  if (exp) { exp.style.display = 'none'; exp.textContent = ''; }
}

export function updateQuizScore(score, current, total) {
  const modal = document.getElementById('quizModal');
  const status = $('#quizStatus', modal);
  if (status) status.textContent = `Frage ${current}/${total} • Score ${score}`;
}

export function showExplanation(text) {
  const modal = document.getElementById('quizModal');
  const exp = $('#quizExplanation', modal);
  if (exp) {
    exp.style.display = '';
    exp.innerHTML = text;
  }
}

export function showResultsModal({ score = 0, total = 0, stars = 0, coins = 0, xp = 0 } = {}) {
  const modal = ensureElement('resultsModal', () => {
    const m = document.createElement('div');
    m.id = 'resultsModal';
    m.style.position = 'fixed';
    m.style.inset = '0';
    m.style.background = 'rgba(0,0,0,0.45)';
    m.style.display = 'none';
    m.style.zIndex = '9990';

    const inner = document.createElement('div');
    inner.style.maxWidth = '720px';
    inner.style.margin = '8vh auto';
    inner.style.background = '#fff';
    inner.style.borderRadius = '14px';
    inner.style.padding = '18px';
    inner.style.boxShadow = '0 25px 60px rgba(0,0,0,0.25)';
    inner.innerHTML = `
      <h3>Ergebnis</h3>
      <div id="resultsText"></div>
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px">
        <button id="resultsCloseBtn">Schließen</button>
        <button id="resultsBackBtn">Zur Karte</button>
      </div>
    `;
    m.appendChild(inner);
    return m;
  });

  const txt = $('#resultsText', modal);
  if (txt) {
    txt.innerHTML = `
      <div>Score: <b>${score}</b> / ${total}</div>
      <div>Sterne: <b>${stars}</b> • Coins: <b>${coins}</b> • XP: <b>${xp}</b></div>
    `;
  }
  $('#resultsCloseBtn', modal)?.addEventListener('click', () => hide(modal));
  $('#resultsBackBtn', modal)?.addEventListener('click', () => { hide(modal); backToMap(); });

  show(modal);
}

/* -------------------------------------------------------------------------- */
/* Debug/Helper für Lern- & Netzwerk‑Module                                   */
/* -------------------------------------------------------------------------- */
export function updateDebuggerView(textOrHtml) {
  const dbg = document.getElementById('debuggerOutput');
  if (dbg) {
    if (textOrHtml == null) { dbg.innerHTML = ''; return; }
    dbg.innerHTML = String(textOrHtml);
  }
}

export function showSubnetSolution(html) {
  const el = document.getElementById('subnetSolution');
  if (el) el.innerHTML = String(html ?? '');
}

/* Kontextabhängige Getter (falls DOM‑Auswahl erforderlich) */
export function getCurrentLernBaustein() {
  // Sucht das aktuell "aktiv" markierte Element
  const el = $('.lernbaustein.selected, .lernbaustein.active, [data-wissensbaustein-id].selected');
  if (!el) return null;
  return {
    wissensbausteinId: el.dataset.wissensbausteinId || el.getAttribute('data-id') || null,
    titel: el.dataset.title || el.getAttribute('data-title') || el.textContent?.trim() || 'Baustein'
  };
}

export function getCurrentZusatzModul() {
  const el = $('.zusatzmodul.selected, [data-zusatzmodul-id].selected');
  if (!el) return null;
  return {
    id: el.dataset.zusatzmodulId || el.getAttribute('data-id') || null,
    titel: el.dataset.title || el.getAttribute('data-title') || el.textContent?.trim() || 'Zusatzmodul'
  };
}
