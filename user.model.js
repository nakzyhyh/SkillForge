/**
 * =====================================================================================
 * User Modell (user.model.js)
 * =====================================================================================
 * Definition des Mongoose-Schemas für einen "User" (Benutzer).
 *
 * Dieses Modell ist entscheidend, da es den gesamten Zustand und Fortschritt
 * eines Nutzers speichert. Es ersetzt die bisherige, temporäre `gameState`-Logik
 * und schafft eine persistente Datenbasis für jeden einzelnen Lernenden.
 *
 * Warum diese Datei jetzt?
 * ------------------------
 * Nachdem wir definiert haben, WAS gelernt wird (Wissensbausteine, Szenarien),
 * müssen wir jetzt definieren, WIE der Lernfortschritt für jeden Nutzer
 * individuell und detailliert gespeichert wird. Dies ist die Voraussetzung,
 * um später den adaptiven Lernpfad überhaupt berechnen zu können.
 * =====================================================================================
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definiert die Struktur für den Fortschritt bei einem einzelnen Wissensbaustein.
// Wir verwenden hier eine Map, um flexibel und performant auf den Fortschritt
// einzelner Bausteine zugreifen zu können.
const LernfortschrittSchema = new Schema({
    status: {
        type: String,
        required: true,
        enum: ['unbekannt', 'begonnen', 'gelernt', 'gemeistert', 'wiederholen'],
        default: 'unbekannt'
    },
    // Ein Wert zwischen 0 und 1, der das Beherrschen des Themas anzeigt.
    masteryScore: {
        type: Number,
        default: 0,
        min: 0,
        max: 1
    },
    // Zeitstempel der letzten Bearbeitung, wichtig für Spaced Repetition.
    lastReviewed: {
        type: Date
    },
    // Nächstes geplantes Wiederholungsdatum.
    nextReviewDate: {
        type: Date
    }
}, { _id: false });

// Hauptschema für den Benutzer
const UserSchema = new Schema({
    // Standard-Benutzerinformationen
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    // Hier würde die Logik für Passwörter etc. hinkommen (absichtlich vereinfacht)
    passwordHash: {
        type: String,
        required: true
    },

    // --- Gamification & Ressourcen ---
    xp: {
        type: Number,
        default: 0,
        comment: 'Erfahrungspunkte des Nutzers.'
    },
    level: {
        type: Number,
        default: 1,
        comment: 'Das Level des Nutzers, berechnet aus den XP.'
    },
    coins: {
        type: Number,
        default: 100
    },
    hearts: {
        type: Number,
        default: 5
    },
    gems: {
        type: Number,
        default: 0
    },

    // --- Lernfortschritt (Das neue Herzstück) ---
    lernfortschritt: {
        type: Map,
        of: LernfortschrittSchema,
        default: {},
        comment: 'Speichert den Fortschritt für jeden einzelnen Wissensbaustein. Key ist die wissensbausteinId.'
    },

    // Fortschritt in den Szenarien
    szenarioFortschritt: {
        type: Map,
        of: {
            status: { type: String, enum: ['nicht_begonnen', 'in_arbeit', 'abgeschlossen'], default: 'nicht_begonnen' },
            bestScore: { type: Number, default: 0 },
            completedAt: { type: Date }
        },
        default: {}
    },

    // Aktive Booster oder andere Zustände
    aktiveEffekte: [{
        effektId: String,
        ablaufdatum: Date
    }]

}, {
    timestamps: true
});

// Index für schnellen Login.
UserSchema.index({ email: 1 });

const User = mongoose.model('User', UserSchema);

module.exports = User;