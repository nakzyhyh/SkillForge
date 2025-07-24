/**
 * =====================================================================================
 * Szenario Service (szenario.service.js) - OPTIMIERTE VERSION
 * =====================================================================================
 * In dieser Version sind die Vorschläge des Nutzers umgesetzt:
 * 1. Ein Punktesystem, das Fehler verzeiht und differenzierte Bewertungen ermöglicht.
 * 2. Eine Struktur für detaillierteres, "menschlicheres" Feedback.
 * =====================================================================================
 */

// Annahme: Modelle und andere Services werden hier importiert.
// const Szenario = require('../models/szenario.model.js');
// const User = require('../models/user.model.js');
// import { updateLernfortschritt } from './lernlogik.service.js';

/**
 * Initialisiert oder setzt ein Szenario für einen bestimmten Nutzer fort.
 * @param {object} user - Das User-Objekt.
 * @param {object} szenario - Das Szenario-Objekt aus der Datenbank.
 * @returns {object} - Der initiale Zustand des Szenarios für den Nutzer.
 */
export function starteSzenario(user, szenario) {
    console.log(`Szenario "${szenario.titel}" wird für Nutzer ${user.username} gestartet.`);

    let fortschritt = user.szenarioFortschritt.get(szenario.szenarioId);
    if (!fortschritt) {
        fortschritt = {
            status: 'in_arbeit',
            aktuellePhaseIndex: 0,
            aktuelleAufgabeIndex: 0,
            antworten: {},
            // NEU: Hinzufügen eines Gesamt-Scores für das Szenario
            gesamtScore: 0
        };
        user.szenarioFortschritt.set(szenario.szenarioId, fortschritt);
    }

    return {
        user: user,
        szenario: szenario,
        fortschritt: fortschritt
    };
}

/**
 * Gibt die aktuell zu bearbeitende Aufgabe für den Nutzer zurück.
 * @param {object} szenarioState - Der von starteSzenario zurückgegebene Zustand.
 * @returns {object|null} - Die aktuelle Aufgabe oder null, wenn das Szenario beendet ist.
 */
export function getAktuelleAufgabe(szenarioState) {
    const { szenario, fortschritt } = szenarioState;
    const { aktuellePhaseIndex, aktuelleAufgabeIndex } = fortschritt;

    if (szenario.phasen[aktuellePhaseIndex] && szenario.phasen[aktuellePhaseIndex].aufgaben[aktuelleAufgabeIndex]) {
        return szenario.phasen[aktuellePhaseIndex].aufgaben[aktuelleAufgabeIndex];
    }
    
    return null; // Szenario ist zu Ende
}

/**
 * Verarbeitet die Antwort des Nutzers auf eine Aufgabe und gibt detailliertes Feedback.
 * @param {object} szenarioState - Der aktuelle Zustand des Szenarios.
 * @param {any} nutzerAntwort - Die vom Nutzer gegebene Antwort.
 * @returns {object} - Ein Ergebnisobjekt mit Feedback, Punkten und Wissenslücken.
 */
export function verarbeiteAntwort(szenarioState, nutzerAntwort) {
    const { user, szenario, fortschritt } = szenarioState;
    const aufgabe = getAktuelleAufgabe(szenarioState);

    if (!aufgabe) {
        return { feedback: "Szenario bereits beendet.", punkte: 0, wissensluecken: [] };
    }

    fortschritt.antworten[aufgabe.aufgabeId] = nutzerAntwort;

    // --- ANGEPASST: Bewertungslogik mit Punktesystem ---
    // Wir nehmen an, das `aufgabe.inhalt` jetzt eine Struktur wie folgt hat:
    // inhalt: {
    //   optionen: [...],
    //   bewertung: [ { antwortIndex: 0, punkte: 10, feedback: "Perfekt!" }, { antwortIndex: 1, punkte: 5, feedback: "Guter Ansatz, aber bedenke..." } ]
    // }
    const bewertungRegel = aufgabe.inhalt.bewertung.find(r => r.antwortIndex === nutzerAntwort);

    let punkte = 0;
    let feedbackText = "Deine Antwort wurde verarbeitet.";
    let wissensluecken = [];

    if (bewertungRegel) {
        punkte = bewertungRegel.punkte || 0;
        feedbackText = bewertungRegel.feedback; // Das detaillierte, "menschliche" Feedback
    } else {
        // Standard-Feedback, falls keine spezifische Regel passt
        punkte = 0;
        feedbackText = "Das ist leider nicht der optimale Weg. Lass uns das mal genauer ansehen.";
    }

    fortschritt.gesamtScore += punkte;

    // Nur bei deutlich falschen Antworten (z.B. 0 Punkte) eine Wissenslücke markieren
    if (punkte <= 0) {
        wissensluecken = aufgabe.relevanteWissensbausteine;
        // Zukünftige Integration mit dem LernlogikService
        /*
        for (const bausteinId of wissensluecken) {
            updateLernfortschritt(user, bausteinId, false);
        }
        */
    }

    // Nächste Aufgabe vorbereiten
    fortschritt.aktuelleAufgabeIndex++;
    if (fortschritt.aktuelleAufgabeIndex >= szenario.phasen[fortschritt.aktuellePhaseIndex].aufgaben.length) {
        fortschritt.aktuelleAufgabeIndex = 0;
        fortschritt.aktuellePhaseIndex++;
    }

    // Prüfen, ob das ganze Szenario nun beendet ist
    const istSzenarioBeendet = fortschritt.aktuellePhaseIndex >= szenario.phasen.length;
    if (istSzenarioBeendet) {
        fortschritt.status = 'abgeschlossen';
        fortschritt.bestScore = Math.max(fortschritt.bestScore || 0, fortschritt.gesamtScore);
        feedbackText = `Szenario abgeschlossen! Du hast ${fortschritt.gesamtScore} Punkte erreicht.`;
        // Hier würden Belohnungen (XP, Coins) vergeben, ggf. abhängig vom Score
        // user.xp += szenario.belohnungen.xp * (fortschritt.gesamtScore / maxMoeglicherScore);
    }
    
    user.szenarioFortschritt.set(szenario.szenarioId, fortschritt);
    // await user.save();

    return {
        feedback: feedbackText,
        punkteErreicht: punkte,
        neuerGesamtScore: fortschritt.gesamtScore,
        wissensluecken: wissensluecken,
        istSzenarioBeendet: istSzenarioBeendet
    };
}