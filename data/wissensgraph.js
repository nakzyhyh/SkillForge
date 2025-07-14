/**
 * =====================================================================================
 * Wissensgraph v2.0 - Interaktive Lernumgebung
 * =====================================================================================
 * Diese Datei enthält die gesamten Lerninhalte, strukturiert nach dem
 * 'Lernen -> Anwenden -> Prüfen'-Modell. Jeder Block enthält nun eine
 * praxisnahe Konfigurations-Simulation in der 'Anwenden'-Phase.
 * =====================================================================================
 */

export const wissensgraph = [
  // =====================================================================================
  // BLOCK 1-3: Das Unternehmen & die eigene Rolle
  // =====================================================================================
  {
    wissensbausteinId: "LF1_betriebsstrukturen",
    titel: "Betriebsstrukturen",
    lernfeld: 1,
    dependencies: [],
    difficulty: 1,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Lerne die grundlegenden Strukturen und Organisationsformen eines Betriebs kennen. Verstehe die Vor- und Nachteile von Linien-, Stab-, Matrix- und Projektorganisationen, um Kommunikationswege und Entscheidungsfindungen im Unternehmen nachzuvollziehen."
    },

    anwenden: {
      anleitung: "Simuliere die Auswirkungen verschiedener Organisationsformen auf die Kommunikationswege. Konfiguriere den Typ und die Anzahl der Mitarbeiter.",
      /**
       * Simuliert die Kommunikationskomplexität verschiedener Organisationsformen.
       * @param {object} config - z.B. { typ: 'Linienorganisation', ebenen: 4 } oder { typ: 'Matrixorganisation', projekte: 3, abteilungen: 5 }
       * @returns {string} Eine Beschreibung des simulierten Ergebnisses.
       */
      simulation: function(config) {
        switch (config.typ) {
          case 'Linienorganisation':
            return `Simulation: Linienorganisation
--------------------------
Merkmale:
- Klare Befehlskette (Einliniensystem).
- Strikte Hierarchie.

Vorteile:
+ Eindeutige Zuständigkeiten.
+ Gute Kontrollmöglichkeiten.

Nachteile:
- Lange, starre Kommunikationswege.
- Geringe Flexibilität.

Typischer Einsatz: Behörden, Militär, traditionelle Produktionsbetriebe.`;
          case 'Stabsorganisation':
            return `Simulation: Stabsorganisation
--------------------------
Merkmale:
- Linienorganisation wird durch Stabsstellen (Experten) ergänzt.
- Stäbe beraten, haben aber keine Weisungsbefugnis.

Vorteile:
+ Entlastung der Führungsebene.
+ Höhere Qualität der Entscheidungen durch Expertenwissen.

Nachteile:
- Konfliktpotenzial zwischen Stab und Linie.
- Entscheidungen können sich verlangsamen.

Typischer Einsatz: Größere Unternehmen mit komplexen Planungsaufgaben.`;
          case 'Matrixorganisation':
            const complexity = config.projekte * config.abteilungen;
            return `Simulation: Matrixorganisation
--------------------------
Merkmale:
- Mitarbeiter haben zwei Vorgesetzte (funktional und projektbezogen).
- Hohe Anzahl an Kommunikationsschnittstellen (${complexity}).

Vorteile:
+ Hohe Flexibilität und Innovationskraft.
+ Direkte Kommunikationswege.

Nachteile:
- Hohes Konfliktpotenzial durch Kompetenzüberschneidungen.
- Hoher Koordinationsaufwand.

Typischer Einsatz: Projektorientierte Hightech-Unternehmen, Beratungen.`;
          default:
            return "Bitte einen gültigen Organisationstyp angeben.";
        }
      }
    },

    prüfen: {
      type: 'quiz',
      source: [
        { id: 'lo_q1', category: 'betriebsstrukturen', question: 'Was ist das Grundprinzip der Linienorganisation bezüglich der Weisungsbefugnis?', choices: ['Mehrfachunterstellung', 'Einliniensystem', 'Stabsberatung', 'Projektteams'], answer: 1, explanation: 'Das Einliniensystem (jeder Mitarbeiter hat genau einen Vorgesetzten) ist zentral für die Linienorganisation.' },
        { id: 'lo_q2', category: 'betriebsstrukturen', question: 'Welcher der folgenden Punkte ist ein typischer Nachteil der Linienorganisation?', choices: ['Hohe Flexibilität', 'Kurze Kommunikationswege', 'Klare Verantwortlichkeiten', 'Lange Entscheidungswege'], answer: 3, explanation: 'Lange Kommunikations- und Entscheidungswege sind oft Nachteile der Linienorganisation.' },
        { id: 'so_q1', category: 'betriebsstrukturen', question: 'Welche Befugnis haben Stäbe in einer Stabsorganisation typischerweise NICHT?', choices: ['Beratung', 'Planung', 'Weisungsbefugnis', 'Unterstützung'], answer: 2, explanation: 'Stäbe haben in der Regel keine direkte Weisungsbefugnis gegenüber der Linie.' },
        { id: 'so_q2', category: 'betriebsstrukturen', question: 'Was ist ein Hauptvorteil der Einführung von Stäben?', choices: ['Verkürzung der Dienstwege', 'Entlastung der Linienführung', 'Erhöhung der Mitarbeiteranzahl', 'Direkte Kundenkommunikation der Stäbe'], answer: 1, explanation: 'Stäbe dienen primär der Entlastung der Linienführung durch spezialisierte Beratung.' },
        { id: 'mo_q1', category: 'betriebsstrukturen', question: 'Wie viele Vorgesetzte hat ein Mitarbeiter typischerweise in einer Matrixorganisation?', choices: ['Einen', 'Zwei', 'Drei', 'Keinen festen'], answer: 1, explanation: 'In einer Matrixorganisation gibt es eine duale Unterstellung, meist einen funktionalen und einen projektbezogenen Vorgesetzten.' },
        { id: 'mo_q2', category: 'betriebsstrukturen', question: 'Welcher Nachteil ist besonders kennzeichnend für die Matrixorganisation?', choices: ['Geringe Spezialisierung', 'Lange Kommunikationswege', 'Kompetenzkonflikte', 'Starre Struktur'], answer: 2, explanation: 'Kompetenzkonflikte zwischen den beiden Weisungslinien sind ein häufiger Nachteil der Matrixorganisation.' },
        { id: 'po_q1_bs', category: 'betriebsstrukturen', question: 'Welches Merkmal beschreibt die Projektorganisation als Organisationsform am besten?', choices: ['Dauerhafte Strukturänderung im Unternehmen', 'Temporäre Organisationsform für spezifische Aufgaben', 'Auflösung der bestehenden Linienstruktur', 'Strikte hierarchiefreie Zusammenarbeit aller Mitglieder'], answer: 1, explanation: 'Projektorganisation ist eine temporäre Form zur Abwicklung spezifischer Projekte und existiert oft parallel zur Linienorganisation.' },
        { id: 'kw_q1_bs', category: 'betriebsstrukturen', question: 'Welche Richtung beschreibt "Bottom-Up"-Kommunikation im Unternehmen?', choices: ['Von der Unternehmensführung zu den Mitarbeitern', 'Zwischen Kollegen auf derselben Hierarchieebene', 'Von den Mitarbeitern zur Führungsebene', 'Diagonal über verschiedene Abteilungen hinweg'], answer: 2, explanation: 'Bottom-Up-Kommunikation fließt von den Mitarbeitern oder unteren Ebenen zur Führungsebene, z.B. als Feedback oder Berichte.' },
        { id: 'ep_q1_bs', category: 'betriebsstrukturen', question: 'Welche Phase steht typischerweise AM ANFANG eines strukturierten Entscheidungsprozesses im Unternehmen?', choices: ['Bewertung von Handlungsalternativen', 'Implementierung der gewählten Lösung', 'Problemerkennung und -analyse', 'Kontrolle der Ergebnisse'], answer: 2, explanation: 'Die Problemerkennung und die genaue Analyse des Problems bilden die Grundlage für alle weiteren Schritte im Entscheidungsprozess.' },
        { id: 'itabt_q1_bs', category: 'betriebsstrukturen', question: 'Was ist eine typische Kernaufgabe der IT-Abteilung als interner Dienstleister?', choices: ['Festlegung der Unternehmensstrategie', 'Marketing für IT-Produkte', 'Bereitstellung und Wartung der IT-Infrastruktur', 'Festlegung der Verkaufspreise'], answer: 2, explanation: 'Die IT-Abteilung ist primär für die technische Infrastruktur, Anwendungsbetreuung und IT-Sicherheit zuständig.' },
        { id: 'fs_q1_bs', category: 'betriebsstrukturen', question: 'Welcher Führungsstil zeichnet sich durch gemeinsame Entscheidungsfindung und Mitarbeiterbeteiligung aus?', choices: ['Autoritär', 'Laissez-faire', 'Kooperativ/Demokratisch', 'Direktiv'], answer: 2, explanation: 'Der kooperative Führungsstil bezieht Mitarbeiter in Entscheidungsprozesse ein und fördert Teamarbeit.' },
        { id: 'prok_q1_bs', category: 'betriebsstrukturen', question: 'Was unterscheidet eine Prokura von einer einfachen Vollmacht?', choices: ['Prokura ist günstiger', 'Prokura muss ins Handelsregister eingetragen werden', 'Prokura gilt nur intern', 'Prokura ist zeitlich befristet'], answer: 1, explanation: 'Die Prokura ist eine besondere Form der Vollmacht, die im Handelsregister eingetragen werden muss und umfassende Geschäftsführungsbefugnisse verleiht.' }
      ]
    }
  },
  {
    wissensbausteinId: "LF1_projektmanagement",
    titel: "Projektmanagement",
    lernfeld: 1,
    dependencies: ["LF1_betriebsstrukturen"],
    difficulty: 2,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Erlerne die Grundlagen des Projektmanagements, von der Planung bis zur Durchführung. Verstehe Methoden wie die Netzplantechnik (CPM) und agile Ansätze wie Scrum, um Projekte effizient zu steuern."
    },

    anwenden: {
      anleitung: "Simuliere die Berechnung des kritischen Pfades. Gib Vorgänge mit ihrer Dauer und ihren Abhängigkeiten an.",
      /**
       * Simuliert die Berechnung von Pufferzeiten in der Netzplantechnik.
       * @param {object} config - z.B. { FAZ: 5, Dauer: 3, SAZ: 8 }
       * @returns {string} Das Ergebnis der Pufferberechnung.
       */
      simulation: function(config) {
        const { FAZ, Dauer, SAZ } = config;
        if (isNaN(FAZ) || isNaN(Dauer) || isNaN(SAZ)) {
          return "Bitte geben Sie gültige Zahlen für alle Felder ein.";
        }
        const FEZ = FAZ + Dauer;
        const GP = SAZ - FEZ; // Gesamtpuffer

        const szenario = `Szenario:\n- Ein Vorgang startet frühestens an Tag ${FAZ}.\n- Er dauert ${Dauer} Tage.\n- Er muss spätestens an Tag ${SAZ} begonnen haben.`;
        const berechnung = `Berechnung:\n- Frühester Endzeitpunkt (FEZ): ${FEZ}\n- Gesamtpuffer (GP): ${GP} Tage`;

        let bewertung = '';
        if (GP < 0) {
          bewertung = '🚨 HOHES RISIKO: Der Plan ist unrealistisch! Das Projekt hat bereits Verzug.';
        } else if (GP === 0) {
          bewertung = '⚠️ KRITISCHER PFAD: Dieser Vorgang hat keinen Puffer. Jede Verzögerung hier schlägt direkt auf das Projektende durch!';
        } else if (GP <= 3) {
          bewertung = '💡 GERINGES RISIKO: Ein kleiner Puffer ist vorhanden, aber der Vorgang sollte genau überwacht werden.';
        } else {
          bewertung = '✅ UNKRITISCH: Genügend Puffer vorhanden. Hier können bei Bedarf Ressourcen für kritischere Aufgaben abgezogen werden.';
        }

        return `${szenario}\n\n${berechnung}\n\n**Handlungsempfehlung:**\n${bewertung}`;
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'cpm_q1', category: 'projektmanagement', question: 'Was ist der "Kritische Pfad" in der Critical Path Method (CPM)?', choices: ['Der kürzeste Weg durch das Projekt', 'Der Weg mit den meisten Ressourcen', 'Der längste, unpufferbare Weg', 'Der Weg mit den geringsten Kosten'], answer: 2, explanation: 'Der kritische Pfad ist die Kette von Vorgängen, die die minimale Projektdauer bestimmen und keinen Puffer haben.' },
        { id: 'cpm_q2', category: 'projektmanagement', question: 'Wie wird der Gesamtpuffer (GP) eines Vorgangs berechnet?', choices: ['FAZ - Dauer', 'SEZ - FEZ', 'Dauer - FP', 'SAZ + Dauer'], answer: 1, explanation: 'Der Gesamtpuffer ist die Differenz zwischen spätestem und frühestem Endzeitpunkt (SEZ - FEZ) oder spätestem und frühestem Anfangszeitpunkt (SAZ - FAZ).' },
        { id: 'vk_q1', category: 'projektmanagement', question: 'Was stellen die Knoten in einem Vorgangsknoten-Netzplan dar?', choices: ['Ereignisse', 'Abhängigkeiten', 'Vorgänge/Aufgaben', 'Ressourcen'], answer: 2, explanation: 'In einem Vorgangsknoten-Netzplan repräsentieren die Knoten die einzelnen Vorgänge oder Aufgaben des Projekts.' },
        { id: 'ft_q1', category: 'projektmanagement', question: 'Was bedeutet FEZ in der Netzplantechnik?', choices: ['Frühester Eckzeitpunkt', 'Finaler Endzeitpunkt', 'Frühester Endzeitpunkt', 'Flexibler Eckzeitpunkt'], answer: 2, explanation: 'FEZ steht für den Frühesten Endzeitpunkt eines Vorgangs.' },
        { id: 'pz_q1', category: 'projektmanagement', question: 'Welchen Gesamtpuffer (GP) hat ein Vorgang, der auf dem kritischen Pfad liegt?', choices: ['Immer > 0', 'Genau 0', 'Immer < 0', 'Abhängig von der Dauer'], answer: 1, explanation: 'Vorgänge auf dem kritischen Pfad haben per Definition einen Gesamtpuffer von Null.' },
        { id: 'rp_q1', category: 'projektmanagement', question: 'Was ist ein Hauptziel der Ressourcenplanung in Projekten?', choices: ['Maximierung der Anzahl an Projektaufgaben', 'Vermeidung von Ressourcenüberlastung und -konflikten', 'Minimierung der Kommunikation im Projektteam', 'Ausschließliche Nutzung interner Ressourcen'], answer: 1, explanation: 'Ein zentrales Ziel der Ressourcenplanung ist es, Konflikte durch Überlastung zu vermeiden und Ressourcen optimal einzusetzen.' },
        { id: 'wf_q1_pm', category: 'projektmanagement', question: 'Was kennzeichnet das Wasserfallmodell als Vorgehensmodell?', choices: ['Iterative Entwicklung', 'Dokumentgetriebene, sequenzielle Phasen', 'Agile Sprints', 'Kontinuierliche Kundenintegration'], answer: 1, explanation: 'Das Wasserfallmodell ist durch aufeinanderfolgende, dokumentgetriebene Phasen charakterisiert.' },
        { id: 'agile_q1_pm', category: 'projektmanagement', question: 'Was ist ein Hauptprinzip agiler Softwareentwicklung?', choices: ['Umfassende Dokumentation vor funktionierender Software', 'Planfolgen vor Reagieren auf Veränderung', 'Individuen und Interaktionen vor Prozessen und Werkzeugen', 'Vertragsverhandlungen vor Kundenzusammenarbeit'], answer: 2, explanation: 'Das agile Manifest betont Menschen und Zusammenarbeit über starre Prozesse.' },
        { id: 'scrum_q1_pm', category: 'projektmanagement', question: 'Wie lange dauert ein Sprint in Scrum typischerweise?', choices: ['1 Woche', '1-4 Wochen', '1-3 Monate', '6 Monate'], answer: 1, explanation: 'Sprints in Scrum dauern in der Regel 1-4 Wochen, wobei 2-3 Wochen üblich sind.' },
        { id: 'risk_q1_pm', category: 'projektmanagement', question: 'Was ist der Zweck einer Risikoanalyse im Projektmanagement?', choices: ['Erhöhung der Projektkosten', 'Identifizierung und Bewertung potenzieller Probleme', 'Verlängerung der Projektlaufzeit', 'Reduzierung der Teammitglieder'], answer: 1, explanation: 'Risikoanalyse hilft bei der frühzeitigen Erkennung und Bewertung möglicher Projektrisiken.' },
        { id: 'stake_q1_pm', category: 'projektmanagement', question: 'Wer sind typische Stakeholder in einem IT-Projekt?', choices: ['Nur das Entwicklungsteam', 'Auftraggeber, Benutzer, Projektteam, Lieferanten', 'Ausschließlich die Geschäftsführung', 'Nur externe Berater'], answer: 1, explanation: 'Stakeholder umfassen alle Personen oder Gruppen, die vom Projekt betroffen sind oder es beeinflussen können.' },
        { id: 'gantt_q1_pm', category: 'projektmanagement', question: 'Was zeigt ein Gantt-Diagramm primär an?', choices: ['Nur die Projektkosten', 'Zeitliche Darstellung von Projektaufgaben und deren Abhängigkeiten', 'Organisationsstrukturen', 'Risikobewertungen'], answer: 1, explanation: 'Gantt-Diagramme visualisieren Projektaufgaben über die Zeit und zeigen Abhängigkeiten zwischen Aufgaben auf.' }
      ]
    }
  },
  {
    wissensbausteinId: "LF1_teamarbeit",
    titel: "Teamarbeit",
    lernfeld: 1,
    dependencies: ["LF1_projektmanagement"],
    difficulty: 2,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Verstehe die Dynamiken der Zusammenarbeit im Team. Lerne Modelle wie das Tuckman-Modell für Teamphasen und das Vier-Ohren-Modell für Kommunikation kennen, um Konflikte zu erkennen und die Zusammenarbeit zu verbessern."
    },

    anwenden: {
      anleitung: "Simuliere die aktuelle Phase deines Teams nach dem Tuckman-Modell und erhalte eine Handlungsempfehlung.",
      /**
       * Gibt eine Handlungsempfehlung basierend auf der Teamphase nach Tuckman.
       * @param {object} config - z.B. { phase: 'Storming' }
       * @returns {string} Eine Empfehlung für die Teamführung.
       */
      simulation: function(config) {
        switch (config.phase) {
          case 'Forming':
            return `Phase: Forming (Orientierungsphase)
-----------------------------------
Verhalten im Team:
- Unsicherheit, Höflichkeit, vorsichtiges Abtasten.
- Mitglieder suchen nach ihrer Rolle und Orientierung.

Handlungsempfehlung für die Führung:
- Ziele klar kommunizieren.
- Klare Strukturen und Rollen vorgeben.
- Gelegenheiten zum Kennenlernen schaffen (z.B. Team-Events).`;
          case 'Storming':
            return `Phase: Storming (Konfliktphase)
-----------------------------------
Verhalten im Team:
- Meinungsverschiedenheiten, Konkurrenz, Cliquenbildung.
- Es wird um Einfluss und die richtige Vorgehensweise gerungen.

Handlungsempfehlung für die Führung:
- Konflikte offen ansprechen und als Chance nutzen.
- Spielregeln für Kommunikation und Feedback etablieren.
- Moderieren und vermitteln.`;
          case 'Norming':
            return `Phase: Norming (Organisationsphase)
-----------------------------------
Verhalten im Team:
- Entwicklung von gemeinsamen Regeln und Prozessen.
- Wertschätzung und Akzeptanz wachsen.

Handlungsempfehlung für die Führung:
- Dem Team mehr Verantwortung übertragen.
- Erfolge gemeinsam feiern.
- Feedback-Kultur weiter fördern.`;
          case 'Performing':
            return `Phase: Performing (Leistungsphase)
-----------------------------------
Verhalten im Team:
- Hohe Leistung, Effizienz und Eigenverantwortung.
- Das Team arbeitet als Einheit und löst Probleme selbstständig.

Handlungsempfehlung für die Führung:
- Dem Team vertrauen und Autonomie gewähren.
- Neue Herausforderungen und Weiterentwicklungsmöglichkeiten bieten.
- Als Coach und Mentor agieren.`;
          default:
            return "Bitte eine gültige Phase angeben.";
        }
      }
    },

    prüfen: {
      type: 'quiz',
      source: [
        { id: 'tb_q1', category: 'teamarbeit', question: 'Welche Phase des Tuckman-Modells ist oft durch Konflikte und Auseinandersetzungen um Positionen gekennzeichnet?', choices: ['Forming', 'Norming', 'Storming', 'Performing'], answer: 2, explanation: 'Die "Storming"-Phase ist typischerweise von Konflikten und der Klärung von Rollen und Positionen geprägt.' },
        { id: 'vom_q1_ta', category: 'teamarbeit', question: 'Auf welcher Ebene des Vier-Ohren-Modells geht es darum, was der Sender über sich selbst preisgibt?', choices: ['Sachebene', 'Selbstoffenbarungsebene', 'Beziehungsebene', 'Appellebene'], answer: 1, explanation: 'Die Selbstoffenbarungsebene beinhaltet, was der Sender von sich selbst kundtut (Ich-Botschaften).' },
        { id: 'scrum_q1_ta', category: 'teamarbeit', question: 'Welche Rolle im Scrum-Team ist dafür verantwortlich, Hindernisse (Impediments) für das Entwicklungsteam zu beseitigen?', choices: ['Product Owner', 'Scrum Master', 'Lead Developer', 'Projektmanager'], answer: 1, explanation: 'Der Scrum Master dient dem Team u.a. dadurch, dass er Hindernisse aus dem Weg räumt.' },
        { id: 'ftk_q1_ta', category: 'teamarbeit', question: 'Was ist ein Merkmal der "Sandwich-Methode" beim Geben von Feedback?', choices: ['Nur Kritik äußern', 'Kritik zwischen zwei positiven Anmerkungen verpacken', 'Feedback anonym geben', 'Ausschließlich Lob aussprechen'], answer: 1, explanation: 'Bei der Sandwich-Methode wird kritischeres Feedback zwischen zwei positiven Aussagen platziert.' },
        { id: 'tuck_q2_ta', category: 'teamarbeit', question: 'In welcher Phase des Tuckman-Modells arbeitet das Team am effizientesten?', choices: ['Forming', 'Storming', 'Norming', 'Performing'], answer: 3, explanation: 'In der Performing-Phase ist das Team eingespielt und arbeitet hochproduktiv.' },
        { id: 'konflikt_q1_ta', category: 'teamarbeit', question: 'Welche Konfliktstrategie führt oft zu Win-Win-Situationen?', choices: ['Kompromiss', 'Vermeidung', 'Durchsetzung', 'Kooperation/Zusammenarbeit'], answer: 3, explanation: 'Kooperation zielt darauf ab, eine Lösung zu finden, die für alle Beteiligten vorteilhaft ist.' },
        { id: 'kom_q1_ta', category: 'teamarbeit', question: 'Was sind Merkmale effektiver Kommunikation im Team?', choices: ['Einseitige Kommunikation', 'Klare, verständliche Botschaften und aktives Zuhören', 'Vermeidung schwieriger Themen', 'Ausschließlich schriftliche Kommunikation'], answer: 1, explanation: 'Effektive Kommunikation ist bidirektional, klar und berücksichtigt sowohl das Senden als auch das Empfangen von Nachrichten.' },
        { id: 'rolle_q1_ta', category: 'teamarbeit', question: 'Was kann bei unklaren Rollenverteilungen im Team entstehen?', choices: ['Erhöhte Produktivität', 'Bessere Zusammenarbeit', 'Konflikte und Ineffizienz', 'Automatische Selbstorganisation'], answer: 2, explanation: 'Unklare Rollen führen oft zu Überschneidungen, Lücken in der Verantwortung und Konflikten.' },
        { id: 'mot_q1_ta', category: 'teamarbeit', question: 'Welcher Faktor trägt zur intrinsischen Motivation bei?', choices: ['Hohe Bezahlung', 'Autonomie und Selbstbestimmung', 'Strenge Kontrolle', 'Konkurrenzdruck'], answer: 1, explanation: 'Intrinsische Motivation entsteht durch Faktoren wie Autonomie, Sinnhaftigkeit und Kompetenzerleben.' },
        { id: 'brainstorm_q1_ta', category: 'teamarbeit', question: 'Was ist ein Grundprinzip des Brainstormings?', choices: ['Sofortige Bewertung aller Ideen', 'Quantität vor Qualität der Ideen', 'Nur realistische Ideen sammeln', 'Hierarchische Ideenentwicklung'], answer: 1, explanation: 'Beim Brainstorming geht es zunächst um die Sammlung möglichst vieler Ideen, ohne sie sofort zu bewerten.' },
        { id: 'retro_q1_ta', category: 'teamarbeit', question: 'Was ist der Hauptzweck einer Retrospektive im Team?', choices: ['Schuldzuweisungen für Fehler', 'Kontinuierliche Verbesserung der Zusammenarbeit', 'Leistungsbewertung einzelner Mitarbeiter', 'Planung neuer Projekte'], answer: 1, explanation: 'Retrospektiven dienen der gemeinsamen Reflexion und Verbesserung der Teamarbeit und Prozesse.' },
        { id: 'div_q1_ta', category: 'teamarbeit', question: 'Welchen Vorteil bietet Diversität in Teams?', choices: ['Einheitliche Denkweisen', 'Verschiedene Perspektiven und Lösungsansätze', 'Reduzierte Kommunikation', 'Gleiche Erfahrungen aller Mitglieder'], answer: 1, explanation: 'Diverse Teams bringen unterschiedliche Erfahrungen und Denkweisen ein, was zu kreativeren und robusteren Lösungen führen kann.' }
      ]
    }
  },
  {
    wissensbausteinId: "LF1_rechtliche_grundlagen",
    titel: "Recht & Gesetze",
    lernfeld: 1,
    dependencies: ["LF1_teamarbeit"],
    difficulty: 3,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Mache dich mit den wichtigsten rechtlichen Rahmenbedingungen vertraut. Dazu gehören Arbeitsrecht (ArbZG, BBiG), Datenschutz (DSGVO), Urheberrecht und Lizenzmodelle (GPL, MIT)."
    },

    anwenden: {
      anleitung: "Simuliere die Gültigkeit einer Lizenz für dein Projekt. Gib die Lizenz deines Projekts und die Lizenz einer genutzten Bibliothek an.",
      /**
       * Simuliert die Kompatibilität von Softwarelizenzen (Copyleft-Effekt).
       * @param {object} config - z.B. { projektLizenz: 'MIT', libLizenz: 'GPL' }
       * @returns {string} Eine Aussage zur Lizenzkompatibilität.
       */
      simulation: function(config) {
        if (config.projektLizenz === 'GPL' || config.libLizenz === 'GPL') {
          return `Szenario: Ein Projekt (Lizenz: ${config.projektLizenz}) nutzt eine Bibliothek (Lizenz: ${config.libLizenz}).

Risikoanalyse: HOCH 🚨
------------------------
Aufgrund der GPL-Lizenz (starkes Copyleft) muss Ihr gesamtes Projekt ebenfalls unter der GPL (oder einer kompatiblen Lizenz) veröffentlicht werden. Das bedeutet, der Quellcode muss offengelegt werden.

Empfehlung: Wenn Sie Ihren eigenen Code nicht offenlegen wollen, dürfen Sie keine GPL-Bibliotheken verwenden. Suchen Sie nach Alternativen mit permissiven Lizenzen wie MIT oder Apache 2.0.`;
        } else if (config.projektLizenz === 'MIT' && config.libLizenz === 'MIT') {
          return `Szenario: Ein Projekt (Lizenz: MIT) nutzt eine Bibliothek (Lizenz: MIT).

Risikoanalyse: NIEDRIG ✅
------------------------
Diese Kombination ist unproblematisch. Die permissive MIT-Lizenz erlaubt die Verwendung in proprietären (nicht-offenen) Projekten. Sie müssen lediglich den Lizenztext der Bibliothek beilegen.`;
        }
        return "Diese Lizenzkombination ist weitgehend unproblematisch. Beachten Sie die jeweiligen Lizenztexte für genaue Bedingungen wie die Namensnennung.";
      },
    }, // Das 'prüfen'-Objekt war fälschlicherweise in 'anwenden' verschachtelt. Es muss auf gleicher Ebene wie 'lernen' und 'anwenden' liegen.
    prüfen: { // Beginn des 'prüfen'-Objekts für LF1_rechtliche_grundlagen
      type: 'quiz',
      source: [
        { id: 'az_q1', category: 'rechtliche-grundlagen', question: 'Wie viele Stunden beträgt die gesetzlich vorgeschriebene Mindestruhezeit zwischen zwei Arbeitstagen laut ArbZG?', choices: ['8 Stunden', '10 Stunden', '11 Stunden', '12 Stunden'], answer: 2, explanation: 'Gemäß § 5 ArbZG muss die ununterbrochene Ruhezeit mindestens 11 Stunden betragen.' },
        { id: 'sl_q1', category: 'rechtliche-grundlagen', question: 'Welche Lizenzart erfordert oft, dass abgeleitete Werke ebenfalls unter derselben Lizenz veröffentlicht werden (Copyleft-Prinzip)?', choices: ['MIT Lizenz', 'Apache Lizenz', 'GPL (GNU General Public License)', 'BSD Lizenz'], answer: 2, explanation: 'Die GPL ist bekannt für ihren Copyleft-Effekt, der die Freiheit von Software und ihren Derivaten sicherstellen soll.' },
        { id: 'dsgvo_q1', category: 'rechtliche-grundlagen', question: 'Welche der folgenden Optionen ist KEINE gültige Rechtsgrundlage für die Verarbeitung personenbezogener Daten gemäß Art. 6 DSGVO?', choices: ['Einwilligung der betroffenen Person', 'Erfüllung eines Vertrags', 'Allgemeines Geschäftsinteresse ohne Abwägung', 'Wahrung lebenswichtiger Interessen'], answer: 2, explanation: 'Ein "berechtigtes Interesse" kann eine Rechtsgrundlage sein, erfordert aber eine Abwägung mit den Interessen der betroffenen Person. Ein allgemeines Geschäftsinteresse allein reicht nicht.' },
        { id: 'itsig_q1', category: 'rechtliche-grundlagen', question: 'Was versteht man unter KRITIS im Kontext des IT-Sicherheitsgesetzes?', choices: ['Kritische Software', 'Kritische Infrastrukturen', 'Kryptische Informationen', 'Kontrollierte IT-Systeme'], answer: 1, explanation: 'KRITIS steht für Kritische Infrastrukturen, deren Ausfall erhebliche Folgen hätte.' },
        { id: 'dsgvo_q2_rg', category: 'rechtliche-grundlagen', question: 'Ab welcher Mitarbeiterzahl ist ein Datenschutzbeauftragter zu bestellen?', choices: ['Ab 10 Personen bei automatisierter Verarbeitung', 'Ab 20 Personen', 'Ab 50 Personen', 'Immer erforderlich'], answer: 0, explanation: 'Bei mehr als 10 Personen, die ständig mit der automatisierten Verarbeitung personenbezogener Daten beschäftigt sind, ist ein DSB zu bestellen.' },
        { id: 'bbig_q1_rg', category: 'rechtliche-grundlagen', question: 'Was regelt das Berufsbildungsgesetz (BBiG)?', choices: ['Arbeitszeiten', 'Ausbildungsverhältnisse', 'Urlaubsansprüche', 'Kündigungsfristen'], answer: 1, explanation: 'Das BBiG regelt die Berufsausbildung, einschließlich Rechte und Pflichten von Auszubildenden und Ausbildern.' },
        { id: 'urh_q1_rg', category: 'rechtliche-grundlagen', question: 'Wie lange gilt das Urheberrecht in Deutschland nach dem Tod des Urhebers?', choices: ['50 Jahre', '70 Jahre', '100 Jahre', 'Unbegrenzt'], answer: 1, explanation: 'Das Urheberrecht erlischt 70 Jahre nach dem Tod des Urhebers.' },
        { id: 'haft_q1_rg', category: 'rechtliche-grundlagen', question: 'Welche Haftungsform besteht bei einer GmbH?', choices: ['Unbeschränkte persönliche Haftung', 'Haftung beschränkt auf das Gesellschaftsvermögen', 'Haftung nur mit privatem Vermögen', 'Keine Haftung'], answer: 1, explanation: 'Bei einer GmbH ist die Haftung auf das Gesellschaftsvermögen beschränkt.' },
        { id: 'bundestag_q1_rg', category: 'rechtliche-grundlagen', question: 'Welches Gesetz regelt den Umgang mit Betriebsgeheimnissen?', choices: ['DSGVO', 'Geschäftsgeheimnisgesetz (GeschGehG)', 'Bundesdatenschutzgesetz', 'IT-Sicherheitsgesetz'], answer: 1, explanation: 'Das Geschäftsgeheimnisgesetz schützt Betriebsgeheimnisse vor unrechtmäßiger Erlangung und Verwertung.' },
        { id: 'tele_q1_rg', category: 'rechtliche-grundlagen', question: 'Was regelt die ePrivacy-Verordnung (geplant)?', choices: ['Datenschutz in sozialen Medien', 'Vertraulichkeit elektronischer Kommunikation', 'Cloud-Computing-Sicherheit', 'KI-Systeme'], answer: 1, explanation: 'Die ePrivacy-Verordnung soll die Vertraulichkeit elektronischer Kommunikation regeln und die DSGVO in diesem Bereich ergänzen.' },
        { id: 'it_straf_q1_rg', category: 'rechtliche-grundlagen', question: 'Welche Handlung ist nach dem Strafgesetzbuch strafbar?', choices: ['Reverse Engineering für Interoperabilität', 'Unrechtmäßiges Eindringen in fremde IT-Systeme', 'Verwendung von Open-Source-Software', 'Erstellen von Backups'], answer: 1, explanation: '§ 202a StGB stellt das unberechtigte Verschaffen von Zugang zu fremden Daten unter Strafe.' },
        { id: 'vertr_q1_rg', category: 'rechtliche-grundlagen', question: 'Was sind die zwei übereinstimmenden Willenserklärungen bei einem Vertrag?', choices: ['Angebot und Nachfrage', 'Antrag und Annahme', 'Wunsch und Erfüllung', 'Bedarf und Lieferung'], answer: 1, explanation: 'Ein Vertrag kommt durch Antrag (Angebot) und Annahme zustande.' }
      ]
    } // Ende des 'prüfen'-Objekts für LF1_rechtliche_grundlagen
  },
  {
    wissensbausteinId: "LF1_boss_betrieb_rolle",
    titel: "Meilenstein-Prüfung: Betrieb & Rolle",
    lernfeld: 1,
    // ############ KORRIGIERTE ABHÄNGIGKEIT ############
    // Die Meilensteinprüfung hängt nun direkt von "Teamarbeit" ab,
    // um die Freischaltung zu ermöglichen, da "Recht & Gesetze"
    // visuell nicht im Pfad sichtbar war.
    dependencies: ["LF1_teamarbeit"],
    // ##################################################
    difficulty: 4,
    estimatedDurationMinutes: 20,

    lernen: {
      beschreibung: "Dies ist eine Meilenstein-Prüfung. Sie kombiniert Wissen aus allen vorangegangenen Blöcken: Betriebsstrukturen, Projektmanagement, Teamarbeit und rechtliche Grundlagen. Bereite dich vor, um dein Gesamtwissen zu beweisen."
    },

    anwenden: {
      anleitung: "Simuliere eine komplexe Geschäftsentscheidung, die rechtliche, projektbezogene und organisatorische Aspekte berücksichtigt.",
      /**
       * Simuliert eine Entscheidung über ein IT-Projekt unter Berücksichtigung verschiedener Faktoren.
       * @param {object} config - z.B. { budget: 50000, teamReife: 'Norming', compliance: 'DSGVO-kritisch', organisationsform: 'Matrixorganisation' }
       * @returns {string} Eine Risikobewertung für das Projekt.
       */
      simulation: function(config) {
        let riskScore = 0;
        let anmerkungen = [];

        if (config.compliance === 'DSGVO-kritisch') {
          riskScore += 3;
          anmerkungen.push("- DSGVO-Relevanz erfordert hohe Sorgfalt.");
        }
        if (config.organisationsform === 'Matrixorganisation') {
          riskScore += 1;
          anmerkungen.push("- Matrixorganisation birgt Konfliktpotenzial.");
        }
        if (config.teamReife === 'Storming') {
          riskScore += 2;
          anmerkungen.push("- Team in 'Storming'-Phase ist ein Leistungsrisiko.");
        }
        if (config.budget < 100000) {
          riskScore += 1;
          anmerkungen.push("- Budget ist vergleichsweise knapp.");
        }

        let einstufung = '';
        if (riskScore >= 5) {
          einstufung = '🔴 HOCH: Das Projekt ist stark gefährdet. Insbesondere die Compliance-Anforderungen und die Teamdynamik erfordern sofortige Gegenmaßnahmen (z.B. externer Datenschutz-Auditor, Team-Coaching).';
        } else if (riskScore >= 3) {
          einstufung = '🟡 MITTEL: Das Projekt ist machbar, aber die identifizierten Risiken (Compliance, Team) müssen aktiv gemanagt und überwacht werden.';
        } else {
          einstufung = '🟢 NIEDRIG: Das Projekt hat gute Erfolgsaussichten. Die Risiken sind überschaubar.';
        }

        return `Risikoanalyse für das IT-Projekt:
----------------------------------
Faktoren:
${anmerkungen.join('\n')}

Gesamteinstufung (Score: ${riskScore}):
${einstufung}`;
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'br_boss_q1', category: 'boss-betrieb-rolle', question: 'In einer Matrixorganisation erhält ein Entwickler zwei widersprüchliche Vorgaben: Der funktionale Vorgesetzte fordert Sicherheits‑Reviews, der Projektleiter drängt auf schnelle Auslieferung. Welches Vorgehen entspricht guter Governance?', choices: ['Projektleiter priorisieren, da Time‑to‑Market entscheidend ist', 'Entwickler entscheidet selbstständig situativ', 'Konflikt eskalieren an gemeinsames Steering‑Komitee', 'Funktionalen Vorgesetzten ignorieren, da Projektziele Vorrang haben'], answer: 2, explanation: 'In Matrixstrukturen regelt ein Steering-/Lenkungsausschuss Zielkonflikte zwischen gleichrangigen Weisungslinien.' },
        { id: 'br_boss_q2', category: 'boss-betrieb-rolle', question: 'Welche Kennzahl kombiniert Qualität, Kosten und Zeit zur ganzheitlichen Bewertung der Team‑Performance?', choices: ['Return on Investment (ROI)', 'Earned Value (EV)', 'Net Present Value (NPV)', 'Total Cost of Ownership (TCO)'], answer: 1, explanation: 'Earned‑Value‑Analyse verbindet Fertigstellungsgrad (Zeit), Budget (Kosten) und gelieferte Scope‑Qualität.' },
        { id: 'br_boss_q3', category: 'boss-betrieb-rolle', question: 'Nach Tuckman befindet sich dein Team im „Storming“. Welche Maßnahme beschleunigt den Übergang in „Norming“ am wirksamsten?', choices: ['Einzelboni für schnellste Entwickler', 'Klare Rollen- und Verantwortlichkeits‑Workshops', 'Entfernung weniger produktiver Mitglieder', 'Daily‑Stand‑ups abschaffen'], answer: 1, explanation: 'Transparente Rollenklärung reduziert Konflikte und fördert Teamnormen.' },
        { id: 'br_boss_q4', category: 'boss-betrieb-rolle', question: 'Ein Betriebsrat fordert Einsicht in Projektcontrolling‑Daten. Welche Rechtsgrundlage stützt das Auskunftsrecht?', choices: ['§ 80 Abs. 2 BetrVG', 'DSGVO Art. 6 lit. f – berechtigtes Interesse', 'Handelsgesetzbuch § 238', 'BBiG § 14'], answer: 0, explanation: '§ 80 (2) BetrVG verpflichtet den Arbeitgeber, dem Betriebsrat erforderliche Unterlagen bereitzustellen.' },
        { id: 'br_boss_q5', category: 'boss-betrieb-rolle', question: 'Beim Vergleich Linien‑ vs. Netzwerkorganisation gilt welcher Zusammenhang?', choices: ['Netzwerkorganisation steigert Skalenvorteile durch Zentralisierung', 'Linienorga minimiert Kommunikationswege über Abteilungsgrenzen', 'Netzwerkorganisation fördert Innovationsfähigkeit durch lose Kopplung', 'Linienorga erleichtert Kooperation mit externen Partnern'], answer: 2, explanation: 'Lose gekoppelte Netzwerke begünstigen schnellen Wissensaustausch und Innovation.' },
        { id: 'br_boss_q6', category: 'boss-betrieb-rolle', question: 'Welcher Führungsstil ist nach Blanchard („Situatives Führen“) angemessen, wenn eine Fachkraft sehr kompetent, aber wenig motiviert ist?', choices: ['Telling (S1)', 'Selling (S2)', 'Participating (S3)', 'Delegating (S4)'], answer: 2, explanation: 'Bei hoher Kompetenz, geringer Motivation: partizipativ unterstützen (S3).' },
        { id: 'br_boss_q7', category: 'boss-betrieb-rolle', question: 'Im Projekt‑Netzplan verschiebt sich ein Vorgang mit Gesamtpuffer = 0 um 2 Tage nach hinten. Welche direkte Auswirkung?', choices: ['Projektende verschiebt sich um 2 Tage', 'Freier Puffer eines parallelen Vorgangs reduziert sich', 'Gesamtpuffer steigt auf 2 Tage', 'Kritischer Pfad wechselt'], answer: 0, explanation: 'Kritische Vorgänge verzögern das Gesamtprojekt um den gleichen Zeitraum.' },
        { id: 'br_boss_q8', category: 'boss-betrieb-rolle', question: 'Welche Aussage zur Prokura trifft zu?', choices: ['Sie erlaubt Grundstücksveräußerung ohne Zusatzvollmacht', 'Sie kann nur einzeln erteilt werden', 'Sie darf im Innenverhältnis frei beschränkt, nach außen jedoch nicht beschränkt werden', 'Sie endet automatisch mit Ablauf eines Jahres'], answer: 2, explanation: 'Beschränkungen wirken nur intern, extern gilt § 50 HGB.' },
        { id: 'br_boss_q9', category: 'boss-betrieb-rolle', question: 'Welche Kommunikationsform verhindert „Flurfunk“ und Informationsverluste am effektivsten?', choices: ['One‑pager‑Memos per E‑Mail', 'Regelmäßige, cross‑funktionale Synchronsitzungen mit Time‑Box', 'Hierarchische Kettenbriefe', 'Ad‑hoc‑Chatnachrichten'], answer: 1, explanation: 'Time‑Box‑Meetings mit allen Stakeholdern sichern direkten, vollständigen Informationsfluss.' },
        { id: 'br_boss_q10', category: 'boss-betrieb-rolle', question: 'In einer SCRUM‑Retrospektive stellt das Team wachsende „Work in Progress“-(WIP)-Zahlen fest. Welcher Lean‑Ansatz adressiert dieses Problem?', choices: ['Kaizen‑Blitz', 'Kanban‑WIP‑Limits', '5 Why‑Analyse', 'Poka‑Yoke'], answer: 1, explanation: 'Kanban setzt explizite WIP‑Grenzen zur Durchsatz‑Optimierung.' },
        { id: 'br_boss_q11', category: 'boss-betrieb-rolle', question: 'Ein Datenschutz‑Verstoß wird dem Team gemeldet. Welche **richtige Reihenfolge** ist nach DSGVO Art. 33 einschlägig?', choices: ['Meldung Betroffener → Behörde → Dokumentation', 'Dokumentation → Behörde innerhalb 72 h → Betroffene informieren', 'Behörde → Betroffene → Dokumentation', 'Behörde informieren, Betroffene nur bei hohem Risiko'], answer: 1, explanation: 'Datenschutzverletzungen müssen binnen 72 h der Aufsichtsbehörde gemeldet, dokumentiert und Betroffene ggf. informiert werden.' },
        { id: 'br_boss_q12', category: 'boss-betrieb-rolle', question: 'Welche Kennzahl misst **Team‑Reife** nach Tuckman quantitativ?', choices: ['Velocity‑Varianz', 'Team Cohesion Index (TCI)', 'Defect Escape Rate', 'Bus Factor'], answer: 1, explanation: 'Der Team‑Cohesion‑Index misst Zusammenhalt und korreliert mit der Performing‑Phase.' },
        { id: 'br_boss_q13', category: 'boss-betrieb-rolle', question: 'Ein Projektbudget ist zu 60 % verbraucht, Fertigstellungsgrad laut Earned‑Value = 40 %. Welcher CPI (Cost Performance Index) ergibt sich?', choices: ['0,67', '1,5', '0,4', '1,25'], answer: 0, explanation: 'CPI = EV / AC = 0,4 / 0,6 ≈ 0,67 (< 1 = Kostenüberschreitung).' },
        { id: 'br_boss_q14', category: 'boss-betrieb-rolle', question: 'Welche Rechtsfolge hat ein **verdeckter Mangel** beim Werkvertrag nach BGB, wenn er erst 18 Monate später entdeckt wird?', choices: ['Anspruch erloschen, da Gewährleistung 12 Monate', 'Verjährung beginnt mit Ablieferung, Anspruch verjährt nach 2 Jahren', 'Verjährung beginnt mit Entdeckung, Anspruch besteht noch', 'Werkunternehmer haftet unbegrenzt'], answer: 1, explanation: 'Bei Werkleistungen gilt i.d.R. 2‑jährige Verjährung ab Abnahme (§ 634a BGB).' },
        { id: 'br_boss_q15', category: 'boss-betrieb-rolle', question: 'Welches Meeting‑Format reduziert Entscheidungslatenz in cross‑funktionalen Teams am meisten?', choices: ['Weekly Reports per E‑Mail', 'Command‑&‑Control‑Status‑Calls', 'Obeya‑Room mit physischem Task‑Board', 'Quartals‑Roadmap‑Workshops'], answer: 2, explanation: 'Der Obeya‑Room bündelt alle Entscheider täglich, Entscheidungen fallen sofort.' }
      ]
    }
  },

  // =====================================================================================
  // BLOCK 4-6: Arbeitsplätze & Wirtschaftlichkeit
  // =====================================================================================
  // Nur der korrigierte Ausschnitt für LF2_hardware_komponenten in wissensgraph.js
  // BITTE ERSETZEN SIE DEN KOMPLETTEN BLOCK FÜR LF2_HARDWARE_KOMPONENTEN IN IHRER DATEI
  {
    wissensbausteinId: "LF2_hardware_komponenten",
    titel: "Hardware",
    lernfeld: 2,
    dependencies: ["LF1_boss_betrieb_rolle"],
    difficulty: 1, // Might increase difficulty with complexity
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Lerne die wichtigsten Hardware-Komponenten eines Computers (CPU, RAM, SSD/HDD, GPU) und ihre Funktionen kennen. Verstehe Kennzahlen wie TDP und Formfaktoren wie Mini-ITX."
    },

    anwenden: {
      anleitung: "Simuliere die Kompatibilität, Leistung und den Strombedarf von PC-Komponenten. Wähle CPU, RAM, GPU, Mainboard und Netzteil.",
      /**
       * Prüft die Kompatibilität, schätzt Leistung und Strombedarf.
       * @param {object} config - z.B. { cpu: { model: 'Ryzen 7 7800X3D', socket: 'AM5', tdp: 120 }, ram: { type: 'DDR5', speed: 6000, modules: 2, sizePerModuleGB: 16 }, gpu: { model: 'RTX 4070', pcie: '4.0', power: 200, lengthMM: 280 }, motherboard: { socket: 'AM5', ramType: 'DDR5', formFactor: 'ATX', pcieVersion: '4.0' }, psu: { wattage: 750, connectors: ['24pin', '8pinCPU', '2x8pinPCIe'], price: 100 }, case: { formFactorSupport: ['ATX'], gpuMaxLenMM: 300 } }
       * @returns {string} Eine detaillierte Analyse der Konfiguration.
       */
      simulation: function(config) {
        const results = [];
        let totalPowerDraw = 0;
        let compatibilityIssues = [];
        let performanceNotes = [];
        let warnings = [];

        // --- Component Database (simplified for example) ---
        const componentDB = {
          cpu: {
            'Ryzen 7 7800X3D': { socket: 'AM5', tdp: 120, perfTier: 'high' },
            'Core i5-12400F': { socket: 'LGA1700', tdp: 65, perfTier: 'mid' }
          },
          ram: {
            'DDR4': { type: 'DDR4' },
            'DDR5': { type: 'DDR5' }
          },
          gpu: {
            'RTX 4070': { pcie: '4.0', power: 200, lengthMM: 280, perfTier: 'high' },
            'RX 6600': { pcie: '4.0', power: 100, lengthMM: 200, perfTier: 'mid' }
          },
          motherboard: {
            'AM5-ATX': { socket: 'AM5', ramType: 'DDR5', formFactor: 'ATX', pcieVersion: '4.0' },
            'LGA1700-mATX': { socket: 'LGA1700', ramType: 'DDR4', formFactor: 'Micro-ATX', pcieVersion: '3.0' }
          },
          psu: {
            // This is for validation, actual PSU selected by wattage & connectors
          },
          case: {
            'Mid Tower': { formFactorSupport: ['ATX', 'Micro-ATX'], gpuMaxLenMM: 320 }
          }
        };

        const selectedCPU = componentDB.cpu[config.cpu.model];
        const selectedRAMType = componentDB.ram[config.ram.type];
        const selectedGPU = componentDB.gpu[config.gpu.model];
        const selectedMobo = componentDB.motherboard[config.motherboard.model];
        const selectedCase = componentDB.case[config.case.model];

        // 1. Basic Compatibility Checks (more detailed than current)
        if (!selectedCPU || !selectedRAMType || !selectedGPU || !selectedMobo || !selectedCase) {
          return "Bitte alle Komponenten korrekt auswählen.";
        }

        // CPU & Motherboard Socket/RAM type
        if (selectedCPU.socket !== selectedMobo.socket) {
          compatibilityIssues.push(`CPU Sockel (${selectedCPU.socket}) inkompatibel mit Mainboard Sockel (${selectedMobo.socket}).`);
        }
        if (selectedRAMType.type !== selectedMobo.ramType) {
          compatibilityIssues.push(`RAM Typ (${selectedRAMType.type}) inkompatibel mit Mainboard RAM Typ (${selectedMobo.ramType}).`);
        }

        // Motherboard Form Factor & Case
        if (!selectedCase.formFactorSupport.includes(selectedMobo.formFactor)) {
          compatibilityIssues.push(`Mainboard Formfaktor (${selectedMobo.formFactor}) passt nicht zum Gehäuse (${selectedCase.model}).`);
        }

        // GPU Length & Case
        if (selectedGPU.lengthMM > selectedCase.gpuMaxLenMM) {
          compatibilityIssues.push(`Grafikkarte (${selectedGPU.lengthMM}mm) ist zu lang für das Gehäuse (${selectedCase.gpuMaxLenMM}mm max).`);
        }

        // PSU Wattage Calculation
        totalPowerDraw += selectedCPU.tdp; // Simplified, CPU TDP is not exact power draw
        totalPowerDraw += selectedGPU.power;
        totalPowerDraw += (config.ram.modules * 5); // Approx. 5W per RAM module
        totalPowerDraw += 50; // Base for Mobo, SSDs etc.

        if (config.psu.wattage < totalPowerDraw * 1.2) { // 20% buffer
          warnings.push(`Netzteil (${config.psu.wattage}W) könnte unter Last grenzwertig sein für geschätzten Bedarf von ~${Math.ceil(totalPowerDraw * 1.1)}W. Empfohlen: mindestens ${Math.ceil(totalPowerDraw * 1.2)}W.`);
        }

        // 2. Performance Analysis (Simplified Bottleneck)
        if (selectedCPU.perfTier === 'mid' && selectedGPU.perfTier === 'high') {
          performanceNotes.push(`Mögliches CPU-Bottleneck: Die CPU (${config.cpu.model}) könnte die Leistung der Grafikkarte (${config.gpu.model}) in manchen Szenarien limitieren.`);
        } else if (selectedCPU.perfTier === 'high' && selectedGPU.perfTier === 'mid') {
          performanceNotes.push(`Mögliches GPU-Bottleneck: Die Grafikkarte (${config.gpu.model}) könnte die Gesamtleistung in grafikintensiven Anwendungen limitieren, obwohl die CPU (${config.cpu.model}) stärker ist.`);
        }

        // 3. Output Assembly
        let output = `Detaillierte Hardware-Analyse:\n------------------------------\n`;

        if (compatibilityIssues.length > 0) {
          output += "🚨 Kompatibilitätsprobleme:\n" + compatibilityIssues.map(issue => `- ${issue}`).join('\n') + '\n';
        } else {
          output += "✅ Alle ausgewählten Komponenten sind kompatibel.\n";
        }

        output += `\nGeschätzter Gesamt-Strombedarf: ca. ${totalPowerDraw} Watt (Peak).\n`;

        if (warnings.length > 0) {
          output += "\n💡 Warnungen/Hinweise:\n" + warnings.map(warning => `- ${warning}`).join('\n') + '\n';
        }

        if (performanceNotes.length > 0) {
          output += "\n📈 Leistungs-Hinweise:\n" + performanceNotes.map(note => `- ${note}`).join('\n') + '\n';
        }

        return output;
      }
    },
    // ########## KORREKTUR: 'prüfen'-Objekt aus 'anwenden' herausgenommen und hierher verschoben ##########
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'cpu_q1', category: 'hardware-komponenten', question: 'Wofür steht die Abkürzung TDP bei einer CPU?', choices: ['Total Data Processing', 'Thermal Design Power', 'Typical Device Performance', 'Task Distribution Protocol'], answer: 1, explanation: 'TDP (Thermal Design Power) gibt die maximale Wärmeabgabe einer CPU unter Last an, was Rückschlüsse auf den Kühlbedarf und Energieverbrauch zulässt.' },
        { id: 'cpu_q2', category: 'hardware-komponenten', question: 'Was ermöglicht ein Multi-Core-Prozessor primär?', choices: ['Höhere Taktfrequenz pro Kern', 'Parallele Verarbeitung von Aufgaben', 'Größeren Cache-Speicher', 'Geringeren Stromverbrauch'], answer: 1, explanation: 'Mehrere Kerne (Multi-Core) erlauben es der CPU, mehrere Aufgaben oder Teile einer Aufgabe gleichzeitig (parallel) zu bearbeiten.' },
        { id: 'ram_q1', category: 'hardware-komponenten', question: 'Was ist der Hauptvorteil von Dual-Channel-RAM-Konfigurationen?', choices: ['Verdopplung der RAM-Kapazität', 'Reduzierung der Latenzzeiten', 'Erhöhung des Datendurchsatzes', 'Verringerung des Stromverbrauchs'], answer: 2, explanation: 'Dual-Channel ermöglicht den parallelen Zugriff auf zwei RAM-Module, was den Datendurchsatz zwischen RAM und Speichercontroller erhöht.' },
        { id: 'storage_q1_hw', category: 'hardware-komponenten', question: 'Welcher Speichertyp zeichnet sich durch mechanisch bewegliche Teile aus und bietet oft hohe Kapazitäten zu geringeren Kosten?', choices: ['SSD (Solid State Drive)', 'NVMe SSD', 'HDD (Hard Disk Drive)', 'M.2 SSD'], answer: 2, explanation: 'HDDs verwenden rotierende magnetische Platten und Schreib-/Leseköpfe, sind mechanisch und bieten oft viel Speicherplatz günstiger als SSDs.'},
        { id: 'mb_q1_hw', category: 'hardware-komponenten', question: 'Welche Komponente auf dem Mainboard ist für die Aufnahme der CPU zuständig?', choices: ['Chipsatz', 'RAM-Bänke', 'CPU-Sockel', 'PCIe-Steckplatz'], answer: 2, explanation: 'Der CPU-Sockel ist die physische Schnittstelle auf dem Mainboard, in die die CPU eingesetzt wird.'},
        { id: 'gpu_q1_hw', category: 'hardware-komponenten', question: 'Was ist die primäre Funktion einer GPU (Graphics Processing Unit)?', choices: ['Verwaltung des Netzwerkverkehrs', 'Berechnung von komplexen mathematischen Operationen für allgemeine Zwecke', 'Berechnung und Ausgabe von Grafikdaten', 'Speicherung des Betriebssystems'], answer: 2, explanation: 'Die GPU ist spezialisiert auf die schnelle Berechnung von Grafikdaten zur Darstellung auf einem Monitor.'},
        { id: 'bios_q1_hw', category: 'hardware-komponenten', question: 'Was ist der Hauptunterschied zwischen BIOS und UEFI?', choices: ['BIOS ist neuer', 'UEFI bietet grafische Benutzeroberfläche und unterstützt größere Festplatten', 'BIOS ist schneller', 'UEFI ist nur für Server'], answer: 1, explanation: 'UEFI ist moderner, bietet eine grafische Oberfläche und unterstützt Festplatten größer als 2,2 TB.' },
        { id: 'psu_q1_hw', category: 'hardware-komponenten', question: 'Was bedeutet der 80 PLUS Standard bei Netzteilen?', choices: ['Garantie für 80 Jahre', '80% Effizienz bei verschiedenen Lasten', '80 Watt maximale Leistung', '80°C maximale Temperatur'], answer: 1, explanation: '80 PLUS zertifiziert Netzteile mit mindestens 80% Effizienz bei 20%, 50% und 100% Last.' },
        { id: 'interface_q1_hw', category: 'hardware-komponenten', question: 'Welche Schnittstelle bietet die höchste Datenübertragungsrate?', choices: ['USB 3.0', 'SATA III', 'PCIe 4.0 x16', 'Ethernet Gigabit'], answer: 2, explanation: 'PCIe 4.0 x16 bietet mit bis zu 32 GB/s die höchste Übertragungsrate der genannten Optionen.' },
        { id: 'cooling_q1_hw', category: 'hardware-komponenten', question: 'Welches Kühlsystem ist für High-End-CPUs am effektivsten?', choices: ['Passivkühlung', 'Luftkühlung mit großem Kühler', 'Wasserkühlung (AiO oder Custom)', 'Lüfter direkt auf der CPU'], answer: 2, explanation: 'Wasserkühlung bietet die beste Kühlleistung für leistungsstarke CPUs, besonders bei Übertaktung.' },
        { id: 'form_q1_hw', category: 'hardware-komponenten', question: 'Welcher Formfaktor ist für Mini-ITX-Systeme charakteristisch?', choices: ['Große Mainboards mit vielen Erweiterungsslots', 'Kompakte 17x17cm Mainboards', 'Server-Mainboards', 'Mainboards nur für Laptops'], answer: 1, explanation: 'Mini-ITX-Mainboards sind 170 x 170 mm groß und für kompakte Systeme konzipiert.' },
        { id: 'conn_q1_hw', category: 'hardware-komponenten', question: 'Welcher Anschluss wird für moderne externe Displays bevorzugt verwendet?', choices: ['VGA', 'DVI', 'DisplayPort/HDMI', 'Composite'], answer: 2, explanation: 'DisplayPort und HDMI sind moderne digitale Standards, die hohe Auflösungen und Bildwiederholraten unterstützen.' }
      ]
    }
  },
  // ###################################################################################################
  {
    wissensbausteinId: "LF2_wirtschaftlichkeitsanalyse",
    titel: "Wirtschaftlichkeit",
    lernfeld: 2,
    dependencies: ["LF2_hardware_komponenten"],
    difficulty: 3,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Bewerte IT-Investitionen mit Kennzahlen wie Total Cost of Ownership (TCO), Return on Investment (ROI) und der Amortisationszeit. Verstehe den Unterschied zwischen CAPEX und OPEX."
    },

    anwenden: {
      anleitung: "Simuliere eine einfache TCO-Berechnung für eine Server-Anschaffung.",
      /**
       * Berechnet die TCO über 3 Jahre.
       * @param {object} config - z.B. { anschaffung: 5000, stromkostenProJahr: 400, wartungProJahr: 600 }
       * @returns {string} Das TCO-Ergebnis.
       */
      simulation: function(config) {
        const { anschaffung, stromkostenProJahr, wartungProJahr } = config;
        if (isNaN(anschaffung) || isNaN(stromkostenProJahr) || isNaN(wartungProJahr)) {
          return "Bitte geben Sie gültige Zahlen ein.";
        }
        const laufendeKostenProJahr = stromkostenProJahr + wartungProJahr;
        const laufendeKostenGesamt = 3 * laufendeKostenProJahr;
        const tco = anschaffung + laufendeKostenGesamt;
        const laufendeKostenAnteil = ((laufendeKostenGesamt / tco) * 100).toFixed(1);

        // Die ursprüngliche simulation-Funktion hatte einen Syntaxfehler in der Rückgabe:
        // Ein Teil des Strings war abgeschnitten und endete mit einem Kommentar.
        // Dies wurde korrigiert, um eine vollständige und korrekte Ausgabe zu gewährleisten.
        return `TCO-Analyse über 3 Jahre:
--------------------------
1. Investitionskosten (CAPEX):
   - Anschaffung: ${anschaffung.toLocaleString('de-DE')} €
2. Laufende Kosten (OPEX) über 3 Jahre:
   - Stromkosten: ${(stromkostenProJahr * 3).toLocaleString('de-DE')} €
   - Wartungskosten: ${(wartungProJahr * 3).toLocaleString('de-DE')} €
   - Gesamte laufende Kosten: ${laufendeKostenGesamt.toLocaleString('de-DE')} €

Gesamt-TCO über 3 Jahre: **${tco.toLocaleString('de-DE')} €**

Fazit: Die laufenden Kosten machen ca. ${laufendeKostenAnteil}% der Gesamtkosten aus. Eine Investition in energieeffizientere Hardware kann sich langfristig lohnen.`;
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'tco_q1', category: 'wirtschaftlichkeitsanalyse', question: 'Welche Kostenkategorie macht oft den größten Anteil an den Total Cost of Ownership (TCO) einer IT-Anschaffung aus?', choices: ['Anschaffungskosten der Hardware', 'Software-Lizenzkosten', 'Betriebs- und Personalkosten über die Nutzungsdauer', 'Schulungskosten für Mitarbeiter'], answer: 2, explanation: 'Die laufenden Betriebs- und Personalkosten können über die Lebensdauer einer IT-Anschaffung die initialen Anschaffungskosten deutlich übersteigen.' },
        { id: 'roi_q1', category: 'wirtschaftlichkeitsanalyse', question: 'Wie ist der Return on Investment (ROI) definiert?', choices: ['(Investitionskosten / Gewinn) * 100', '(Gewinn / Investitionskosten) * 100', '(Gewinn - Investitionskosten) / Gewinn', 'Investitionskosten / Nutzungsdauer'], answer: 1, explanation: 'Der ROI setzt den Gewinn ins Verhältnis zu den Investitionskosten, oft als Prozentsatz ausgedrückt.' },
        { id: 'amort_q1', category: 'wirtschaftlichkeitsanalyse', question: 'Was beschreibt die Amortisationszeit einer Investition?', choices: ['Den Gesamtgewinn der Investition', 'Die jährliche Rendite', 'Den Zeitpunkt, ab dem die Investition Gewinn abwirft', 'Den Zeitraum, bis die kumulierten Erträge die Investitionskosten decken'], answer: 3, explanation: 'Die Amortisationszeit gibt an, wann eine Investition sich selbst "bezahlt" gemacht hat.' },
        { id: 'mob_q1', category: 'wirtschaftlichkeitsanalyse', question: 'Welches Kriterium ist bei einer Make-or-Buy-Entscheidung typischerweise NICHT direkt ausschlaggebend?', choices: ['Kosten der Eigenfertigung vs. Fremdbezug', 'Verfügbarkeit von internem Know-how', 'Markenimage des potenziellen Lieferanten', 'Strategische Bedeutung der Leistung für das Unternehmen'], answer: 2, explanation: 'Das Markenimage des Lieferanten spielt eine untergeordnete Rolle im Vergleich zu Kosten, Know-how und strategischer Bedeutung.' },
        { id: 'ek_q1', category: 'wirtschaftlichkeitsanalyse', question: 'Welche Einheit wird typischerweise zur Abrechnung von Stromkosten verwendet?', choices: ['Watt (W)', 'Kilowattstunde (kWh)', 'Volt (V)', 'Ampere (A)'], answer: 1, explanation: 'Stromkosten werden üblicherweise pro Kilowattstunde (kWh) berechnet, was die Leistung über die Zeit berücksichtigt.' },
        { id: 'lease_q1_wa', category: 'wirtschaftlichkeitsanalyse', question: 'Welcher Vorteil spricht für Leasing statt Kauf von IT-Ausrüstung?', choices: ['Geringerer Gesamtaufwand', 'Sofortiges Eigentum', 'Geringerer Kapitalbedarf zum Anschaffungszeitpunkt', 'Keine Vertragsbindung'], answer: 2, explanation: 'Leasing erfordert weniger Kapital zum Zeitpunkt der Anschaffung und ermöglicht gleichmäßige Raten.' },
        { id: 'abc_q1_wa', category: 'wirtschaftlichkeitsanalyse', question: 'Was charakterisiert A-Güter in der ABC-Analyse?', choices: ['Niedrige Kosten, große Menge', 'Hoher Wert, geringe Menge', 'Mittlerer Wert, mittlere Menge', 'Konstante Nachfrage'], answer: 1, explanation: 'A-Güter repräsentieren ca. 80% des Werts bei nur 20% der Menge (Pareto-Prinzip).' },
        { id: 'capex_q1_wa', category: 'wirtschaftlichkeitsanalyse', question: 'Was versteht man unter CAPEX?', choices: ['Betriebsausgaben', 'Kapitalausgaben/Investitionen', 'Personalkosten', 'Mietkosten'], answer: 1, explanation: 'CAPEX (Capital Expenditures) sind Investitionsausgaben für langlebige Wirtschaftsgüter.' },
        { id: 'opex_q1_wa', category: 'wirtschaftlichkeitsanalyse', question: 'Cloud Computing wird oft als OPEX-Modell bezeichnet. Was bedeutet das?', choices: ['Hohe Anfangsinvestitionen', 'Laufende Betriebskosten statt Kapitalausgaben', 'Nur einmalige Zahlung', 'Kostenlose Nutzung'], answer: 1, explanation: 'OPEX (Operational Expenditures) sind laufende Betriebskosten, was dem Pay-as-you-use-Modell der Cloud entspricht.' },
        { id: 'npv_q1_wa', category: 'wirtschaftlichkeitsanalyse', question: 'Was berücksichtigt der Kapitalwert (NPV) bei Investitionsentscheidungen?', choices: ['Nur die Anschaffungskosten', 'Den Zeitwert des Geldes durch Diskontierung', 'Nur die Betriebskosten', 'Die Inflation'], answer: 1, explanation: 'Der Net Present Value (NPV) diskontiert zukünftige Cashflows auf den heutigen Wert und berücksichtigt damit den Zeitwert des Geldes.' },
        { id: 'breakeven_q1_wa', category: 'wirtschaftlichkeitsanalyse', question: 'Was zeigt der Break-Even-Point an?', choices: ['Den maximalen Gewinn', 'Den Punkt, wo Erlöse gleich Kosten sind', 'Die optimale Produktionsmenge', 'Den Verkaufspreis'], answer: 1, explanation: 'Der Break-Even-Point ist der Punkt, an dem die Gesamterlöse die Gesamtkosten decken (Gewinn = 0).' },
        { id: 'risk_q1_wa', category: 'wirtschaftlichkeitsanalyse', question: 'Welche Methode wird für die quantitative Risikobewertung verwendet?', choices: ['Einfache Auflistung', 'Risikomatrix (Eintrittswahrscheinlichkeit × Auswirkung)', 'Brainstorming', 'Experteninterviews'], answer: 1, explanation: 'Die Risikomatrix multipliziert Eintrittswahrscheinlichkeit mit der Schadenshöhe für eine quantitative Bewertung.' }
      ]
    }
  },
  // ... (Restlicher Code bis zum Ende der Datei) ...
  {
    wissensbausteinId: "LF2_bios_betriebssysteme",
    titel: "BIOS & OS",
    lernfeld: 2,
    dependencies: ["LF2_wirtschaftlichkeitsanalyse"],
    difficulty: 2,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Verstehe die Funktionsweise von BIOS/UEFI und die Grundlagen von Betriebssystemen. Lerne den Boot-Prozess, wichtige Einstellungen wie Secure Boot und Init-Systeme wie systemd kennen."
    },

    anwenden: {
      anleitung: "Simuliere die Auswirkung einer UEFI-Einstellung auf den Boot-Prozess.",
      /**
       * Beschreibt das Ergebnis einer UEFI-Einstellung.
       * @param {object} config - z.B. { setting: 'SecureBoot', enabled: true }
       * @returns {string} Eine Beschreibung des Systemverhaltens.
       */
      simulation: function(config) {
        if (config.setting === 'SecureBoot') {
          return config.enabled ?
            `Einstellung: Secure Boot AKTIVIERT
--------------------------------
Folge: Nur Betriebssysteme mit einem gültigen, signierten Bootloader können gestartet werden.
Vorteil: Hoher Schutz vor Boot-Viren und Rootkits.
Nachteil: Alternative Betriebssysteme (z.B. manche Linux-Distributionen) starten evtl. nicht ohne manuelle Konfiguration.

Empfehlung: Für Standard-Windows-Installationen und maximale Sicherheit aktiviert lassen.` :
            `Einstellung: Secure Boot DEAKTIVIERT
----------------------------------
Folge: Das System prüft keine Signaturen beim Booten. Jedes Betriebssystem kann gestartet werden.
Vorteil: Maximale Kompatibilität, auch mit älteren oder unsignierten Betriebssystemen.
Nachteil: Erhöhtes Sicherheitsrisiko durch mögliche Manipulation des Boot-Prozesses.

Empfehlung: Nur deaktivieren, wenn es für ein bestimmtes Betriebssystem zwingend erforderlich ist.`;
        } else if (config.setting === 'CSM') {
          return config.enabled ?
            `Einstellung: Compatibility Support Module (CSM) AKTIVIERT
------------------------------------------------------
Folge: Das UEFI emuliert ein altes BIOS (Legacy Boot). Secure Boot ist dadurch automatisch deaktiviert.
Vorteil: Ermöglicht das Booten von sehr alten Betriebssystemen, die kein UEFI unterstützen.
Nachteil: Langsamerer und unsicherer Boot-Prozess.

Empfehlung: Nur aktivieren, wenn absolut notwendig. Moderne Systeme sollten im reinen UEFI-Modus laufen.` :
            `Einstellung: Compatibility Support Module (CSM) DEAKTIVIERT
-------------------------------------------------------
Folge: Das System bootet im reinen UEFI-Modus.
Vorteil: Schnellerer und sichererer Systemstart. Ermöglicht die Nutzung von Features wie Secure Boot.
Nachteil: Ältere Betriebssysteme können nicht mehr gestartet werden.

Empfehlung: Dies ist die Standardeinstellung für alle modernen Betriebssysteme.`;
        }
        return "Unbekannte Einstellung.";
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'bio1', category: 'bios-betriebssysteme', question: 'Welches Tastenkürzel ruft auf vielen Mainboards das UEFI‑Setup auf?', choices: ['Entf', 'F8', 'F12', 'Strg+Alt+Esc'], answer: 0, explanation: 'Die Entf‑Taste (Del) ist Branchenstandard, F2 bei Notebooks.' },
        { id: 'bio2', category: 'bios-betriebssysteme', question: 'Wofür steht die Abkürzung UEFI?', choices: ['Unified Extensible Firmware Interface', 'Universal EFI', 'Unified Executable Firmware Init', 'Ultra Efficient Firmware Interface'], answer: 0, explanation: '' },
        { id: 'bio3', category: 'bios-betriebssysteme', question: 'Welche Partitionstabelle wird für natives UEFI‑Booten benötigt?', choices: ['GPT', 'MBR', 'LVM', 'APFS'], answer: 0, explanation: 'GUID Partition Table ersetzt die alte MBR‑Struktur für UEFI.' },
        { id: 'bio4', category: 'bios-betriebssysteme', question: 'Wo speichert das System die Boot‑Reihenfolge im UEFI?', choices: ['NVRAM', 'CMOS‑RTC', 'TPM', 'Boot.ini'], answer: 0, explanation: '' },
        { id: 'bio5', category: 'bios-betriebssysteme', question: 'Was bewirkt die Option „Secure Boot“ im UEFI?', choices: ['Nur signierte Bootloader dürfen starten', 'Das BIOS‑Setup wird mit Passwort geschützt', 'Übertaktung wird verhindert', 'Der Fast‑Boot wird aktiviert'], answer: 0, explanation: '' },
        { id: 'bio6', category: 'bios-betriebssysteme', question: 'Welches Init‑System ist in den meisten Linux‑Distributionen seit 2015 Standard?', choices: ['systemd', 'SysV‑init', 'OpenRC', 'launchd'], answer: 0, explanation: '' },
        { id: 'bio7', category: 'bios-betriebssysteme', question: 'Welche Datei enthält unter Linux meist den Kernel?', choices: ['/boot/vmlinuz-*', '/etc/kernel.conf', '/var/lib/kernel.img', '/root/vmlinuz'], answer: 0, explanation: '' },
        { id: 'bio8', category: 'bios-betriebssysteme', question: 'Wie lautet der Befehl, um in Windows die Bootkonfigurationsdatenbank zu bearbeiten?', choices: ['bcdedit', 'bootcfg', 'msconfig', 'diskpart'], answer: 0, explanation: '' },
        { id: 'bio9', category: 'bios-betriebssysteme', question: 'Welche Firmware‑Einstellung muss aktiviert sein, um Virtualisierung (VT‑x) zu nutzen?', choices: ['Intel VT‑x/AMD‑V', 'Legacy USB', 'Fast Boot', 'NX‑Bit'], answer: 0, explanation: '' },
        { id: 'bio10', category: 'bios-betriebssysteme', question: 'Wie heißt der Windows‑Modus, der nur Kernkomponenten lädt?', choices: ['Abgesicherter Modus', 'Benutzerdefinierter Start', 'Sichere Sitzung', 'Diagnosemodus'], answer: 0, explanation: '' },
        { id: 'bio11', category: 'bios-betriebssysteme', question: 'Womit wird unter Linux der Systemstart‑Prozess im laufenden Betrieb neu geladen?', choices: ['systemctl daemon-reload', 'init 6', 'reboot -f', 'grub‑update'], answer: 0, explanation: '' },
        { id: 'bio12', category: 'bios-betriebssysteme', question: 'Welche Option im BIOS/UEFI ermöglicht das Booten von älteren Betriebssystemen ohne UEFI‑Unterstützung?', choices: ['Legacy Boot/CSM', 'Fast Boot', 'PXE‑Boot', 'DriveLock'], answer: 0, explanation: '' }
      ]
    }
  },
  {
    wissensbausteinId: "LF2_boss_work_economy",
    titel: "Meilenstein-Prüfung: Arbeitsplätze & Wirtschaftlichkeit",
    lernfeld: 2,
    dependencies: ["LF2_bios_betriebssysteme"],
    difficulty: 4,
    estimatedDurationMinutes: 20,

    lernen: {
      beschreibung: "Beweise dein Wissen über Hardware, Wirtschaftlichkeitsanalysen und Betriebssystem-Grundlagen in dieser Meilenstein-Prüfung."
    },

    anwenden: {
      anleitung: "Simuliere eine Investitionsentscheidung (Kauf vs. Leasing) für 50 neue Office-PCs.",
      /**
       * Vergleicht die Gesamtkosten von Kauf und Leasing über 3 Jahre.
       * @param {object} config - z.B. { kaufpreisProPC: 800, leasingrateProMonat: 30, restwertProPC: 150 }
       * @returns {string} Eine Empfehlung basierend auf den Gesamtkosten.
       */
      simulation: function(config) {
        const anzahlPCs = 50;
        const kaufAnschaffung = anzahlPCs * config.kaufpreisProPC;
        const kaufRestwert = anzahlPCs * config.restwertProPC;
        const kaufKosten = kaufAnschaffung - kaufRestwert;
        const leasingKosten = anzahlPCs * config.leasingrateProMonat * 36;
        const differenz = Math.abs(kaufKosten - leasingKosten);
        const gewinner = kaufKosten < leasingKosten ? 'Kauf' : 'Leasing';

        return `Investitionsentscheidung: Kauf vs. Leasing für 50 PCs über 3 Jahre
------------------------------------------------------------------
Kauf-Analyse:
- Anschaffungskosten (CAPEX): ${kaufAnschaffung.toLocaleString('de-DE')} €
- Geschätzter Restwert nach 3 J.: ${kaufRestwert.toLocaleString('de-DE')} €
- Effektive Kosten (Kauf): ${kaufKosten.toLocaleString('de-DE')} €

Leasing-Analyse:
- Leasingrate gesamt pro Monat: ${(anzahlPCs * config.leasingrateProMonat).toLocaleString('de-DE')} €
- Gesamtkosten Leasing (OPEX): ${leasingKosten.toLocaleString('de-DE')} €
------------------------------------------------------------------
Fazit: Bei diesen Konditionen ist **${gewinner}** um ${differenz.toLocaleString('de-DE')} € günstiger.
Zusätzliche Überlegung: Leasing schont die Liquidität, während Kauf das Anlagevermögen erhöht.`;
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'we_boss_q1', category: 'boss-work-economy', question: 'Ein Upgrade von 100 Office-PCs reduziert den durchschnittlichen Stromverbrauch pro Gerät von 70 W auf 45 W (8 h Betrieb, 220 Tage/Jahr, 0,32 €/kWh). Wie hoch ist die jährliche Ersparnis?', choices: ['≈ 5 400 €', '≈ 8 480 €', '≈ 12 320 €', '≈ 15 600 €'], answer: 1, explanation: 'ΔP = 25 W → 0,025 kW × 8 h × 220 d × 100 × 0,32 € ≈ 8 480 €.' },
        { id: 'we_boss_q2', category: 'boss-work-economy', question: 'Welche BIOS‑Einstellung muss für die Installation eines modernen NVMe‑OS zwingend aktiviert sein?', choices: ['Legacy CSM', 'UEFI‑Boot & GPT', 'Secure Boot deaktivieren', 'ACPI S3'], answer: 1, explanation: 'NVMe‑Boot benötigt UEFI mit GPT‑Partitionierung.' },
        { id: 'we_boss_q3', category: 'boss-work-economy', question: 'Die ABC‑Analyse zeigt, dass 10 % der Ersatzteile 75 % des Kapitalbindungswerts ausmachen. Welchen dispositiven Schluss ziehst du?', choices: ['Aufstockung der Lagerbestände dieser Teile', 'Reduktion der Sicherheitsbestände, enges Lieferanten‑VMI', 'Keine Änderung, da Ersatzteile kritisch', 'Ersatz durch günstigere Alternativteile'], answer: 1, explanation: 'Hoher Kapitalbindungsanteil → just‑in‑time / Vendor‑Managed‑Inventory senkt Lagerkosten.' },
        { id: 'we_boss_q4', category: 'boss-work-economy', question: 'Welches Abschreibungsverfahren generiert **die höchste Kostenbelastung im ersten Jahr** für einen 120 000 €‑Server (Nutzungsdauer 5 J.)?', choices: ['Lineare AfA', 'Doppelt‑degressive AfA', 'Leistungsabschreibung', 'Sum-of-Years-Digits'], answer: 1, explanation: 'Die doppelt‑degressive Methode schreibt in den ersten Jahren am stärksten ab.' },
        { id: 'we_boss_q5', category: 'boss-work-economy', question: 'Welche Kennzahl ist am BESTEN geeignet, um den wirtschaftlichen Nutzen eines Ergonomie‑Programms (höhenverstellbare Tische, Anti‑Fatigue‑Mats) **als Gesundheits‑ROI** darzustellen?', choices: ['Cost‑Benefit‑Ratio', 'Net Present Value (NPV)', 'Return‑on‑Prevention (RoP)', 'Total‑Cost‑of‑Ownership (TCO)'], answer: 2, explanation: 'RoP vergleicht Präventionskosten mit vermiedenen Krankheits‑/ Ausfallkosten.' },
        { id: 'we_boss_q6', category: 'boss-work-economy', question: 'Eine SSD hat eine MTBF von 1,8 Mio. h, eine HDD 0,8 Mio. h. Bei 500 Laufwerken im Dauerbetrieb (24 h) liegt die erwartete **Ausfallrate pro Jahr** der SSDs bei …', choices: ['≈ 2,4 Geräten', '≈ 4,9 Geräten', '≈ 12,2 Geräten', '≈ 15,8 Geräten'], answer: 1, explanation: 'λ = 1/MTBF; λ_SSD = 5,56 × 10⁻⁷ h⁻¹ → 500×24×365×λ ≈ 4,9 Ausfälle/Jahr.' },
        { id: 'we_boss_q7', category: 'boss-work-economy', question: 'Welcher Posten gehört NICHT direkt zum **Total Cost of Ownership** eines Arbeitsplatzrechners?', choices: ['Energieverbrauch', 'Erstinstallation & Imaging', 'Versicherung des Bürogebäudes', 'Help‑Desk‑Support'], answer: 2, explanation: 'Gebäudeversicherung ist indirekt und wird gewöhnlich nicht dem TCO einzelner Geräte zugerechnet.' },
        { id: 'we_boss_q8', category: 'boss-work-economy', question: 'Eine VM‑Konsolidierung reduziert 40 physische Hosts auf 6. Lizenzkosten pro Host: 2 500 €/Jahr (Core‑basiert). Wie hoch ist die **jährliche Lizenzersparnis**?', choices: ['27 500 €', '57 500 €', '67 500 €', '85 000 €'], answer: 2, explanation: '(40 − 6) × 2 500 € = 34 × 2 500 € = 85 000 € Lizenzkosten; bei Core‑Reduktion 1,25‑Faktor → ≈ 67 500 €.' },
        { id: 'we_boss_q9', category: 'boss-work-economy', question: 'Welches KPI‑Duo eignet sich, um die **Kapitalbindungsdauer** eines Ersatzteillagers umfassend zu bewerten?', choices: ['Durchschnittliche Lagerreichweite & Umschlaghäufigkeit', 'CPI & SPI', 'Service‑Level‑Agreement & RTO', 'MTBF & MTTR'], answer: 0, explanation: 'Lagerreichweite zeigt Dauer, Umschlaghäufigkeit die Geschwindigkeit der Mittelbindung.' },
        { id: 'we_boss_q10', category: 'boss-work-economy', question: 'Zur Berechnung des **Net Present Value** eines Hardware‑Leasingmodells benötigst du KEINE …', choices: ['Diskontierungsrate', 'Restwertprognose', 'Kapitalbindungs‑Zins', 'Inflationsrate'], answer: 3, explanation: 'Standard‑NPV‑Modelle berücksichtigen Inflation optional, nicht zwingend.' },
        { id: 'we_boss_q11', category: 'boss-work-economy', question: 'Welche österreichische Norm (äquivalent zur DIN EN 894‑1) regelt **ergonomische Anforderungen** an Anzeigen‑ und Bedienelemente?', choices: ['ÖNORM A 2063', 'ÖNORM EN ISO 9241‑110', 'ÖNORM B 1300', 'ÖNORM S 5004'], answer: 1, explanation: 'Die EN ISO 9241‑Serie (hier 9241‑110) definiert Ergonomie von Mensch‑System‑Schnittstellen.' },
        { id: 'we_boss_q12', category: 'boss-work-economy', question: 'Bei einer Kostenvergleichsrechnung zweier Druckertypen werden **kalkulatorische Zinsen** eingerechnet, um …', choices: ['die Steuerlast zu minimieren', 'Kapitalnutzungskosten abzubilden', 'Barwert zu eliminieren', 'Cashflow‑Varianzen zu glätten'], answer: 1, explanation: 'Kalkulatorische Zinsen spiegeln die Opportunitätskosten des gebundenen Kapitals wider.' },
        { id: 'we_boss_q13', category: 'boss-work-economy', question: 'Welches **Lean‑Accounting‑Instrument** eignet sich, um die Auswirkung eines 5S‑Programms auf die Arbeitsplatz‑effizienz zu monetarisieren?', choices: ['Value‑Stream‑Costing', 'Activity‑Based‑Costing', 'Target‑Costing', 'Standard‑Costing'], answer: 0, explanation: 'Value‑Stream‑Costing analysiert ganzheitlich den Kostenfluss entlang des Wertstroms.' },
        { id: 'we_boss_q14', category: 'boss-work-economy', question: 'Welcher deutsche **Arbeitsschutzstandard** definiert Mindestwerte für Beleuchtungsstärken an Bildschirmarbeitsplätzen?', choices: ['DGUV Information 215‑410', 'DIN EN 12464‑1', 'ASR A3.4', 'VDE 0100‑410'], answer: 2, explanation: 'ASR A3.4 „Beleuchtung“ gibt verbindliche Richt‑Luxwerte für Arbeitsstätten vor.' },
        { id: 'we_boss_q15', category: 'boss-work-economy', question: 'Ein Notebook wird in der Cloud‑Datenbank als „Fully Depreciated“ (Restbuchwert = 0) geführt. Welcher **IFRS‑Standard** verlangt trotzdem eine regelmäßige Prüfung auf Wertminderung?', choices: ['IAS 2', 'IAS 16', 'IAS 36', 'IFRS 15'], answer: 2, explanation: 'IAS 36 schreibt Impairment‑Tests für Vermögenswerte vor – auch wenn diese bilanziell abgeschrieben sind.' }
      ]
    }
  },

  // =====================================================================================
  // BLOCK 7-9: Netzwerke
  // =====================================================================================
  {
    wissensbausteinId: "LF3_ip_adressierung",
    titel: "IP-Adressierung",
    lernfeld: 3,
    dependencies: ["LF2_boss_work_economy"],
    difficulty: 2,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Meistere die Grundlagen der IP-Adressierung. Lerne, CIDR-Notation zu lesen, Subnetze zu berechnen und die Unterschiede zwischen IPv4 und IPv6 zu verstehen."
    },

    anwenden: {
      anleitung: "Simuliere die Berechnung eines Subnetzes. Gib eine IP-Adresse mit CIDR-Präfix an.",
      /**
       * Berechnet Netz- und Broadcast-Adresse für ein gegebenes Subnetz.
       * @param {object} config - z.B. { ip: '192.168.10.130', cidr: 27 }
       * @returns {string} Die Details des berechneten Subnetzes.
       */
      simulation: function(config) {
        try {
          const ipParts = config.ip.split('.').map(Number);
          const cidr = config.cidr;
          if (ipParts.length !== 4 || ipParts.some(isNaN)) throw new Error("Invalid IP");

          const subnetMask = (0xFFFFFFFF << (32 - cidr)) >>> 0;
          const ipLong = ipParts.reduce((acc, part) => (acc << 8) + part, 0);

          const networkAddressLong = ipLong & subnetMask;
          const broadcastAddressLong = networkAddressLong | (~subnetMask >>> 0);

          const longToIp = (long) => [(long >>> 24) & 255, (long >>> 16) & 255, (long >>> 8) & 255, long & 255].join('.');

          const networkAddr = longToIp(networkAddressLong);
          const broadcastAddr = longToIp(broadcastAddressLong);
          const firstHost = longToIp(networkAddressLong + 1);
          const lastHost = longToIp(broadcastAddressLong - 1);
          const hostCount = Math.pow(2, 32 - cidr) - 2;

          return `Subnetz-Analyse für ${config.ip}/${cidr}:\nNetzwerk: ${networkAddr}\nBroadcast: ${broadcastAddr}\nErster Host: ${firstHost}\nLetzter Host: ${lastHost}\nNutzbare Hosts: ${hostCount}`;
        } catch (e) {
          return "Fehlerhafte Eingabe. Bitte eine gültige IPv4-Adresse und ein CIDR-Präfix (1-32) angeben.";
        }
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'cidr_q1', category: 'ip-adressierung', question: 'Was gibt die Zahl hinter dem Schrägstrich in der CIDR-Notation (z.B. /24) an?', choices: ['Die Anzahl der verfügbaren Host-Adressen', 'Die Anzahl der Bits im Netzanteil der Adresse', 'Die Anzahl der Subnetze', 'Die IP-Protokollversion'], answer: 1, explanation: 'Die CIDR-Notation gibt die Länge des Netzpräfixes in Bits an (z.B. /24 bedeutet 24 Bits für den Netzanteil).' },
        { id: 'privip_q1', category: 'ip-adressierung', question: 'Welcher der folgenden IP-Adressbereiche ist ein privater Adressbereich gemäß RFC 1918?', choices: ['8.8.8.0/24', '172.16.0.0/12', '203.0.113.0/24', '1.1.1.1/32'], answer: 1, explanation: '172.16.0.0 bis 172.31.255.255 ist einer der privaten IP-Adressbereiche.' },
        { id: 'sub_q1', category: 'ip-adressierung', question: 'Was ist ein Hauptgrund für Subnetting?', choices: ['Erhöhung der Gesamtanzahl an IP-Adressen im Internet', 'Vergrößerung von Broadcast-Domänen', 'Effizientere Nutzung des zugewiesenen Adressraums und kleinere Broadcast-Domänen', 'Vereinfachung der IP-Adressvergabe'], answer: 2, explanation: 'Subnetting unterteilt ein großes Netz in kleinere, handhabbare Teilnetze, was die Adressnutzung optimiert und Broadcast-Domänen verkleinert.' },
        { id: 'bcast_q1', category: 'ip-adressierung', question: 'Welche IP-Adresse in einem Subnetz ist typischerweise die Broadcast-Adresse?', choices: ['Die erste Adresse des Subnetzes', 'Die letzte Adresse des Subnetzes', 'Eine zufällige Adresse im Subnetz', 'Die Adresse des Routers'], answer: 1, explanation: 'Die Broadcast-Adresse ist in der Regel die höchste (letzte) Adresse im Adressbereich eines Subnetzes.' },
        { id: 'ipv6_q1', category: 'ip-adressierung', question: 'Welcher IPv6-Adresstyp wird verwendet, um ein Paket an die nächstgelegene Schnittstelle (gemessen an der Routing-Distanz) einer Gruppe von Schnittstellen zu senden?', choices: ['Unicast', 'Multicast', 'Anycast', 'Broadcast (in IPv6 nicht so verwendet)'], answer: 2, explanation: 'Anycast-Adressen ermöglichen es, dass ein Paket an den "nächsten" von mehreren möglichen Empfängern zugestellt wird.' },
        { id: 'ipv6_linklocal_q1', category: 'ip-adressierung', question: 'Welches Präfix kennzeichnet IPv6-Link-Local-Adressen?', choices: ['fe80::/64', 'fc00::/7', '2001::/32', 'ff00::/8'], answer: 0, explanation: 'Link-Local-Adressen beginnen mit dem Präfix fe80::/64 und sind nur im lokalen Netz gültig.' },
        { id: 'nat_q1_ip', category: 'ip-adressierung', question: 'Welches Problem löst NAT (Network Address Translation) primär?', choices: ['Erhöhung der Übertragungsgeschwindigkeit', 'Knappheit öffentlicher IPv4-Adressen', 'Verbesserung der Netzwerksicherheit', 'Reduktion der Latenz'], answer: 1, explanation: 'NAT ermöglicht es mehreren Geräten mit privaten IP-Adressen, eine öffentliche IP-Adresse zu teilen.' },
        { id: 'vlsm_q1_ip', category: 'ip-adressierung', question: 'Was ermöglicht VLSM (Variable Length Subnet Masking)?', choices: ['Verwendung verschiedener Subnetzmasken im gleichen Netzwerk', 'Erhöhung der IP-Adressen-Anzahl', 'Automatische IP-Vergabe', 'Verschlüsselung von IP-Paketen'], answer: 0, explanation: 'VLSM erlaubt die Verwendung unterschiedlicher Subnetzmasken für verschiedene Subnetze, was eine effizientere Adressnutzung ermöglicht.' },
        { id: 'apipa_q1_ip', category: 'ip-adressierung', question: 'Welcher Adressbereich wird für APIPA (Automatic Private IP Addressing) verwendet?', choices: ['192.168.0.0/16', '10.0.0.0/8', '169.254.0.0/16', '172.16.0.0/12'], answer: 2, explanation: 'APIPA verwendet den Bereich 169.254.0.0/16 für automatische IP-Konfiguration, wenn kein DHCP-Server verfügbar ist.' },
        { id: 'multicast_q1_ip', category: 'ip-adressierung', question: 'Welcher IPv4-Adressbereich ist für Multicast reserviert?', choices: ['224.0.0.0 bis 239.255.255.255', '240.0.0.0 bis 255.255.255.255', '192.0.0.0 bis 223.255.255.255', '127.0.0.0 bis 127.255.255.255'], answer: 0, explanation: 'Klasse D (224.0.0.0/4) ist für Multicast-Adressen reserviert.' },
        { id: 'ipv6_global_q1_ip', category: 'ip-adressierung', question: 'Wie ist eine IPv6-Adresse typischerweise strukturiert?', choices: ['32 Bit in 4 Oktetten', '128 Bit in 8 Hexadezimal-Blöcken', '64 Bit in 8 Oktetten', '256 Bit in 16 Blöcken'], answer: 1, explanation: 'IPv6-Adressen sind 128 Bit lang und werden als 8 Gruppen von je 4 Hexadezimalziffern dargestellt.' },
        { id: 'ipv6_auto_q1_ip', category: 'ip-adressierung', question: 'Was ermöglicht SLAAC (Stateless Address Autoconfiguration) in IPv6?', choices: ['Statische IP-Zuweisung', 'Automatische IP-Konfiguration ohne DHCP-Server', 'Verschlüsselung der Kommunikation', 'Load Balancing'], answer: 1, explanation: 'SLAAC ermöglicht es IPv6-Geräten, sich automatisch IP-Adressen zu konfigurieren, ohne einen DHCP-Server zu benötigen.' }
      ]
    }
  },
  {
    wissensbausteinId: "LF3_netzwerkkomponenten",
    titel: "Netzwerk-Komponenten",
    lernfeld: 3,
    dependencies: ["LF3_ip_adressierung"],
    difficulty: 2,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Lerne die Unterschiede und Funktionen von Hubs, Switches und Routern. Verstehe, auf welcher OSI-Schicht sie arbeiten und welche Adressen sie verwenden (MAC vs. IP)."
    },

    anwenden: {
      anleitung: "Simuliere, wie verschiedene Netzwerkkomponenten ein Datenpaket behandeln.",
      /**
       * Simuliert die Entscheidung eines Netzwerkgeräts.
       * @param {object} config - z.B. { geraet: 'Switch', zielMAC: 'bekannt', zielIP: 'anderesNetz' }
       * @returns {string} Die Aktion des Geräts.
       */
      simulation: function(config) {
        switch (config.geraet) {
          case 'Hub':
            return `Gerät: Hub (OSI-Schicht 1)
--------------------------
Funktion: Ein Hub ist ein einfacher Signalverstärker.
Aktion: Das eingehende Signal wird an ALLE angeschlossenen Ports weitergeleitet, was zu häufigen Kollisionen führt.
Analyse: Heute technisch überholt und ineffizient.`;
          case 'Switch':
            if (config.zielMAC === 'bekannt') {
              return `Gerät: Switch (OSI-Schicht 2)
--------------------------
Szenario: Ziel-MAC-Adresse ist in der MAC-Tabelle bekannt.
Aktion: Der Switch leitet den Daten-Frame gezielt (Unicast) nur an den Port weiter, an dem die Ziel-MAC-Adresse angeschlossen ist.
Analyse: Effiziente Kommunikation, da keine unnötigen Daten an andere Ports gesendet werden.`;
            }
            return `Gerät: Switch (OSI-Schicht 2)
--------------------------
Szenario: Ziel-MAC-Adresse ist unbekannt.
Aktion: Der Switch kennt die Ziel-MAC nicht und sendet den Frame an alle Ports (Broadcast, außer dem Ursprungsport), um sie zu finden.
Analyse: Sobald das Ziel antwortet, lernt der Switch die MAC-Adresse für zukünftige Pakete.`;
          case 'Router':
            if (config.zielIP === 'gleichesNetz') {
              return `Gerät: Router (OSI-Schicht 3)
--------------------------
Szenario: Ziel-IP-Adresse liegt im selben Subnetz.
Aktion: Ein Router ist hier nicht zuständig. Die Kommunikation findet direkt über den Switch mittels MAC-Adressen statt. Der Router leitet dieses Paket nicht weiter.
Analyse: Router trennen Broadcast-Domänen und agieren an Netzwerkgrenzen.`;
            }
            return `Gerät: Router (OSI-Schicht 3)
--------------------------
Szenario: Ziel-IP-Adresse liegt in einem anderen Netz.
Aktion: Der Router analysiert die Ziel-IP-Adresse des Pakets, schaut in seine Routing-Tabelle und leitet das Paket zum nächsten Hop (z.B. einem anderen Router im Internet) weiter.
Analyse: Dies ist die Kernfunktion des Routings zur Verbindung verschiedener Netzwerke.`;
          default:
            return "Unbekanntes Gerät.";
        }
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'hub_q1', category: 'netzwerkkomponenten', question: 'Auf welcher OSI-Schicht arbeitet ein Hub primär?', choices: ['Schicht 1 (Bitübertragung)', 'Schicht 2 (Sicherung)', 'Schicht 3 (Vermittlung)', 'Schicht 4 (Transport)'], answer: 0, explanation: 'Ein Hub ist ein einfaches Gerät der Schicht 1, das eingehende Signale an alle anderen Ports weiterleitet.' },
        { id: 'switch_q1', category: 'netzwerkkomponenten', question: 'Welche Art von Adressen verwendet ein Switch, um Datenverkehr gezielt an Ports weiterzuleiten?', choices: ['IP-Adressen', 'Port-Nummern', 'MAC-Adressen', 'Hostnamen'], answer: 2, explanation: 'Switches arbeiten auf Schicht 2 und verwenden MAC-Adressen, um Datenframes an den korrekten Port zu senden.' },
        { id: 'router_q1', category: 'netzwerkkomponenten', question: 'Was ist die Hauptaufgabe eines Routers in einem Netzwerk?', choices: ['Verstärkung von Signalen', 'Verbindung von Geräten im selben lokalen Netz', 'Verbindung unterschiedlicher Netzwerke und Weiterleitung von Paketen zwischen ihnen', 'Filterung von MAC-Adressen'], answer: 2, explanation: 'Router verbinden verschiedene Netzwerke (z.B. LANs oder LAN mit WAN) und treffen Weiterleitungsentscheidungen basierend auf IP-Adressen (Schicht 3).' },
        { id: 'stp_q1', category: 'netzwerkkomponenten', question: 'Welches Problem in geswitchten Netzwerken soll das Spanning Tree Protocol (STP) verhindern?', choices: ['Kollisionen', 'Netzwerkschleifen (Loops)', 'Broadcast-Stürme durch Hubs', 'IP-Adresskonflikte'], answer: 1, explanation: 'STP verhindert redundante Pfade in einem geswitchten Netzwerk aktiv zu sein, um Endlosschleifen zu vermeiden.' },
        { id: 'firewall_q1_nk', category: 'netzwerkkomponenten', question: 'Auf welcher OSI-Schicht arbeitet eine klassische Paketfilter-Firewall?', choices: ['Schicht 2', 'Schicht 3 und 4', 'Schicht 7', 'Schicht 1'], answer: 1, explanation: 'Paketfilter-Firewalls analysieren IP-Adressen (Schicht 3) und Ports (Schicht 4).' },
        { id: 'ap_q1_nk', category: 'netzwerkkomponenten', question: 'Was ist die Hauptfunktion eines WLAN Access Points?', choices: ['Verstärkung von Ethernet-Signalen', 'Bereitstellung drahtloser Netzwerkverbindungen', 'Speicherung von Netzwerkkonfigurationen', 'Verschlüsselung aller Netzwerkdaten'], answer: 1, explanation: 'Access Points ermöglichen drahtlosen Geräten den Zugang zu einem kabelgebundenen Netzwerk.' },
        { id: 'load_q1_nk', category: 'netzwerkkomponenten', question: 'Welche Aufgabe erfüllt ein Load Balancer?', choices: ['Erhöhung der Netzwerkgeschwindigkeit', 'Verteilung eingehender Anfragen auf mehrere Server', 'Filterung von Spam-E-Mails', 'Komprimierung von Netzwerkdaten'], answer: 1, explanation: 'Load Balancer verteilen eingehende Anfragen auf mehrere Backend-Server, um die Last zu verteilen und Verfügbarkeit zu erhöhen.' },
        { id: 'proxy_q1_nk', category: 'netzwerkkomponenten', question: 'Was ist eine Hauptfunktion eines Proxy-Servers?', choices: ['Direkter Zugriff auf das Internet', 'Stellvertretender Zugriff und Caching von Inhalten', 'Nur Spam-Filterung', 'Erhöhung der Internetgeschwindigkeit'], answer: 1, explanation: 'Proxy-Server fungieren als Vermittler zwischen Clients und Servern und können Inhalte zwischenspeichern.' },
        { id: 'bridge_q1_nk', category: 'netzwerkkomponenten', question: 'Welche Funktion hat eine Bridge in einem Netzwerk?', choices: ['Verbindung verschiedener Netzwerksegmente auf Schicht 2', 'Routing zwischen verschiedenen Netzwerken', 'Verstärkung von Signalen', 'Zeitserver-Funktion'], answer: 0, explanation: 'Bridges verbinden Netzwerksegmente auf der Sicherungsschicht (Layer 2) und filtern Datenverkehr basierend auf MAC-Adressen.' },
        { id: 'gateway_q1_nk', category: 'netzwerkkomponenten', question: 'Was versteht man unter einem Default Gateway?', choices: ['Den schnellsten Router im Netzwerk', 'Den Router, der Pakete zu unbekannten Zielen weiterleitet', 'Den sichersten Router', 'Den Router mit der niedrigsten IP-Adresse'], answer: 1, explanation: 'Das Default Gateway ist die IP-Adresse des Routers, an den Pakete gesendet werden, wenn das Ziel nicht im lokalen Netz liegt.' },
        { id: 'repeater_q1_nk', category: 'netzwerkkomponenten', question: 'Wozu dient ein Repeater in einem Netzwerk?', choices: ['Filterung von Datenverkehr', 'Verstärkung und Regeneration von Signalen', 'Adressierung von Paketen', 'Verschlüsselung von Daten'], answer: 1, explanation: 'Repeater verstärken schwächer werdende Signale und regenerieren sie, um größere Entfernungen zu überbrücken.' },
        { id: 'nic_q1_nk', category: 'netzwerkkomponenten', question: 'Was identifiziert eine Netzwerkkarte eindeutig im lokalen Netzwerk?', choices: ['IP-Adresse', 'Hostname', 'MAC-Adresse', 'Seriennummer'], answer: 2, explanation: 'Die MAC-Adresse (Media Access Control) ist eine eindeutige Hardware-Kennung jeder Netzwerkkarte.' }
      ]
    }
  },
  {
    wissensbausteinId: "LF3_osi_modell",
    titel: "OSI-Modell",
    lernfeld: 3,
    dependencies: ["LF3_netzwerkkomponenten"],
    difficulty: 3,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Verstehe die sieben Schichten des OSI-Modells und ihre jeweilige Funktion in der Netzwerkkommunikation, von der physischen Übertragung (Layer 1) bis zur Anwendung (Layer 7)."
    },

    anwenden: {
      anleitung: "Simuliere die Datenkapselung (Encapsulation) für eine HTTP-Anfrage.",
      /**
       * Simuliert die Kapselung von Daten durch die OSI-Schichten.
       * @param {object} config - z.B. { daten: 'GET /index.html' }
       * @returns {string} Eine Beschreibung des gekapselten Datenpakets.
       */
      simulation: function(config) {
        let paket = config.daten;
        const schritte = [
          `7. Anwendungsschicht: Die ursprünglichen Daten '${paket}' werden mit einem HTTP-Header versehen.`,
          `6. Darstellungsschicht: Daten werden formatiert (z.B. Zeichenkodierung) und evtl. verschlüsselt (TLS).`,
          `5. Sitzungsschicht: Eine Sitzung zum Server wird aufgebaut und verwaltet.`,
          `4. Transportschicht: Die Daten werden in TCP-Segmente zerlegt. Ein TCP-Header (mit Ports) wird hinzugefügt.`,
          `3. Vermittlungsschicht: Die Segmente werden in IP-Pakete verpackt. Ein IP-Header (mit Quell-/Ziel-IP) wird hinzugefügt.`,
          `2. Sicherungsschicht: Die IP-Pakete werden in Ethernet-Frames gekapselt. Ein MAC-Header und Trailer werden hinzugefügt.`,
          `1. Bitübertragungsschicht: Der Frame wird in einen Bitstrom (0en und 1en) umgewandelt und über das physische Medium (Kabel, WLAN) gesendet.`
        ];

        return `Datenkapselung (Encapsulation) im OSI-Modell:
------------------------------------------------
${schritte.join('\n\n')}`;
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'osi7_q1', category: 'osi-modell', question: 'Welches Protokoll gehört zur Anwendungsschicht (Layer 7) des OSI-Modells?', choices: ['TCP', 'IP', 'HTTP', 'Ethernet'], answer: 2, explanation: 'HTTP (Hypertext Transfer Protocol) ist ein Anwendungsprotokoll, das z.B. für das World Wide Web verwendet wird.' },
        { id: 'osi4_q1', category: 'osi-modell', question: 'Welches Protokoll der Transportschicht (Layer 4) bietet eine verbindungsorientierte, zuverlässige Datenübertragung?', choices: ['UDP', 'IP', 'ICMP', 'TCP'], answer: 3, explanation: 'TCP (Transmission Control Protocol) stellt eine zuverlässige, verbindungsorientierte Kommunikation sicher.' },
        { id: 'osi3_q1', category: 'osi-modell', question: 'Welche Hauptaufgabe hat die Vermittlungsschicht (Layer 3) des OSI-Modells?', choices: ['Fehlererkennung auf der Bitübertragungsschicht', 'Logische Adressierung und Wegfindung (Routing)', 'Aufbau von Sitzungen zwischen Anwendungen', 'Darstellung und Verschlüsselung von Daten'], answer: 1, explanation: 'Layer 3 ist für die logische Adressierung (z.B. IP-Adressen) und das Routing von Datenpaketen durch Netzwerke zuständig.' },
        { id: 'osi2_q1', category: 'osi-modell', question: 'Welche Adressart wird typischerweise auf der Sicherungsschicht (Layer 2) verwendet?', choices: ['IP-Adresse', 'Port-Nummer', 'MAC-Adresse', 'URL'], answer: 2, explanation: 'MAC-Adressen (Media Access Control) werden auf Layer 2 zur eindeutigen Identifizierung von Netzwerkadaptern in einem lokalen Netzwerksegment verwendet.' },
        { id: 'osi1_q1', category: 'osi-modell', question: 'Womit befasst sich die Bitübertragungsschicht (Layer 1) des OSI-Modells hauptsächlich?', choices: ['Logische Adressierung', 'Fehlerkontrolle von Frames', 'Physische Übertragung von Bits über ein Medium', 'Datenkompression'], answer: 2, explanation: 'Layer 1 definiert die elektrischen, mechanischen und physikalischen Spezifikationen für die Übertragung von Rohdaten (Bits).' },
        { id: 'osi6_q1', category: 'osi-modell', question: 'Welche Aufgabe hat die Darstellungsschicht (Layer 6)?', choices: ['Routing von Datenpaketen', 'Datenformatierung, Verschlüsselung und Kompression', 'Fehlererkennung', 'Verbindungsaufbau'], answer: 1, explanation: 'Layer 6 ist verantwortlich für die Darstellung von Daten in einem für die Anwendungsschicht verständlichen Format.' },
        { id: 'osi5_q1', category: 'osi-modell', question: 'Was verwaltet die Sitzungsschicht (Layer 5)?', choices: ['Physische Verbindungen', 'Dialogkontrolle und Sitzungsmanagement', 'IP-Adressen', 'Dateiformate'], answer: 1, explanation: 'Layer 5 steuert den Dialog zwischen Anwendungen und verwaltet Sitzungen (Sessions).' },
        { id: 'tcp_q1_osi', category: 'osi-modell', question: 'Welcher Mechanismus in TCP gewährleistet eine zuverlässige Datenübertragung?', choices: ['Broadcasting', 'Acknowledgments und Sequenznummern', 'Multicast', 'Hub-Funktionalität'], answer: 1, explanation: 'TCP (Transmission Control Protocol) verwendet Acknowledgments (Bestätigungen) und Sequenznummern, um sicherzustellen, dass alle Daten korrekt übertragen werden.' },
        { id: 'udp_q1_osi', category: 'osi-modell', question: 'Welche Eigenschaft charakterisiert UDP im Gegensatz zu TCP?', choices: ['Verbindungsorientiert', 'Zuverlässige Zustellung', 'Verbindungslos und unzuverlässig', 'Automatische Fehlererkennung'], answer: 2, explanation: 'UDP ist ein verbindungsloses, unzuverlässiges Protokoll, das für schnelle Übertragung bei geringem Overhead konzipiert ist.' },
        { id: 'port_q1_osi', category: 'osi-modell', question: 'Welche Standard-Portnummer verwendet HTTPS?', choices: ['80', '21', '443', '25'], answer: 2, explanation: 'HTTPS verwendet standardmäßig Port 443 für sichere HTTP-Verbindungen.' },
        { id: 'icmp_q1_osi', category: 'osi-modell', question: 'Welchen Zweck erfüllt das ICMP-Protokoll?', choices: ['Dateienübertragung', 'Fehlermeldungen und Diagnoseinformationen', 'E-Mail-Versand', 'Webseiten-Auslieferung'], answer: 1, explanation: 'ICMP (Internet Control Message Protocol) übermittelt Fehlermeldungen und Diagnoseinformationen, z.B. bei Ping.' },
        { id: 'encap_q1_osi', category: 'osi-modell', question: 'Was versteht man unter Datenkapselung (Encapsulation) im OSI-Modell?', choices: ['Datenverschlüsselung', 'Hinzufügung von Header-Informationen beim Durchlaufen der Schichten', 'Komprimierung von Daten', 'Aufteilung in kleinere Pakete'], answer: 1, explanation: 'Bei der Kapselung fügt jede OSI-Schicht ihre eigenen Header-Informationen zu den Daten hinzu.' }
      ]
    }
  },
  {
    wissensbausteinId: "LF3_vlan_firewall",
    titel: "VLAN & Firewall",
    lernfeld: 3,
    dependencies: ["LF3_osi_modell"],
    difficulty: 3,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Lerne, wie man Netzwerke mit VLANs logisch segmentiert und mit Firewalls absichert. Verstehe Konzepte wie Trunk-Ports, Access-Ports, DMZ und Stateful Inspection."
    },

    anwenden: {
      anleitung: "Simuliere die Entscheidung einer Firewall-Regel.",
      /**
       * Simuliert eine Firewall-Entscheidung.
       * @param {object} config - z.B. { quelle: 'LAN', ziel: 'WAN', port: 443, action: 'allow' }
       * @returns {string} Das Ergebnis der Regelanwendung.
       */
      simulation: function(config) {
        const regeln = [
          { name: "Allow LAN-to-WAN HTTPS", quelle: 'LAN', ziel: 'WAN', port: 443, action: 'ERLAUBT' },
          { name: "Allow LAN-to-WAN DNS", quelle: 'LAN', ziel: 'WAN', port: 53, action: 'ERLAUBT' },
          { name: "Block DMZ-to-LAN", quelle: 'DMZ', ziel: 'LAN', port: 'any', action: 'VERBOTEN' }
        ];

        for (const regel of regeln) {
          if (regel.quelle === config.quelle && regel.ziel === config.ziel && (regel.port === config.port || regel.port === 'any')) {
            return `Firewall-Entscheidung für Traffic von ${config.quelle} nach ${config.ziel} auf Port ${config.port}:
--------------------------------------------------------------------------
Regel #${regeln.indexOf(regel) + 1} (${regel.name}) trifft zu.
Aktion: **${regel.action}**`;
          }
        }

        return `Firewall-Entscheidung für Traffic von ${config.quelle} nach ${config.ziel} auf Port ${config.port}:
--------------------------------------------------------------------------
Keine spezifische Regel trifft zu.
Aktion: **VERBOTEN (Implizite Default-Deny-Regel)**`;
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'vla1', category: 'vlan-firewall', question: 'Auf welcher OSI‑Schicht arbeitet VLAN‑Tagging (802.1Q)?', choices: ['Layer 2', 'Layer 3', 'Layer 4', 'Layer 1'], answer: 0, explanation: '' },
        { id: 'vla2', category: 'vlan-firewall', question: 'Welches Feld wird in einen Ethernet‑Frame eingefügt, um VLAN‑Informationen zu transportieren?', choices: ['Tag‑Header (4 Byte)', 'FCS‑Checksumme', 'MAC‑Präambel', 'IP‑Header'], answer: 0, explanation: '' },
        { id: 'vla3', category: 'vlan-firewall', question: 'Wie nennt man den Switch‑Port, der mehrere VLANs transportiert?', choices: ['Trunk‑Port', 'Access‑Port', 'Mirror‑Port', 'Edge‑Port'], answer: 0, explanation: '' },
        { id: 'vla4', category: 'vlan-firewall', question: 'Welche VLAN‑ID ist per Standard für das Native VLAN reserviert?', choices: ['1', '0', '4095', '100'], answer: 0, explanation: '' },
        { id: 'vla5', category: 'vlan-firewall', question: 'Welche Firewall‑Technik untersucht den Verbindungszustand und erlaubt nur erwartete Pakete?', choices: ['Stateful Inspection', 'Packet Filtering', 'Proxy‑Firewall', 'Next‑Gen IDS'], answer: 0, explanation: '' },
        { id: 'vla6', category: 'vlan-firewall', question: 'In welcher Reihenfolge werden Regeln in klassischen Firewalls abgearbeitet?', choices: ['Von oben nach unten, erste Treffer', 'Von unten nach oben', 'Alphabetisch', 'Nach Priorität der Ports'], answer: 0, explanation: '' },
        { id: 'vla7', category: 'vlan-firewall', question: 'Welches Protokoll nutzt eine Port‑based Network Access Control (802.1X) meist zur Authentifizierung?', choices: ['EAP', 'SNMP', 'LLDP', 'STP'], answer: 0, explanation: '' },
        { id: 'vla8', category: 'vlan-firewall', question: 'Wie lautet der Begriff für das Verfahren, bei dem externe und interne IP‑Adressen umgesetzt werden?', choices: ['NAT', 'PAT', 'VLAN', 'DHCP'], answer: 0, explanation: '' },
        { id: 'vla9', category: 'vlan-firewall', question: 'Welche Zone einer Firewall trennt internes Netz von externem Internet zur Veröffentlichung von Servern?', choices: ['DMZ', 'LAN', 'WAN', 'SAN'], answer: 0, explanation: '' },
        { id: 'vla10', category: 'vlan-firewall', question: 'Welche Art von Firewall kann Daten auf Anwendungsebene (Layer 7) prüfen?', choices: ['Proxy/Application Firewall', 'Packet Filter', 'Stateful Firewall', 'Circuit‑Level Gateway'], answer: 0, explanation: '' },
        { id: 'vla11', category: 'vlan-firewall', question: 'Was bedeutet „East‑West‑Traffic“ in Rechenzentren?', choices: ['Datenverkehr zwischen Servern im gleichen DC', 'Traffic zum Internet', 'Monitoring‑Traffic', 'Backups zu Cloud'], answer: 0, explanation: '' },
        { id: 'vla12', category: 'vlan-firewall', question: 'Welcher IEEE‑Standard definiert Link Aggregation (LACP), oft in Verbindung mit VLAN‑Trunks?', choices: ['802.3ad', '802.1p', '802.1w', '802.1x'], answer: 0, explanation: '' }
      ]
    }
  },
  {
    wissensbausteinId: "LF3_boss_networks",
    titel: "Meilenstein-Prüfung: Netzwerke",
    lernfeld: 3,
    dependencies: ["LF3_vlan_firewall"],
    difficulty: 4,
    estimatedDurationMinutes: 20,

    lernen: {
      beschreibung: "Beweise dein Wissen in der Netzwerkplanung, Konfiguration und Protokollanalyse. Diese Meilenstein-Prüfung kombiniert Konzepte aus IP-Adressierung, Komponenten, OSI-Modell, VLAN und Firewalls."
    },

    anwenden: {
      anleitung: "Simuliere eine Netzwerk-Design-Entscheidung. Wähle eine Anforderung und erhalte einen Lösungsvorschlag.",
      /**
       * Gibt einen Design-Vorschlag für eine Netzwerkanforderung.
       * @param {object} config - z.B. { anforderung: 'gastnetz' }
       * @returns {string} Der Lösungsvorschlag.
       */
      simulation: function(config) {
        switch (config.anforderung) {
          case 'gastnetz':
            return `Anforderung: Sicheres Gastnetz einrichten.
--------------------------------------------
Lösungsvorschlag:
1. VLAN-Segmentierung: Richten Sie ein separates Gast-VLAN (z.B. VLAN 99) ein.
2. IP-Adressierung: Weisen Sie dem Gast-VLAN ein eigenes Subnetz zu (z.B. 192.168.99.0/24).
3. WLAN-Konfiguration: Erstellen Sie eine dedizierte SSID (z.B. "Firmenname-Gast") und weisen Sie diese dem Gast-VLAN zu.
4. Firewall-Regeln: Konfigurieren Sie eine strikte Regel, die dem Gast-VLAN **NUR** Internetzugriff erlaubt (outbound) und **JEGLICHEN** Zugriff auf interne Produktions-VLANs blockiert.`;
          case 'redundanz':
            return `Anforderung: Hohe Netzwerkverfügbarkeit sicherstellen.
--------------------------------------------
Lösungsvorschlag:
1. Physische Redundanz: Verbinden Sie Switches mit redundanten Kabeln (z.B. im Dreieck oder als Ring).
2. Loop-Prävention: Aktivieren Sie auf allen Switches das Spanning Tree Protocol (STP), idealerweise RSTP (802.1w) für schnellere Konvergenz.
3. Bandbreite & Ausfallsicherheit: Bündeln Sie wichtige Verbindungen (z.B. zwischen Core-Switches) mit Link Aggregation (LACP, 802.3ad).
4. Gateway-Redundanz: Implementieren Sie ein First-Hop Redundancy Protocol (FHRP) wie HSRP oder VRRP für das Default Gateway, damit bei Router-Ausfall ein Backup-Router übernimmt.`;
          case 'voip_qos':
            return `Anforderung: Störungsfreie VoIP-Telefonie gewährleisten.
--------------------------------------------
Lösungsvorschlag:
1. Segmentierung: Richten Sie ein dediziertes Voice-VLAN ein, um VoIP-Traffic vom restlichen Datenverkehr zu trennen.
2. Priorisierung (Layer 2): Konfigurieren Sie auf den Access-Switches das Voice-VLAN, um 802.1p (CoS) Markierungen zu setzen.
3. Priorisierung (Layer 3): Implementieren Sie auf den Routern Quality of Service (QoS). Markieren Sie den Voice-Traffic (z.B. via DSCP EF - Expedited Forwarding) und weisen Sie ihn einer Priority Queue zu.
4. Monitoring: Überwachen Sie Latenz, Jitter und Paketverlust im Voice-VLAN, um Probleme proaktiv zu erkennen.`;
          default:
            return "Unbekannte Anforderung.";
        }
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'net_boss_q1', category: 'boss-networks', question: 'Du sollst ein /20‑Netz für 6 Standorte segmentieren (Bedarf: je 500 Hosts). Welche Subnetzmaske weist du jedem Standort zu?', choices: ['/23', '/22', '/21', '/24'], answer: 1, explanation: '/22 bietet 1022 nutzbare Hosts (≥ 500) - 4× /22 + 2× /23 passt in /20.' },
        { id: 'net_boss_q2', category: 'boss-networks', question: 'Ein Core‑Switch mit Standard‑STP‑Kostenwerten soll **Root Bridge** werden. Welche Änderung ist am effektivsten?', choices: ['Port‑Prioritäten reduzieren', 'Bridge‑ID‑Priorität auf 0x8000 setzen', 'Path‑Cost auf Uplinks erhöhen', 'Bridge‑Priority auf 0x0000 setzen'], answer: 3, explanation: 'Die niedrigste Bridge‑Priority (0x0000) macht das Gerät Root Bridge, unabhängig von Port‑Kosten.' },
        { id: 'net_boss_q3', category: 'boss-networks', question: 'In OSPF werden vier /24‑Netze zu einem /22 zusammengefasst. Welcher **LSA‑Typ** trägt diese Summary in einer Area‑Border‑Router‑Tabelle?', choices: ['Typ 1 Router‑LSA', 'Typ 3 Summary‑LSA', 'Typ 4 ASBR‑LSA', 'Typ 5 External‑LSA'], answer: 1, explanation: 'ABRs erzeugen Typ‑3 Summary‑LSAs zur Netzzusammenfassung zwischen Areas.' },
        { id: 'net_boss_q4', category: 'boss-networks', question: 'QoS‑Richtlinie: VoIP‑Traffic erhält DSCP 46 (EF). Welchen **Scheduling‑Mechanismus** wählst du, um Latenzen < 150 ms sicherzustellen?', choices: ['Weighted Round Robin', 'Strict Priority Queuing', 'Deficit Round Robin', 'Random Early Detection'], answer: 1, explanation: 'Strict‑Priority‑Queuing bietet garantiert bevorzugte Abhandlung latenzkritischer Pakete.' },
        { id: 'net_boss_q5', category: 'boss-networks', question: 'Ein 802.11ac‑Access‑Point nutzt den 5GHz‑Bandplan. Welche **Kanal­kombination** vermeidet Überschneidungen in Europa bei 80 MHz‑Breite am effizientesten?', choices: ['36‑40‑44‑48', '52‑56‑60‑64', '100‑104‑108‑112', '116‑120‑124‑128'], answer: 2, explanation: 'Die DFS‑Kanäle 100‑112 sind in Europa meist frei und überlappen bei 80 MHz nicht.' },
        { id: 'net_boss_q6', category: 'boss-networks', question: 'Ein WAN‑Router setzt **BGP Local Preference = 200** für ausgehenden Traffic. Was bedeutet das für Upstream‑Pfade?', choices: ['Niedrigere Präferenz als Standard, weniger attraktiv', 'Höhere Präferenz, bevorzugter Pfad im AS', 'Wirkt nur auf eingehenden Traffic', 'Überschreibt MED externer Nachbarn'], answer: 1, explanation: 'Innerhalb des AS gilt: Höherer Local Pref wird bevorzugt.' },
        { id: 'net_boss_q7', category: 'boss-networks', question: 'Welche NetFlow‑Version unterstützt **IPv6, MPLS‑Labels und Multicast** in einem Template‑basierten Format?', choices: ['v5', 'v7', 'v9', 'IPFIX (RFC 7011)'], answer: 2, explanation: 'NetFlow v9 war die erste flexible, Template‑basierte Version für IPv6/MPLS.' },
        { id: 'net_boss_q8', category: 'boss-networks', question: 'Wie viele **PoE‑Class 4**‑Endgeräte (30 W) können an einem 24‑Port‑Switch mit 370 W PoE‑Budget maximal vollständig versorgt werden?', choices: ['8', '10', '12', '14'], answer: 2, explanation: '30 W × 12 = 360 W < 370 W‑Budget, 13 Geräte überschreiten 390 W.' },
        { id: 'net_boss_q9', category: 'boss-networks', question: 'Ein IPv6‑Anycast‑DNS‑Dienst nutzt mehrere Standorte. Welcher Mechanismus stellt sicher, dass **das nächstgelegene** Anycast‑Ziel gewählt wird?', choices: ['ICMPv6 Neighbor Solicitation', 'BGP‑Hops‑Attribute', 'IGP‑Metric‑Propagation', 'Hierarchical DNS‑Delegation'], answer: 1, explanation: 'BGP entscheidet anhand kürzester AS‑Pfad‑/Hop‑Metrik, welchen Anycast‑Knoten ein Router annonciert.' },
        { id: 'net_boss_q10', category: 'boss-networks', question: 'Ein **OpenFlow‑Controller** soll VLAN‑basierte Micro‑Segmente automatisch bereitstellen. Welche Flow‑Match‑Felder sind MINDESTENS nötig?', choices: ['Ingress‑Port & Eth‑Type', 'VLAN‑ID & Eth‑Dst', 'Eth‑Src & TCP‑Port', 'IP‑TOS & IPv6‑Flow‑Label'], answer: 1, explanation: 'Für VLAN‑basierte Regeln muss VLAN‑ID matchen; Eth‑Dst selektiert Ziel‑MAC.' },
        { id: 'net_boss_q11', category: 'boss-networks', question: 'RSTP (IEEE 802.1w) konvergiert nach Switch‑Neustart typischerweise in …', choices: ['< 1 s', '2‑3 s', '< 1 s pro Hop, max 6 s', 'Rapid Edge = < 1 s, Backbone = < 3 s'], answer: 3, explanation: 'Edge‑Ports im Rapid Mode ≤ 1 s; Verteilnetze um 2‑3 s.' },
        { id: 'net_boss_q12', category: 'boss-networks', question: 'Zur **Access‑Control** in kabelgebundenen Netzen wird IEEE 802.1X eingesetzt. Welcher EAP‑Typ bietet gegenseitige Authentifizierung ohne Tunnel‑Client‑Zertifikat?', choices: ['EAP‑TLS', 'EAP‑TTLS‑PAP', 'PEAP‑MSCHAPv2', 'EAP‑MD5'], answer: 2, explanation: 'PEAP nutzt einen Server‑Zertifikat‑Tunnel; Client‑Zertifikat nicht zwingend nötig.' },
        { id: 'net_boss_q13', category: 'boss-networks', question: 'Bei Redundanztests fällt der **Secondary‑HSRP‑Router** aus. Welches HSRP‑Feld bestimmt, wer bei gleichem Priority‑Wert Master wird?', choices: ['Standby‑Group‑ID', 'Virtual‑IP', 'Router‑MAC‑Adresse', 'Hello‑Timer'], answer: 2, explanation: 'Bei gleicher Priority gewinnt die höhere MAC‑Adresse (tie‑breaker).' },
        { id: 'net_boss_q14', category: 'boss-networks', question: 'Ein MPLS‑TE‑Tunnel benötigt 50 Mbit/s Bandbreite. Die Reservierung wird **per RSVP‑TE** signalisiert. Welches Objekt enthält die Bandbreitenangabe?', choices: ['LABEL_REQUEST', 'FLOWSPEC', 'SENDER_TSPEC', 'SESSION_ATTRIBUTE'], answer: 2, explanation: 'SENDER_TSPEC beschreibt Bandbreite und Traffic‑Parameter des Senders.' },
        { id: 'net_boss_q15', category: 'boss-networks', question: 'Welche Funktion eines **SD‑WAN‑Edge**‑Geräts ermöglicht unterbrechungsfreien VoIP‑Transport bei Paketverlust auf einer Leitung?', choices: ['Dynamic Path Selection', 'Forward Error Correction (FEC)', 'Header Compression', 'BFD‑Keepalive'], answer: 1, explanation: 'FEC rekonstruiert verlorene Pakete über Redundanzinformationen.' }
      ]
    }
  },

  // =====================================================================================
  // BLOCK 10-12: Sicherheit & Daten
  // =====================================================================================
  {
    wissensbausteinId: "LF4_schutzziele_cia",
    titel: "Schutzziele (CIA)",
    lernfeld: 4,
    dependencies: ["LF3_boss_networks"],
    difficulty: 2,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Verstehe die Kernprinzipien der Informationssicherheit: Vertraulichkeit, Integrität und Verfügbarkeit (CIA-Triade). Lerne die erweiterten Schutzziele wie Authentizität und Nichtabstreitbarkeit kennen."
    },

    anwenden: {
      anleitung: "Simuliere die Auswirkung einer Sicherheitsmaßnahme auf die Schutzziele.",
      /**
       * Beschreibt, welche Schutzziele eine Maßnahme primär stärkt.
       * @param {object} config - z.B. { massnahme: 'Verschlüsselung' }
       * @returns {string} Die primären Auswirkungen auf die Schutzziele.
       */
      simulation: function(config) {
        switch (config.massnahme) {
          case 'Verschlüsselung':
            return `Maßnahme: Verschlüsselung (z.B. mit AES-256)
-----------------------------------------------
Primäres Schutzziel: **VERTROULICHKEIT**
Wirkung: Macht Daten für Unbefugte unlesbar, sowohl bei der Speicherung (at rest) als auch bei der Übertragung (in transit). Ein Angreifer ohne Schlüssel kann mit den Daten nichts anfangen.`;
          case 'Hashing':
            return `Maßnahme: Hashing (z.B. mit SHA-256)
-----------------------------------------------
Primäres Schutzziel: **INTEGRITÄT**
Wirkung: Erstellt eine eindeutige Prüfsumme (Hash) für eine Datei oder einen Datensatz. Jede noch so kleine Änderung an den Originaldaten führt zu einem komplett anderen Hash. So lassen sich Manipulationen sicher erkennen.`;
          case 'Backup':
            return `Maßnahme: Regelmäßige Backups (z.B. 3-2-1-Regel)
-----------------------------------------------
Primäres Schutzziel: **VERFÜGBARKEIT**
Wirkung: Stellt sicher, dass Daten nach einem Verlust (z.B. durch Hardware-Defekt, Ransomware oder menschliches Versagen) schnell wiederhergestellt werden können, um den Geschäftsbetrieb aufrechtzuerhalten.`;
          case 'DigitaleSignatur':
            return `Maßnahme: Digitale Signatur (z.B. mit RSA)
-----------------------------------------------
Primäre Schutzziele: **AUTHENTIZITÄT** und **NICHTABSTREITBARKEIT**
Wirkung: Bestätigt zweifelsfrei die Herkunft (Authentizität) einer Nachricht oder Datei. Der Absender kann später nicht leugnen (Nichtabstreitbarkeit), die Nachricht verschickt zu haben. Sichert auch die Integrität.`;
          default:
            return "Unbekannte Maßnahme.";
        }
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'cia_v_q1', category: 'schutzziele-cia', question: 'Was bedeutet "Vertraulichkeit" als Schutzziel in der IT-Sicherheit?', choices: ['Daten sind jederzeit abrufbar', 'Daten sind unverändert und korrekt', 'Daten sind nur für autorisierte Personen zugänglich', 'Die Herkunft der Daten ist nachweisbar'], answer: 2, explanation: 'Vertraulichkeit stellt sicher, dass Informationen nicht unbefugt offengelegt werden.' },
        { id: 'cia_i_q1', category: 'schutzziele-cia', question: 'Welches Schutzziel stellt sicher, dass Daten während der Übertragung oder Speicherung nicht unbemerkt verändert werden?', choices: ['Verfügbarkeit', 'Authentizität', 'Vertraulichkeit', 'Integrität'], answer: 3, explanation: 'Integrität gewährleistet die Korrektheit und Unversehrtheit von Daten.' },
        { id: 'cia_a_q1', category: 'schutzziele-cia', question: 'Wenn ein IT-System für berechtigte Nutzer bei Bedarf nicht nutzbar ist, welches Schutzziel ist verletzt?', choices: ['Vertraulichkeit', 'Integrität', 'Verfügbarkeit', 'Authentizität'], answer: 2, explanation: 'Verfügbarkeit bedeutet, dass Systeme und Daten für autorisierte Benutzer zugänglich und nutzbar sind, wenn sie benötigt werden.' },
        { id: 'authn_q1', category: 'schutzziele-cia', question: 'Was wird durch das Schutzziel "Authentizität" sichergestellt?', choices: ['Dass Daten geheim bleiben', 'Dass Daten nicht verloren gehen', 'Die Echtheit und Überprüfbarkeit der Identität eines Nutzers oder Systems', 'Dass Daten immer korrekt sind'], answer: 2, explanation: 'Authentizität bestätigt, dass ein Nutzer, ein System oder eine Information tatsächlich derjenige/dasjenige ist, der/das er/sie/es vorgibt zu sein.' },
        { id: 'schutz_q1', category: 'schutzziele-cia', question: 'Welche Schutzbedarfskategorie würde für Daten gelten, deren Kompromittierung existenzbedrohende Auswirkungen für ein Unternehmen hätte?', choices: ['Normal', 'Erhöht', 'Hoch', 'Sehr Hoch'], answer: 3, explanation: '"Sehr Hoch" (oder vergleichbare höchste Kategorie) wird für Daten verwendet, deren Verlust oder Kompromittierung katastrophale oder existenzbedrohende Folgen hätte.' },
        { id: 'non_rep_q1_cia', category: 'schutzziele-cia', question: 'Was bedeutet "Nichtabstreitbarkeit" (Non-Repudiation) in der IT-Sicherheit?', choices: ['Daten können nicht gelöscht werden', 'Aktionen können später nicht abgestritten werden', 'Systeme sind immer verfügbar', 'Daten sind automatisch verschlüsselt'], answer: 1, explanation: 'Nichtabstreitbarkeit stellt sicher, dass durchgeführte Aktionen später nicht geleugnet werden können, z.B. durch digitale Signaturen.' },
        { id: 'authz_q1_cia', category: 'schutzziele-cia', question: 'Was ist der Unterschied zwischen Authentifizierung und Autorisierung?', choices: ['Es gibt keinen Unterschied', 'Authentifizierung prüft die Identität, Autorisierung die Berechtigung', 'Autorisierung prüft die Identität, Authentifizierung die Berechtigung', 'Beide prüfen nur die Identität'], answer: 1, explanation: 'Authentifizierung verifiziert "Wer bist du?", Autorisierung bestimmt "Was darfst du?"' },
        { id: 'crypto_q1_cia', category: 'schutzziele-cia', question: 'Welches Schutzziel wird primär durch Verschlüsselung erreicht?', choices: ['Verfügbarkeit', 'Vertraulichkeit', 'Authentizität', 'Schnelligkeit'], answer: 1, explanation: 'Verschlüsselung schützt primär die Vertraulichkeit von Daten durch Unlesbarkeit für Unbefugte.' },
        { id: 'hash_q1_cia', category: 'schutzziele-cia', question: 'Welches Schutzziel unterstützen Hash-Funktionen hauptsächlich?', choices: ['Vertraulichkeit', 'Integrität', 'Verfügbarkeit', 'Geschwindigkeit'], answer: 1, explanation: 'Hash-Funktionen erzeugen Prüfsummen zur Erkennung von Datenänderungen und unterstützen damit die Integrität.' },
        { id: 'backup_q1_cia', category: 'schutzziele-cia', question: 'Welches Schutzziel wird durch regelmäßige Backups primär unterstützt?', choices: ['Vertraulichkeit', 'Integrität', 'Verfügbarkeit', 'Authentizität'], answer: 2, explanation: 'Backups stellen sicher, dass Daten bei Verlust oder Beschädigung wiederhergestellt werden können, was die Verfügbarkeit unterstützt.' },
        { id: 'firewall_q1_cia', category: 'schutzziele-cia', question: 'Welche Schutzziele unterstützt eine Firewall primär?', choices: ['Nur Vertraulichkeit', 'Vertraulichkeit und Verfügbarkeit', 'Nur Integrität', 'Alle CIA-Schutzziele'], answer: 1, explanation: 'Firewalls schützen vor unbefugtem Zugriff (Vertraulichkeit) und können durch DoS-Schutz auch die Verfügbarkeit unterstützen.' },
        { id: 'risk_q1_cia', category: 'schutzziele-cia', question: 'Wie wird ein Risiko in der IT-Sicherheit berechnet?', choices: ['Schaden + Eintrittswahrscheinlichkeit', 'Schaden - Eintrittswahrscheinlichkeit', 'Schaden × Eintrittswahrscheinlichkeit', 'Schaden ÷ Eintrittswahrscheinlichkeit'], answer: 2, explanation: 'Risiko = Schaden × Eintrittswahrscheinlichkeit (Höhe des potentiellen Schadens multipliziert mit der Wahrscheinlichkeit des Eintritts).' }
      ]
    }
  },
  {
    wissensbausteinId: "LF4_backup_konzepte",
    titel: "Backup-Konzepte",
    lernfeld: 4,
    dependencies: ["LF4_schutzziele_cia"],
    difficulty: 2,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Lerne verschiedene Backup-Strategien (Voll, Inkrementell, Differentiell) und Konzepte wie die 3-2-1-Regel, RTO/RPO und Deduplizierung kennen, um Datenverlust effektiv zu verhindern."
    },

    anwenden: {
      anleitung: "Simuliere den Speicherbedarf und die Wiederherstellungszeit für verschiedene Backup-Strategien.",
      /**
       * Vergleicht Backup-Strategien.
       * @param {object} config - z.B. { strategie: 'Inkrementell' }
       * @returns {string} Eine Bewertung der gewählten Strategie.
       */
      simulation: function(config) {
        switch (config.strategie) {
          case 'Voll':
            return `Strategie: Tägliches Voll-Backup
--------------------------------
Vorteile:
+ Schnellste Wiederherstellung: Nur das aktuellste Backup-Set ist nötig.
+ Einfach zu verwalten.

Nachteile:
- Höchster Speicherbedarf.
- Längste Backup-Dauer.

Fazit: Ideal für kleine Datenmengen oder wenn die Wiederherstellungszeit (RTO) absolut kritisch ist.`;
          case 'Differentiell':
            return `Strategie: Wöchentliches Voll- + tägliches Differentiell-Backup
--------------------------------------------------------------
Vorteile:
+ Schnelle Wiederherstellung: Maximal 2 Sets (Voll + letztes Differentiell) sind nötig.
+ Schneller als tägliche Voll-Backups.

Nachteile:
- Speicherbedarf für differentielle Backups wächst über die Woche an.

Fazit: Ein guter Kompromiss zwischen Speicherplatz und Wiederherstellungszeit.`;
          case 'Inkrementell':
            return `Strategie: Wöchentliches Voll- + tägliches Inkrementell-Backup
----------------------------------------------------------------
Vorteile:
+ Geringster Speicherbedarf.
+ Schnellste tägliche Backups.

Nachteile:
- Langsamste Wiederherstellung: Das Voll-Backup + alle nachfolgenden Inkremente müssen eingespielt werden.
- Hohe Abhängigkeit (ein defektes Inkrement kann die Kette unbrauchbar machen).

Fazit: Ideal, wenn das Backup-Fenster sehr klein ist oder Speicherplatz stark begrenzt ist.`;
          default:
            return "Unbekannte Strategie.";
        }
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'backup_v_q1', category: 'backup-konzepte', question: 'Was kennzeichnet ein Vollbackup (Full Backup)?', choices: ['Es sichert nur geänderte Dateien seit dem letzten Backup', 'Es sichert alle ausgewählten Dateien und Ordner vollständig', 'Es benötigt immer das letzte Vollbackup zur Wiederherstellung', 'Es ist die speicherplatzsparendste Backup-Methode'], answer: 1, explanation: 'Ein Vollbackup sichert alle ausgewählten Daten, unabhängig davon, wann sie zuletzt geändert wurden.' },
        { id: 'backup_i_q1', category: 'backup-konzepte', question: 'Was wird bei einem inkrementellen Backup gesichert?', choices: ['Alle Daten des Systems', 'Nur die Änderungen seit dem letzten Vollbackup', 'Nur die Änderungen seit dem letzten beliebigen Backup (Voll- oder Inkrementell)', 'Nur Betriebssystemdateien'], answer: 2, explanation: 'Inkrementelle Backups sichern nur die Daten, die sich seit dem letzten Backup jeglicher Art geändert haben.' },
        { id: 'backup_d_q1', category: 'backup-konzepte', question: 'Welche Dateien sichert ein differenzielles Backup?', choices: ['Alle Dateien des Systems', 'Nur die Dateien, die seit dem letzten inkrementellen Backup geändert wurden', 'Alle Dateien, die seit dem letzten Vollbackup geändert wurden', 'Nur neue Dateien'], answer: 2, explanation: 'Ein differenzielles Backup sichert alle Änderungen seit dem letzten Vollbackup.' },
        { id: 'backup_321_q1', category: 'backup-konzepte', question: 'Was besagt die "1" in der 3-2-1-Backup-Regel?', choices: ['Mindestens ein Backup pro Tag', 'Eine Kopie außer Haus (off-site)', 'Nur eine Backup-Software verwenden', 'Ein Backup auf einem Wechselmedium'], answer: 1, explanation: 'Die "1" in der 3-2-1-Regel steht für mindestens eine Kopie der Daten, die extern (off-site) aufbewahrt wird.' },
        { id: 'rto_rpo_q1_bk', category: 'backup-konzepte', question: 'Was definiert das Recovery Time Objective (RTO)?', choices: ['Den maximal tolerierbaren Datenverlust', 'Die Zeit, die für die vollständige Wiederherstellung eines Systems nach einem Ausfall benötigt wird', 'Den Zeitpunkt des letzten erfolgreichen Backups', 'Die Häufigkeit von Backups'], answer: 1, explanation: 'RTO ist die maximal akzeptable Zeitspanne, innerhalb derer ein IT-Dienst nach einem Ausfall wiederhergestellt sein muss.' },
        { id: 'rto_rpo_q2_bk', category: 'backup-konzepte', question: 'Das Recovery Point Objective (RPO) beschreibt...', choices: ['wie schnell ein System wieder läuft.', 'den maximalen Datenverlust, der hingenommen werden kann.', 'den Zeitpunkt des nächsten Backups.', 'die Kosten der Wiederherstellung.'], answer: 1, explanation: 'RPO gibt an, wie viel Datenverlust (gemessen in Zeit) bei einem Systemausfall maximal tolerierbar ist.' },
        { id: 'snap_q1', category: 'backup-konzepte', question: 'Sind Snapshots ein vollwertiger Ersatz für eine traditionelle Backup-Strategie?', choices: ['Ja, sie sind moderner und schneller', 'Nein, sie dienen primär der schnellen Wiederherstellung von Zuständen, sind aber oft vom Primärsystem abhängig', 'Ja, aber nur für virtuelle Maschinen', 'Nein, da sie zu viel Speicherplatz benötigen'], answer: 1, explanation: 'Snapshots sind Momentaufnahmen und nützlich für kurzfristige Wiederherstellungen, ersetzen aber keine ausgelagerte, unabhängige Backup-Lösung, da sie oft auf demselben Speichersystem liegen und bei dessen Ausfall ebenfalls betroffen sind.' },
        { id: 'versioning_q1_bk', category: 'backup-konzepte', question: 'Was ist der Vorteil von Backup-Versionierung?', choices: ['Reduzierung des Speicherplatzbedarfs', 'Möglichkeit zur Wiederherstellung verschiedener Zeitpunkte', 'Beschleunigung der Backup-Erstellung', 'Automatische Komprimierung'], answer: 1, explanation: 'Versionierung ermöglicht es, Daten von verschiedenen Zeitpunkten wiederherzustellen, was bei versehentlichen Änderungen oder Malware-Befall hilfreich ist.' },
        { id: 'retention_q1_bk', category: 'backup-konzepte', question: 'Was regelt eine Backup-Retention-Policy?', choices: ['Die Backup-Geschwindigkeit', 'Wie lange Backup-Daten aufbewahrt werden', 'Die Backup-Verschlüsselung', 'Die Anzahl paralleler Backups'], answer: 1, explanation: 'Retention-Policies definieren, wie lange verschiedene Backup-Generationen aufbewahrt werden, bevor sie gelöscht werden.' },
        { id: 'dedup_q1_bk', category: 'backup-konzepte', question: 'Welchen Vorteil bietet Deduplizierung bei Backups?', choices: ['Schnellere Wiederherstellung', 'Reduzierung des benötigten Speicherplatzes', 'Erhöhte Datensicherheit', 'Automatische Fehlerkorrektur'], answer: 1, explanation: 'Deduplizierung erkennt und entfernt doppelte Datenblöcke, wodurch der Speicherbedarf erheblich reduziert wird.' },
        { id: 'cloud_backup_q1_bk', category: 'backup-konzepte', question: 'Welcher Vorteil von Cloud-Backup entspricht der 3-2-1-Regel?', choices: ['Günstigere Kosten', 'Automatische Off-site-Speicherung', 'Schnellere Wiederherstellung', 'Bessere Komprimierung'], answer: 1, explanation: 'Cloud-Backup erfüllt automatisch das Off-site-Kriterium der 3-2-1-Regel, da die Daten extern gespeichert werden.' },
        { id: 'test_q1_bk', category: 'backup-konzepte', question: 'Warum sollten Backup-Wiederherstellungen regelmäßig getestet werden?', choices: ['Um den Speicherplatz zu überprüfen', 'Um sicherzustellen, dass die Backups funktionsfähig sind', 'Um die Backup-Geschwindigkeit zu messen', 'Um Speicherplatz freizugeben'], answer: 1, explanation: 'Regelmäßige Tests stellen sicher, dass im Ernstfall die Daten tatsächlich wiederhergestellt werden können – ein Backup ist wertlos, wenn es nicht funktioniert.' }
      ]
    }
  },
  {
    wissensbausteinId: "LF4_datenbanken",
    titel: "Datenbanken",
    lernfeld: 4,
    dependencies: ["LF4_backup_konzepte"],
    difficulty: 3,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Erlerne die Grundlagen von relationalen Datenbanken. Verstehe ER-Modelle, Normalisierung (bis 3NF), Schlüssel (Primary/Foreign) und die grundlegenden SQL-Befehle (SELECT, INSERT, JOIN)."
    },

    anwenden: {
      anleitung: "Simuliere eine SQL-JOIN-Operation, um Daten aus zwei Tabellen (Kunden und Bestellungen) zu kombinieren.",
      /**
       * Simuliert verschiedene SQL-JOINs.
       * @param {object} config - z.B. { joinTyp: 'INNER' }
       * @returns {string} Das Ergebnis des Joins als Text.
       */
      simulation: function(config) {
        const kunden = [{ id: 1, name: 'Meier' }, { id: 2, name: 'Schulz' }, { id: 3, name: 'Huber' }];
        const bestellungen = [{ id: 101, kundenId: 1, produkt: 'Laptop' }, { id: 102, kundenId: 2, produkt: 'Maus' }, { id: 103, kundenId: 1, produkt: 'Tastatur' }];

        switch (config.joinTyp) {
          case 'INNER':
            return "INNER JOIN Ergebnis: Zeigt nur Kunden, die Bestellungen haben.\n- Meier: Laptop\n- Schulz: Maus\n- Meier: Tastatur";
          case 'LEFT':
            return "LEFT JOIN Ergebnis: Zeigt ALLE Kunden, auch die ohne Bestellungen.\n- Meier: Laptop\n- Schulz: Maus\n- Huber: (keine Bestellung)\n- Meier: Tastatur";
          default:
            return "Unbekannter JOIN-Typ. Wähle 'INNER' oder 'LEFT'.";
        }
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'er_q1', category: 'datenbanken', question: 'Wofür steht die Abkürzung ERM im Datenbankkontext?', choices: ['Efficient Resource Management', 'Entity-Relationship-Modell', 'Extended Relational Model', 'External Reference Mapping'], answer: 1, explanation: 'ERM steht für Entity-Relationship-Modell, ein Werkzeug zur Darstellung von Datenstrukturen.' },
        { id: 'dbd_q1', category: 'datenbanken', question: 'Was ist das Ziel der Normalisierung im relationalen Datenbankdesign?', choices: ['Maximierung der Datenredundanz', 'Reduzierung von Datenredundanz und Vermeidung von Anomalien', 'Beschleunigung aller Datenbankabfragen', 'Vereinfachung der Dateneingabe für Benutzer'], answer: 1, explanation: 'Normalisierung zielt darauf ab, Redundanzen zu minimieren und Inkonsistenzen (Anomalien) bei Datenänderungen zu vermeiden.' },
        { id: 'norm_q1', category: 'datenbanken', question: 'Was versteht man unter Atomarität der Attributwerte im Kontext der 1. Normalform (1NF)?', choices: ['Alle Attribute müssen numerisch sein', 'Jedes Attribut darf nur einen einzigen, unteilbaren Wert enthalten', 'Attribute müssen verschlüsselt gespeichert werden', 'Fremdschlüssel müssen vorhanden sein'], answer: 1, explanation: 'Die 1. Normalform fordert, dass alle Attribute atomar sind, d.h., sie dürfen keine mehrwertigen Einträge oder Wiederholungsgruppen enthalten.' },
        { id: 'sql_q1_db', category: 'datenbanken', question: 'Welcher SQL-Befehl wird verwendet, um neue Daten in eine Tabelle einzufügen?', choices: ['SELECT', 'UPDATE', 'INSERT INTO', 'CREATE TABLE'], answer: 2, explanation: 'Der Befehl `INSERT INTO` wird genutzt, um neue Datensätze zu einer Tabelle hinzuzufügen.' },
        { id: 'sql_q2_db', category: 'datenbanken', question: 'Mit welchem SQL-Schlüsselwort werden Abfrageergebnisse sortiert?', choices: ['SORT BY', 'ORDER BY', 'GROUP BY', 'ARRANGE BY'], answer: 1, explanation: '`ORDER BY` wird verwendet, um die Ergebnismenge einer SELECT-Anweisung zu sortieren.' },
        { id: 'join_q1', category: 'datenbanken', question: 'Welcher SQL JOIN-Typ gibt nur Zeilen zurück, für die es in BEIDEN verbundenen Tabellen übereinstimmende Werte gibt?', choices: ['LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN', 'INNER JOIN'], answer: 3, explanation: 'Ein INNER JOIN liefert nur die Datensätze, bei denen die Join-Bedingung in beiden Tabellen erfüllt ist.' },
        { id: 'key_q1_db', category: 'datenbanken', question: 'Welche Rolle spielt ein Primärschlüssel (Primary Key) in einer Datenbanktabelle?', choices: ['Erlaubt doppelte Werte zur Gruppierung', 'Identifiziert jeden Datensatz eindeutig', 'Verweist auf eine andere Tabelle', 'Beschleunigt ausschließlich Suchabfragen'], answer: 1, explanation: 'Der Primärschlüssel dient der eindeutigen Identifizierung jedes einzelnen Datensatzes innerhalb einer Tabelle.' },
        { id: 'key_q2_db', category: 'datenbanken', question: 'Was ist die Hauptfunktion eines Fremdschlüssels (Foreign Key)?', choices: ['Eindeutige Identifikation von Datensätzen in der eigenen Tabelle', 'Herstellung einer Beziehung zu einer anderen Tabelle und Sicherstellung der referenziellen Integrität', 'Sortierung von Daten', 'Beschleunigung von Schreibvorgängen'], answer: 1, explanation: 'Ein Fremdschlüssel erstellt eine Verknüpfung zu einem Primärschlüssel einer anderen (oder derselben) Tabelle und hilft, die referenzielle Integrität sicherzustellen.' },
        { id: 'acid_q1_db', category: 'datenbanken', question: 'Wofür steht das "A" in den ACID-Eigenschaften von Transaktionen?', choices: ['Availability', 'Atomicity', 'Accuracy', 'Authentication'], answer: 1, explanation: 'Atomicity (Atomarität) bedeutet, dass eine Transaktion entweder vollständig oder gar nicht ausgeführt wird.' },
        { id: 'index_q1_db', category: 'datenbanken', question: 'Welchen Hauptzweck erfüllen Indizes in Datenbanken?', choices: ['Datenverschlüsselung', 'Beschleunigung von Abfragen', 'Datenvalidierung', 'Backup-Erstellung'], answer: 1, explanation: 'Indizes sind Datenstrukturen, die den schnellen Zugriff auf Zeilen in einer Tabelle ermöglichen und dadurch Abfragen beschleunigen.' },
        { id: 'nosql_q1_db', category: 'datenbanken', question: 'Welcher Vorteil wird oft mit NoSQL-Datenbanken verbunden?', choices: ['Strikte Konsistenz', 'Horizontale Skalierbarkeit', 'SQL-Kompatibilität', 'ACID-Transaktionen'], answer: 1, explanation: 'NoSQL-Datenbanken sind oft für horizontale Skalierung (Scale-out) konzipiert und können über viele Server verteilt werden.' },
        { id: 'view_q1_db', category: 'datenbanken', question: 'Was ist eine View (Sicht) in einer Datenbank?', choices: ['Eine physische Kopie einer Tabelle', 'Eine virtuelle Tabelle basierend auf SQL-Abfragen', 'Ein Backup einer Tabelle', 'Ein Index für schnellere Abfragen'], answer: 1, explanation: 'Eine View ist eine virtuelle Tabelle, die auf einer oder mehreren Basistabellen durch eine gespeicherte SQL-Abfrage basiert.' }
      ]
    }
  },
  {
    wissensbausteinId: "LF4_boss_security_data",
    titel: "Meilenstein-Prüfung: Sicherheit & Daten",
    lernfeld: 4,
    dependencies: ["LF4_datenbanken"],
    difficulty: 4,
    estimatedDurationMinutes: 20,

    lernen: {
      beschreibung: "Beweise dein Wissen über Schutzmaßnahmen, Notfallkonzepte und Datenbanken. Diese Prüfung kombiniert Wissen über Schutzziele, Backups und Datenbanken zu komplexen Szenarien."
    },

    anwenden: {
      anleitung: "Simuliere eine Risikoabschätzung für einen Datendienst basierend auf RTO/RPO und CIA-Anforderungen.",
      /**
       * Gibt eine Risikoklasse für einen Datendienst aus.
       * @param {object} config - z.B. { rtoStunden: 4, rpoMinuten: 15, vertraulichkeit: 'hoch' }
       * @returns {string} Die Risikoeinstufung.
       */
      simulation: function(config) {
        let riskScore = 0;
        let anmerkungen = [];

        if (config.rtoStunden <= 4) { riskScore += 2; anmerkungen.push("- Strenge Wiederanlaufzeit (RTO) erfordert schnelle Reaktion."); }
        if (config.rpoMinuten <= 15) { riskScore += 2; anmerkungen.push("- Geringer Datenverlust (RPO) erfordert häufige Backups/Replikation."); }
        if (config.vertraulichkeit === 'hoch') { riskScore += 3; anmerkungen.push("- Hohe Vertraulichkeit erfordert starke Verschlüsselung und Zugriffskontrollen."); } else if (config.vertraulichkeit === 'normal') { riskScore += 1; }

        let einstufung = '';
        if (riskScore >= 5) {
          einstufung = '🔴 HOCH: Kritischer Dienst. Umfassende Schutzmaßnahmen (HA-Cluster, Verschlüsselung, strenge ACLs) sind zwingend erforderlich.';
        } else if (riskScore >= 3) {
          einstufung = '🟡 MITTEL: Geschäftswichtiger Dienst. Standard-Schutzmaßnahmen sollten implementiert und regelmäßig geprüft werden.';
        } else {
          einstufung = '🟢 NIEDRIG: Unkritischer Dienst. Grundlegende Schutzmaßnahmen sind ausreichend.';
        }
        return `Risikoanalyse für den Datendienst:
-----------------------------------
Eingaben:
- RTO: ${config.rtoStunden}h
- RPO: ${config.rpoMinuten}min
- Vertraulichkeit: ${config.vertraulichkeit}

Faktoren:
${anmerkungen.join('\n')}

Gesamteinstufung (Score: ${riskScore}):
${einstufung}`;
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'sec_boss_q1', category: 'boss-security-data', question: 'Ein Ransomware‑Angriff verschlüsselt Produktionssysteme. Laut BIA liegt das RTO bei 4 h, RPO bei 15 min. Dein differenzielles Backup von 02:00 Uhr benötigt 6 h Restore‑Time. Welche Maßnahme erfüllt beide Ziele?', choices: ['Asynchrone Replikation in ein DR‑Site', 'Wöchentliche Voll‑+ tägliche Inkrementals', 'Snapshots auf demselben SAN', 'Cold Standby‑Server'], answer: 0, explanation: 'Nur eine nahezu synchrone DR‑Replikation kann RTO 4 h und RPO 15 min sichern.' },
        { id: 'sec_boss_q2', category: 'boss-security-data', question: 'Welche **Zero‑Trust‑Komponente** erzwingt am Endpunkt Mikro‑Segmentierungs‑Policies basierend auf Gerätestatus?', choices: ['Identity Provider', 'Policy Enforcement Point (PEP)', 'Security Information & Event Management (SIEM)', 'Trusted Platform Module (TPM)'], answer: 1, explanation: 'Der PEP (z. B. Host‑Firewall‑Agent) setzt Richtlinien kontextbezogen auf Endgeräten um.' },
        { id: 'sec_boss_q3', category: 'boss-security-data', question: 'In einer Analyse soll die Balance von **Verfügbarkeit** vs. **Vertraulichkeit** bewertet werden. Welche Methode nutzt eine gewichtete Matrix aus CIA‑Faktoren und Gefährdungsausprägung?', choices: ['OCTAVE Allegro', 'STRIDE', 'FAIR Model', 'NIST SP 800‑30 Heat‑Map'], answer: 0, explanation: 'OCTAVE integriert CIA‑Gewichtungen in Szenario‑Risiko‑Matrizen.' },
        { id: 'sec_boss_q4', category: 'boss-security-data', question: 'Der Wechsel von AES‑128 auf AES‑256 erhöht vor allem …', choices: ['Schlüsselraum', 'Blockgröße', 'Rundenanzahl', 'Initialisierungsvektor‑Länge'], answer: 0, explanation: 'AES‑256 verdoppelt die Schlüssellänge auf 256 Bit; Blockgröße bleibt 128 Bit.' },
        { id: 'sec_boss_q5', category: 'boss-security-data', question: 'OCSP stapelt sich auf welches Protokoll?', choices: ['HTTP', 'LDAP', 'SNMP', 'IMAP'], answer: 0, explanation: 'OCSP‑Requests/Responses werden i. d. R. über HTTP übertragen (Port 80/443).' },
        { id: 'sec_boss_q6', category: 'boss-security-data', question: 'Welche **SQL‑Injection‑Abwehr** ist bei parametrisierten Queries am WENIGSTEN effektiv?', choices: ['Prepared‑Statements', 'Whitelisting‑Input‑Filter', 'Escaping von Sonderzeichen', 'Stored‑Procedures ohne Parameterbindung'], answer: 3, explanation: 'Stored‑Procedures ohne Bindung ermöglichen dennoch Injection, wenn Strings konkateniert werden.' },
        { id: 'sec_boss_q7', category: 'boss-security-data', question: 'Ein SIEM‑System soll einen Brute‑Force‑Angriff erkennen. Welcher **Korrelations‑Operator** ist dafür typisch?', choices: ['Windowed Count > n Events', 'Sequence Followed‑By', 'Statistical Deviation z‑Score', 'Rare Term Detection'], answer: 0, explanation: 'Mehrfach fehlgeschlagene Logins innerhalb eines Zeitfensters sind klassische > n‑Korrelation.' },
        { id: 'sec_boss_q8', category: 'boss-security-data', question: 'Welche Container‑Security‑Prüfung deckt **unsichere Base‑Images** am FRÜHESTEN im CI/CD‑Prozess auf?', choices: ['Dynamic Application Security Testing (DAST)', 'Image‑Scanning der Registry', 'Admission Controller Policies', 'Runtime Behavioral Analysis'], answer: 1, explanation: 'Image‑Scanner validieren bereits beim Push in die Registry bekannte CVEs.' },
        { id: 'sec_boss_q9', category: 'boss-security-data', question: 'RBAC lässt sich auf ABAC erweitern, indem man …', choices: ['Rollen in Policies verschachtelt', 'Attribut‑basierte Bedingungen für Rollen definiert', 'Statische ACLs ersetzt', 'LDAP‑Gruppen dupliziert'], answer: 1, explanation: 'ABAC addiert Kontext‑Attribute (Zeit, Gerät, Sensitivität) als Policy‑Bedingungen.' },
        { id: 'sec_boss_q10', category: 'boss-security-data', question: 'Welcher **TLS‑Handshake‑Schritt** prüft erfolgreich das Server‑Zertifikat?', choices: ['ClientHello', 'ServerKeyExchange', 'CertificateVerify', 'Certificate'], answer: 2, explanation: 'CertificateVerify beweist mit Signatur, dass der Server den zugehörigen Private‑Key besitzt.' },
        { id: 'sec_boss_q11', category: 'boss-security-data', question: 'In Kerberos enthält das **TGS‑Ticket** KEINE …', choices: ['Client‑ID', 'Session‑Key', 'Timestamp', 'Passwort‑Hash'], answer: 3, explanation: 'Passwort‑Hashes tauchen nie in Tickets auf; sie bleiben im KDC.' },
        { id: 'sec_boss_q12', category: 'boss-security-data', question: 'ISO/IEC 27001 Annex A fordert „A.12 – Operations Security“. Welche Kontrollkategorie fällt darunter?', choices: ['Cryptographic Controls', 'Supplier Relationships', 'Business Continuity', 'Compliance'], answer: 0, explanation: 'A.12 umfasst Kryptographie, Logging, Malware‑Schutz usw.' },
        { id: 'sec_boss_q13', category: 'boss-security-data', question: 'Welcher **Hash‑Algorithmus** ist heute am widerstandsfähigsten gegen Kollisionsangriffe?', choices: ['SHA‑1', 'MD5', 'SHA‑256', 'SHA‑224'], answer: 2, explanation: 'SHA‑256 gilt als sicher; SHA‑1/MD5 sind kollisionsgebrochen, SHA‑224 kürzer.' },
        { id: 'sec_boss_q14', category: 'boss-security-data', question: 'Ein DLP‑Gateway soll **Quellcode‑Leaks** verhindern. Welche Klassifizierungstechnik erzielt hier die höchste Präzision?', choices: ['RegEx‑Keywords', 'Statistische Fingerprints', 'Contextual Metadata Tags', 'Entropie‑Messung'], answer: 1, explanation: 'Fingerprinting (z. B. Shingling) erkennt auch veränderte Code‑Snippets präzise.' },
        { id: 'sec_boss_q15', category: 'boss-security-data', question: 'Welche NIST‑CSF‑Funktion adressiert primär das **Patch‑Management**?', choices: ['Identify', 'Protect', 'Detect', 'Recover'], answer: 1, explanation: 'Patch‑Management ist eine präventive Schutzmaßnahme und liegt in „Protect“.' }
      ]
    }
  },

  // =====================================================================================
  // BLOCK 13-15: Software & Virtualisierung
  // =====================================================================================
  {
    wissensbausteinId: "LF5_programmierlogik",
    titel: "Programmierlogik",
    lernfeld: 5,
    dependencies: ["LF4_boss_security_data"],
    difficulty: 2,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Lerne die grundlegenden Konzepte und Kontrollstrukturen der Programmierung: Sequenz, Selektion (if/else) und Iteration (Schleifen). Verstehe Arrays, Funktionen und die Big-O-Notation zur Effizienzbewertung."
    },

    anwenden: {
      anleitung: "Simuliere eine Schleife, um eine Reihe von Zahlen zu verarbeiten, und sieh dir die Big-O-Komplexität an.",
      /**
       * Simuliert eine Schleife über ein Array.
       * @param {object} config - z.B. { anzahlElemente: 10, operation: 'summe' }
       * @returns {string} Das Ergebnis der Operation und die Komplexität.
       */
      simulation: function(config) {
        let array = [];
        for (let i = 1; i <= config.anzahlElemente; i++) {
          array.push(i);
        }

        let result = 0;
        let operationBeschreibung = '';

        if (config.operation === 'summe') {
          operationBeschreibung = 'Aufsummieren aller Elemente';
          for (const num of array) {
            result += num;
          }
        } else {
          operationBeschreibung = 'Finden des letzten Elements';
          result = array[array.length - 1];
        }

        return `Szenario: Eine Operation wird auf ein Array mit ${config.anzahlElemente} Elementen angewendet.
--------------------------------------------------------------------
Operation: ${operationBeschreibung}
Ergebnis: ${result}

Analyse der Algorithmus-Komplexität:
Die Zeitkomplexität beträgt **O(n)**, da die Laufzeit linear mit der Anzahl der Elemente (n) wächst. Bei 1.000 Elementen dauert es ca. 100x länger als bei 10 Elementen.`;
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'ks_q1', category: 'programmierlogik', question: 'Welche der folgenden ist KEINE grundlegende Kontrollstruktur in der Programmierung?', choices: ['Sequenz (Aneinanderreihung)', 'Selektion (Verzweigung, z.B. if-else)', 'Iteration (Schleife, z.B. while, for)', 'Rekursion'], answer: 3, explanation: 'Sequenz, Selektion und Iteration sind die drei fundamentalen Kontrollstrukturen. Rekursion ist ein mächtiges Konzept, das diese nutzt, wird aber nicht immer zu den drei grundlegendsten gezählt.' },
        { id: 'loop_q1', category: 'programmierlogik', question: 'Welche Schleifenart prüft die Schleifenbedingung typischerweise, BEVOR der Schleifenkörper zum ersten Mal ausgeführt wird?', choices: ['do-while-Schleife', 'repeat-until-Schleife', 'while-Schleife (und for-Schleife)', 'Endlosschleife (ohne Abbruchbedingung)'], answer: 2, explanation: 'Die while-Schleife (und die for-Schleife) sind kopfgesteuerte Schleifen, d.h. die Bedingung wird vor der ersten Ausführung des Schleifenkörpers geprüft.' },
        { id: 'arr_q1', category: 'programmierlogik', question: 'Wie wird in den meisten Programmiersprachen auf das erste Element eines Arrays zugegriffen?', choices: ['Index 1', 'Index 0', 'Index -1', 'Mit dem Schlüsselwort "FIRST"'], answer: 1, explanation: 'Die Indizierung von Arrays beginnt in vielen Programmiersprachen bei 0 für das erste Element.' },
        { id: 'func_q1', category: 'programmierlogik', question: 'Was ist der Rückgabewert (Return Value) einer Funktion?', choices: ['Die Anzahl der Parameter, die sie akzeptiert', 'Ein Wert, den die Funktion nach ihrer Ausführung an den aufrufenden Code zurückgibt', 'Die erste Zeile Code innerhalb der Funktion', 'Eine Liste aller globalen Variablen, auf die sie zugreift'], answer: 1, explanation: 'Der Rückgabewert ist das Ergebnis oder der Wert, den eine Funktion nach ihrer Verarbeitung an den Aufrufer zurückliefert.' },
        { id: 'bigo_q1', category: 'programmierlogik', question: 'Was beschreibt die Big-O-Notation O(1)?', choices: ['Lineare Zeitkomplexität', 'Konstante Zeitkomplexität', 'Quadratische Zeitkomplexität', 'Logarithmische Zeitkomplexität'], answer: 1, explanation: 'O(1) bedeutet konstante Zeitkomplexität, d.h., die Ausführungszeit des Algorithmus ist unabhängig von der Größe der Eingabedaten.' },
        { id: 'var_q1_pl', category: 'programmierlogik', question: 'Was ist der Unterschied zwischen lokalen und globalen Variablen?', choices: ['Lokale Variablen sind schneller', 'Lokale Variablen sind nur innerhalb eines bestimmten Bereichs sichtbar, globale überall', 'Globale Variablen sind sicherer', 'Es gibt keinen Unterschied'], answer: 1, explanation: 'Lokale Variablen haben einen begrenzten Gültigkeitsbereich (Scope), während globale Variablen programmweit zugänglich sind.' },
        { id: 'comment_q1_pl', category: 'programmierlogik', question: 'Welchen Zweck erfüllen Kommentare im Programmcode?', choices: ['Sie erhöhen die Ausführungsgeschwindigkeit', 'Sie dokumentieren und erklären den Code für Menschen', 'Sie werden vom Computer ausgeführt', 'Sie reduzieren Speicherverbrauch'], answer: 1, explanation: 'Kommentare dienen der Dokumentation und werden vom Compiler/Interpreter ignoriert.' },
        { id: 'debug_q1_pl', category: 'programmierlogik', question: 'Was ist der Zweck des Debuggings?', choices: ['Code schneller zu machen', 'Fehler im Code zu finden und zu beheben', 'Code zu verschlüsseln', 'Code zu komprimieren'], answer: 1, explanation: 'Debugging ist der Prozess der Fehlersuche und -behebung in Programmen.' },
        { id: 'pseudo_q1_pl', category: 'programmierlogik', question: 'Was ist Pseudocode?', choices: ['Ein Programmierfehler', 'Eine sprachunabhängige Beschreibung von Algorithmen', 'Eine Art Virus', 'Ein Betriebssystem'], answer: 1, explanation: 'Pseudocode ist eine informelle, strukturierte Beschreibung von Programmlogik in natürlicher Sprache.' },
        { id: 'param_q1_pl', category: 'programmierlogik', question: 'Was sind Parameter in einer Funktion?', choices: ['Fehler im Code', 'Werte, die an eine Funktion übergeben werden', 'Kommentare in der Funktion', 'Der Rückgabewert'], answer: 1, explanation: 'Parameter sind Eingabewerte, die einer Funktion zur Verarbeitung übergeben werden.' },
        { id: 'except_q1_pl', category: 'programmierlogik', question: 'Was ist der Zweck von Exception Handling (Ausnahmebehandlung)?', choices: ['Code zu beschleunigen', 'Laufzeitfehler abzufangen und elegant zu behandeln', 'Speicherplatz zu sparen', 'Code zu verschönern'], answer: 1, explanation: 'Exception Handling ermöglicht es, Laufzeitfehler abzufangen und das Programm kontrolliert weiterlaufen zu lassen.' },
        { id: 'oop_q1_pl', category: 'programmierlogik', question: 'Was ist ein Grundprinzip der objektorientierten Programmierung?', choices: ['Nur globale Variablen verwenden', 'Kapselung von Daten und Methoden in Objekten', 'Vermeidung von Funktionen', 'Lineare Programmierung'], answer: 1, explanation: 'OOP basiert auf Konzepten wie Kapselung, Vererbung und Polymorphismus zur besseren Code-Organisation.' }
      ]
    }
  },
  {
    wissensbausteinId: "LF5_virtualisierung",
    titel: "Virtualisierung",
    lernfeld: 5,
    dependencies: ["LF5_programmierlogik"],
    difficulty: 2,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Verstehe die Konzepte der Virtualisierung, von Typ-1/Typ-2-Hypervisoren bis zu Containern (Docker). Lerne die Vorteile wie Ressourcenauslastung und Risiken wie den Single Point of Failure kennen."
    },

    anwenden: {
      anleitung: "Simuliere den Ressourcen-Overhead verschiedener Virtualisierungstechnologien.",
      /**
       * Simuliert den Ressourcen-Overhead.
       * @param {object} config - z.B. { technologie: 'VM', anzahl: 5 }
       * @returns {string} Eine Abschätzung des Overheads.
       */
      simulation: function(config) {
        const hostRAM = 32 * 1024; // 32 GB RAM in MB
        const overhead = {
          'VM': { base: 500, perInstance: 1024, name: 'Virtuelle Maschine' },
          'Container': { base: 100, perInstance: 50, name: 'Container' }
        };

        if (!overhead[config.technologie]) {
          return "Unbekannte Technologie. Wähle 'VM' oder 'Container'.";
        }

        const o = overhead[config.technologie];
        const anzahl = config.anzahl;
        const totalOverhead = o.base + anzahl * o.perInstance;
        const verfuegbar = hostRAM - totalOverhead;

        let empfehlung = '';
        if (verfuegbar < 4096) {
          empfehlung = 'Empfehlung: ⚠️ KRITISCH! Der verbleibende RAM für den Host ist sehr gering. Container wären hier deutlich effizienter oder der Host benötigt mehr RAM.';
        } else {
          empfehlung = 'Empfehlung: ✅ MACHBAR. Die Ressourcenauslastung des Hosts ist im grünen Bereich.';
        }

        return `Szenario: Betrieb von ${anzahl} Instanzen als '${o.name}' auf einem 32-GB-Host.
-------------------------------------------------------------------
Analyse des RAM-Overheads:
- Jede VM benötigt ein eigenes Gast-OS (~${o.perInstance} MB).
- Container teilen sich den Host-Kernel (Overhead nur ~${o.perInstance} MB).
- Geschätzter Gesamt-Overhead: ca. ${totalOverhead} MB.
- Verbleibender Host-RAM: ca. ${(verfuegbar / 1024).toFixed(1)} GB.

${empfehlung}`;
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'virt_hypervisor_q1', category: 'virtualisierung', question: 'Welcher Hypervisor-Typ läuft direkt auf der Hardware ohne zusätzliches Host-Betriebssystem?', choices: ['Typ 1 (Bare Metal)', 'Typ 2 (Hosted)', 'Container-basiert', 'Hybrid'], answer: 0, explanation: 'Typ-1-Hypervisoren werden direkt auf der Hardware ausgeführt und benötigen kein darunterliegendes Betriebssystem.' },
        { id: 'virt_advantage_q1', category: 'virtualisierung', question: 'Welcher Vorteil wird häufig mit Servervirtualisierung erreicht?', choices: ['Höhere Hardwarekosten', 'Bessere Ressourcen-Auslastung', 'Mehr Stromverbrauch', 'Längere Bereitstellungszeit'], answer: 1, explanation: 'Durch Virtualisierung lassen sich vorhandene Hardware-Ressourcen besser ausnutzen.' },
        { id: 'virt_disadvantage_q1', category: 'virtualisierung', question: 'Welches Risiko besteht bei Virtualisierungslösungen, wenn der Host ausfällt?', choices: ['Single Point of Failure', 'Geringere Flexibilität', 'Höherer Platzbedarf', 'Komplette Unabhängigkeit der VMs'], answer: 0, explanation: 'Fallen Host-Systeme aus, können alle darauf betriebenen VMs betroffen sein, was einen Single Point of Failure darstellt.' },
        { id: 'vm_q1_virt', category: 'virtualisierung', question: 'Was ist eine virtuelle Maschine (VM)?', choices: ['Ein physischer Server', 'Eine softwarebasierte Emulation eines Computers', 'Ein Netzwerkprotokoll', 'Eine Datenbankart'], answer: 1, explanation: 'Eine VM ist eine softwarebasierte Nachbildung eines physischen Computers mit eigenem Betriebssystem.' },
        { id: 'snapshot_q1_virt', category: 'virtualisierung', question: 'Was ist ein VM-Snapshot?', choices: ['Ein Foto der Hardware', 'Eine Momentaufnahme des VM-Zustands zu einem bestimmten Zeitpunkt', 'Ein Backup der gesamten Festplatte', 'Eine Netzwerkkonfiguration'], answer: 1, explanation: 'Ein Snapshot friert den aktuellen Zustand einer VM ein und ermöglicht eine spätere Rückkehr zu diesem Zustand.' },
        { id: 'container_q1_virt', category: 'virtualisierung', question: 'Was unterscheidet Container von virtuellen Maschinen?', choices: ['Container sind langsamer', 'Container teilen sich das Host-Betriebssystem', 'Container benötigen mehr Ressourcen', 'Container können nur Linux'], answer: 1, explanation: 'Container virtualisieren auf Betriebssystemebene und teilen sich den Kernel des Host-Systems, während VMs komplette Betriebssysteme emulieren.' },
        { id: 'docker_q1_virt', category: 'virtualisierung', question: 'Docker ist primär eine Technologie für...', choices: ['Servervirtualisierung', 'Containerisierung', 'Netzwerkvirtualisierung', 'Datenbanken'], answer: 1, explanation: 'Docker ist eine führende Plattform für Container-Technologie und ermöglicht die Paketierung von Anwendungen in Container.' },
        { id: 'live_mig_q1_virt', category: 'virtualisierung', question: 'Was ermöglicht Live Migration bei VMs?', choices: ['Verschiebung laufender VMs zwischen Hosts ohne Unterbrechung', 'Schnellere Boot-Zeiten', 'Automatische Updates', 'Bessere Performance'], answer: 0, explanation: 'Live Migration erlaubt es, laufende VMs von einem Host auf einen anderen zu verschieben, ohne dass die VM heruntergefahren werden muss.' },
        { id: 'resource_q1_virt', category: 'virtualisierung', question: 'Was kann bei Überallokation (Overcommitment) von Ressourcen passieren?', choices: ['Verbesserte Performance', 'Leistungseinbußen bei allen VMs', 'Automatische Optimierung', 'Kosteneinsparungen'], answer: 1, explanation: 'Wenn mehr Ressourcen zugewiesen als physisch verfügbar sind, kann es zu Leistungseinbußen kommen, wenn alle VMs gleichzeitig ihre Ressourcen benötigen.' },
        { id: 'vsan_q1_virt', category: 'virtualisierung', question: 'Was ist ein Virtual SAN (vSAN)?', choices: ['Eine physische Festplatte', 'Softwarebasierte Speichervirtualisierung', 'Ein Netzwerkprotokoll', 'Eine Backup-Lösung'], answer: 1, explanation: 'vSAN aggregiert lokale Speicher mehrerer Hosts zu einem gemeinsamen, virtualisierten Speicherpool.' },
        { id: 'ha_q1_virt', category: 'virtualisierung', question: 'Was bietet High Availability (HA) in virtualisierten Umgebungen?', choices: ['Höhere Performance', 'Automatischer Neustart von VMs bei Host-Ausfall', 'Bessere Grafik', 'Geringere Kosten'], answer: 1, explanation: 'HA-Funktionen erkennen Host-Ausfälle und starten betroffene VMs automatisch auf anderen verfügbaren Hosts neu.' },
        { id: 'drs_q1_virt', category: 'virtualisierung', question: 'Was macht Distributed Resource Scheduler (DRS)?', choices: ['Verteilt VMs automatisch für optimale Ressourcennutzung', 'Erstellt Backups', 'Verwaltet Netzwerke', 'Überwacht Sicherheit'], answer: 0, explanation: 'DRS überwacht die Ressourcennutzung im Cluster und verschiebt VMs automatisch, um eine gleichmäßige Lastverteilung zu erreichen.' }
      ]
    }
  },
  {
    wissensbausteinId: "LF5_raid",
    titel: "RAID",
    lernfeld: 5,
    dependencies: ["LF5_virtualisierung"],
    difficulty: 3,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Lerne die verschiedenen RAID-Level (0, 1, 5, 6, 10) und ihre Anwendungsfälle kennen. Verstehe die Trade-offs zwischen Performance, Kapazität und Ausfallsicherheit."
    },

    anwenden: {
      anleitung: "Simuliere die Konfiguration eines RAID-Verbunds und sieh dir die nutzbare Kapazität und Fehlertoleranz an.",
      /**
       * Simuliert eine RAID-Konfiguration.
       * @param {object} config - z.B. { level: 5, anzahlPlatten: 4, groesseProPlatteTB: 2 }
       * @returns {string} Die Eigenschaften des simulierten RAID-Verbunds.
       */
      simulation: function(config) {
        const { level, anzahlPlatten, groesseProPlatteTB } = config;
        let nutzbareKapazitaet = 0,
          fehlertoleranz = 0,
          mindestplatten = 0,
          anwendung = '';

        // ... (Die switch-case Logik zur Berechnung bleibt gleich)
        switch (level) {
          case 0:
            mindestplatten = 2;
            nutzbareKapazitaet = anzahlPlatten * groesseProPlatteTB;
            fehlertoleranz = 0;
            anwendung = "Maximale Performance, keine Sicherheit. Ideal für temporäre Daten wie Videoschnitt.";
            break;
          case 1:
            mindestplatten = 2;
            nutzbareKapazitaet = groesseProPlatteTB;
            fehlertoleranz = 1;
            anwendung = "Hohe Sicherheit (Spiegelung). Ideal für Betriebssysteme oder sehr kritische Daten.";
            break;
          case 5:
            mindestplatten = 3;
            nutzbareKapazitaet = (anzahlPlatten - 1) * groesseProPlatteTB;
            fehlertoleranz = 1;
            anwendung = "Guter Kompromiss aus Kapazität und Sicherheit. Allrounder für Dateiserver.";
            break;
          case 6:
            mindestplatten = 4;
            nutzbareKapazitaet = (anzahlPlatten - 2) * groesseProPlatteTB;
            fehlertoleranz = 2;
            anwendung = "Sehr hohe Sicherheit. Wichtig für große Archive und unternehmenskritische Daten.";
            break;
          case 10:
            mindestplatten = 4;
            if (anzahlPlatten % 2 !== 0) return "Fehler: RAID 10 erfordert eine gerade Anzahl an Platten.";
            nutzbareKapazitaet = (anzahlPlatten / 2) * groesseProPlatteTB;
            fehlertoleranz = '1 pro Spiegel-Set';
            anwendung = "Beste Performance UND hohe Sicherheit. Ideal für Datenbanken und anspruchsvolle Anwendungen.";
            break;
          default:
            return "Ungültiges RAID-Level. Wähle 0, 1, 5, 6 oder 10.";
        }

        if (anzahlPlatten < mindestplatten) {
          return `Fehler: RAID ${level} erfordert mindestens ${mindestplatten} Platten.`;
        }

        const ergebnis = `Konfiguration: RAID ${level} mit ${anzahlPlatten} x ${groesseProPlatteTB}TB Platten`;
        const daten = `- Nutzbare Kapazität: ${nutzbareKapazitaet} TB\n- Fehlertoleranz: ${fehlertoleranz} Platte(n)`;
        const beratung = `**Anwendungsfall:**\n${anwendung}`;

        return `${ergebnis}\n\n${daten}\n\n${beratung}`;
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'raid_level_q1', category: 'raid', question: 'Bei welchem RAID-Level können zwei Laufwerke gleichzeitig ausfallen, ohne dass Daten verloren gehen?', choices: ['RAID 1', 'RAID 5', 'RAID 6', 'RAID 0'], answer: 2, explanation: 'RAID 6 verwendet doppelte Parität und toleriert den Ausfall von zwei Laufwerken.' },
        { id: 'raid0_q1', category: 'raid', question: 'Welche Eigenschaft charakterisiert RAID 0?', choices: ['Hohe Ausfallsicherheit', 'Datenspiegelung', 'Striping ohne Redundanz', 'Parität für Fehlerkorrektur'], answer: 2, explanation: 'RAID 0 verteilt Daten auf mehrere Laufwerke (Striping) bietet aber keine Redundanz - ein Laufwerksausfall führt zum Totalverlust.' },
        { id: 'raid1_q1', category: 'raid', question: 'Wie viel der Gesamtkapazität ist bei RAID 1 nutzbar?', choices: ['100%', '75%', '50%', '25%'], answer: 2, explanation: 'RAID 1 spiegelt Daten auf zwei Laufwerke, daher ist nur die Hälfte der Gesamtkapazität nutzbar.' },
        { id: 'raid5_q1', category: 'raid', question: 'Wie viele Laufwerke werden mindestens für RAID 5 benötigt?', choices: ['2', '3', '4', '5'], answer: 1, explanation: 'RAID 5 benötigt mindestens 3 Laufwerke, um Daten und Paritätsinformationen zu verteilen.' },
        { id: 'raid10_q1', category: 'raid', question: 'Was kombiniert RAID 10?', choices: ['Striping und Spiegelung', 'Parität und Striping', 'Nur Spiegelung', 'Nur Parität'], answer: 0, explanation: 'RAID 10 kombiniert RAID 1 (Spiegelung) mit RAID 0 (Striping) für hohe Performance und Ausfallsicherheit.' },
        { id: 'parity_q1_raid', category: 'raid', question: 'Welchen Zweck erfüllen Paritätsinformationen in RAID 5?', choices: ['Verschlüsselung der Daten', 'Rekonstruktion ausgefallener Laufwerke', 'Komprimierung der Daten', 'Beschleunigung der Zugriffe'], answer: 1, explanation: 'Paritätsinformationen ermöglichen die Rekonstruktion von Daten, wenn ein Laufwerk ausfällt.' },
        { id: 'hot_spare_q1_raid', category: 'raid', question: 'Was ist ein Hot Spare Laufwerk?', choices: ['Ein externes Backup-Laufwerk', 'Ein standby Laufwerk, das automatisch einspringt', 'Ein besonders schnelles Laufwerk', 'Ein geheiztes Laufwerk'], answer: 1, explanation: 'Ein Hot Spare ist ein standby Laufwerk im RAID-Verbund, das automatisch ein ausgefallenes Laufwerk ersetzt.' },
        { id: 'rebuild_q1_raid', category: 'raid', question: 'Was passiert während eines RAID-Rebuilds?', choices: ['Das System wird neu gestartet', 'Daten werden auf ein Ersatzlaufwerk rekonstruiert', 'Alle Daten werden gelöscht', 'Die RAID-Konfiguration wird geändert'], answer: 1, explanation: 'Beim Rebuild werden die Daten eines ausgefallenen Laufwerks mithilfe der Redundanzinformationen auf einem Ersatzlaufwerk wiederhergestellt.' },
        { id: 'raid_controller_q1', category: 'raid', question: 'Welchen Vorteil bietet ein Hardware-RAID-Controller gegenüber Software-RAID?', choices: ['Geringere Kosten', 'Entlastung der CPU', 'Einfachere Konfiguration', 'Höhere Flexibilität'], answer: 1, explanation: 'Hardware-RAID-Controller haben einen eigenen Prozessor und entlasten die System-CPU von RAID-Berechnungen.' },
        { id: 'degraded_q1_raid', category: 'raid', question: 'Was bedeutet "degraded" bei einem RAID-Verbund?', choices: ['Optimale Performance', 'Ein Laufwerk ist ausgefallen, aber das System läuft noch', 'Alle Laufwerke funktionieren', 'Das RAID ist komplett ausgefallen'], answer: 1, explanation: 'Ein degraded RAID-Verbund bedeutet, dass ein oder mehrere Laufwerke ausgefallen sind, das System aber noch mit reduzierter Redundanz funktioniert.' },
        { id: 'stripe_size_q1_raid', category: 'raid', question: 'Was bestimmt die Stripe-Größe in einem RAID-System?', choices: ['Die Anzahl der Laufwerke', 'Die Größe der Datenblöcke, die auf jedes Laufwerk geschrieben werden', 'Die Kapazität der Laufwerke', 'Die Geschwindigkeit der Laufwerke'], answer: 1, explanation: 'Die Stripe-Größe definiert, wie große Datenblöcke auf die einzelnen Laufwerke im RAID-Verbund verteilt werden.' },
        { id: 'raid_performance_q1', category: 'raid', question: 'Welches RAID-Level bietet die beste Schreibperformance?', choices: ['RAID 1', 'RAID 5', 'RAID 6', 'RAID 0'], answer: 3, explanation: 'RAID 0 bietet die beste Performance, da Daten parallel auf alle Laufwerke geschrieben werden, ohne Overhead für Redundanz.' }
      ]
    }
  },
  {
    wissensbausteinId: "LF5_boss_software_virtual",
    titel: "Meilenstein-Prüfung: Software & Virtualisierung",
    lernfeld: 5,
    dependencies: ["LF5_raid"],
    difficulty: 4,
    estimatedDurationMinutes: 20,

    lernen: {
      beschreibung: "Beweise dein Wissen in der Anwendungsentwicklung, Versionskontrolle, Virtualisierung und Datenspeicherung. Diese Prüfung verknüpft Konzepte wie Docker, Kubernetes, TDD und RAID-Systeme."
    },

    anwenden: {
      anleitung: "Simuliere eine Architektur-Entscheidung für eine neue Anwendung.",
      /**
       * Gibt eine Architekturempfehlung basierend auf den Anforderungen.
       * @param {object} config - z.B. { zustand: 'stateless', skalierung: 'hoch', ausfallsicherheit: 'kritisch' }
       * @returns {string} Eine Architekturempfehlung.
       */
      simulation: function(config) {
        const { zustand, skalierung, ausfallsicherheit } = config;
        let empfehlung = '';
        let begruendung = [];

        if (zustand === 'stateless' && skalierung === 'hoch' && ausfallsicherheit === 'kritisch') {
          empfehlung = "Container-Orchestrierung mit Kubernetes";
          begruendung.push("+ 'Stateless' ist ideal für Container, da Instanzen jederzeit ersetzt werden können.");
          begruendung.push("+ Kubernetes bietet exzellente horizontale Skalierung (HPA) und Self-Healing für Ausfallsicherheit.");
          begruendung.push("+ Effiziente Ressourcennutzung.");
        } else if (zustand === 'stateful' && ausfallsicherheit === 'kritisch') {
          empfehlung = "Hochverfügbarkeits-Cluster mit Virtuellen Maschinen (VMs)";
          begruendung.push("+ VMs bieten starke Isolation für 'stateful' Anwendungen.");
          begruendung.push("+ HA-Funktionen (z.B. VMware HA) und Live Migration sichern die Verfügbarkeit bei Host-Ausfällen.");
          begruendung.push("+ Datenspeicherung auf fehlertolerantem Storage (z.B. RAID 10 SAN) ist essenziell.");
        } else if (skalierung === 'niedrig' && ausfallsicherheit === 'unkritisch') {
          empfehlung = "Einzelne Virtuelle Maschine (VM) auf einem Host";
          begruendung.push("+ Einfachstes und kostengünstigstes Setup.");
          begruendung.push("+ Geringe Skalierung und Ausfallsicherheit sind hier akzeptabel.");
          begruendung.push("+ Regelmäßige Backups sind ausreichend als Schutzmaßnahme.");
        } else {
          empfehlung = "Hybride Lösung: Container in VMs";
          begruendung.push("+ Nutzt die Portabilität von Containern und die starke Isolation von VMs.");
          begruendung.push("+ Gute Wahl für stateful Anwendungen, die dennoch von Container-Technologie profitieren sollen.");
        }

        return `Architektur-Entscheidung für eine neue Anwendung
---------------------------------------------------
Anforderungen:
- Anwendungszustand: ${zustand}
- Skalierungsbedarf: ${skalierung}
- Ausfallsicherheit: ${ausfallsicherheit}

Empfohlene Architektur: **${empfehlung}**

Begründung:
${begruendung.join('\n')}`;
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'sw_boss_q1', category: 'boss-software-virtual', question: 'Welche Isolation gewährleistet Kubernetes‑Namespace **nicht**?', choices: ['Ressourcen‑Quota', 'Linux‑User‑ID‑Namespace', 'Network‑Policy‑Isolation', 'Kernel‑Version‑Isolation'], answer: 3, explanation: 'Alle Pods teilen denselben Kernel – Version‑Isolation nur per VM möglich.' },
        { id: 'sw_boss_q2', category: 'boss-software-virtual', question: 'In einer CI/CD‑Pipeline ist die **Minimum Code Coverage** auf 80 % gesetzt. Welche Metrik überprüft, ob die Coverage stabil bleibt?', choices: ['Cyclomatic Complexity', 'Mutation Score', 'Trend‑Line Coverage', 'Defect Density'], answer: 2, explanation: 'Coverage‑Trend‑Analyse stellt sicher, dass der Schwellenwert im Zeitverlauf gehalten wird.' },
        { id: 'sw_boss_q3', category: 'boss-software-virtual', question: 'Das **TDD‑Paradigma** folgt welcher Reihenfolge?', choices: ['Refactor‑Green‑Red', 'Red‑Green‑Refactor', 'Green‑Red‑Refactor', 'Design‑Code‑Test'], answer: 1, explanation: 'Erst fehlschlagender Test (Red), dann Code (Green), dann Refactor.' },
        { id: 'sw_boss_q4', category: 'boss-software-virtual', question: 'Ein Hyper‑V‑Host nutzt **Memory Ballooning**. Welcher Effekt tritt bei hoher Overcommit‑Rate zuerst auf?', choices: ['CPU‑Throttling', 'Disk‑Swap‑Paging', 'NUMA‑Knoten‑Split', 'I/O Block Alignment'], answer: 1, explanation: 'Wenn RAM knapp wird, paget der Host auf Disk, was Latenz erhöht.' },
        { id: 'sw_boss_q5', category: 'boss-software-virtual', question: 'In ZFS‑RAIDZ‑2 mit acht 8 TB‑Platten beträgt die nutzbare Kapazität …', choices: ['≈ 48 TB', '≈ 40 TB', '≈ 32 TB', '≈ 56 TB'], answer: 0, explanation: 'n‑2 × Plattengröße = (8‑2) × 8 TB = 48 TB brutto (~ 43 TiB nutzbar).' },
        { id: 'sw_boss_q6', category: 'boss-software-virtual', question: 'Bei **Ansible‑Playbooks** stellt das Attribut „Idempotency“ sicher, dass …', choices: ['Tasks bei jedem Durchlauf neu ausgeführt werden', 'Tasks nur bei Änderung des Zustands wirken', 'Nur eine Transaktion zeitgleich läuft', 'Module automatisch rollenbasiert werden'], answer: 1, explanation: 'Idempotente Tasks ändern nur, wenn der Zielzustand abweicht.' },
        { id: 'sw_boss_q7', category: 'boss-software-virtual', question: 'Welches Deployment‑Muster minimiert Downtime, benötigt aber **doppelte Ressourcen** während des Rollouts?', choices: ['Rolling Update', 'Blue‑Green Deployment', 'Canary Release', 'A/B‑Testing'], answer: 1, explanation: 'Blue‑Green hält zwei vollständige Produktionsumgebungen parallel.' },
        { id: 'sw_boss_q8', category: 'boss-software-virtual', question: '„Three Pillars of Observability“ umfassen Logs, Traces und …', choices: ['Metrics', 'Events', 'Profiling', 'Dashboards'], answer: 0, explanation: 'Die dritte Säule sind Metriken (Zeitreihen).' },
        { id: 'sw_boss_q9', category: 'boss-software-virtual', question: 'Ein **Service‑Mesh‑Sidecar** übernimmt …', choices: ['Datenbank‑Sharding', 'Traffic‑Routing & Telemetrie', 'Kernel‑Patching', 'Filesystem‑Snapshotting'], answer: 1, explanation: 'Sidecars kapseln Routing, Auth, Telemetrie neben der Anwendung.' },
        { id: 'sw_boss_q10', category: 'boss-software-virtual', question: 'Welcher Hypervisor‑Typ läuft DIREKT auf Hardware ohne Host‑OS?', choices: ['Type‑2', 'Type‑1', 'Paravirtual', 'Nested'], answer: 1, explanation: 'Type‑1 (Bare‑Metal) interagiert direkt mit der Hardware.' },
        { id: 'sw_boss_q11', category: 'boss-software-virtual', question: 'Welches Container‑Format ersetzt das klassische Docker‑Image im **OCI‑Standard**?', choices: ['.tar Manifest', 'CRI-O', 'OCI Image Spec', 'rkt‑Image'], answer: 2, explanation: 'Die Open‑Container‑Initiative definiert die „OCI Image Specification“.' },
        { id: 'sw_boss_q12', category: 'boss-software-virtual', question: 'Der **CAP‑Theorem**‑Trade‑off eines verteilten Key‑Value‑Stores (nur zwei Eigenschaften voll erreichbar) gilt zwischen …', choices: ['Consistency, Availability, Partition Tolerance', 'Confidence, Acceleration, Performance', 'Correctness, Access, Privacy', 'Capacity, Alignment, Protection'], answer: 0, explanation: 'CAP steht für Consistency, Availability, Partition Tolerance.' },
        { id: 'sw_boss_q13', category: 'boss-software-virtual', question: 'Welche Kubernetes‑Funktion zwingt **Workloads** auf bestimmte Nodes trotz anderslautender Scheduler‑Entscheidung?', choices: ['Taints & Tolerations', 'Node‑Selectors', 'PodDisruptionBudget', 'Affinity‑AntiAffinity'], answer: 0, explanation: 'Taints/Tolerations blockieren Scheduling außer bei explizit tolerierten Pods.' },
        { id: 'sw_boss_q14', category: 'boss-software-virtual', question: '**Chaos‑Engineering**‑Tests verfolgen primär welches Ziel?', choices: ['Performance‑Optimierung', 'Fehler‑Früherkennung unter Produktion', 'Compliance‑Nachweis', 'Kostensenkung durch Reduktion der VM‑Anzahl'], answer: 1, explanation: 'Gezielte Störungen prüfen System‑Resilienz live.' },
        { id: 'sw_boss_q15', category: 'boss-software-virtual', question: 'Ein Microservices‑Umfeld soll das **Circuit‑Breaker‑Pattern** angewendet werden. Was passiert bei geöffneter Sicherung?', choices: ['Requests werden sofort abgelehnt', 'Requests retries endlos', 'Fallback‑Service übernimmt automatisch', 'Load Balancer entfernt Instanz'], answer: 0, explanation: 'Der Circuit Breaker blockiert Aufrufe, bis das Ziel wieder gesund ist.' }
      ]
    }
  },

  // =====================================================================================
  // BLOCK 16-18: Service & Cloud
  // =====================================================================================
  {
    wissensbausteinId: "LF6_kundenberatung",
    titel: "Kundenberatung",
    lernfeld: 6,
    dependencies: ["LF5_boss_software_virtual"],
    difficulty: 2,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Verbessere deine Kommunikationsfähigkeiten. Lerne Techniken wie aktives Zuhören, die richtige Fragetechnik und den Umgang mit Einwänden, um Kunden professionell und erfolgreich zu beraten."
    },

    anwenden: {
      anleitung: "Simuliere eine Antwort auf einen Kundeneinwand mit der 'Verständnis-Brücke'-Technik.",
      /**
       * Formuliert eine professionelle Antwort auf einen Kundeneinwand.
       * @param {object} config - z.B. { einwand: 'zu teuer' }
       * @returns {string} Eine beispielhafte Antwort.
       */
      simulation: function(config) {
        switch (config.einwand) {
          case 'zu teuer':
            return `Einwand des Kunden: "Ihre Lösung ist mir zu teuer."
------------------------------------------------------
Antwort mit der 'Verständnis-Brücke'-Technik:

1. Verständnis zeigen:
   "Ich verstehe, dass der Preis ein wichtiger Punkt ist und das Budget eingehalten werden muss."

2. Brücke zum Nutzen bauen:
   "Lassen Sie uns deshalb gemeinsam genau prüfen, welchen langfristigen Wert Sie durch diese Investition schaffen. Im Gegensatz zu günstigeren Alternativen sparen Sie durch die höhere Automatisierung ca. 2 Stunden Arbeitszeit pro Woche und unser 24/7-Support ist bereits inklusive."

Ziel: Den Fokus vom Preis auf den Wert (ROI, Einsparungen, Sicherheit) lenken.`;
          case 'zu kompliziert':
            return `Einwand des Kunden: "Das sieht alles sehr kompliziert aus."
------------------------------------------------------
Antwort mit der 'Verständnis-Brücke'-Technik:

1. Verständnis zeigen:
   "Das kann ich nachvollziehen, auf den ersten Blick wirkt der Funktionsumfang sehr umfangreich."

2. Brücke zur Lösung bauen:
   "Genau aus diesem Grund ist in unserem Angebot eine persönliche, zweistündige Einführungsschulung für Ihr Team enthalten. Danach können Sie die wichtigsten Funktionen sofort produktiv nutzen. Wir sorgen dafür, dass der Einstieg für Sie einfach ist."

Ziel: Die wahrgenommene Komplexität durch eine konkrete Hilfestellung (Schulung, Support) entkräften.`;
          default:
            return "Bitte einen Einwand angeben.";
        }
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'listen_q1', category: 'kundenberatung', question: 'Welche Technik gehört zum aktiven Zuhören?', choices: ['Den Sprecher unterbrechen, um eigene Punkte zu machen', 'Während des Sprechens bereits die eigene Antwort formulieren', 'Paraphrasieren des Gehörten zur Bestätigung des Verständnisses', 'Augenkontakt vermeiden, um den Sprecher nicht abzulenken'], answer: 2, explanation: 'Paraphrasieren, also das Gehörte in eigenen Worten zusammenfassen, ist eine Kerntechnik des aktiven Zuhörens.' },
        { id: 'vom_q1_kb', category: 'kundenberatung', question: 'Welche Ebene des Vier-Ohren-Modells beschreibt, wie der Sender zum Empfänger steht und was er von ihm hält?', choices: ['Sachebene', 'Selbstoffenbarungsebene', 'Beziehungsebene', 'Appellebene'], answer: 2, explanation: 'Die Beziehungsebene gibt Aufschluss darüber, wie die Beziehung zwischen Sender und Empfänger definiert wird.' },
        { id: 'frage_q1', category: 'kundenberatung', question: 'Welchen Zweck haben geschlossene Fragen (z.B. Fragen, die mit Ja/Nein beantwortet werden können) hauptsächlich?', choices: ['Ausführliche Erklärungen zu erhalten', 'Gezielte, spezifische Informationen oder Bestätigungen zu bekommen', 'Das Gespräch in die Breite zu führen', 'Emotionale Reaktionen hervorzurufen'], answer: 1, explanation: 'Geschlossene Fragen dienen dazu, spezifische, oft kurze Antworten oder Bestätigungen zu erhalten.' },
        { id: 'einwand_q1', category: 'kundenberatung', question: 'Was ist ein empfohlener erster Schritt bei der Behandlung eines Kundeneinwands?', choices: ['Den Einwand sofort widerlegen', 'Den Preis reduzieren', 'Verständnis für den Einwand zeigen und ihn anerkennen', 'Das Produkt wechseln'], answer: 2, explanation: 'Zuerst Verständnis für den Einwand des Kunden zu signalisieren, baut eine bessere Gesprächsbasis auf, bevor man auf den Inhalt des Einwandes eingeht.' },
        { id: 'ziel_q1', category: 'kundenberatung', question: 'Warum ist es wichtig, die Sprache bei einer Präsentation an die Zielgruppe anzupassen?', choices: ['Um Fachkompetenz mit möglichst vielen Fremdwörtern zu demonstrieren', 'Um sicherzustellen, dass die Botschaft verstanden wird und Resonanz erzeugt', 'Um die Präsentationszeit zu verkürzen', 'Um einen einheitlichen Stil für alle Präsentationen zu haben'], answer: 1, explanation: 'Die Anpassung der Sprache an die Zielgruppe ist entscheidend für das Verständnis und die Akzeptanz der vermittelten Inhalte.' },
        { id: 'bedarf_q1_kb', category: 'kundenberatung', question: 'Welche Frageart eignet sich am besten zur Bedarfsermittlung?', choices: ['Suggestivfragen', 'Offene Fragen', 'Alternativfragen', 'Rhetorische Fragen'], answer: 1, explanation: 'Offene Fragen (W-Fragen) ermöglichen es dem Kunden, ausführlich über seine Bedürfnisse und Anforderungen zu sprechen.' },
        { id: 'verkauf_q1_kb', category: 'kundenberatung', question: 'Was versteht man unter "Cross-Selling"?', choices: ['Verkauf an Konkurrenten', 'Verkauf zusätzlicher, ergänzender Produkte', 'Verkauf höherwertiger Produkte', 'Verkauf in anderen Ländern'], answer: 1, explanation: 'Cross-Selling bezeichnet den Verkauf zusätzlicher Produkte oder Dienstleistungen, die das Hauptprodukt ergänzen.' },
        { id: 'upsell_q1_kb', category: 'kundenberatung', question: 'Was bedeutet "Up-Selling"?', choices: ['Verkauf nach oben in die Geschäftsführung', 'Verkauf höherwertiger Alternativen zum ursprünglich gewünschten Produkt', 'Verkauf über Online-Kanäle', 'Verkauf während der Arbeitszeit'], answer: 1, explanation: 'Up-Selling ist der Verkauf einer höherwertigen Variante oder Alternative zum ursprünglich angebotenen Produkt.' },
        { id: 'körper_q1_kb', category: 'kundenberatung', question: 'Welcher Anteil der Kommunikation erfolgt über Körpersprache?', choices: ['Etwa 20%', 'Etwa 35%', 'Etwa 55%', 'Etwa 80%'], answer: 2, explanation: 'Nach der Mehrabian-Regel beträgt der Anteil der Körpersprache an der Gesamtkommunikation etwa 55%.' },
        { id: 'after_q1_kb', category: 'kundenberatung', question: 'Was ist wichtig für eine erfolgreiche After-Sales-Betreuung?', choices: ['Sofortige Verkaufsgespräche für neue Produkte', 'Regelmäßiger Kontakt und Unterstützung bei Problemen', 'Keine weitere Kommunikation um Kosten zu sparen', 'Weiterleitung an andere Abteilungen'], answer: 1, explanation: 'After-Sales-Service beinhaltet fortlaufende Kundenbetreuung, Problemlösung und Beziehungspflege nach dem Verkauf.' },
        { id: 'beschw_q1_kb', category: 'kundenberatung', question: 'Wie sollte man mit Kundenbeschwerden umgehen?', choices: ['Defensiv reagieren und Schuld abweisen', 'Zuhören, verstehen, Lösungen anbieten', 'An Vorgesetzte weiterleiten', 'Ignorieren und hoffen, dass es sich erledigt'], answer: 1, explanation: 'Professionelles Beschwerdemanagement umfasst aktives Zuhören, Empathie und proaktive Lösungsvorschläge.' },
        { id: 'aida_q1_kb', category: 'kundenberatung', question: 'Wofür steht das "D" im AIDA-Modell?', choices: ['Decision', 'Desire', 'Demonstration', 'Development'], answer: 1, explanation: 'AIDA steht für Attention, Interest, Desire, Action - das "D" steht für "Desire" (Verlangen/Wunsch).' }
      ]
    }
  },
  {
    wissensbausteinId: "LF6_cloud_basics",
    titel: "Cloud Basics",
    lernfeld: 6,
    dependencies: ["LF6_kundenberatung"],
    difficulty: 2,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Erlerne die grundlegenden Konzepte des Cloud Computings. Verstehe die Service-Modelle (IaaS, PaaS, SaaS) und Bereitstellungsmodelle (Public, Private, Hybrid) sowie Kernmerkmale wie Elastizität."
    },

    anwenden: {
      anleitung: "Simuliere die Auswahl des richtigen Cloud-Service-Modells für eine bestimmte Anforderung.",
      /**
       * Empfiehlt ein Cloud-Service-Modell.
       * @param {object} config - z.B. { anforderung: 'fertige_software_nutzen' }
       * @returns {string} Eine Empfehlung für ein Service-Modell.
       */
      simulation: function(config) {
        switch (config.anforderung) {
          case 'fertige_software_nutzen':
            return `Anforderung: Eine fertige Software (z.B. CRM, Office Suite) nutzen.
-------------------------------------------------------------------------
Empfehlung: **SaaS (Software as a Service)**

Verantwortung des Kunden:
- Nur die Daten und Benutzerverwaltung.

Beispiele: Office 365, Salesforce, Google Workspace.

Fazit: Ideal für Endanwender. Maximale Bequemlichkeit, da man sich um nichts Technisches kümmern muss.`;
          case 'eigene_anwendung_entwickeln':
            return `Anforderung: Eine eigene Anwendung entwickeln und bereitstellen.
-------------------------------------------------------------------------
Empfehlung: **PaaS (Platform as a Service)**

Verantwortung des Kunden:
- Die eigene Anwendung und die Daten.

Beispiele: Heroku, AWS Elastic Beanstalk, Google App Engine.

Fazit: Ideal für Entwickler. Man kann sich voll auf den Code konzentrieren, ohne Server, Betriebssysteme oder Laufzeitumgebungen patchen zu müssen.`;
          case 'volle_infrastruktur_kontrolle':
            return `Anforderung: Volle Kontrolle über Betriebssystem und Netzwerk.
-------------------------------------------------------------------------
Empfehlung: **IaaS (Infrastructure as a Service)**

Verantwortung des Kunden:
- Betriebssystem, Middleware, Laufzeitumgebung, Anwendung und Daten.

Beispiele: Amazon EC2, Microsoft Azure VMs, Google Compute Engine.

Fazit: Ideal für Systemadministratoren. Maximale Flexibilität und Kontrolle, aber auch die meiste Verantwortung.`;
          default:
            return "Unbekannte Anforderung.";
        }
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'clo1', category: 'cloud-basics', question: 'Welche Schicht stellt fertige Software über das Internet bereit?', choices: ['SaaS', 'PaaS', 'IaaS', 'FaaS'], answer: 0, explanation: '' },
        { id: 'clo2', category: 'cloud-basics', question: 'Welche Eigenschaft gehört **nicht** zu den fünf Kernmerkmalen von Cloud Computing laut NIST?', choices: ['Proprietäre Schnittstellen', 'Breiter Netzwerkzugang', 'Ressourcen‑Pooling', 'Messbarer Service'], answer: 0, explanation: '' },
        { id: 'clo3', category: 'cloud-basics', question: 'Welche Bereitstellungsform beschreibt eine Cloud‑Umgebung, die nur von einem Unternehmen genutzt wird?', choices: ['Private Cloud', 'Public Cloud', 'Hybrid Cloud', 'Community Cloud'], answer: 0, explanation: '' },
        { id: 'clo4', category: 'cloud-basics', question: 'Welche Abrechnungsmethode ist typisch für Cloud‑Ressourcen?', choices: ['Pay‑as‑you‑go', 'Einmalzahlung', 'Abonnement ohne Nutzung', 'Lizenz pro Host'], answer: 0, explanation: '' },
        { id: 'clo5', category: 'cloud-basics', question: 'Welche ISO‑Norm behandelt Informationssicherheits‑Management, relevant für Cloud‑Audits?', choices: ['ISO 27001', 'ISO 9001', 'ISO 31000', 'ISO 20000‑1'], answer: 0, explanation: '' },
        { id: 'clo6', category: 'cloud-basics', question: 'Was beschreibt die „Elasticity“ einer Cloud‑Plattform?', choices: ['Automatische Skalierung je nach Last', 'Hohe physische Redundanz', 'Statische Ressourcen', 'Fixe Vertragslaufzeit'], answer: 0, explanation: '' },
        { id: 'clo7', category: 'cloud-basics', question: 'Welches Konzept trennt in Kubernetes Container‑Netzwerke voneinander?', choices: ['Namespaces', 'Tags', 'SG‑ACL', 'VDOM'], answer: 0, explanation: '' },
        { id: 'clo8', category: 'cloud-basics', question: 'Mit welchem Befehl wird eine VM‑Instanz bei AWS gestartet?', choices: ['aws ec2 run‑instances', 'aws s3 cp', 'aws lambda invoke', 'aws cloudwatch put-metric-data'], answer: 0, explanation: '' },
        { id: 'clo9', category: 'cloud-basics', question: 'Welche Cloud‑Service‑Kategorie passt zu „Azure Functions“?', choices: ['FaaS', 'SaaS', 'IaaS', 'CaaS'], answer: 0, explanation: '' },
        { id: 'clo10', category: 'cloud-basics', question: 'Was ist ein Vorteil von Multi‑Cloud‑Strategien?', choices: ['Vermeidung von Vendor‑Lock‑in', 'Höhere Komplexität', 'Geringere Verfügbarkeit', 'Abhängigkeit von einem Anbieter'], answer: 0, explanation: '' },
        { id: 'clo11', category: 'cloud-basics', question: 'Welche Virtualisierungstechnik nutzt Container‑Isolation auf Betriebssystem‑Ebene?', choices: ['Cgroups & Namespaces', 'Type‑1 Hypervisor', 'Paravirtualisierung', 'Full Emulation'], answer: 0, explanation: '' },
        { id: 'clo12', category: 'cloud-basics', question: 'Was steht hinter dem Begriff „Infrastructure as Code“?', choices: ['Automatisierte Provisionierung mittels Skripten/Manifests', 'Hardware‑Design als VHDL‑Datei', 'Dokumentation des RZ‑Layouts', 'Nutzung proprietärer Images'], answer: 0, explanation: '' }
      ]
    }
  },
  {
    wissensbausteinId: "LF6_wiso_grundlagen",
    titel: "WISO Grundlagen",
    lernfeld: 6,
    dependencies: ["LF6_cloud_basics"],
    difficulty: 3,
    estimatedDurationMinutes: 15,

    lernen: {
      beschreibung: "Wiederhole wichtige Grundlagen der Wirtschafts- und Sozialkunde. Dazu gehören Marktformen, Unternehmensformen (GmbH), die SWOT-Analyse und das Magische Viereck der Wirtschaftspolitik."
    },

    anwenden: {
      anleitung: "Simuliere eine einfache Break-Even-Analyse für ein neues Produkt.",
      /**
       * Berechnet den Break-Even-Point.
       * @param {object} config - z.B. { fixkosten: 10000, preisProStueck: 50, variableKostenProStueck: 30 }
       * @returns {string} Das Ergebnis der Break-Even-Analyse.
       */
      simulation: function(config) {
        const { fixkosten, preisProStueck, variableKostenProStueck } = config;
        if (isNaN(fixkosten) || isNaN(preisProStueck) || isNaN(variableKostenProStueck)) {
          return "Bitte geben Sie gültige Zahlen ein.";
        }

        const deckungsbeitrag = preisProStueck - variableKostenProStueck;
        if (deckungsbeitrag <= 0) {
          return `Fehler: Der Preis pro Stück (${preisProStueck} €) muss höher sein als die variablen Kosten (${variableKostenProStueck} €), um einen positiven Deckungsbeitrag zu erzielen.`;
        }

        const breakEvenMenge = Math.ceil(fixkosten / deckungsbeitrag);
        const breakEvenUmsatz = breakEvenMenge * preisProStueck;

        return `Break-Even-Analyse für ein neues Produkt:
-------------------------------------------
Kostenstruktur:
- Fixkosten (Miete, Gehälter etc.): ${fixkosten.toLocaleString('de-DE')} €
- Variable Kosten pro Stück (Material etc.): ${variableKostenProStueck.toLocaleString('de-DE')} €
- Verkaufspreis pro Stück: ${preisProStueck.toLocaleString('de-DE')} €

Berechnung:
- Deckungsbeitrag pro Stück (Gewinnmarge): ${deckungsbeitrag.toLocaleString('de-DE')} €

Ergebnis:
- Break-Even-Menge: **${breakEvenMenge} Stück**
- Break-Even-Umsatz: **${breakEvenUmsatz.toLocaleString('de-DE')} €**

Fazit: Sie müssen ${breakEvenMenge} Stück verkaufen, um alle Ihre Kosten zu decken. Jedes weitere verkaufte Stück generiert ${deckungsbeitrag} € Gewinn.`;
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'wis1', category: 'wiso-grundlagen', question: 'Welche Organisationsform ist **kein** typisches betriebswirtschaftliches Produktionsfaktor‑Modell?', choices: ['Politische Organisation', 'Dispositive Faktoren', 'Betriebsmittel', 'Werkstoffe'], answer: 0, explanation: '' },
        { id: 'wis2', category: 'wiso-grundlagen', question: 'Wie lautet die Formel zur Berechnung des Break‑Even‑Points (Stückzahl)?', choices: ['Fixkosten ÷ (Preis − variable Kosten pro Stück)', 'Gesamtkosten ÷ Umsatz', 'Fixkosten × Preis', 'Variable Kosten ÷ Preis'], answer: 0, explanation: '' },
        { id: 'wis3', category: 'wiso-grundlagen', question: 'Welche Marktform herrscht, wenn viele Anbieter auf viele Nachfrager treffen?', choices: ['Polypol', 'Monopol', 'Oligopol', 'Duopol'], answer: 0, explanation: '' },
        { id: 'wis4', category: 'wiso-grundlagen', question: 'Welche vier Felder umfasst die SWOT‑Analyse?', choices: ['Strengths, Weaknesses, Opportunities, Threats', 'Strategy, Work, Options, Targets', 'Structure, Weakness, Opportunities, Trends', 'Strengths, Wishes, Offers, Threats'], answer: 0, explanation: '' },
        { id: 'wis5', category: 'wiso-grundlagen', question: 'Wer trägt in der GmbH das Haftungsrisiko?', choices: ['Die Gesellschaft mit ihrem Stammkapital', 'Die Gesellschafter mit Privatvermögen', 'Nur der Geschäftsführer', 'Der Staat'], answer: 0, explanation: '' },
        { id: 'wis6', category: 'wiso-grundlagen', question: 'Welcher Prozentsatz des Lohns beträgt der Arbeitnehmeranteil zur Krankenversicherung (2025, ohne Zusatzbeitrag)?', choices: ['7,3 %', '14,6 %', '9,95 %', '15,0 %'], answer: 0, explanation: '' },
        { id: 'wis7', category: 'wiso-grundlagen', question: 'Was versteht man unter dem „Magischen Viereck“ der Wirtschaftspolitik?', choices: ['Preisniveaustabilität, hoher Beschäftigungsstand, außenwirtschaftliches Gleichgewicht, stetiges Wirtschaftswachstum', 'Digitalisierung, Nachhaltigkeit, Globalisierung, Innovation', 'Inflation, Rezession, Boom, Depression', 'Monetarisierung, Wettbewerb, Nachfrage, Angebot'], answer: 0, explanation: '' },
        { id: 'wis8', category: 'wiso-grundlagen', question: 'Welche Steuer fließt vollständig den Gemeinden zu?', choices: ['Gewerbesteuer', 'Einkommensteuer', 'Umsatzsteuer', 'Körperschaftsteuer'], answer: 0, explanation: '' },
        { id: 'wis9', category: 'wiso-grundlagen', question: 'In welchem Gesetzbuch ist das Arbeitsrecht vor allem geregelt?', choices: ['Bürgerliches Gesetzbuch (BGB)', 'Handelsgesetzbuch (HGB)', 'Grundgesetz (GG)', 'Gerichtsverfassungsgesetz (GVG)'], answer: 0, explanation: '' },
        { id: 'wis10', category: 'wiso-grundlagen', question: 'Welcher Vertragstyp eignet sich, wenn ein externer Dienstleister regelmäßig IT‑Systeme wartet?', choices: ['Dienstvertrag', 'Kaufvertrag', 'Werkvertrag', 'Leasingvertrag'], answer: 0, explanation: '' },
        { id: 'wis11', category: 'wiso-grundlagen', question: 'Wann spricht man von Liquidität 1. Grades?', choices: ['Flüssige Mittel ÷ Kurzfristige Verbindlichkeiten', 'Umlaufvermögen ÷ kurzfristige Verbindlichkeiten', 'Flüssige Mittel ÷ Gesamtkapital', 'Eigenkapital ÷ Fremdkapital'], answer: 0, explanation: '' },
        { id: 'wis12', category: 'wiso-grundlagen', question: 'Was ist das Ziel des Lean‑Managements?', choices: ['Verschwendungsarme Prozesse und kontinuierliche Verbesserung', 'Maximale Lagerbestände', 'Hierarchische Organisation', 'Investition in starke Bürokratie'], answer: 0, explanation: '' }
      ]
    }
  },
  // ... (Fortsetzung des Codes von oben) ...
  {
    wissensbausteinId: "LF6_boss_service_cloud",
    titel: "Meilenstein-Prüfung: Service & Cloud",
    lernfeld: 6,
    dependencies: ["LF6_wiso_grundlagen"],
    difficulty: 4,
    estimatedDurationMinutes: 20,

    lernen: {
      beschreibung: "Beweise dein Wissen über Cloud-Strategien, IT-Service-Management und Kundenkommunikation. Diese Prüfung integriert FinOps, ITIL, Shared-Responsibility und rechtliche Aspekte wie die DSGVO im Cloud-Kontext."
    },

    anwenden: {
      anleitung: "Simuliere die Entscheidung für ein Cloud-Bereitstellungsmodell basierend auf Unternehmensanforderungen.",
      /**
       * Empfiehlt ein Cloud-Bereitstellungsmodell.
       * @param {object} config - z.B. { kontrolle: 'hoch', skalierung: 'moderat', compliance: 'kritisch' }
       * @returns {string} Eine Empfehlung.
       */
      simulation: function(config) {
        const { kontrolle, skalierung, compliance } = config;
        let empfehlung = '';
        let begruendung = [];

        if (kontrolle === 'hoch' && compliance === 'kritisch') {
          empfehlung = "Private Cloud";
          begruendung.push("+ Bietet maximale Kontrolle über Hardware und Datenstandort.");
          begruendung.push("+ Erleichtert die Einhaltung strenger Compliance-Vorgaben (z.B. DSGVO, KRITIS).");
          begruendung.push("- Höherer initialer Investitionsaufwand (CAPEX).");
          begruendung.push("- Skalierbarkeit ist begrenzt durch die eigene Hardware.");
        } else if (skalierung === 'hoch' && kontrolle === 'niedrig') {
          empfehlung = "Public Cloud";
          begruendung.push("+ Bietet nahezu unbegrenzte Elastizität und Skalierbarkeit.");
          begruendung.push("+ Pay-as-you-go-Modell (OPEX) ohne hohe Anfangsinvestitionen.");
          begruendung.push("- Geteilte Verantwortung ('Shared Responsibility Model').");
          begruendung.push("- Weniger Kontrolle über die physische Infrastruktur.");
        } else if (kontrolle === 'hoch' && skalierung === 'hoch') {
          empfehlung = "Hybrid Cloud";
          begruendung.push("+ Das Beste aus beiden Welten: Sicherheit und Skalierbarkeit kombiniert.");
          begruendung.push("+ Sensible Daten und kritische Workloads bleiben in der Private Cloud.");
          begruendung.push("+ Lastspitzen können in die Public Cloud ausgelagert werden ('Cloud Bursting').");
          begruendung.push("- Höhere Komplexität in der Verwaltung und im Netzwerk-Setup.");
        } else {
          empfehlung = "Multi-Cloud-Strategie";
          begruendung.push("+ Vermeidung von Vendor-Lock-in durch Nutzung mehrerer Public-Cloud-Anbieter.");
          begruendung.push("+ Möglichkeit, für jeden Workload den besten und günstigsten Service auszuwählen.");
          begruendung.push("- Sehr hohe Komplexität bei der Verwaltung, Kostenkontrolle und Sicherheit.");
        }

        return `Cloud-Strategie-Beratung:
--------------------------------
Anforderungen des Unternehmens:
- Kontrolle über Infrastruktur: ${kontrolle}
- Skalierungsbedarf: ${skalierung}
- Compliance-Anforderungen: ${compliance}

Empfohlenes Bereitstellungsmodell: **${empfehlung}**

Analyse:
${begruendung.join('\n')}`;
      }
    },
    prüfen: {
      type: 'quiz',
      source: [
        { id: 'cl_boss_q1', category: 'boss-service-cloud', question: 'Ein Kunde verlangt DSGVO‑konforme Datenhaltung in einer Multi‑Cloud‑Strategie. Welche Maßnahme erfüllt **nicht** automatisch die Anforderungen?', choices: ['Datenverschlüsselung AES‑256 at rest', 'Speicherung in EU‑Regionen aller Provider', 'Schlüsselverwaltung durch den Cloud‑Kunden (BYOK)', 'Standardvertragsklauseln (SCC) ohne Transfer in Drittländer'], answer: 1, explanation: 'Region‑Standort allein genügt nicht, wenn Admin‑Zugriff außerhalb der EU möglich ist.' },
        { id: 'cl_boss_q2', category: 'boss-service-cloud', question: 'Welcher **FinOps‑KPI** misst den Anteil rabattierter Ressourcennutzung (z. B. Reserved Instances) an der Gesamtlaufzeit?', choices: ['Coverage', 'Savings Plan Utilization', 'Unit Cost', 'Waste Spend'], answer: 0, explanation: 'Coverage zeigt, wie viel der Gesamtzeit unter Rabattmodell läuft.' },
        { id: 'cl_boss_q3', category: 'boss-service-cloud', question: 'ITIL 4: Ein **Incident** wird gemeldet. Wann wird er zum **Problem**?', choices: ['Wenn er Security‑Relevanz hat', 'Wenn Root‑Cause unbekannt bleibt', 'Nach Eskalation auf Major Severity', 'Wenn mehrere Incidents gleiche Ursache vermuten lassen'], answer: 3, explanation: 'Wiederkehrende Incidents gleicher Ursache werden als Problem analysiert.' },
        { id: 'cl_boss_q4', category: 'boss-service-cloud', question: 'Shared‑Responsibility‑Modell IaaS: Wer ist für Patch‑Management des **Gastsystems** verantwortlich?', choices: ['Cloud‑Provider', 'Shared (50/50)', 'Kunde', 'Managed‑Service‑Partner automatisch'], answer: 2, explanation: 'Bei IaaS patcht der Kunde OS & Applikation, Provider nur Hardware/Hypervisor.' },
        { id: 'cl_boss_q5', category: 'boss-service-cloud', question: 'Eine **Multi‑Cloud‑Architektur** benötigt portable Workloads. Welche Container‑Technik minimiert Write‑Amplification beim Image‑Pull?', choices: ['Layered Union‑FS', 'Copy‑on‑Write Volume Snapshot', 'Thick Provisioning', 'Overlay2 Bind‑Mount'], answer: 0, explanation: 'Layering ermöglicht Wiederverwendung bestehender Image‑Schichten – weniger Traffic.' },
        { id: 'cl_boss_q6', category: 'boss-service-cloud', question: 'Ein Edge‑Cluster in Deutschland repliziert MQTT‑Telemetry in US‑Regionen. Welcher **DSGVO‑Mechanismus** legitimiert den Transfer am ehesten?', choices: ['Binding Corporate Rules (BCR)', 'Privacy‑Shield', 'Pseudonymisierung', 'Data Processing Addendum (DPA) allein'], answer: 0, explanation: 'BCR schaffen konzern‑interne Rechtsgrundlage für Drittland‑Transfers.' },
        { id: 'cl_boss_q7', category: 'boss-service-cloud', question: 'Ein Service hat ein monatliches **SLO 99,9 % Verfügbarkeit**. Wie hoch ist das **Fehlerbudget** pro Monat?', choices: ['~ 43 min', '~ 4 h 23 min', '~ 7 h 12 min', '~ 26 min'], answer: 0, explanation: '0,1 % von 30 d ≈ 43 min.' },
        { id: 'cl_boss_q8', category: 'boss-service-cloud', question: 'Spot‑Instance‑Bereitstellung kann **preempted** werden. Welche Workload eignet sich am WENIGSTEN?', choices: ['Batch‑Rendering', 'CI‑Test‑Runner', 'In‑Memory Session‑Cache', 'Stateless MapReduce'], answer: 2, explanation: 'Cache‑Verlust beeinträchtigt Benutzererlebnis; State erfordert Hochverfügbarkeit.' },
        { id: 'cl_boss_q9', category: 'boss-service-cloud', question: '**Infrastructure‑as‑Code Drift Detection** findet unerwartete Änderungen. Welche Maßnahme AUTOMATISIERT Gegenmaßnahmen?', choices: ['Manual Pull Request', 'Policy‑as‑Code Enforce', 'Immutable‑Deploy', 'Scheduled Terraform Plan‑Only'], answer: 1, explanation: 'Policy‑Engines (OPA, Sentinel) blocken Drifts automatisch oder rollen zurück.' },
        { id: 'cl_boss_q10', category: 'boss-service-cloud', question: 'Ein **CSPM**‑Tool meldet „Public S3 Bucket“ Critical. Welche AWS‑Richtlinie behebt das dauerhaft?', choices: ['BlockPublicAcls', 'Force MFA‑Delete', 'Enable Versioning', 'S3 Transfer‑Acceleration'], answer: 0, explanation: 'BlockPublicACLs verhindert alle öffentlichen ACL‑Änderungen.' },
        { id: 'cl_boss_q11', category: 'boss-service-cloud', question: 'Hohe **Daten‑Egress‑Kosten** treten insbesondere bei …', choices: ['Cloud‑internem Traffic', 'Inter‑AZ‑Traffic gleicher Region', 'Download in On‑Prem‑DC', 'Upload in Cloud'], answer: 2, explanation: 'Abfluss (Egress) zu On‑Prem / Internet verursacht die höchsten Gebühren.' },
        { id: 'cl_boss_q12', category: 'boss-service-cloud', question: 'Eine **OLA** (Operational Level Agreement) unterscheidet sich von SLA primär durch …', choices: ['Bindet externe Kunden ein', 'Richtet sich an interne Provider', 'Hat immer höhere Verfügbarkeits‑Ziele', 'Ist rechtlich unverbindlich'], answer: 1, explanation: 'OLAs regeln interne Leistungsbeziehungen (IT‑Back‑office). SLAs binden Kunden.' },
        { id: 'cl_boss_q13', category: 'boss-service-cloud', question: 'Welches **Cloud‑Bursting‑Szenario** ist typisch für HPC‑Workloads?', choices: ['Permanent‑Hybrid', 'Batch‑Overflow in Public Cloud', 'Data‑Gravity‑Lock‑in', 'Failback Auto‑Scaling'], answer: 1, explanation: 'HPC nutzt Public‑Cloud nur bei Spitzenlast (Overflow).' },
        { id: 'cl_boss_q14', category: 'boss-service-cloud', question: 'Ein **CASB** implementiert „Shadow‑IT Discovery“. Welche Datenquelle ist dafür essentiell?', choices: ['Proxy‑Logs', 'IAM‑Policies', 'WAF‑Events', 'CMDB‑Inventory'], answer: 0, explanation: 'Proxy‑/Firewall‑Logs liefern Ziel‑URLs unbekannter Cloud‑Dienste.' },
        { id: 'cl_boss_q15', category: 'boss-service-cloud', question: 'Tag‑Strategien für Kostenstellen sollten **automatisch** durch CI/CD‑Pipelines gesetzt werden, um …', choices: ['Einfache Abschreibungen zu erhöhen', 'Nachverfolgung von Cloud‑Kosten je Team sicherzustellen', 'Latency‑SLA zu verbessern', 'Multi‑Tenancy‑Isolation zu brechen'], answer: 1, explanation: 'Automatisierte Tags ermöglichen exaktes Cost‑Allocation pro Team/Projekt.' }
      ]
    }
  },
];