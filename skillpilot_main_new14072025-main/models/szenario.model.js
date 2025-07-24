/**
 * =====================================================================================
 * Szenario Modell (szenario.model.js)
 * =====================================================================================
 * Definition des Mongoose-Schemas für ein "Lernszenario".
 *
 * Ein Szenario ist eine komplexe, mehrstufige Fallstudie, die den Nutzer in die
 * Rolle eines IT-Beraters versetzt. Es dient dazu, das in den Wissensbausteinen
 * gelernte theoretische Wissen praktisch anzuwenden.
 *
 * Warum diese Datei jetzt?
 * ------------------------
 * Dieses Modell definiert die Struktur unserer wichtigsten didaktischen Neuerung.
 * Es legt fest, wie wir realistische Geschäftsprozesse (Planung, Dokumentation,
 * Kommunikation) in der App abbilden können. Es ist der zweite Grundpfeiler
 * neben dem Wissensbaustein-Modell.
 * =====================================================================================
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definiert die Struktur für eine einzelne Aufgabe innerhalb eines Szenarios.
// Jede Aufgabe stellt eine Interaktion dar, die der Nutzer durchführen muss.
const AufgabenSchema = new Schema({
    aufgabeId: {
        type: String,
        required: true,
        comment: 'Eindeutiger Identifier für die Aufgabe innerhalb des Szenarios (z.B. "phase1_dialog1").'
    },
    typ: {
        type: String,
        required: true,
        enum: ['dialogue', 'document_analysis', 'decision_point', 'text_input'],
        comment: 'Art der Interaktion (z.B. simulierter Dialog, Analyse eines Dokuments).'
    },
    beschreibung: {
        type: String,
        required: true,
        comment: 'Die Anweisung an den Nutzer, was zu tun ist (z.B. "Lies die E-Mail des Kunden und identifiziere das Hauptproblem.").'
    },
    // Flexibles Feld für den Inhalt der Aufgabe, abhängig vom Typ.
    // Bei 'dialogue': Ein Objekt mit Gesprächsverlauf.
    // Bei 'document_analysis': Der Text des Dokuments und die zu findenden Informationen.
    // Bei 'decision_point': Die zur Wahl stehenden Optionen.
    inhalt: {
        type: Schema.Types.Mixed,
        required: true
    },
    // Verknüpfung zu den Wissensbausteinen, die für die Lösung dieser Aufgabe relevant sind.
    // Dies ist entscheidend für die Verknüpfung von Praxis und Theorie.
    relevanteWissensbausteine: {
        type: [String], // Array von wissensbausteinId's
        default: []
    }
}, { _id: false });

// Definiert eine Phase innerhalb eines Szenarios (z.B. "Analyse", "Planung", "Umsetzung").
const PhasenSchema = new Schema({
    phaseId: {
        type: String,
        required: true,
        comment: 'Eindeutiger Identifier für die Phase (z.B. "phase_1_analyse").'
    },
    titel: {
        type: String,
        required: true,
        comment: 'Titel der Phase.'
    },
    aufgaben: {
        type: [AufgabenSchema],
        required: true
    }
}, { _id: false });


// Hauptschema für das Lernszenario
const SzenarioSchema = new Schema({
    // Eindeutiger, menschenlesbarer Identifier.
    // Beispiel: "SZENARIO_LF4_Sicherheitskonzept_KMU"
    szenarioId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    // Titel des Szenarios, der in der App angezeigt wird.
    titel: {
        type: String,
        required: true,
        trim: true
    },

    // Eine übergeordnete Beschreibung, die den Geschäftskontext und das Lernziel erklärt.
    beschreibung: {
        type: String,
        required: true,
        comment: 'Einführende Beschreibung des Szenarios und des Lernziels.'
    },

    // Referenz zum IHK-Lernfeld, das hauptsächlich behandelt wird.
    lernfeld: {
        type: Number,
        required: true
    },

    // Die einzelnen Phasen, die das Szenario strukturieren.
    phasen: {
        type: [PhasenSchema],
        required: true
    },

    // Welche Wissensbausteine werden als Voraussetzung für das gesamte Szenario empfohlen?
    voraussetzungen: {
        type: [String], // Array von wissensbausteinId's
        default: [],
        comment: 'Liste der IDs von Wissensbausteinen, die vor dem Szenario gelernt werden sollten.'
    },

    // Definition der Belohnungen für den erfolgreichen Abschluss des Szenarios.
    belohnungen: {
        xp: { type: Number, default: 0 },
        coins: { type: Number, default: 0 },
        gems: { type: Number, default: 0 },
        // Ggf. spezielle Items oder Abzeichen
        items: [String]
    }
}, {
    timestamps: true
});

// Index für häufige Abfragen.
SzenarioSchema.index({ szenarioId: 1 });
SzenarioSchema.index({ lernfeld: 1 });

const Szenario = mongoose.model('Szenario', SzenarioSchema);

module.exports = Szenario;