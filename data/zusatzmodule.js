/* =====================================================================
 * data/zusatzmodule.js  – v12.0 (Finale Master-Version, inhaltlich korrigiert)
 * =====================================================================
 */

export const zusatzmodule = [
  {
    id: "ap1_f2025_1a_nutzwertanalyse",
    titel: "AP1-2025 (1a): Strategische Nutzwertanalyse",
    typ: "weighted_decision_matrix", 
    beschreibung: "Führen Sie eine vollständige Nutzwertanalyse durch. Berücksichtigen Sie eine sinnvolle kaufmännische Gewichtung der Kriterien, bevor Sie die Punkte vergeben.",
    devices: ["Gerät 1", "Gerät 2", "Gerät 3"],
    criteria: [
      { label: "Geschw. Druck", values: ["40 S/min", "62 S/min", "50 S/min"] },
      { label: "Geschw. Scan", values: ["20 S/min", "50 S/min", "40 S/min"] },
      { label: "Wartungskosten", values: ["50 €", "10 €", "15 €"] },
      { label: "Preis", values: ["3.456 €", "2.844 €", "1.656 €"] }
    ],
    bestDevice: 1,
    explanation: "Eine professionelle Nutzwertanalyse erfordert eine Gewichtung. Beispiel:<br><b>Gewichtung:</b> Preis (40%), Wartung (30%), Druck (15%), Scan (15%).<br><b>Punkte (1-3):</b> G1(1,1,1,1), G2(3,3,3,2), G3(2,2,2,3).<br><b>Gewichtete Summen:</b><br>G1: (1*0.15)+(1*0.15)+(1*0.3)+(1*0.4) = 1.0<br>G2: (3*0.15)+(3*0.15)+(3*0.3)+(2*0.4) = 2.6<br>G3: (2*0.15)+(2*0.15)+(2*0.3)+(3*0.4) = 2.4<br><b>Fazit:</b> Auch mit Gewichtung ist Gerät 2 die beste Wahl.",
    justificationPrompt: "Begründen Sie, warum aus Sicht eines Unternehmens der Preis und die Wartungskosten typischerweise eine höhere Gewichtung erhalten als die reine Scangeschwindigkeit.",
    justificationKeywords: {
        requiredScore: 3,
        groups: [
            { points: 2, keywords: ["tco", "total cost of ownership", "gesamtkosten", "langfristig", "folgekosten"] },
            { points: 1, keywords: ["laufende kosten", "betriebskosten", "fixkosten"] },
            { points: 1, keywords: ["budget", "finanzen", "liquidität", "wirtschaftlichkeit", "rentabilität"] },
            { points: 1, keywords: ["anschaffung", "kaufpreis", "investition"] }
        ]
    }
  },
  {
    id: "ap1_f2025_1ac_kostenrechnung",
    titel: "AP1-2025 (1ac): Interaktive Kostenrechnung",
    typ: "interactive_calculation",
    beschreibung: "Analysieren Sie die Fallstudie, entnehmen Sie die korrekten Werte und berechnen Sie die monatlichen Gesamtkosten für das Multifunktionsgerät 2.",
    context_story: "Das ausgewählte Multifunktionsgerät 2 hat einen Anschaffungspreis von 2.844 €. Die Fachabteilung plant eine Nutzungsdauer von 3 Jahren. Pro Monat werden ca. 2000 Seiten S/W (à 0,05 €) und 500 Seiten in Farbe (à 0,07 €) gedruckt. Der Wartungsvertrag für dieses Gerät beläuft sich auf 10 € monatlich.",
    inputs: [
      { id: "anschaffung", label: "Anschaffungspreis (€)", value: 2844, readonly: true },
      { id: "nutzungsdauer", label: "Nutzungsdauer (Monate)", value: "", readonly: false, placeholder: "Jahre in Monate umrechnen" },
      { id: "druck_sw", label: "Seiten S/W pro Monat", value: 2000, readonly: true },
      { id: "kosten_sw", label: "Kosten/Seite S/W (€)", value: 0.05, readonly: true },
      { id: "druck_farbe", label: "Seiten Farbe pro Monat", value: 500, readonly: true },
      { id: "kosten_farbe", label: "Kosten/Seite Farbe (€)", value: 0.07, readonly: true },
      { id: "wartung", label: "Wartungskosten pro Monat (€)", value: 10, readonly: true }
    ],
    solution: {
        nutzungsdauer: 36,
        final_cost: 224
    },
    explanation: [
      "<b>Wert extrahieren:</b> Die Nutzungsdauer von '3 Jahren' aus dem Text muss in 3 * 12 = <b>36 Monate</b> umgerechnet werden.",
      "<b>Abschreibung pro Monat:</b> 2844 € / 36 Monate = 79,00 €",
      "<b>Druckkosten S/W:</b> 2000 Seiten * 0,05 €/Seite = 100,00 €",
      "<b>Druckkosten Farbe:</b> 500 Seiten * 0,07 €/Seite = 35,00 €",
      "<b>Gesamtkosten:</b> 79 € + 100 € + 35 € + 10 € = <b>224 €</b>"
    ]
  },
  {
    id: "ap1_f2025_1d_subnetz_ip",
    typ: "contextual_input",
    titel: "AP1-2025 (1d): IP für Netzwerkdrucker",
    beschreibung: "Analysieren Sie die Netzwerktopologie und ermitteln Sie die korrekte IP-Adresse für die 'Druckstation 1'.",
    context: {
        image_src: "data/netzwerkdrucker.png",
        instructions: [
            "Die Netzadresse lautet <b>192.168.100.0/26</b>.",
            "Das Gateway nutzt die <b>letzte</b> mögliche IP-Adresse im Netz.",
            "Die Druckstation 1 soll die <b>vorletzte</b> mögliche IP-Adresse erhalten."
        ]
    },
    fields: [ { id: "drucker_ip", label: "IP-Adresse für Druckstation 1", type: "text", placeholder: "192.168.100.x" } ],
    solution: { drucker_ip: "192.168.100.61" },
    explanation: [
        "<b>Schritt 1: /26 verstehen:</b> Das Suffix /26 bedeutet 26 Netz-Bits und 32-26=6 Host-Bits. Pro Subnetz gibt es 2^6 = 64 Adressen.",
        "<b>Schritt 2: Netzbereich finden:</b> Die Blockgröße ist 256-192=64. Das erste Netz ist 192.168.100.0 bis 192.168.100.63.",
        "<b>Schritt 3: Host-Bereich definieren:</b> Netz-ID (.0) und Broadcast (.63) sind reserviert. Der nutzbare Bereich für Hosts ist <b>192.168.100.1 bis 192.168.100.62</b>.",
        "<b>Schritt 4: Adressen zuweisen:</b> Die letzte Host-IP für das Gateway ist .62. Die vorletzte für den Drucker ist somit <b>192.168.100.61</b>."
    ]
  },
   {
    id: "ap1_f2025_1e_sicherheit",
    titel: "AP1-2025 (1e): Szenario Systemsicherheit",
    typ: "scenario_choice_justified",
    beschreibung: "Analysieren Sie das folgende Szenario und treffen Sie die richtige Entscheidung.",
    scenario: "Ein neuer Server für die Buchhaltung wird eingerichtet. Um die Angriffsfläche so gering wie möglich zu halten, entfernt der Administrator alle nicht benötigten Standardprogramme und deaktiviert alle Dienste, die nicht für den Betrieb der Buchhaltungssoftware erforderlich sind.",
    question: "Welchem Prinzip der Systemsicherheit folgt der Administrator hier hauptsächlich?",
    options: [ "Zugriffsschutz durch komplexe Passwörter", "Netzwerkschutz durch eine Firewall", "Systemhärtung durch Reduzierung der Angriffsfläche", "Wartung & Pflege durch regelmäßige Updates" ],
    correctOptionIndex: 2,
    justificationPrompt: "Begründen Sie mit eigenen Worten, warum 'Systemhärtung' der korrekte Begriff für das Vorgehen des Administrators ist.",
    explanation: "<b>Systemhärtung</b> ist der korrekte Begriff. Er beschreibt den Prozess, ein System widerstandsfähiger gegen Angriffe zu machen, indem alle unnötigen Komponenten (Software, Dienste, Ports) entfernt werden. Ziel ist die Minimierung der Angriffsfläche. Die anderen Optionen sind zwar auch wichtig, treffen aber nicht den Kern des Szenarios.",
    justificationKeywords: {
        requiredScore: 3,
        groups: [
            { points: 2, keywords: ["angriffsfläche", "angriffsoberfläche", "angriffsvektor"] },
            { points: 2, keywords: ["reduzieren", "minimieren", "verringern", "verkleinern"] },
            { points: 1, keywords: ["unnötig", "überflüssig", "nicht benötigt"] },
            { points: 1, keywords: ["dienste", "services", "prozesse"] },
            { points: 1, keywords: ["software", "programme", "anwendungen"] },
            { points: 1, keywords: ["ports"] },
            { points: 1, keywords: ["entfernen", "deinstallieren", "löschen"] },
            { points: 1, keywords: ["deaktivieren", "abschalten", "stoppen"] }
        ]
    }
  },
  {
    id: "ap1_f2025_2b_asymmetrie",
    titel: "AP1-2025 (2b): Szenario Verschlüsselung",
    typ: "scenario_choice_justified",
    beschreibung: "Analysieren Sie den Anwendungsfall und wählen Sie die korrekte Aktion.",
    scenario: "Ein Anwalt möchte eine vertrauliche Vertragsdatei an seinen Mandanten senden. Er möchte sicherstellen, dass absolut niemand außer dem spezifischen Mandanten den Inhalt der Datei lesen kann, selbst wenn die E-Mail abgefangen wird.",
    question: "Was muss der Anwalt tun, um dieses Ziel zu erreichen?",
    options: [ "Er verschlüsselt die Datei mit seinem eigenen PRIVATEN Schlüssel.", "Er verschlüsselt die Datei mit dem ÖFFENTLICHEN Schlüssel des Mandanten.", "Er signiert die Datei mit dem ÖFFENTLICHEN Schlüssel des Mandanten.", "Er verschlüsselt die Datei mit seinem eigenen ÖFFENTLICHEN Schlüssel." ],
    correctOptionIndex: 1,
    justificationPrompt: "Erklären Sie, warum nur der Empfänger (Mandant) diese verschlüsselte Datei wieder lesbar machen kann.",
    explanation: "Um <b>Vertraulichkeit</b> zu gewährleisten, wird immer mit dem <b>öffentlichen Schlüssel des Empfängers</b> verschlüsselt. Nur der Empfänger besitzt den dazugehörigen, geheimen <b>privaten Schlüssel</b>, mit dem die Nachricht wieder entschlüsselt werden kann.",
    justificationKeywords: {
        requiredScore: 3,
        groups: [
            { points: 2, keywords: ["privaten schlüssel", "private key"] },
            { points: 1, keywords: ["nur", "einzig", "ausschließlich"] },
            { points: 1, keywords: ["empfänger", "mandant"] },
            { points: 1, keywords: ["besitzt", "hat", "verfügt"] },
            { points: 1, keywords: ["entschlüsseln", "lesbar machen", "öffnen"] }
        ]
    }
  },
   {
    id: "ap1_f2025_2d_protokolle",
    titel: "AP1-2025 (2d): Szenario E-Mail-Protokolle",
    typ: "scenario_choice_justified",
    beschreibung: "Analysieren Sie die Anforderungen der Kanzlei und wählen Sie das passende Protokoll.",
    scenario: "Die Anwälte einer Kanzlei müssen von mehreren Geräten (Büro-PC, Laptop, Smartphone) auf ihr E-Mail-Postfach zugreifen. Es ist entscheidend, dass der Status einer E-Mail (gelesen, beantwortet, gelöscht) auf allen Geräten synchron ist.",
    question: "Welches E-Mail-Abrufprotokoll erfüllt diese Anforderungen am besten?",
    options: ["SMTP", "POP3", "IMAP", "HTTP"],
    correctOptionIndex: 2,
    // KORRIGIERT: Der Fragetext verrät nicht mehr die Lösung.
    justificationPrompt: "Beschreiben Sie den fundamentalen Unterschied in der Funktionsweise von IMAP und POP3, der Ihre Wahl begründet.",
    explanation: "<b>IMAP (Internet Message Access Protocol)</b> ist die korrekte Wahl. Im Gegensatz zu POP3, das E-Mails standardmäßig auf das Client-Gerät herunterlädt und vom Server löscht, belässt IMAP die Nachrichten auf dem Server und synchronisiert alle Aktionen (lesen, löschen etc.) über alle Geräte hinweg. SMTP ist nur für den Versand von E-Mails zuständig.",
    justificationKeywords: {
        requiredScore: 3,
        groups: [
            { points: 2, keywords: ["server", "zentral", "verbleiben", "bleiben"] },
            { points: 1, keywords: ["synchron", "abgeglichen", "alle geräte", "mehrere geräte"] },
            { points: 1, keywords: ["pop3", "lädt herunter", "löscht", "lokal"] }
        ]
    }
  },
  {
    id: "ap1_f2025_3a_netzplan_visuell",
    typ: "netzplan",
    titel: "AP1-2025 (3a): Visueller Netzplan",
    beschreibung: "Berechnen Sie alle fehlenden Zeitpunkte (FAZ, FEZ, SAZ, SEZ) sowie Puffer (GP, FP) und füllen Sie die Felder direkt in den Vorgangsknoten aus.",
    processTable: [ { name: "A", description: "Anforderungsanalyse", duration: 2, predecessors: [] }, { name: "B", description: "System-Konzeption", duration: 25, predecessors: ["A"] }, { name: "C", description: "GUI-Entwurf", duration: 32, predecessors: ["B"] }, { name: "D", description: "Backend-Entwicklung", duration: 40, predecessors: ["B"] }, { name: "G", description: "Datenbank-Design", duration: 8, predecessors: ["B"] }, { name: "E", description: "Frontend-Entwicklung", duration: 70, predecessors: ["D"] }, { name: "H", description: "Hilfe-Dokumentation", duration: 2, predecessors: ["G"] }, { name: "F", description: "Teilsystem-Integration", duration: 15, predecessors: ["E"] }, { name: "I", description: "Qualitätssicherung & Test", duration: 16, predecessors: ["E"] }, { name: "J", description: "Deployment & Abnahme", duration: 4, predecessors: ["F", "I"] } ],
    nodes: [ { id: "a", name: "A", duration: 2, isStart: true }, { id: "b", name: "B", duration: 25 }, { id: "c", name: "C", duration: 32 }, { id: "d", name: "D", duration: 40 }, { id: "g", name: "G", duration: 8 }, { id: "e", name: "E", duration: 70 }, { id: "h", name: "H", duration: 2 }, { id: "f", name: "F", duration: 15 }, { id: "i", name: "I", duration: 16 }, { id: "j", name: "J", duration: 4 } ],
    solution: { a_faz: 0, a_fez: 2, a_saz: 0, a_sez: 2, a_gp: 0, a_fp: 0, b_faz: 2, b_fez: 27, b_saz: 2, b_sez: 27, b_gp: 0, b_fp: 0, c_faz: 27, c_fez: 59, c_saz: 35, c_sez: 67, c_gp: 8, c_fp: 8, d_faz: 27, d_fez: 67, d_saz: 27, d_sez: 67, d_gp: 0, d_fp: 0, g_faz: 27, g_fez: 35, g_saz: 143, g_sez: 151, g_gp: 116, g_fp: 116, e_faz: 67, e_fez: 137, e_saz: 67, e_sez: 137, e_gp: 0, e_fp: 0, h_faz: 35, h_fez: 37, h_saz: 151, h_sez: 153, h_gp: 116, h_fp: 116, f_faz: 137, f_fez: 152, f_saz: 138, f_sez: 153, f_gp: 1, f_fp: 1, i_faz: 137, i_fez: 153, i_saz: 137, i_sez: 153, i_gp: 0, i_fp: 0, j_faz: 153, j_fez: 157, j_saz: 153, j_sez: 157, j_gp: 0, j_fp: 0 },
    explanation: [ "<b>Gesamtdauer: 157 Stunden.</b>", "<b>Kritischer Pfad: A - B - D - E - I - J</b> (Alle Vorgänge mit GP=0)." ]
  },
  {
    id: "ap1_f2025_3d_schreibtischtest_analyse",
    titel: "AP1-2025 (3d): Schreibtischtest Analytics",
    typ: "code_trace_result",
    beschreibung: "Führen Sie einen Schreibtischtest für den Funktionsaufruf durch und geben Sie die korrekten Rückgabewerte an.",
    code_snippet: `def analytics_berechnen(besucher, seitenaufrufe, besucherSuchmaschinen, anzahlBounces):
    durchschnitt = seitenaufrufe / besucher
    prozentsatz = (besucherSuchmaschinen / besucher) * 100
    nonBounce = ((besucher - anzahlBounces) / besucher) * 100
    return (durchschnitt, prozentsatz, nonBounce)`,
    call: "analytics_berechnen(12000, 33000, 5562, 7554)",
    results: [
        { id: "durchschnitt", label: "Rückgabewert 'durchschnitt'", type: "number" },
        { id: "prozentsatz", label: "Rückgabewert 'prozentsatz'", type: "number" },
        { id: "nonBounce", label: "Rückgabewert 'nonBounce'", type: "number" }
    ],
    solution: { durchschnitt: "2.75", prozentsatz: "46.35", nonBounce: "37.05" },
    explanation: {
        durchschnitt: "<b>Herleitung:</b> 33000 / 12000 = <b>2.75</b>",
        prozentsatz: "<b>Herleitung:</b> (5562 / 12000) * 100 = <b>46.35</b>",
        nonBounce: "<b>Herleitung:</b> ((12000 - 7554) / 12000) * 100 = <b>37.05</b>"
    }
  },
  {
    id: "ap1_f2025_3e_schreibtischtest_bewertung",
    titel: "AP1-2025 (3e): Debugger-Simulation",
    typ: "simulated_debugger",
    beschreibung: "Verfolgen Sie den Programmablauf schrittweise, beobachten Sie die Variablen und sagen Sie die finale Ausgabe voraus.",
    code_snippet: `Funktion bewertung_webseite(ladezeit, html_valid, mobile_freundlich, seo_optimierung):
1: WENN ladezeit < 2 UND html_valid == "Wahr" DANN
2:   WENN mobile_freundlich == "Wahr" DANN
3:     WENN seo_optimierung > 80 DANN
4:       return "Perfekt"
5:     SONST WENN seo_optimierung > 50 DANN
6:       return "Gut, SEO könnte besser sein"
7:     SONST
8:       return "Technisch gut, aber SEO schwach"
9:     ENDE WENN
10:  SONST
11:    return "Schnell, aber nicht mobilfreundlich"
12:  ENDE WENN
13: SONST
14:   return "Langsam"
15: ENDE WENN`,
    trace: [
        {
            call: "bewertung_webseite(1.5, 'Wahr', 'Wahr', 80)",
            steps: [
                { line: 1, log: "Bedingung (1.5 < 2 UND 'Wahr' == 'Wahr') ist WAHR." },
                { line: 2, log: "Bedingung ('Wahr' == 'Wahr') ist WAHR." },
                { line: 3, log: "Bedingung (80 > 80) ist FALSCH." },
                { line: 5, log: "Bedingung (80 > 50) ist WAHR." },
                { line: 6, log: "Rückgabewert: 'Gut, SEO könnte besser sein'" }
            ],
            solution: "Gut, SEO könnte besser sein"
        },
        {
            call: "bewertung_webseite(3.0, 'Wahr', 'Falsch', 45)",
            steps: [
                { line: 1, log: "Bedingung (3.0 < 2) ist FALSCH." },
                { line: 13, log: "Sprung zum finalen SONST-Zweig." },
                { line: 14, log: "Rückgabewert: 'Langsam'" }
            ],
            solution: "Langsam"
        }
    ]
  },
  {
    id: "ap1_f2025_4c_kostenrechnung_ki",
    titel: "AP1-2025 (4c): Interaktive KI-Kostenrechnung",
    typ: "interactive_calculation",
    beschreibung: "Analysieren Sie die Fallstudie, entnehmen Sie die korrekten Werte und errechnen Sie die jährlichen Gesamtkosten für den KI-Chatbot.",
    context_story: "Die Kanzlei plant die Einführung eines KI-Chatbots für ihre drei Anwälte. Die Lizenz kostet 100 € pro User und Monat. Zusätzlich fallen einmalig jährliche Schulungskosten in Höhe von 1.800 € für die gesamte Kanzlei an. Die Pflichtschulung dauert für jeden Anwalt 3 Stunden, in denen er nicht für Mandanten arbeiten kann (Stundensatz: 200 €).",
    inputs: [ 
        { id: "user_count", label: "Anzahl Anwälte", value: 3, readonly: true }, 
        { id: "lizenz_jahr", label: "Jährliche Lizenzkosten gesamt (€)", value: "", readonly: false, placeholder:"User * Kosten * Monate" }, 
        { id: "schulung_fix", label: "Fixe Schulungskosten (€)", value: 1800, readonly: true },
        { id: "umsatz_ausfall", label: "Entgangener Umsatz gesamt (€)", value: "", readonly: false, placeholder: "User * Stunden * Satz" }
    ],
    solution: {
        lizenz_jahr: 3600,
        umsatz_ausfall: 1800,
        final_cost: 7200
    },
    final_solution: 7200,
    explanation: [
        "<b>Lizenzkosten pro Jahr:</b> 3 Anwälte * 100 €/Monat * 12 Monate = 3.600 €",
        "<b>Schulungskosten pro Jahr (gesamt):</b> 1.800 €",
        "<b>Entgangener Umsatz pro Jahr:</b> 3 Anwälte * 3 Stunden * 200 €/Stunde = 1.800 €",
        "<b>Gesamtkosten:</b> 3.600 € + 1.800 € + 1.800 € = <b>7.200 €</b>"
    ]
  },
   {
    id: "ap1_f2025_4e_ssh_verbindung",
    typ: "scenario_form_filler",
    titel: "AP1-2025 (4e): Sichere Server-Verbindung",
    beschreibung: "Konfigurieren Sie die Verbindungseinstellungen auf Basis der Anforderung.",
    scenario: "Sie müssen als Administrator eine Fernwartung auf einem Linux-Server mit der IP-Adresse 32.42.230.33 durchführen. Die Verbindung muss zwingend verschlüsselt sein, um das Passwort und alle Befehle vor dem Mitlesen im Netzwerk zu schützen. Der Standardport für diese Art der Verbindung soll genutzt werden.",
    fields: [
        { id: "hostname", label: "Host Name (or IP address)", type: "text", placeholder: "IP-Adresse eintragen" },
        { id: "port", label: "Port", type: "number", placeholder: "Standard-Port für sichere Verbindung" },
        { id: "type", label: "Connection type", type: "radio", options: ["SSH", "Serial", "Telnet"] }
    ],
    solution: { hostname: "32.42.230.33", port: "22", type: "SSH" },
    justificationPrompt: "Erklären Sie, warum Telnet für diese Aufgabe in einem modernen Umfeld absolut ungeeignet ist.",
    explanation: [
        "<b>Host Name:</b> Die IP-Adresse wird direkt übernommen: 32.42.230.33.",
        "<b>Port:</b> Der Standardport für Secure Shell (SSH) ist <b>22</b>.",
        "<b>Connection type:</b> Es muss <b>SSH</b> gewählt werden, da dies eine gesicherte, verschlüsselte Verbindung ist.",
        "<b>Warum nicht Telnet?</b> Telnet überträgt alle Daten, inklusive des Benutzernamens und des Passworts, <b>unverschlüsselt im Klartext</b>. Jeder, der den Netzwerkverkehr mithören kann, könnte die Zugangsdaten auslesen. Es gilt als massiv veraltet und unsicher."
    ],
    justificationKeywords: {
        requiredScore: 2,
        groups: [
            { points: 2, keywords: ["unverschlüsselt", "klartext", "nicht verschlüsselt"] },
            { points: 1, keywords: ["passwörter", "zugangsdaten", "daten"] },
            { points: 1, keywords: ["unsicher", "veraltet", "risiko"] },
            { points: 1, keywords: ["mithören", "mitlesen", "sniffen"] }
        ]
    }
  },
  {
    id: "ap1_f2025_4f_redundanz",
    titel: "AP1-2025 (4f): Szenario Datenkonsistenz",
    typ: "scenario_choice_justified",
    beschreibung: "Analysieren Sie das Datenproblem und identifizieren Sie die korrekten Fachbegriffe.",
    scenario: "In einer alten Kundentabelle wird die Adresse eines Kunden nicht in einer separaten Adresstabelle gespeichert, sondern bei jeder seiner 5 Bestellungen direkt in der Bestell-Tabelle wiederholt. Nun zieht der Kunde um. Ein Mitarbeiter ändert die Adresse aber nur bei der letzten Bestellung. Bei den vier älteren Bestellungen steht noch die alte Anschrift.",
    question: "Welches Problem ist hier aufgetreten?",
    options: [ "Lösch-Anomalie", "Einfüge-Anomalie", "Änderungs-Anomalie", "Daten-Redundanz" ],
    correctOptionIndex: 2,
    justificationPrompt: "Erklären Sie den Begriff 'Redundanz' in diesem Kontext und warum sie die direkte Ursache für die Änderungsanomalie ist.",
    explanation: "Das Kernproblem ist die <b>Änderungsanomalie</b>. Sie entsteht, weil die Kundendaten <b>redundant</b> (mehrfach und unnötig) gespeichert sind. Durch diese Redundanz muss eine Änderung (wie die neue Adresse) an mehreren Stellen durchgeführt werden. Wird eine Stelle vergessen, führt dies zu inkonsistenten Daten. Die Redundanz ist also die Ursache, die Änderungsanomalie ist die Folge.",
    justificationKeywords: {
        requiredScore: 4,
        groups: [
            { points: 2, keywords: ["redundanz", "redundant", "doppelt", "mehrfach"] },
            { points: 2, keywords: ["ursache", "grund", "führt zu", "verursacht", "ausgelöst"] },
            { points: 1, keywords: ["änderungsanomalie", "änderungs-anomalie"] },
            { points: 1, keywords: ["inkonsistent", "widersprüchlich", "falsche daten"] },
            { points: 1, keywords: ["alle stellen", "überall", "jeden datensatz"] }
        ]
    }
  }
];