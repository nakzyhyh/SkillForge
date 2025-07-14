/**
 * =====================================================================================
 * Wissensbaustein Modell (wissensbaustein.model.js)
 * =====================================================================================
 * Definition des Mongoose-Schemas für einen "Wissensbaustein".
 *
 * Ein Wissensbaustein ist die kleinste, atomare Lerneinheit in der App.
 * Er repräsentiert einen einzelnen Knoten im Wissensgraphen.
 *
 * Warum diese Datei zuerst?
 * --------------------------
 * Dieses Modell ist das absolute Fundament für die gesamte neue Logik.
 * Sowohl die adaptiven Lernpfade als auch die handlungsorientierten Szenarien
 * werden auf diesen Bausteinen aufbauen. Ohne eine saubere Definition unserer
 * kleinsten Wissenseinheit können wir keine komplexeren Strukturen oder
 * Algorithmen darauf aufbauen.
 * =====================================================================================
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definiert die Struktur für den Inhalt eines Wissensbausteins.
// Dies ermöglicht es uns, verschiedene Arten von Lernmaterialien flexibel zu handhaben.
const ContentSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['text', 'video', 'quiz', 'interactive_task'], // 'interactive_task' wird für Szenarien wichtig
        comment: 'Definiert die Art des Inhalts (z.B. Text, Video, Quiz).'
    },
    source: {
        type: String,
        required: true,
        comment: 'Der eigentliche Inhalt oder ein Verweis darauf (z.B. Text, Video-URL, Quiz-ID).'
    }
}, { _id: false }); // _id: false, da dies ein Subdokument ist.

// Hauptschema für den Wissensbaustein
const WissensbausteinSchema = new Schema({
    // Eindeutiger, menschenlesbarer Identifier. Wichtig für Verknüpfungen.
    // Beispiel: "LF4_Schutzziele_Grundlagen"
    wissensbausteinId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        comment: 'Einzigartiger, menschenlesbarer Identifier für den Wissensbaustein.'
    },

    // Titel des Wissensbausteins, der in der App angezeigt wird.
    titel: {
        type: String,
        required: true,
        trim: true,
        comment: 'Der für den Benutzer sichtbare Titel der Lerneinheit.'
    },

    // Kurze Beschreibung, worum es in diesem Baustein geht.
    beschreibung: {
        type: String,
        required: false,
        trim: true,
        comment: 'Eine kurze Zusammenfassung des Lerninhalts.'
    },

    // Referenz zum offiziellen IHK-Lernfeld.
    // Hilft bei der Strukturierung und Filterung der Inhalte.
    lernfeld: {
        type: Number,
        required: true,
        min: 1,
        comment: 'Die Nummer des zugehörigen IHK-Lernfelds (z.B. 4 für Schutzbedarfsanalyse).'
    },

    // Der eigentliche Lerninhalt, strukturiert als Array.
    // Dies ermöglicht es, eine Lerneinheit aus mehreren Teilen zusammenzusetzen (z.B. Video + Text).
    inhalte: {
        type: [ContentSchema],
        required: true,
        validate: [arr => arr.length > 0, 'Ein Wissensbaustein muss mindestens einen Inhalt haben.']
    },

    // Das Herzstück des Wissensgraphen: Die Abhängigkeiten.
    // Hier wird definiert, welche anderen Wissensbausteine der Nutzer beherrschen muss,
    // bevor er diesen hier beginnen kann.
    dependencies: {
        type: [String], // Array von wissensbausteinId's
        default: [],
        comment: 'Liste der IDs von Wissensbausteinen, die als Voraussetzung gelten.'
    },

    // Schwierigkeitsgrad zur besseren Steuerung des Lernpfads.
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        comment: 'Schwierigkeitsgrad des Inhalts (1=leicht, 5=schwer).'
    },

    // Geschätzte Lerndauer in Minuten. Hilft dem Nutzer bei der Zeitplanung.
    estimatedDurationMinutes: {
        type: Number,
        required: false,
        min: 1,
        comment: 'Geschätzte Dauer in Minuten, die zum Absolvieren benötigt wird.'
    }
}, {
    // Automatisches Hinzufügen von createdAt und updatedAt Zeitstempeln.
    timestamps: true
});

// Index für häufige Abfragen, um die Performance zu verbessern.
WissensbausteinSchema.index({ wissensbausteinId: 1 });
WissensbausteinSchema.index({ lernfeld: 1 });

const Wissensbaustein = mongoose.model('Wissensbaustein', WissensbausteinSchema);

module.exports = Wissensbaustein;