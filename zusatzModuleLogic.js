'use strict';

import * as ui from './uiLogic.js';

function checkJustificationByKeywords(text, keywordConfig) {
    if (!text || !keywordConfig || !keywordConfig.groups) return false;
    const lowerCaseText = text.toLowerCase();
    let score = 0;
    keywordConfig.groups.forEach(group => {
        if (group.keywords.some(k => lowerCaseText.includes(k.toLowerCase()))) {
            score += group.points;
        }
    });
    return score >= keywordConfig.requiredScore;
}

export function checkScenarioChoiceJustified() {
    const modul = ui.getCurrentZusatzModul();
    const feedbackBox = document.getElementById('interactive_feedback');
    const choiceContainer = document.getElementById('choiceOptions');
    const selectedOption = choiceContainer.querySelector('.choice-option.selected');
    const justificationText = document.getElementById('justificationText')?.value || "";

    if (!selectedOption) {
        feedbackBox.className = 'feedback-box incorrect';
        feedbackBox.innerHTML = 'Bitte triff zuerst eine Auswahl.';
        feedbackBox.style.display = 'block';
        return;
    }

    const selectedIndex = parseInt(selectedOption.dataset.index, 10);
    const isChoiceCorrect = selectedIndex === modul.correctOptionIndex;
    const isJustificationCorrect = modul.justificationKeywords ? checkJustificationByKeywords(justificationText, modul.justificationKeywords) : true;

    let feedbackHtml = '';
    if (isChoiceCorrect) {
        selectedOption.classList.add('correct');
        feedbackHtml += `<strong>Auswahl korrekt!</strong> ✅<br>`;
    } else {
        selectedOption.classList.add('incorrect');
        const correctOptionElement = choiceContainer.querySelector(`[data-index="${modul.correctOptionIndex}"]`);
        if(correctOptionElement) correctOptionElement.classList.add('correct');
        feedbackHtml += `<strong>Auswahl leider falsch.</strong> ✗ Die korrekte Antwort war "${modul.options[modul.correctOptionIndex]}".<br>`;
    }

    if (modul.justificationPrompt) {
        if (isJustificationCorrect) {
            feedbackHtml += `<strong>Deine Begründung ist schlüssig und enthält die wesentlichen Punkte.</strong> 👍<br><br>`;
        } else {
            feedbackHtml += `<strong>Deine Begründung scheint unvollständig oder ungenau.</strong> 🧐<br><br>`;
        }
    }
    
    feedbackHtml += `<strong>Musterlösung / Wichtige Aspekte:</strong><br>${modul.explanation}`;
    feedbackBox.className = 'feedback-box ' + (isChoiceCorrect && isJustificationCorrect ? 'correct' : 'incorrect');
    feedbackBox.innerHTML = feedbackHtml;
    feedbackBox.style.display = 'block';

    document.getElementById('checkInteractiveBtn').style.display = 'none';
    choiceContainer.style.pointerEvents = 'none';
    const justificationTextArea = document.getElementById('justificationText');
    if(justificationTextArea) justificationTextArea.readOnly = true;
}

export function checkInteractiveCalculation() {
    const modul = ui.getCurrentZusatzModul();
    const feedbackBox = document.getElementById('interactive_calc_feedback');
    let allCorrect = true;

    modul.inputs.forEach(input => {
        if (!input.readonly) {
            const inputElement = document.getElementById(`calc_${input.id}`);
            const userValue = parseFloat(inputElement.value);
            const correctValue = modul.solution[input.id];
            if (userValue === correctValue) {
                inputElement.classList.add('correct');
            } else {
                inputElement.classList.add('incorrect');
                allCorrect = false;
            }
        }
    });

    const finalSolutionInput = document.getElementById('calc_final_solution');
    if (finalSolutionInput) {
        const finalUserValue = parseFloat(finalSolutionInput.value);
        const finalCorrectValue = modul.final_solution;
        if (finalUserValue === finalCorrectValue) {
            finalSolutionInput.classList.add('correct');
        } else {
            finalSolutionInput.classList.add('incorrect');
            allCorrect = false;
        }
    }

    if (allCorrect) {
        feedbackBox.className = 'feedback-box correct';
        feedbackBox.innerHTML = 'Perfekt! Alle Werte wurden korrekt extrahiert und das Endergebnis stimmt. ✅';
    } else {
        feedbackBox.className = 'feedback-box incorrect';
        let feedbackHtml = 'Einige Eingaben sind nicht korrekt. ✗<br><br><strong>Detaillierter Rechenweg:</strong><ul class="explanation-list">';
        feedbackHtml += modul.explanation.map(step => `<li>${step}</li>`).join('');
        feedbackHtml += '</ul>';
        feedbackBox.innerHTML = feedbackHtml;
    }

    feedbackBox.style.display = 'block';
    document.getElementById('checkInteractiveCalcBtn').style.display = 'none';
}

export function checkCodeTraceResult() {
    const modul = ui.getCurrentZusatzModul();
    const feedbackBox = document.getElementById('code_trace_feedback');
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
            feedbackHtml += `<li><b>${res.label}:</b> Deine Antwort '${userValue || "N/A"}' ist falsch. ✗ Die richtige Antwort ist <b>${correctValue}</b>.<br><span class="explanation-detail">${explanation}</span></li>`;
        }
    });
    
    feedbackHtml += '</ul>';
    feedbackBox.innerHTML = feedbackHtml;
    feedbackBox.style.display = 'block';
    feedbackBox.className = 'feedback-box ' + (allCorrect ? 'correct' : 'incorrect');
    document.getElementById('checkCodeTraceBtn').style.display = 'none';
}

export function checkDebuggerSolution() {
    const modul = ui.getCurrentZusatzModul();
    const callIndex = parseInt(document.getElementById('debuggerCallSelector').value, 10);
    const correctSolution = modul.trace[callIndex].solution;
    const userInput = document.getElementById('debuggerSolutionInput').value.trim();
    const feedbackBox = document.getElementById('debugger_feedback');

    const isCorrect = userInput.toLowerCase().replace(/\s+/g, '') === correctSolution.toLowerCase().replace(/\s+/g, '');

    feedbackBox.className = 'feedback-box ' + (isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
        feedbackBox.innerHTML = `<strong>Korrekt!</strong> Der Rückgabewert ist tatsächlich "${correctSolution}". ✅`;
    } else {
        feedbackBox.innerHTML = `<strong>Leider falsch.</strong> Deine Antwort war "${userInput}", die korrekte Antwort lautet "${correctSolution}".`;
    }
    feedbackBox.style.display = 'block';
    document.getElementById('checkDebuggerSolutionBtn').style.display = 'none';
}

function calculateSubnet(ip, cidr) { try { const ipParts = ip.split('.').map(Number); if (ipParts.length !== 4 || ipParts.some(isNaN)) throw new Error("Invalid IP"); const subnetMaskLong = (0xFFFFFFFF << (32 - cidr)) >>> 0; const ipLong = ipParts.reduce((acc, part) => (acc << 8) + part, 0); const networkAddressLong = ipLong & subnetMaskLong; const broadcastAddressLong = networkAddressLong | (~subnetMaskLong >>> 0); const longToIp = (long) => [(long >>> 24) & 255, (long >>> 16) & 255, (long >>> 8) & 255, long & 255].join('.'); return { networkId: longToIp(networkAddressLong), broadcast: longToIp(broadcastAddressLong), firstHost: longToIp(networkAddressLong + 1), lastHost: longToIp(broadcastAddressLong - 1), hostCount: (cidr > 30) ? 0 : Math.pow(2, 32 - cidr) - 2 }; } catch (e) { console.error("Fehler bei der Subnetzberechnung:", e); return null; } }
export function checkSubnetAnswers() { const aufgabeContainer = document.getElementById('subnet-aufgabe-container'); if (!aufgabeContainer) return; const aufgabeIndex = parseInt(aufgabeContainer.dataset.aufgabeIndex, 10); const modul = ui.getCurrentZusatzModul(); if (!modul || !modul.aufgaben || !modul.aufgaben[aufgabeIndex]) { console.error("Subnetz-Aufgabe konnte nicht gefunden werden."); return; } const aufgabe = modul.aufgaben[aufgabeIndex]; const correctAnswers = calculateSubnet(aufgabe.ip, aufgabe.cidr); if (!correctAnswers) return; let allCorrect = true; const fields = ['networkId', 'broadcast', 'firstHost', 'lastHost', 'hostCount']; fields.forEach(key => { const fieldName = key.replace('Id', '').replace('Host', 'Host').replace('Count', 's'); const inputElement = document.getElementById(`subnet_${fieldName}`); const userValue = inputElement.value.trim(); if (userValue == correctAnswers[key]) { inputElement.classList.remove('incorrect'); inputElement.classList.add('correct'); } else { inputElement.classList.remove('correct'); inputElement.classList.add('incorrect'); allCorrect = false; } }); ui.showSubnetSolution(allCorrect, correctAnswers); }
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
    document.getElementById('checkFormFillerBtn').style.display = 'none';
}
export function checkDecisionMatrix() { const modul = ui.getCurrentZusatzModul(); const container = document.getElementById('zusatzModulContent'); if (!modul || !container) return; const selects = container.querySelectorAll('select'); const matrix  = Array.from({length: modul.criteria.length}, () => Array(modul.devices.length).fill(null)); let allFieldsFilled = true; selects.forEach(sel => { const r = parseInt(sel.dataset.row, 10); const c = parseInt(sel.dataset.col, 10); if (sel.value) { matrix[r][c] = parseInt(sel.value, 10); } else { allFieldsFilled = false; } }); const fb = container.querySelector('#dm_feedback'); if (!allFieldsFilled) { fb.className = 'feedback-box incorrect'; fb.textContent = 'Bitte fülle alle Felder in der Tabelle aus, um zu prüfen.'; fb.style.display = 'block'; return; } const sums = Array(modul.devices.length).fill(0); matrix.forEach(row => { row.forEach((rank, cIdx) => { sums[cIdx] += rank; }); }); sums.forEach((s, i) => { const sumElement = container.querySelector(`#dm_sum_${i}`); if(sumElement) sumElement.textContent = s; }); const bestIdx = sums.indexOf(Math.max(...sums)); const isCorrect = bestIdx === modul.bestDevice; fb.className = 'feedback-box ' + (isCorrect ? 'correct' : 'incorrect'); let feedbackHtml = isCorrect ? `Richtig! Mit einer Summe von <strong>${sums[bestIdx]}</strong> Punkten ist Gerät ${bestIdx + 1} die optimale Wahl. ✅` : `Leider nicht ganz. Laut korrekter Matrix wäre Gerät ${modul.bestDevice + 1} die beste Wahl.`; if (modul.explanation) { feedbackHtml += `<br><br><span class="explanation-detail">${modul.explanation}</span>`; } fb.innerHTML = feedbackHtml; fb.style.display = 'block'; const checkButton = container.querySelector('#dm_check_btn'); if (checkButton) checkButton.style.display = 'none'; }
/**
 * =====================================================================================
 * KORRIGIERTE FUNKTION: checkNetzplanAnswers (Version 3.0 - Definitiv)
 * =====================================================================================
 * Die Logik wurde komplett neu strukturiert, um die gemeldeten Fehler zu beheben.
 * 1.  Es wird ein Flag `isPerfect` verwendet, das nur `true` bleibt, wenn wirklich
 * jedes einzelne bearbeitbare Feld korrekt ausgefüllt wurde.
 * 2.  Ein zweites Flag `anythingEntered` prüft, ob der Nutzer überhaupt eine
 * Eingabe gemacht hat.
 * 3.  Die Kombination dieser beiden Flags verhindert zuverlässig, dass eine leere oder
 * teilweise falsche Eingabe als "Exzellent" bewertet wird.
 * 4.  Die visuelle Markierung (CSS-Klasse 'incorrect') wird nun konsequent auf alle
 * Felder angewendet, die entweder falsch oder leer sind.
 * =====================================================================================
 */
export function checkNetzplanAnswers() {
    const modul = ui.getCurrentZusatzModul();
    const feedbackBox = document.getElementById('netzplan_feedback');

    if (!modul || !modul.solution || !modul.nodes) {
        feedbackBox.innerHTML = 'Fehler: Lösungs- oder Knotendaten für das Modul nicht gefunden.';
        feedbackBox.className = 'feedback-box incorrect';
        feedbackBox.style.display = 'block';
        return;
    }

    const editableInputs = [];
    let isPerfect = true;
    let anythingEntered = false;

    // Schritt 1: Daten aller bearbeitbaren Felder sammeln und vor-auswerten.
    for (const node of modul.nodes) {
        ['faz', 'fez', 'saz', 'sez', 'gp', 'fp'].forEach(fieldType => {
            const key = `${node.id}_${fieldType}`;
            const inputElement = document.getElementById(key);
            if (inputElement && !inputElement.readOnly) {
                editableInputs.push(inputElement); // Liste aller zu prüfenden Felder

                const userValueStr = inputElement.value.trim();
                const correctValue = modul.solution[key];

                if (userValueStr !== '') {
                    anythingEntered = true;
                    const userValue = parseFloat(userValueStr);
                    if (userValue !== correctValue) {
                        isPerfect = false; // Ein einziger Fehler macht das Ergebnis unperfekt.
                        inputElement.dataset.correctness = "false";
                    } else {
                        inputElement.dataset.correctness = "true";
                    }
                } else {
                    isPerfect = false; // Ein leeres Feld macht das Ergebnis unperfekt.
                    inputElement.dataset.correctness = "empty";
                }
            }
        });
    }

    // Schritt 2: Feedback-Text basierend auf den Flags generieren.
    if (isPerfect) {
        feedbackBox.className = 'feedback-box correct';
        feedbackBox.innerHTML = `<strong>Exzellent!</strong> Alle Werte im Netzplan sind korrekt berechnet. ${modul.explanation.join(' ')} ✅`;
    } else if (!anythingEntered) {
        feedbackBox.className = 'feedback-box incorrect';
        feedbackBox.innerHTML = 'Bitte fülle die Felder aus, um eine Prüfung durchzuführen. Es wurde nichts eingegeben. ✗';
    } else {
        feedbackBox.className = 'feedback-box incorrect';
        feedbackBox.innerHTML = 'Einige Werte waren nicht korrekt oder fehlen. ✗ Die fehlerhaften Felder sind rot markiert. Fahre mit der Maus über die Felder für einen Tipp.';
    }

    // Schritt 3: Visuelles Feedback (Klassen und Tooltips) auf alle Felder anwenden.
    editableInputs.forEach(input => {
        input.classList.remove('correct', 'incorrect');
        const correctness = input.dataset.correctness;
        const correctValue = modul.solution[input.id];

        if (correctness === 'true') {
            input.classList.add('correct');
            input.title = 'Korrekt!';
        } else {
            input.classList.add('incorrect');
            if (correctness === 'empty') {
                input.title = `Dieses Feld ist leer. Der korrekte Wert wäre: ${correctValue}`;
            } else {
                input.title = `Dein Wert: ${input.value}. Richtig wäre: ${correctValue}`;
            }
        }
        input.readOnly = true; // Felder nach der Prüfung sperren.
    });
    
    feedbackBox.style.display = 'block';
    document.getElementById('checkNetzplanBtn').style.display = 'none';
}


function generateNetzplanError(node, fieldType, correctValue, modul) { 
    // Diese Hilfsfunktion ist für detaillierte Fehleranalysen nützlich,
    // wird aber in der aktuellen, vereinfachten Feedback-Logik nicht mehr direkt zur Anzeige genutzt.
    // Sie bleibt für eventuelle zukünftige Erweiterungen erhalten.
    const nodeName = `<b>Vorgang ${node.name} (${fieldType.toUpperCase()})</b>`; 
    const sol = modul.solution; 
    
    const processInfo = modul.processTable.find(p => p.name === node.name);
    if (!processInfo) {
        return `${nodeName}: Interner Fehler - Prozessinformationen nicht gefunden.`;
    }
    const predecessors = processInfo.predecessors; 
    
    switch (fieldType) { 
        case 'fez': return `${nodeName}: Der Früheste Endzeitpunkt ist <b>${correctValue}</b>. <br><i> Rechnung: FAZ + Dauer = ${sol[node.id+'_faz']} + ${node.duration} = ${correctValue}.</i>`; 
        case 'faz': 
            if (predecessors.length === 0) return `${nodeName}: Der Früheste Anfangszeitpunkt ist <b>0</b>, da dies ein Startknoten ist.`; 
            const predFEZ = predecessors.map(pName => sol[pName.toLowerCase() + '_fez']); 
            return `${nodeName}: Der FAZ ist <b>${correctValue}</b>. <br><i> Regel: Nimm den höchsten FEZ-Wert aller Vorgänger (${predecessors.join(', ')}). Das Maximum von [${predFEZ.join(', ')}] ist ${correctValue}.</i>`; 
        case 'saz': return `${nodeName}: Der Späteste Anfangszeitpunkt ist <b>${correctValue}</b>. <br><i> Rechnung: SEZ - Dauer = ${sol[node.id+'_sez']} - ${node.duration} = ${correctValue}.</i>`; 
        case 'sez': 
            const successors = modul.processTable.filter(p => p.predecessors.includes(node.name)); 
            if (successors.length === 0) return `${nodeName}: Der Späteste Endzeitpunkt ist <b>${correctValue}</b>, da dies ein Endknoten ist (identisch mit Gesamtprojektdauer).`; 
            const succSAZ = successors.map(s => sol[s.name.toLowerCase() + '_saz']); 
            return `${nodeName}: Der SEZ ist <b>${correctValue}</b>. <br><i> Regel: Nimm den niedrigsten SAZ-Wert aller Nachfolger (${successors.map(s=>s.name).join(', ')}). Das Minimum von [${succSAZ.join(', ')}] ist ${correctValue}.</i>`; 
        case 'gp': return `${nodeName}: Der Gesamtpuffer ist <b>${correctValue}</b>. <br><i> Rechnung: SAZ - FAZ = ${sol[node.id+'_saz']} - ${sol[node.id+'_faz']} = ${correctValue}.</i>`; 
        case 'fp': 
            const successorsFP = modul.processTable.filter(p => p.predecessors.includes(node.name)); 
            if (successorsFP.length === 0) return `${nodeName}: Der Freie Puffer ist <b>${correctValue}</b>, da der Knoten keine Nachfolger hat (GP = FP).`; 
            const succFAZ = successorsFP.map(s => sol[s.name.toLowerCase() + '_faz']); 
            return `${nodeName}: Der Freie Puffer ist <b>${correctValue}</b>. <br><i> Rechnung: min(FAZ aller Nachfolger) - eigener FEZ = min(${succFAZ.join(', ')}) - ${sol[node.id+'_fez']} = ${correctValue}.</i>`; 
        default: return `${nodeName}: Der korrekte Wert ist <b>${correctValue}</b>.`; 
    } 
}