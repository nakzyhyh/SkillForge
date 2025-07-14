'use strict';

import * as quiz from './quizLogic.js';
import * as LernlogikService from './services/lernlogik.service.js';
import * as ZusatzModuleLogic from './zusatzModuleLogic.js';

let currentLernBaustein = null;
let currentZusatzModul = null;

// KORREKTUR: Neue Hilfsfunktion zur Syntax-Hervorhebung
/**
 * Hebt einfache Python-Syntax in einem Code-String hervor.
 * @param {string} code - Der rohe Code-String.
 * @returns {string} - Der HTML-formatierte Code-String.
 */
function highlightPythonSyntax(code) {
    return code
        .replace(/def ([a-zA-Z_]\w*)/g, '<span class="code-keyword">def</span> <span class="code-function-name">$1</span>') // Funktionsdefinition
        .replace(/\((.*?)\)/g, '(<span class="code-params">$1</span>)') // Parameter
        .replace(/\b(return)\b/g, '<span class="code-keyword">$1</span>') // return-Keyword
        .replace(/([=+\-/*])/g, '<span class="code-operator">$1</span>'); // Operatoren
}

function getBausteinStatus(user, baustein) {
    const fortschritt = user.lernfortschritt.get(baustein.wissensbausteinId);
    if (fortschritt && (fortschritt.status === 'gelernt' || fortschritt.status === 'gemeistert')) {
        return 'completed';
    }
    const abhaengigkeitenErfuellt = baustein.dependencies.every(depId => {
        const depFortschritt = user.lernfortschritt.get(depId);
        return depFortschritt && (depFortschritt.status === 'gelernt' || depFortschritt.status === 'gemeistert');
    });
    return abhaengigkeitenErfuellt ? 'current' : 'locked';
}

export function openLernModal(baustein) {
    currentLernBaustein = baustein;
    document.getElementById('lernModal').classList.add('active');
    document.getElementById('lernModalTitle').textContent = baustein.titel;
    document.getElementById('lernenBeschreibung').textContent = baustein.lernen.beschreibung;
    document.getElementById('anwendenAnleitung').textContent = baustein.anwenden.anleitung;
    const simulationInputContainer = document.getElementById('simulationInput');
    simulationInputContainer.innerHTML = '';
    document.getElementById('simulationOutput').textContent = 'Das Ergebnis der Simulation wird hier erscheinen.';
    const id = baustein.wissensbausteinId;
    if (id === 'LF1_betriebsstrukturen') {
        simulationInputContainer.innerHTML = `
            <label for="sim_typ">Organisationstyp:</label>
            <select id="sim_typ"><option>Linienorganisation</option><option>Stabsorganisation</option><option>Matrixorganisation</option></select>
            <div id="matrix_fields" style="display: none;"><label for="sim_projekte">Anzahl Projekte:</label><input type="number" id="sim_projekte" value="3" min="1"><label for="sim_abteilungen">Anzahl Abteilungen:</label><input type="number" id="sim_abteilungen" value="5" min="1"></div>
            <label for="sim_ebenen">Hierarchie-Ebenen (für Linien/Stab):</label><input type="number" id="sim_ebenen" value="4" min="1">
        `;
        const simTypSelect = document.getElementById('sim_typ');
        const matrixFieldsDiv = document.getElementById('matrix_fields');
        const ebenenInput = document.getElementById('sim_ebenen');
        const ebenenLabel = document.querySelector('label[for="sim_ebenen"]');
        function toggleMatrixFields() {
            if (simTypSelect.value === 'Matrixorganisation') {
                matrixFieldsDiv.style.display = 'block';
                ebenenInput.style.display = 'none';
                ebenenLabel.style.display = 'none';
            } else {
                matrixFieldsDiv.style.display = 'none';
                ebenenInput.style.display = 'block';
                ebenenLabel.style.display = 'block';
            }
        }
        simTypSelect.addEventListener('change', toggleMatrixFields);
        toggleMatrixFields();
    }
    showLernTab('lernenTab');
}

export function closeLernModal() {
    document.getElementById('lernModal').classList.remove('active');
    currentLernBaustein = null;
}

export function openZusatzModul(modul) { 
    if (!modul) {
        console.error("Fehler: Zusatzmodul-Daten fehlen beim Öffnen des Modals.", modul);
        return;
    }
    currentZusatzModul = modul;
    document.getElementById('zusatzModulTitle').textContent = modul.titel;
    const contentContainer = document.getElementById('zusatzModulContent');
    contentContainer.innerHTML = ''; 

    switch (modul.typ) {
        case 'subnet_calculator':
            buildSubnetCalculatorUI(contentContainer, modul);
            break;
        case 'osi_matcher':
            buildOsiMatcherUI(contentContainer, modul);
            break;
        case 'decision_matrix':
            buildDecisionMatrixUI(contentContainer, modul);
            break;
        case 'form_filler':
            buildFormFillerUI(contentContainer, modul);
            break;
        case 'contextual_input':
            buildContextualInputUI(contentContainer, modul);
            break;
        case 'code_result_checker':
            buildCodeResultCheckerUI(contentContainer, modul);
            break;
// In der Funktion openZusatzModul(modul), innerhalb der switch-Anweisung:
        case 'calculation_task':
            buildCalculationTaskUI(contentContainer, modul);
            break;
        // HINZUGEFÜGT: Der neue Fall für unseren Netzplan-Generator
        case 'netzplan':
            buildNetzplanUI(contentContainer, modul);
            break;
        default:
            contentContainer.innerHTML = `<p class="feedback-box incorrect">Modul-Typ "${modul.typ}" nicht implementiert.</p>`;
    }
    document.getElementById('zusatzModulModal').classList.add('active');
    // Am Ende der Funktion buildNetzplanUI in uiLogic.js

    // HINZUGEFÜGT: Verknüpft den Klick auf den Button mit der Prüfungsfunktion.
    container.querySelector('#checkNetzplanBtn').addEventListener('click', ZusatzModuleLogic.checkNetzplanAnswers);
}

export function closeZusatzModulModal() {
    document.getElementById('zusatzModulModal').classList.remove('active');
    currentZusatzModul = null;
}

export function renderZusatzModule(user, zusatzModuleData) {
    const container = document.getElementById('pruefungPlusScreen');
    if (!container) return;

    const isUnlocked = true;
    
    container.innerHTML = `
        <div class="wiederholungs-header">Prüfung+ Module</div>
        <p class="wiederholungs-subheader">Trainiere spezielle, prüfungsrelevante Fähigkeiten mit interaktiven Übungen.</p>
    `;

    if (!isUnlocked) {
        container.innerHTML += `<p style="text-align: center; margin-top: 20px;">Schließe erst den Haupt-Lernpfad ab, um diese Module freizuschalten!</p>`;
        return;
    }

    if (!zusatzModuleData || zusatzModuleData.length === 0) {
        container.innerHTML += `<p class="feedback-box incorrect">Fehler: Die Zusatzmodul-Daten konnten nicht geladen werden.</p>`;
        return;
    }
    
    const grid = document.createElement('div');
    grid.className = 'pruefung-plus-grid';
    zusatzModuleData.forEach(modul => {
        const card = document.createElement('div');
        card.className = 'zusatz-modul-card';
        if (modul.typ === 'coming_soon') {
            card.classList.add('locked');
            card.style.cursor = 'not-allowed';
        } else {
            card.addEventListener('click', () => openZusatzModul(modul)); 
        }
        
        const icons = {
            'subnet_calculator': '🖧',
            'osi_matcher': '📚',
            'decision_matrix': '⚖️',
            'form_filler': '📋',
            'contextual_input': '🖼️',
            'code_result_checker': '💻',
            'calculation_task': '🧮',
            'coming_soon': '⏳'
        };
        const icon = icons[modul.typ] || '🔧';

        card.innerHTML = `
            <div class="zusatz-modul-icon">${icon}</div>
            <div class="zusatz-modul-details">
                <h3>${modul.titel}</h3>
                <p>${modul.beschreibung}</p>
            </div>
        `;
        grid.appendChild(card);
    });
    container.appendChild(grid);
}

function buildContextualInputUI(container, modul) {
    let fieldsHtml = modul.fields.map(field => `
        <div class="form-filler-row">
            <label for="form_${field.id}">${field.label}:</label>
            <input type="${field.type}" id="form_${field.id}" placeholder="${field.placeholder || ''}">
        </div>
    `).join('');

    let contextHtml = `
        <div class="contextual-info">
            ${modul.context.image_src ? `<img src="${modul.context.image_src}" alt="Kontextbild">` : ''}
            <ul class="contextual-instructions">
                ${modul.context.instructions.map(instr => `<li>${instr}</li>`).join('')}
            </ul>
        </div>
    `;

    container.innerHTML = `
        <p class="modul-beschreibung">${modul.beschreibung}</p>
        <div class="form-filler-container">
            ${contextHtml}
            ${fieldsHtml}
        </div>
        <div id="form_feedback" class="feedback-box" style="display:none"></div>
        <button id="checkContextualInputBtn" class="quiz-btn primary" style="width:100%;margin-top:15px">Prüfen</button>
    `;
}

function buildCalculationTaskUI(container, modul) {
    let inputsHtml = modul.inputs.map(input => `
        <div class="calc-row">
            <label for="calc_${input.id}">${input.label}:</label>
            <input type="number" id="calc_${input.id}" value="${input.value}" ${input.readonly ? 'readonly' : ''}>
        </div>
    `).join('');

    container.innerHTML = `
        <p class="modul-beschreibung">${modul.beschreibung}</p>
        <div class="calculation-form">
            ${inputsHtml}
            <hr>
            <div class="calc-row">
                <label for="calc_solution"><strong>Dein Ergebnis (€):</strong></label>
                <input type="number" id="calc_solution" placeholder="Ergebnis hier eintragen">
            </div>
        </div>
        <p class="modul-beschreibung"><strong>Formel-Hinweis:</strong> ${modul.formula}</p>
        <div id="calc_feedback" class="feedback-box" style="display:none"></div>
        <button id="checkCalculationBtn" class="quiz-btn primary" style="width:100%;margin-top:15px">Prüfen</button>
    `;
}

// KORREKTUR: UI-Builder für Schreibtischtest überarbeitet, um Syntax-Hervorhebung zu nutzen
function buildCodeResultCheckerUI(container, modul) {
    let resultsHtml = modul.results.map(res => {
        let paramTableHtml = '';
        if (res.params) {
            const headers = Object.keys(res.params).map(key => `<th>${key}</th>`).join('');
            const data = Object.values(res.params).map(val => `<td>${val}</td>`).join('');
            paramTableHtml = `
                <table class="param-table">
                    <thead><tr>${headers}</tr></thead>
                    <tbody><tr>${data}</tr></tbody>
                </table>
            `;
        }

        return `
            <div class="code-result-call">
                <h4>${res.label}</h4>
                ${paramTableHtml}
                <div class="code-result-row">
                    <label for="res_${res.id}">Erwartete Ausgabe:</label>
                    <input type="${res.type}" id="res_${res.id}" placeholder="Text hier eintragen">
                </div>
            </div>
        `;
    }).join('');

    const highlightedCode = highlightPythonSyntax(modul.code_snippet.trim());

    container.innerHTML = `
        <p class="modul-beschreibung">${modul.beschreibung}</p>
        <pre class="code-snippet"><code>${highlightedCode}</code></pre>
        <div class="code-result-form">
            ${resultsHtml}
        </div>
        <div id="code_feedback" class="feedback-box" style="display:none"></div>
        <button id="checkCodeResultBtn" class="quiz-btn primary" style="width:100%;margin-top:15px">Prüfen</button>
    `;
}

function buildFormFillerUI(container, modul) {
    let fieldsHtml = modul.fields.map(field => {
        if (field.type === 'radio') {
            let optionsHtml = field.options.map(opt => `
                <label class="radio-label">
                    <input type="radio" name="${field.id}" value="${opt}">
                    <span>${opt}</span>
                </label>
            `).join('');
            return `<div class="form-filler-row radio-group"><label>${field.label}:</label>${optionsHtml}</div>`;
        } else {
            return `
                <div class="form-filler-row">
                    <label for="form_${field.id}">${field.label}:</label>
                    <input type="${field.type}" id="form_${field.id}" placeholder="${field.placeholder || ''}">
                </div>`;
        }
    }).join('');

    container.innerHTML = `
        <p class="modul-beschreibung">${modul.beschreibung}</p>
        <div class="form-filler-container">
            ${fieldsHtml}
        </div>
        <div id="form_feedback" class="feedback-box" style="display:none"></div>
        <button id="checkFormFillerBtn" class="quiz-btn primary" style="width:100%;margin-top:15px">Prüfen</button>
    `;
}

// ERSETZEN Sie die komplette buildDecisionMatrixUI Funktion in uiLogic.js mit dieser:

function buildDecisionMatrixUI(container, modul) {
    // CSS-Stile für die verbesserte Matrix. Wird nur einmal zum Dokument hinzugefügt.
    if (!document.getElementById('decision-matrix-styles')) {
        const style = document.createElement('style');
        style.id = 'decision-matrix-styles';
        style.innerHTML = `
            .decision-matrix { width: 100%; border-collapse: collapse; }
            .decision-matrix th, .decision-matrix td { border: 1px solid #ddd; padding: 8px; text-align: center; vertical-align: middle; }
            .decision-matrix th { background-color: #f2f2f2; }
            .matrix-cell-content { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; }
            .matrix-value { font-size: 0.9em; color: #555; }
            .matrix-cell-content select { padding: 4px; border-radius: 4px; border: 1px solid #ccc; }
        `;
        document.head.appendChild(style);
    }
    
    // Baut den Tabellenkopf (Header)
    let head = '<tr><th>Kriterium</th>' + modul.devices.map(d => `<th>${d}</th>`).join('') + '</tr>';
    
    // Baut die Tabellenzeilen für jedes Kriterium
    let rows = '';
    modul.criteria.forEach((crit, rIdx) => {
        rows += `<tr><td>${crit.label}</td>`; // Zelle für das Kriterium-Label
        
        modul.devices.forEach((_, cIdx) => {
            // Holt den spezifischen Wert (z.B. "40 S/min") aus den Modul-Daten
            const value = crit.values[cIdx];
            
            // Erstellt die Zelle mit dem Wert UND dem Auswahlfeld
            rows += `
                <td>
                    <div class="matrix-cell-content">
                        <span class="matrix-value">${value}</span>
                        <select data-row="${rIdx}" data-col="${cIdx}">
                            <option value="">Punkte</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                </td>`;
        });
        rows += '</tr>';
    });

    // Baut die Summenzeile
    rows += '<tr><th>Summe</th>' + modul.devices.map((_, i) => `<th id="dm_sum_${i}">0</th>`).join('') + '</tr>';

    // Setzt das finale HTML zusammen
    container.innerHTML = `
        <p class="modul-beschreibung">${modul.beschreibung}</p>
        <div style="overflow-x:auto"><table class="decision-matrix">${head + rows}</table></div>
        <div id="dm_feedback" class="feedback-box" style="display:none"></div>
        <button id="dm_check_btn" class="quiz-btn primary" style="width:100%;margin-top:15px">Prüfen</button>`;

    // Fügt den Event-Listener für den Prüfen-Button hinzu
    container.querySelector('#dm_check_btn').addEventListener('click', ZusatzModuleLogic.checkDecisionMatrix);
}

function buildSubnetCalculatorUI(container, modul) {
    const aufgabeIndex = Math.floor(Math.random() * modul.aufgaben.length);
    const aufgabe = modul.aufgaben[aufgabeIndex];
    container.innerHTML = `
        <div id="subnet-aufgabe-container" data-aufgabe-index="${aufgabeIndex}">
            <div class="subnet-aufgabe"><p>Gegebene IP-Adresse: <code>${aufgabe.ip}/${aufgabe.cidr}</code></p></div>
            <div class="subnet-form">
                <label for="subnet_network">Netz-ID:</label><input type="text" id="subnet_network" placeholder="z.B. 192.168.178.64">
                <label for="subnet_broadcast">Broadcast:</label><input type="text" id="subnet_broadcast" placeholder="z.B. 192.168.178.127">
                <label for="subnet_first">Erster Host:</label><input type="text" id="subnet_first" placeholder="z.B. 192.168.178.65">
                <label for="subnet_last">Letzter Host:</label><input type="text" id="subnet_last" placeholder="z.B. 192.168.178.126">
                <label for="subnet_hosts">Anzahl Hosts:</label><input type="number" id="subnet_hosts" placeholder="z.B. 62">
            </div>
            <div id="subnet-solution-feedback" class="feedback-box" style="display: none;"></div>
            <button id="checkSubnetBtn" class="quiz-btn primary" style="width: 100%; margin-top: 20px;">Prüfen</button>
        </div>
    `;
}

function buildOsiMatcherUI(container, modul) {
    let itemsHtml = '', dropzonesHtml = '', allItems = [];
    for (const layer in modul.zuordnungen) {
        modul.zuordnungen[layer].forEach(item => allItems.push({ text: item, layer: layer }));
    }
    allItems.sort(() => Math.random() - 0.5); 
    allItems.forEach(item => itemsHtml += `<div class="osi-item" draggable="true" data-correct-layer="${item.layer}">${item.text}</div>`);
    Object.keys(modul.zuordnungen).forEach(layer => {
        dropzonesHtml += `<div class="osi-dropzone" data-layer="${layer}"><div class="osi-dropzone-title">${layer}</div></div>`;
    });
    container.innerHTML = `
        <div class="osi-matcher-container">
            <p style="text-align: center;">Ziehe die Begriffe rechts in die passende Schicht links.</p>
            <div class="osi-drop-container"><div class="osi-dropzones">${dropzonesHtml}</div><div class="osi-source-items">${itemsHtml}</div></div>
            <div id="osi-feedback" class="feedback-box" style="display: none;"></div>
            <button id="checkOsiBtn" class="quiz-btn primary" style="width: 100%; margin-top: 20px;">Zuordnung prüfen</button>
        </div>
    `;
    const draggables = container.querySelectorAll('.osi-item');
    const dropzones = container.querySelectorAll('.osi-dropzone, .osi-source-items');
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => draggable.classList.add('dragging'));
        draggable.addEventListener('dragend', () => draggable.classList.remove('dragging'));
    });
    dropzones.forEach(zone => {
        zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
        zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
        zone.addEventListener('drop', e => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            const draggable = document.querySelector('.dragging');
            if (draggable) zone.appendChild(draggable);
        });
    });
}
// ERSETZEN Sie die komplette buildNetzplanUI Funktion in uiLogic.js mit dieser:

function buildNetzplanUI(container, modul) {
    // CSS-Stile für die Netzplan-Komponente. Wird nur einmal zum Dokument hinzugefügt.
    if (!document.getElementById('netzplan-styles')) {
        const style = document.createElement('style');
        style.id = 'netzplan-styles';
        style.innerHTML = `
            .netzplan-wrapper { display: flex; flex-direction: column; align-items: center; gap: 45px; padding: 20px 10px; }
            .netzplan-node { display: grid; grid-template-areas: 'faz dauer fez' 'name gp fp' 'saz empty sez'; grid-template-columns: 1fr 1fr 1fr; border: 2px solid #333; border-radius: 4px; width: 220px; font-family: sans-serif; text-align: center; background-color: #fff; box-shadow: 2px 2px 5px rgba(0,0,0,0.1); position: relative; }
            .netzplan-node:not(:last-child)::after { content: '↓'; position: absolute; bottom: -35px; left: 50%; transform: translateX(-50%); font-size: 28px; color: #888; }
            .node-cell { border: 1px solid #ccc; padding: 4px; display: flex; flex-direction: column; justify-content: center; align-items: center; }
            .node-cell .label { font-size: 0.7em; color: #666; }
            .node-cell .value { font-size: 1.2em; font-weight: bold; }
            .node-input { font-size: 1.2em; font-weight: bold; color: #003366; width: 95%; border: none; text-align: center; background-color: #f0f8ff; border-radius: 2px; }
            .node-input:read-only { background-color: transparent; color: #000; font-weight: normal; pointer-events: none; }
            .node-input.correct { background-color: #d4edda !important; }
            .node-input.incorrect { background-color: #f8d7da !important; }
            .faz { grid-area: faz; } .dauer { grid-area: dauer; } .fez { grid-area: fez; }
            .name { grid-area: name; } .gp { grid-area: gp; } .fp { grid-area: fp; }
            .saz { grid-area: saz; } .empty { grid-area: empty; } .sez { grid-area: sez; }
        `;
        document.head.appendChild(style);
    }

    const createNodeHtml = (node) => {
        const sol = modul.solution;
        const createInput = (id, placeholder = '?', readonly = false) => {
            const value = sol[id] !== undefined && readonly ? `value="${sol[id]}"` : '';
            return `<input type="number" id="${id}" class="node-input" placeholder="${placeholder}" ${value} ${readonly ? 'readonly' : ''}>`;
        };

        return `
            <div class="netzplan-node">
                <div class="node-cell faz"><span class="label">FAZ</span>${createInput(node.id + '_faz', '?', node.isStart)}</div>
                <div class="node-cell dauer"><span class="label">Dauer</span><span class="value">${node.duration}</span></div>
                <div class="node-cell fez"><span class="label">FEZ</span>${createInput(node.id + '_fez', '?', node.isStart)}</div>
                <div class="node-cell name"><span class="label">Vorgang</span><span class="value">${node.name}</span></div>
                <div class="node-cell gp"><span class="label">GP</span>${createInput(node.id + '_gp')}</div>
                <div class="node-cell fp"><span class="label">FP</span>${createInput(node.id + '_fp')}</div>
                <div class="node-cell saz"><span class="label">SAZ</span>${createInput(node.id + '_saz')}</div>
                <div class="node-cell empty"></div>
                <div class="node-cell sez"><span class="label">SEZ</span>${createInput(node.id + '_sez')}</div>
            </div>`;
    };

    // Die Knoten werden jetzt einfach untereinander gerendert
    const nodesInOrder = ['A', 'B', 'C', 'D', 'G', 'E', 'H', 'F', 'I', 'J'];
    const nodesHtml = nodesInOrder.map(name => {
        const nodeData = modul.nodes.find(n => n.name === name);
        return createNodeHtml(nodeData);
    }).join('');

    container.innerHTML = `
        <p class="modul-beschreibung">${modul.beschreibung}</p>
        <div class="netzplan-wrapper">
            ${nodesHtml}
        </div>
        <div id="netzplan_feedback" class="feedback-box" style="display:none; margin-top: 15px;"></div>
        <button id="checkNetzplanBtn" class="quiz-btn primary" style="width:100%; margin-top:15px;">Netzplan prüfen</button>
    `;

    // Verknüpft den Klick auf den Button mit der Prüfungsfunktion.
    container.querySelector('#checkNetzplanBtn').addEventListener('click', ZusatzModuleLogic.checkNetzplanAnswers);
}
export function showSubnetSolution(allCorrect, correctAnswers) {
    const feedbackBox = document.getElementById('subnet-solution-feedback');
    if (allCorrect) {
        feedbackBox.className = 'feedback-box correct';
        feedbackBox.textContent = 'Perfekt! Alle Werte sind korrekt. ✅';
    } else {
        feedbackBox.className = 'feedback-box incorrect';
        let solution = 'Einige Werte sind falsch. Hier die korrekte Lösung:\n';
        solution += `Netz: ${correctAnswers.networkId}, Broadcast: ${correctAnswers.broadcast}, Hosts: ${correctAnswers.firstHost} - ${correctAnswers.lastHost} (${correctAnswers.hostCount} Stk.)`;
        feedbackBox.textContent = solution;
    }
    feedbackBox.style.display = 'block';
}

export function showLernTab(tabId) {
    document.querySelectorAll('.lern-tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelectorAll('.lern-nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
}

export function getCurrentLernBaustein() { return currentLernBaustein; }
export function getCurrentZusatzModul() { return currentZusatzModul; }

export function renderLearningPath(user) {
    const pathContainer = document.getElementById('mapScreen');
    if (!pathContainer) return;
    pathContainer.innerHTML = '';
    const worlds = window.wissensgraph.reduce((acc, baustein) => {
        const lernfeldKey = baustein.lernfeld;
        const lernfeldMeta = window.lernfelder.find(lf => lf.id === lernfeldKey) || { title: `Lernfeld ${lernfeldKey}`, icon: '📚', outcome: '' };
        if (!acc[lernfeldKey]) acc[lernfeldKey] = { ...lernfeldMeta, quizzes: [] };
        acc[lernfeldKey].quizzes.push(baustein);
        return acc;
    }, {});
    let nextAvailableModuleFound = false;
    for (const worldKey in worlds) {
        const world = worlds[worldKey];
        const worldDiv = document.createElement('div');
        worldDiv.className = 'topic-world';
        worldDiv.innerHTML = `<div class="topic-header"><div class="topic-icon">${world.icon}</div><div class="topic-title">${world.title}</div></div><p class="world-outcome">${world.outcome}</p>`;
        const quizPathDiv = document.createElement('div');
        quizPathDiv.className = 'quiz-path';
        world.quizzes.forEach(baustein => {
            const isCompleted = user.lernfortschritt.has(baustein.wissensbausteinId) && (user.lernfortschritt.get(baustein.wissensbausteinId).status === 'gelernt' || user.lernfortschritt.get(baustein.wissensbausteinId).status === 'gemeistert');
            const dependenciesMet = baustein.dependencies.every(depId => {
                const depFortschritt = user.lernfortschritt.get(depId);
                return depFortschritt && (depFortschritt.status === 'gelernt' || depFortschritt.status === 'gemeistert');
            });
            let status = 'locked';
            if (isCompleted) {
                status = 'completed';
            } else if (dependenciesMet && !nextAvailableModuleFound) {
                status = 'current';
                nextAvailableModuleFound = true;
            } else if (dependenciesMet) {
                status = 'unlocked_but_not_current';
            }
            const nodeDiv = document.createElement('div');
            nodeDiv.className = 'quiz-node';
            if (status !== 'locked' && status !== 'unlocked_but_not_current') nodeDiv.addEventListener('click', () => openLernModal(baustein));
            else nodeDiv.style.cursor = 'not-allowed';
            nodeDiv.innerHTML = `<div class="quiz-button level-${status}"><div class="quiz-icon">${status.startsWith('locked') ? '🔒' : '💡'}</div></div><div class="quiz-label">${baustein.titel}</div>`;
            if (baustein.titel.includes("Meilenstein-Prüfung")) nodeDiv.querySelector('.quiz-icon').textContent = '👑';
            quizPathDiv.appendChild(nodeDiv);
        });
        worldDiv.appendChild(quizPathDiv);
        pathContainer.appendChild(worldDiv);
    }
}

export function updateUI(user) {
    if (!user) return;
    document.getElementById('coinCount').textContent = user.coins;
    document.getElementById('heartCount').textContent = user.hearts;
    document.getElementById('gemCount').textContent = user.gems;
    const level = Math.floor((user.xp || 0) / 500) + 1;
    document.getElementById('userLevel').textContent = `Level ${level}`;
    const xpForNextLevel = 500 * level;
    const currentLevelBaseXP = 500 * (level - 1);
    const currentLevelXP = (user.xp || 0) - currentLevelBaseXP;
    const xpPercentage = (currentLevelXP / 500) * 100;
    document.getElementById('levelXpFill').style.width = `${xpPercentage}%`;
}

export function displayQuestion() {
    if (!window.activeQuiz || !window.activeQuiz.questions) return;
    const question = window.activeQuiz.questions[window.activeQuiz.currentQuestionIndex];
    if (!question) { console.error("Keine Frage für den aktuellen Index gefunden:", window.activeQuiz); return; }
    document.getElementById('questionNumber').textContent = `Frage ${window.activeQuiz.currentQuestionIndex + 1} von ${window.activeQuiz.questions.length}`;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('progressFill').style.width = ((window.activeQuiz.currentQuestionIndex + 1) / window.activeQuiz.questions.length) * 100 + '%';
    updateQuizScore(window.activeQuiz.score);
    renderMultipleChoiceQuestion(question);
    document.getElementById('explanationBox').classList.remove('show');
    document.getElementById('prevBtn').style.display = window.activeQuiz.isReviewing ? 'block' : 'none';
    document.getElementById('nextBtn').textContent = 'Weiter';
}

export function renderMultipleChoiceQuestion(question) {
    const optionsContainer = document.getElementById('answerOptions');
    optionsContainer.innerHTML = '';
    if (!question || !question.choices) { console.error("Frage oder Antwortmöglichkeiten fehlen:", question); return; }
    question.choices.forEach((choiceText, index) => {
        const option = document.createElement('div');
        option.className = 'answer-option';
        option.textContent = choiceText;
        option.addEventListener('click', () => quiz.selectAnswer(index));
        option.style.pointerEvents = 'auto'; 
        if (window.activeQuiz.isReviewing && window.activeQuiz.userAnswers[window.activeQuiz.currentQuestionIndex] !== undefined) {
            option.style.pointerEvents = 'none';
            if (index === question.answer) option.classList.add('correct');
            else if (index === window.activeQuiz.userAnswers[window.activeQuiz.currentQuestionIndex]) option.classList.add('incorrect');
        }
        optionsContainer.appendChild(option);
    });
}

export function updateQuizScore(score) { document.getElementById('quizScore').textContent = score; }

export function showExplanation(isCorrect, answerText) {
    const explanationBox = document.getElementById('explanationBox');
    const explanationText = document.getElementById('explanationText');
    const question = window.activeQuiz.questions[window.activeQuiz.currentQuestionIndex];
    let explanationHtml;
    if (isCorrect) explanationHtml = `<strong style="color: #4CAF50;">Richtig! ✓</strong><br>${question.explanation || ''}`;
    else explanationHtml = `<strong style="color: #f44336;">Falsch ✗</strong><br>Die richtige Antwort wäre: <strong>${answerText}</strong>.<br><br>${question.explanation || ''}`;
    explanationText.innerHTML = explanationHtml.replace(/`([^`]+)`/g, '<code>$1</code>');
    explanationBox.classList.add('show');
}

export function showScreen(screenId) {
    document.querySelectorAll('.screen, .learning-path').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) screen.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.screen === screenId);
    });
}

export function openQuizModal() { document.getElementById('quizModal').classList.add('active'); }
export function closeQuizModal() { document.getElementById('quizModal').classList.remove('active'); window.activeQuiz = {}; }

export function showResultsModal(results) {
    let emoji = '📚', title = 'Quiz beendet';
    const percentage = (results.total > 0) ? (results.score / results.total) * 100 : 0;
    if (percentage >= 90) { emoji = '🌟'; title = 'Perfekt!'; }
    else if (percentage >= 70) { emoji = '😊'; title = 'Sehr gut!'; }
    else if (percentage >= 50) { emoji = '💪'; title = 'Geschafft!'; }
    else { emoji = '🤔'; title = 'Versuch es nochmal!'; }
    document.getElementById('resultEmoji').textContent = emoji;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('finalScore').textContent = `${results.score}/${results.total}`;
    document.getElementById('coinsEarned').textContent = `+${results.coins}`;
    document.getElementById('starsEarned').textContent = `+${results.stars}`;
    document.getElementById('xpEarned').textContent = `+${results.xp}`;
    document.getElementById('resultsModal').classList.add('active');
}

export function closeResultsModal() { document.getElementById('resultsModal').classList.remove('active'); }

export function backToMap(user) {
    closeResultsModal();
    closeQuizModal();
    renderLearningPath(user);
    showScreen('mapScreen');
}

export function showNotification(message) {
    let existing = document.querySelector('.notification-popup');
    if (existing) existing.remove();
    const notification = document.createElement('div');
    notification.className = 'notification-popup';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.3s forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

export function renderProfile(user) {
    if (!user) return;
    const profileContainer = document.getElementById('profileScreen');
    const level = Math.floor((user.xp || 0) / 500) + 1;
    const xpForNextLevel = 500 * level;
    const currentLevelBaseXP = 500 * (level - 1);
    const currentLevelXP = (user.xp || 0) - currentLevelBaseXP;
    const xpPercentage = (currentLevelXP / 500) * 100;
    profileContainer.innerHTML = `
        <div class="profile-card">
            <div class="profile-avatar-wrapper">
                <img src="https://i.pravatar.cc/150?u=${user.email}" alt="User Avatar" class="profile-avatar">
            </div>
            <div class="profile-name">${user.username}</div>
            <div class="profile-level">Level ${level}</div>
            <div class="xp-bar-container">
                <div class="xp-label">XP: ${user.xp || 0} / ${xpForNextLevel}</div>
                <div class="xp-bar">
                    <div class="xp-bar-fill" style="width: ${xpPercentage}%;"></div>
                </div>
            </div>
        </div>
        <h3>Statistiken</h3>
        <p>Erledigte Bausteine: ${user.lernfortschritt.size}</p>
        <p>Edelsteine: ${user.gems || 0}</p>
    `;
}

export function renderShop() {
    const shopContainer = document.getElementById('shopScreen');
    shopContainer.innerHTML = '<h2>Shop</h2>';
    const shopGrid = document.createElement('div');
    shopGrid.className = 'shop-grid';
    (window.shopItems || []).forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'shop-item';
        itemDiv.innerHTML = `
            <div class="shop-item-image-wrapper">
                 <div style="font-size: 48px;">${item.priceCoins > 200 ? '🖼️' : '⚡️'}</div>
            </div>
            <div class="shop-item-name">${item.name}</div>
            <div class="shop-item-desc">${item.description}</div>
            <button class="shop-item-buy-button">
                <span class="coin-icon">🪙</span> ${item.priceCoins}
            </button>
        `;
        shopGrid.appendChild(itemDiv);
    });
    shopContainer.appendChild(shopGrid);
}