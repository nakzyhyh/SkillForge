/**
 * =====================================================================================
 * Lernlogik Service (lernlogik.service.js) - FINALE VERSION
 * =====================================================================================
 * KORREKTUR: Die Funktion `getNaechstenWissensbaustein` wird erweitert. Sie behandelt
 * jetzt den Status 'wiederholen' mit der allerhöchsten Priorität, noch vor
 * geplanten Wiederholungen (Spaced Repetition) und neuen Themen.
 * Die Funktion `updateLernfortschritt` wurde erweitert, um Sterne zu speichern.
 * =====================================================================================
 */

const SPACED_REPETITION_INTERVALS_DAYS = [1, 2, 4, 8, 16, 32, 64];

function _istFreigeschaltet(wissensbaustein, lernfortschritt) {
    if (!wissensbaustein.dependencies || wissensbaustein.dependencies.length === 0) {
        return true;
    }
    return wissensbaustein.dependencies.every(depId => {
        const fortschritt = lernfortschritt.get(depId);
        return fortschritt && (fortschritt.status === 'gelernt' || fortschritt.status === 'gemeistert');
    });
}

export function getNaechstenWissensbaustein(user, alleWissensbausteine) {
    const lernfortschritt = user.lernfortschritt;
    const heute = new Date();

    // NEU: Priorität 0: Themen finden, die sofort wiederholt werden müssen.
    const zuWiederholen = alleWissensbausteine.find(baustein => {
        const fortschritt = lernfortschritt.get(baustein.wissensbausteinId);
        return fortschritt && fortschritt.status === 'wiederholen';
    });
    if (zuWiederholen) {
        console.log(`Sofortige Wiederholung erforderlich: ${zuWiederholen.titel}`);
        return { ...zuWiederholen, typ: 'wiederholung' };
    }

    // Priorität 1: Fällige Spaced-Repetition-Wiederholungen finden.
    const faelligeWiederholung = alleWissensbausteine.find(baustein => {
        const fortschritt = lernfortschritt.get(baustein.wissensbausteinId);
        return fortschritt && fortschritt.status === 'gelernt' && fortschritt.nextReviewDate && new Date(fortschritt.nextReviewDate) <= heute;
    });
    if (faelligeWiederholung) {
        console.log(`Geplante Wiederholung fällig: ${faelligeWiederholung.titel}`);
        return { ...faelligeWiederholung, typ: 'wiederholung' };
    }

    // Priorität 2: Neue, freigeschaltete Wissensbausteine finden.
    const verfuegbareNeueBausteine = alleWissensbausteine.filter(baustein => {
        const fortschritt = lernfortschritt.get(baustein.wissensbausteinId);
        const istGelerntOderGemeistert = fortschritt && (fortschritt.status === 'gelernt' || fortschritt.status === 'gemeistert');
        return !istGelerntOderGemeistert && _istFreigeschaltet(baustein, lernfortschritt);
    });

    if (verfuegbareNeueBausteine.length === 0) {
        console.log("Keine neuen Bausteine verfügbar. Alles gelernt oder auf Abhängigkeiten wird gewartet.");
        return null;
    }

    verfuegbareNeueBausteine.sort((a, b) => a.difficulty - b.difficulty);
    const naechsterBaustein = verfuegbareNeueBausteine[0];
    console.log(`Nächster neuer Baustein: ${naechsterBaustein.titel}`);
    
    return { ...naechsterBaustein, typ: 'neu' };
}

/**
 * =====================================================================================
 * KORRIGIERTE FUNKTION: updateLernfortschritt
 * =====================================================================================
 * Behobene Probleme:
 * 1. Die Funktionssignatur akzeptiert jetzt einen `stars`-Parameter.
 * 2. Speichert die erreichte Sternzahl im Fortschrittsobjekt des Nutzers.
 * 3. Stellt sicher, dass immer nur die HÖCHSTE erreichte Sternzahl gespeichert bleibt.
 * =====================================================================================
 */
export function updateLernfortschritt(user, wissensbausteinId, warErfolgreich, stars = 0) {
    let fortschritt = user.lernfortschritt.get(wissensbausteinId);
    if (!fortschritt) {
        // Initialisiert das Fortschrittsobjekt, falls es nicht existiert
        fortschritt = { status: 'begonnen', masteryScore: 0, reviewLevel: 0, stars: 0 };
    }
    
    fortschritt.lastReviewed = new Date();

    if (warErfolgreich) {
        fortschritt.status = 'gelernt';
        fortschritt.masteryScore = Math.min(1, (fortschritt.masteryScore || 0) + 0.25);
        
        // NEU: Speichert die beste erreichte Sternzahl
        fortschritt.stars = Math.max(fortschritt.stars || 0, stars);
        
        const currentReviewLevel = fortschritt.reviewLevel || 0;
        const intervalDays = SPACED_REPETITION_INTERVALS_DAYS[currentReviewLevel];
        const nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + intervalDays);
        
        fortschritt.nextReviewDate = nextReviewDate;
        fortschritt.reviewLevel = Math.min(currentReviewLevel + 1, SPACED_REPETITION_INTERVALS_DAYS.length - 1);
        
    } else {
        fortschritt.status = 'wiederholen';
        fortschritt.masteryScore = Math.max(0, (fortschritt.masteryScore || 0) - 0.2);
        fortschritt.reviewLevel = Math.max(0, (fortschritt.reviewLevel || 0) - 1);
        fortschritt.nextReviewDate = null;
        // Bei einem nicht erfolgreichen Versuch werden die Sterne nicht zurückgesetzt,
        // damit der beste Versuch sichtbar bleibt.
    }

    user.lernfortschritt.set(wissensbausteinId, fortschritt);
    console.log(`Fortschritt für ${wissensbausteinId} aktualisiert:`, fortschritt);
}

export function erstelleEinstufungstest(alleWissensbausteine, anzahlFragen = 20) {
    console.log(`Erstelle Einstufungstest mit ${anzahlFragen} Fragen...`);
    const alleFragen = alleWissensbausteine.flatMap(b => b.inhalte.filter(i => i.type === 'quiz'));
    return alleFragen.slice(0, anzahlFragen); 
}