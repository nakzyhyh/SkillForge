'use strict';

import { wissensgraph }  from './data/wissensgraph.js';
import { lernfelder }    from './data/lernfelder.js';
import { zusatzmodule }  from './data/zusatzmodule.js';
import * as ui           from './uiLogic.js';
import * as quiz         from './quizLogic.js';
import * as zml          from './zusatzModuleLogic.js';

window.wissensgraph  = wissensgraph;
window.lernfelder    = lernfelder;
window.zusatzmodule  = zusatzmodule;
window.user          = {};

document.addEventListener('DOMContentLoaded', init);

function init() {
    window.user = loadUser();
    // KORRIGIERT: Macht die saveUser Funktion global verfügbar
    window.saveUser = saveUser; 
    addEventListeners();
    ui.renderLearningPath(window.user);
    ui.updateUI(window.user);
    ui.showScreen('mapScreen');
}

function addEventListeners() {

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

    document.getElementById('closeLernBtn').addEventListener('click', ui.closeLernModal);
    document.getElementById('closeZusatzModulBtn').addEventListener('click', ui.closeZusatzModulModal);

    document.querySelector('.lern-nav').addEventListener('click', (e) => {
        if (e.target.matches('.lern-nav-btn')) {
            ui.showLernTab(e.target.dataset.tab);
        }
    });

    document.getElementById('startQuizBtn').addEventListener('click', () => {
        const bs = ui.getCurrentLernBaustein();
        if (bs) { ui.closeLernModal(); quiz.startQuiz(bs); }
    });

    // KORRIGIERT & FINALISIERT: Zentraler Event-Listener für alle Zusatzmodule
    document.getElementById('zusatzModulModal').addEventListener('click', (e) => {
        const targetId = e.target.id;
        
        if (targetId === 'nextDebugStepBtn') {
            ui.updateDebuggerView();
            return; 
        }

        switch (targetId) {
            case 'checkInteractiveBtn':         zml.checkScenarioChoiceJustified(); break;
            case 'checkInteractiveCalcBtn':     zml.checkInteractiveCalculation(); break;
            case 'checkCodeTraceBtn':           zml.checkCodeTraceResult(); break;
            case 'checkDebuggerSolutionBtn':    zml.checkDebuggerSolution(); break;
            case 'checkFormFillerBtn':          zml.checkFormFillerAnswers(); break;
            case 'checkSubnetBtn':              zml.checkSubnetAnswers(); break;
            case 'dm_check_btn':                zml.checkDecisionMatrix(); break;
            case 'checkNetzplanBtn':            zml.checkNetzplanAnswers(); break;
            case 'checkContextualInputBtn':     zml.checkFormFillerAnswers(); break;
        }
    });

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
            const result = bs.anwenden.simulation(config);
            document.getElementById('simulationOutput').textContent = result;
        } catch (err) {
            document.getElementById('simulationOutput').textContent = 'Fehler bei der Eingabe.';
            console.error('Simulationsfehler:', err);
        }
    });

    document.getElementById('closeQuizBtn').addEventListener('click', quiz.closeQuiz);
    document.getElementById('backToMapBtn').addEventListener('click', () => ui.backToMap(window.user));
    document.getElementById('reviewAnswersBtn').addEventListener('click', quiz.reviewAnswers);
    document.getElementById('nextBtn').addEventListener('click', quiz.nextQuestion);
    document.getElementById('prevBtn').addEventListener('click', quiz.previousQuestion);
}

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
    return {
        username: 'Max Azubi', email: 'max@azubi.de', xp: 0, level: 1,
        coins: 100, hearts: 5, gems: 10, lernfortschritt: new Map()
    };
}