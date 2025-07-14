'use strict';

// ─────────────────────────────────────────────────────────────────────────────
//  Main-Entry-Point
// ─────────────────────────────────────────────────────────────────────────────

// Basis-Datenstrukturen und Services importieren
import { wissensgraph }  from './data/wissensgraph.js';
import { lernfelder }    from './data/lernfelder.js';
import { zusatzmodule }  from './data/zusatzmodule.js';
import * as ui           from './uiLogic.js';
import * as quiz         from './quizLogic.js';
import * as zml          from './zusatzModuleLogic.js';
import * as LernService  from './services/lernlogik.service.js';

// Globale Verfügbarkeit im Fenster-Scope
window.wissensgraph  = wissensgraph;
window.lernfelder    = lernfelder;
window.zusatzmodule  = zusatzmodule;
window.user          = {};

document.addEventListener('DOMContentLoaded', init);

// ─────────────────────────────────────────────────────────────────────────────
//  Initialisierung
// ─────────────────────────────────────────────────────────────────────────────
function init() {
    window.user = loadUser();
    addEventListeners();
    ui.renderLearningPath(window.user);
    ui.updateUI(window.user);
    ui.showScreen('mapScreen');
}

// ─────────────────────────────────────────────────────────────────────────────
//  Event-Verknüpfungen
// ─────────────────────────────────────────────────────────────────────────────
function addEventListeners() {

    // Navigation unten
    document.querySelector('.bottom-nav').addEventListener('click', (e) => {
        const navItem = e.target.closest('.nav-item');
        if (!navItem) return;
        const screen = navItem.dataset.screen;
        if (!screen) return;

        if (screen === 'profileScreen')      ui.renderProfile(window.user);
        if (screen === 'shopScreen')         ui.renderShop();
        if (screen === 'mapScreen')          ui.renderLearningPath(window.user);
        if (screen === 'pruefungPlusScreen') ui.renderZusatzModule(window.user, window.zusatzmodule);

        ui.showScreen(screen);
    });

    // Modale schließen
    document.getElementById('closeLernBtn').addEventListener('click', ui.closeLernModal);
    document.getElementById('closeZusatzModulBtn').addEventListener('click', ui.closeZusatzModulModal);

    // Tabs innerhalb des Lern-Modals
    document.querySelector('.lern-nav').addEventListener('click', (e) => {
        if (e.target.matches('.lern-nav-btn')) {
            ui.showLernTab(e.target.dataset.tab);
        }
    });

    // --- Quiz-Buttons -------------------------------------------------------
    document.getElementById('startQuizBtn').addEventListener('click', () => {
        const bs = ui.getCurrentLernBaustein();
        if (bs) { ui.closeLernModal(); quiz.startQuiz(bs); }
    });

    // --- Delegation für Aktionen im Zusatz-Modul-Modal (ERWEITERT & KORRIGIERT) ---
    document.getElementById('zusatzModulModal').addEventListener('click', (e) => {
        const targetId = e.target.id;
        switch (targetId) {
            case 'checkSubnetBtn':
                zml.checkSubnetAnswers();
                break;
            case 'checkOsiBtn':
                zml.checkOsiMatches();
                break;
            case 'dm_check_btn':
                zml.checkDecisionMatrix();
                break;
            case 'checkContextualInputBtn': // KORREKTUR: Fehlender Case hinzugefügt
            case 'checkFormFillerBtn':
                zml.checkFormFillerAnswers();
                break;
            case 'checkCodeResultBtn':
                zml.checkCodeResultAnswers();
                break;
            case 'checkCalculationBtn':
                zml.checkCalculationAnswer();
                break;
        }
    });

    // Simulation-Button
    document.getElementById('simulierenBtn').addEventListener('click', () => {
        const bs = ui.getCurrentLernBaustein();
        if (!bs) return;

        let config = {};
        const id = bs.wissensbausteinId;

        try {
            if (id === 'LF1_betriebsstrukturen') {
                const typ = document.getElementById('sim_typ').value;
                config = { typ };
                if (typ === 'Matrixorganisation') {
                    config.projekte = +document.getElementById('sim_projekte').value;
                    config.abteilungen = +document.getElementById('sim_abteilungen').value;
                } else {
                    config.ebenen = +document.getElementById('sim_ebenen').value;
                }
            }
            // Weitere Simulationszweige ...
            const result = bs.anwenden.simulation(config);
            document.getElementById('simulationOutput').textContent = result;
        } catch (err) {
            document.getElementById('simulationOutput').textContent = 'Fehler bei der Eingabe.';
            console.error('Simulationsfehler:', err);
        }
    });

    // Quiz-Steuerung
    document.getElementById('closeQuizBtn').addEventListener('click', quiz.closeQuiz);
    document.getElementById('backToMapBtn').addEventListener('click', () => ui.backToMap(window.user));
    document.getElementById('reviewAnswersBtn').addEventListener('click', quiz.reviewAnswers);
    document.getElementById('nextBtn').addEventListener('click', quiz.nextQuestion);
    document.getElementById('prevBtn').addEventListener('click', quiz.previousQuestion);
}

// ─────────────────────────────────────────────────────────────────────────────
//  Persistenz-Helpers
// ─────────────────────────────────────────────────────────────────────────────
function saveUser() {
    try {
        const toSave = { ...window.user, lernfortschritt: Object.fromEntries(window.user.lernfortschritt) };
        localStorage.setItem('adaptiveSkillpilotUser', JSON.stringify(toSave));
    } catch (err) {
        console.error('Speichern fehlgeschlagen:', err);
    }
}

function loadUser() {
    try {
        const raw = localStorage.getItem('adaptiveSkillpilotUser');
        if (raw) {
            const parsed = JSON.parse(raw);
            parsed.lernfortschritt = new Map(Object.entries(parsed.lernfortschritt || {}));
            return parsed;
        }
    } catch (err) {
        console.error('Laden fehlgeschlagen:', err);
    }

    // Default-Profil
    return {
        username: 'Max Azubi',
        email:    'max@azubi.de',
        xp:       0,
        level:    1,
        coins:    100,
        hearts:   5,
        gems:     10,
        lernfortschritt: new Map()
    };
}