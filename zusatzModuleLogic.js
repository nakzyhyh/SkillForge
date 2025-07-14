'use strict';

import * as ui from './uiLogic.js';

/**
 * Berechnet die Details für ein gegebenes IPv4-Subnetz.
 * @param {string} ip - Die IP-Adresse.
 * @param {number} cidr - Das CIDR-Präfix.
 * @returns {object|null} Ein Objekt mit allen Netzdetails oder null bei einem Fehler.
 */
function calculateSubnet(ip, cidr) {
    try {
        const ipParts = ip.split('.').map(Number);
        if (ipParts.length !== 4 || ipParts.some(isNaN)) throw new Error("Invalid IP");

        const subnetMaskLong = (0xFFFFFFFF << (32 - cidr)) >>> 0;
        const ipLong = ipParts.reduce((acc, part) => (acc << 8) + part, 0);

        const networkAddressLong = ipLong & subnetMaskLong;
        const broadcastAddressLong = networkAddressLong | (~subnetMaskLong >>> 0);

        const longToIp = (long) => [(long >>> 24) & 255, (long >>> 16) & 255, (long >>> 8) & 255, long & 255].join('.');

        return {
            networkId: longToIp(networkAddressLong),
            broadcast: longToIp(broadcastAddressLong),
            firstHost: longToIp(networkAddressLong + 1),
            lastHost: longToIp(broadcastAddressLong - 1),
            hostCount: (cidr > 30) ? 0 : Math.pow(2, 32 - cidr) - 2
        };
    } catch (e) {
        console.error("Fehler bei der Subnetzberechnung:", e);
        return null;
    }
}

/**
 * Überprüft die Eingaben des Subnetz-Rechners.
 */
export function checkSubnetAnswers() {
    const aufgabeContainer = document.getElementById('subnet-aufgabe-container');
    if (!aufgabeContainer) return;
    
    const aufgabeIndex = parseInt(aufgabeContainer.dataset.aufgabeIndex, 10);
    const modul = ui.getCurrentZusatzModul();
    
    if (!modul || !modul.aufgaben || !modul.aufgaben[aufgabeIndex]) {
        console.error("Subnetz-Aufgabe konnte nicht gefunden werden.");
        return;
    }
    const aufgabe = modul.aufgaben[aufgabeIndex];
    
    const correctAnswers = calculateSubnet(aufgabe.ip, aufgabe.cidr);
    if (!correctAnswers) return;

    let allCorrect = true;
    const fields = ['networkId', 'broadcast', 'firstHost', 'lastHost', 'hostCount'];
    
    fields.forEach(key => {
        const fieldName = key.replace('Id', '').replace('Host', 'Host').replace('Count', 's');
        const inputElement = document.getElementById(`subnet_${fieldName}`);
        const userValue = inputElement.value.trim();
        
        if (userValue == correctAnswers[key]) {
            inputElement.classList.remove('incorrect');
            inputElement.classList.add('correct');
        } else {
            inputElement.classList.remove('correct');
            inputElement.classList.add('incorrect');
            allCorrect = false;
        }
    });

    ui.showSubnetSolution(allCorrect, correctAnswers);
}

export function checkCalculationAnswer() {
    const modul = ui.getCurrentZusatzModul();
    const userInput = document.getElementById('calc_solution').value.trim();
    const feedbackBox = document.getElementById('calc_feedback');
    const inputElement = document.getElementById('calc_solution');

    if (userInput === '') {
        feedbackBox.className = 'feedback-box incorrect';
        feedbackBox.textContent = 'Bitte gib ein Ergebnis ein.';
        feedbackBox.style.display = 'block';
        return;
    }

    const isCorrect = (parseFloat(userInput) === modul.solution);
    
    inputElement.classList.toggle('correct', isCorrect);
    inputElement.classList.toggle('incorrect', !isCorrect);
    
    let feedbackHtml = '';
    if (isCorrect) {
        feedbackBox.className = 'feedback-box correct';
        feedbackHtml = `Perfekt, <strong>${modul.solution} €</strong> ist das richtige Ergebnis! ✅`;
    } else {
        feedbackBox.className = 'feedback-box incorrect';
        feedbackHtml = `Leider nicht ganz. Die korrekte Antwort lautet <strong>${modul.solution} €</strong>.<br><br><strong>Rechenweg:</strong><ul class="explanation-list">`;
        if (modul.explanation && modul.explanation.length > 0) {
            feedbackHtml += modul.explanation.map(step => `<li>${step}</li>`).join('');
        }
        feedbackHtml += '</ul>';
    }
    
    feedbackBox.innerHTML = feedbackHtml;
    feedbackBox.style.display = 'block';
    document.getElementById('checkCalculationBtn').style.display = 'none';
}

export function checkCodeResultAnswers() {
    const modul = ui.getCurrentZusatzModul();
    const feedbackBox = document.getElementById('code_feedback');
    let allCorrect = true;
    let feedbackHtml = '<strong>Ergebnis:</strong><ul class="explanation-list">';

    modul.results.forEach(res => {
        const inputElement = document.getElementById(`res_${res.id}`);
        const userValue = inputElement.value.trim();
        const correctValue = modul.solution[res.id];
        const isCorrect = userValue.toLowerCase().replace(/\s+/g, '') === correctValue.toLowerCase().replace(/\s+/g, '');

        inputElement.classList.toggle('correct', isCorrect);
        inputElement.classList.toggle('incorrect', !isCorrect);
        
        if (isCorrect) {
            feedbackHtml += `<li><b>${res.label}:</b> Deine Antwort '${userValue}' ist richtig! ✅</li>`;
        } else {
            allCorrect = false;
            const explanation = modul.explanation[res.id] || "Keine weitere Erklärung verfügbar.";
            feedbackHtml += `<li><b>${res.label}:</b> Deine Antwort '${userValue || "N/A"}' ist falsch. ✗<br><span class="explanation-detail">${explanation}</span></li>`;
        }
    });
    
    feedbackHtml += '</ul>';
    feedbackBox.innerHTML = feedbackHtml;
    feedbackBox.style.display = 'block';
    feedbackBox.className = 'feedback-box ' + (allCorrect ? 'correct' : 'incorrect');
    document.getElementById('checkCodeResultBtn').style.display = 'none';
}

export function checkFormFillerAnswers() {
    const modul = ui.getCurrentZusatzModul();
    const feedbackBox = document.getElementById('form_feedback');
    let allCorrect = true;

    for (const key in modul.solution) {
        const correctValue = modul.solution[key];
        const fieldDef = modul.fields.find(f => f.id === key);
        let inputElement, userValue;

        if (fieldDef.type === 'radio') {
            const radioInput = document.querySelector(`input[name="${key}"]:checked`);
            userValue = radioInput ? radioInput.value : '';
            inputElement = radioInput ? radioInput.closest('.radio-group') : document.querySelector(`.form-filler-row[data-id="${key}"]`);
        } else {
            inputElement = document.getElementById(`form_${key}`);
            userValue = inputElement.value.trim();
        }
        
        const isCorrect = (userValue.toLowerCase() === correctValue.toLowerCase());
        
        inputElement.classList.toggle('correct', isCorrect);
        inputElement.classList.toggle('incorrect', !isCorrect);
        if(!isCorrect) allCorrect = false;
    }

    let feedbackHtml = '';
    if(allCorrect) {
        feedbackBox.className = 'feedback-box correct';
        feedbackHtml = 'Perfekt! Alle Eingaben sind korrekt. ✅';
    } else {
        feedbackBox.className = 'feedback-box incorrect';
        feedbackHtml = 'Einige Eingaben sind nicht korrekt.<br><br><strong>Lösungsweg:</strong><ul class="explanation-list">';
        if (modul.explanation && modul.explanation.length > 0) {
            feedbackHtml += modul.explanation.map(step => `<li>${step}</li>`).join('');
        } else {
            feedbackHtml += '<li>Prüfe die rot markierten Felder.</li>';
        }
        feedbackHtml += '</ul>';
    }

    feedbackBox.innerHTML = feedbackHtml;
    feedbackBox.style.display = 'block';
    
    const checkButtonId = modul.typ === 'contextual_input' ? 'checkContextualInputBtn' : 'checkFormFillerBtn';
    document.getElementById(checkButtonId).style.display = 'none';
}

/**
 * Überprüft die Zuordnungen des OSI-Matchers.
 * KORRIGIERT: Zeigt bei falscher Antwort nun eine detaillierte Erklärung statt einer generischen Meldung.
 */
export function checkOsiMatches() {
    const modul = ui.getCurrentZusatzModul(); // Modul-Daten abrufen
    const solutionButton = document.querySelector('#zusatzModulContent .quiz-btn');
    if (solutionButton) {
        solutionButton.style.display = 'none';
    }
    
    const dropzones = document.querySelectorAll('.osi-dropzone');
    let allCorrect = true;
    
    dropzones.forEach(zone => {
        const correctLayer = zone.dataset.layer;
        const items = zone.querySelectorAll('.osi-item');
        
        items.forEach(item => {
            const isCorrect = item.dataset.correctLayer === correctLayer;
            item.classList.remove('correct', 'incorrect');
            item.classList.toggle('correct', isCorrect);
            item.classList.toggle('incorrect', !isCorrect);
            if (!isCorrect) allCorrect = false;
        });
    });

    const feedback = document.getElementById('osi-feedback');
    feedback.className = 'feedback-box ' + (allCorrect ? 'correct' : 'incorrect');
    
    let feedbackHtml = '';
    if (allCorrect) {
        feedbackHtml = 'Perfekt! Alle Begriffe wurden korrekt zugeordnet. ✅';
    } else {
        feedbackHtml = `Einige Begriffe sind falsch zugeordnet. ✗<br><br>`;
        if (modul.explanation) {
            feedbackHtml += `<strong>Zur Erinnerung:</strong> ${modul.explanation}`;
        }
    }
    feedback.innerHTML = feedbackHtml;
    feedback.style.display = 'block';
}

export function checkDecisionMatrix() {
    const modul = ui.getCurrentZusatzModul();
    const container = document.getElementById('zusatzModulContent');
    if (!modul || !container) return;

    const selects = container.querySelectorAll('select');
    const matrix  = Array.from({length: modul.criteria.length}, () => Array(modul.devices.length).fill(null));
    
    let allFieldsFilled = true;
    selects.forEach(sel => {
        const r = parseInt(sel.dataset.row, 10);
        const c = parseInt(sel.dataset.col, 10);
        if (sel.value) {
            matrix[r][c] = parseInt(sel.value, 10);
        } else {
            allFieldsFilled = false;
        }
    });

    const fb = container.querySelector('#dm_feedback');
    if (!allFieldsFilled) {
        fb.className = 'feedback-box incorrect';
        fb.textContent = 'Bitte fülle alle Felder in der Tabelle aus, um zu prüfen.';
        fb.style.display = 'block';
        return;
    }

    const sums = Array(modul.devices.length).fill(0);
    matrix.forEach(row => {
        row.forEach((rank, cIdx) => {
            sums[cIdx] += rank;
        });
    });

    sums.forEach((s, i) => { 
        const sumElement = container.querySelector(`#dm_sum_${i}`);
        if(sumElement) sumElement.textContent = s;
    });

    const bestIdx = sums.indexOf(Math.max(...sums));
    const isCorrect = bestIdx === modul.bestDevice;
    
    fb.className = 'feedback-box ' + (isCorrect ? 'correct' : 'incorrect');
    let feedbackHtml = isCorrect 
        ? `Richtig! Mit einer Summe von <strong>${sums[bestIdx]}</strong> Punkten ist Gerät ${bestIdx + 1} die optimale Wahl. ✅`
        : `Leider nicht ganz. Laut korrekter Matrix wäre Gerät ${modul.bestDevice + 1} die beste Wahl.`;
    
    if (modul.explanation) {
        feedbackHtml += `<br><br><span class="explanation-detail">${modul.explanation}</span>`;
    }

    fb.innerHTML = feedbackHtml;
    fb.style.display = 'block';

    const checkButton = container.querySelector('#dm_check_btn');
    if (checkButton) checkButton.style.display = 'none';
}
// NEU: Logik zur Überprüfung der Netzplan-Antworten
export function checkNetzplanAnswers() {
    const modul = ui.getCurrentZusatzModul();
    const feedbackBox = document.getElementById('netzplan_feedback');
    if (!modul || !modul.solution) {
        feedbackBox.innerHTML = 'Fehler: Lösungsdaten für das Modul nicht gefunden.';
        feedbackBox.className = 'feedback-box incorrect';
        feedbackBox.style.display = 'block';
        return;
    }

    let allCorrect = true;

    // Iteriere durch die Lösungs-Werte und vergleiche sie mit den User-Eingaben
    for (const key in modul.solution) {
        const inputElement = document.getElementById(key);
        if (inputElement) {
            // Konvertiere beide Werte zu Zahlen für einen robusten Vergleich
            const userValue = parseFloat(inputElement.value);
            const correctValue = parseFloat(modul.solution[key]);

            // Setze Klassen für visuelles Feedback direkt am Input-Feld
            if (!isNaN(userValue) && userValue === correctValue) {
                inputElement.classList.remove('incorrect');
                inputElement.classList.add('correct');
            } else {
                inputElement.classList.remove('correct');
                inputElement.classList.add('incorrect');
                allCorrect = false;
            }
        }
    }

    // Zeige das finale Feedback an
    if (allCorrect) {
        feedbackBox.className = 'feedback-box correct';
        feedbackBox.innerHTML = `<strong>Exzellent!</strong> Alle Werte im Netzplan sind korrekt berechnet. Der kritische Pfad ist A-B-D-E-I-J mit einer Gesamtdauer von 157 Stunden. ✅`;
    } else {
        feedbackBox.className = 'feedback-box incorrect';
        let feedbackHtml = 'Einige Werte sind noch nicht korrekt. ✗ Überprüfe die rot markierten Felder.<br><br><strong>Detaillierter Lösungsweg:</strong>';
        if (modul.explanation && Array.isArray(modul.explanation)) {
             feedbackHtml += `<ul class="explanation-list">${modul.explanation.map(step => `<li>${step}</li>`).join('')}</ul>`;
        }
        feedbackBox.innerHTML = feedbackHtml;
    }

    feedbackBox.style.display = 'block';
    document.getElementById('checkNetzplanBtn').style.display = 'none'; // Button ausblenden
}