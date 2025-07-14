/* =====================================================================
 * data/zusatzmodule.js  – v5.3 (FINAL - Korrigiert & Didaktisch erweitert)
 * =====================================================================
 */

export const zusatzmodule = [
  /* ---------------------------------------------------------------
   * AP1-2025 – AUFGABE 1: Einrichten eines IT-gestützten Arbeitsplatzes
   * ------------------------------------------------------------- */
  {
    id: "ap1_f2025_1a_nutzwertanalyse",
    titel: "AP1-2025 (1a): Nutzwertanalyse",
    typ: "decision_matrix",
    beschreibung: "Füllen Sie die Entscheidungsmatrix gemäß der IHK-Prüfung aus. Vergeben Sie Rangpunkte von 1 (schlechtester Wert) bis 3 (bester Wert). Das Gerät mit der höchsten Gesamtpunktzahl wird empfohlen.",
    devices: ["Gerät 1", "Gerät 2", "Gerät 3"],
    criteria: [
      { label: "Geschw. Druck", values: ["40 S/min", "62 S/min", "50 S/min"] },
      { label: "Geschw. Scan", values: ["20 S/min", "50 S/min", "40 S/min"] },
      { label: "Wartungskosten", values: ["50 €", "10 €", "15 €"] },
      { label: "Preis", values: ["3.456 €", "2.844 €", "1.656 €"] }
    ],
    bestDevice: 1, // Index von Gerät 2, das mit 11 Punkten gewinnt
    explanation: "<b>Schritt 1: Punktvergabe (1=schlecht, 3=best):</b><br>Druck: G1(40)=1, G2(62)=3, G3(50)=2.<br>Scan: G1(20)=1, G2(50)=3, G3(40)=2.<br>Wartung (niedriger=besser): G1(50€)=1, G2(10€)=3, G3(15€)=2.<br>Preis (niedriger=besser): G1(3.5k€)=1, G2(2.8k€)=2, G3(1.7k€)=3.<br><b>Schritt 2: Summenbildung:</b><br>Gerät 1: 1+1+1+1 = 4<br>Gerät 2: 3+3+3+2 = 11<br>Gerät 3: 2+2+2+3 = 9<br><b>Fazit:</b> Gerät 2 hat mit 11 Punkten die höchste Bewertung."
  },
  {
    id: "ap1_f2025_1ac_kostenrechnung",
    titel: "AP1-2025 (1ac): Monatliche Kosten",
    typ: "calculation_task",
    beschreibung: "Berechnen Sie die monatlichen Gesamtkosten für das in Aufgabe 1a gewählte Multifunktionsgerät 2. Runden Sie auf ganze Euro.",
    inputs: [
      { id: "anschaffung", label: "Anschaffungspreis (€)", value: 2844, readonly: true },
      { id: "nutzungsdauer", label: "Nutzungsdauer (Monate)", value: 36, readonly: true },
      { id: "druck_sw", label: "Seiten S/W pro Monat", value: 2000, readonly: true },
      { id: "kosten_sw", label: "Kosten/Seite S/W (€)", value: 0.05, readonly: true },
      { id: "druck_farbe", label: "Seiten Farbe pro Monat", value: 500, readonly: true },
      { id: "kosten_farbe", label: "Kosten/Seite Farbe (€)", value: 0.07, readonly: true },
      { id: "wartung", label: "Wartungskosten pro Monat (€)", value: 10, readonly: true }
    ],
    formula: "(Anschaffung / Nutzungsdauer) + (Seiten S/W * Kosten S/W) + (Seiten Farbe * Kosten Farbe) + Wartung",
    solution: 224,
    explanation: [
      "<b>Abschreibung pro Monat:</b> 2844 € / 36 Monate = 79,00 €",
      "<b>Druckkosten S/W:</b> 2000 Seiten * 0,05 €/Seite = 100,00 €",
      "<b>Druckkosten Farbe:</b> 500 Seiten * 0,07 €/Seite = 35,00 €",
      "<b>Monatliche Wartung:</b> 10,00 €",
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
        "<b>Schritt 1: /26 verstehen:</b> Das Suffix /26 bedeutet 26 Netz-Bits und 32-26=6 Host-Bits. Pro Subnetz gibt es 2^6 = 64 Adressen. Die Subnetzmaske ist 255.255.255.192.",
        "<b>Schritt 2: Netzbereich finden:</b> Die Blockgröße ist 256-192=64. Das erste Netz ist 192.168.100.0 - 192.168.100.63.",
        "<b>Schritt 3: Host-Bereich definieren:</b> Netz-ID (.0) und Broadcast (.63) sind reserviert. Der nutzbare Bereich für Hosts ist <b>192.168.100.1 bis 192.168.100.62</b>.",
        "<b>Schritt 4: Adressen zuweisen:</b> Die letzte Host-IP für das Gateway ist .62. Die vorletzte für den Drucker ist somit <b>192.168.100.61</b>."
    ]
  },
  {
    id: "ap1_f2025_1e_sicherheit",
    titel: "AP1-2025 (1e): Sicherheitsmaßnahmen",
    typ: "osi_matcher",
    beschreibung: "Ordnen Sie die im Prüfungstext genannten Sicherheitsmaßnahmen den richtigen Kategorien zu.",
    zuordnungen: {
      "Systemhärtung": ["Download und Installation des Security Compliance Toolkit", "Aktivieren der Memory Integrity Features"],
      "Zugriffsschutz": ["Nutzung komplexer Passwörter"],
      "Netzwerkschutz": ["Aktivierung der BS-internen Firewall"],
      "Wartung & Pflege": ["Regelmäßiges Aktualisieren des Betriebssystems"]
    }
  },
  {
    id: "ap1_f2025_2b_asymmetrie",
    titel: "AP1-2025 (2b): Asymmetrische Verschlüsselung",
    typ: "osi_matcher",
    beschreibung: "Ein Anwalt will eine E-Mail an einen Mandanten verschlüsseln. Ordnen Sie die Schlüssel den richtigen Aktionen zu.",
    zuordnungen: {
      "Aktion des Anwalts (Sender)": ["Verschlüsselt mit dem ÖFFENTLICHEN Schlüssel des Mandanten"],
      "Aktion des Mandanten (Empfänger)": ["Entschlüsselt mit seinem PRIVATEN Schlüssel"],
      "Erreichtes Schutzziel": ["Vertraulichkeit"]
    }
  },
   {
    id: "ap1_f2025_2d_protokolle",
    titel: "AP1-2025 (2d): IMAP vs. POP3",
    typ: "osi_matcher",
    beschreibung: "Warum ist IMAP für die Anwälte die bessere Wahl? Ordnen Sie die Eigenschaften dem richtigen Protokoll zu.",
    // KORREKTUR: Logisch korrekte Zuordnung und didaktische Erklärung hinzugefügt
    zuordnungen: {
      "IMAP": ["E-Mails verbleiben auf dem Server", "Synchronisation über mehrere Clients möglich"],
      "POP3": ["E-Mails werden standardmäßig vom Server gelöscht und lokal gespeichert", "Primär für den Abruf durch einen einzelnen Client konzipiert"]
    },
    explanation: "<b>IMAP</b> (Internet Message Access Protocol) ist ideal für den Zugriff von mehreren Geräten, da die E-Mails auf dem Server verbleiben und der Status (gelesen, ungelesen) synchronisiert wird. <b>POP3</b> (Post Office Protocol 3) ist älter und darauf ausgelegt, E-Mails herunterzuladen und vom Server zu entfernen, was den Zugriff von mehreren Geräten erschwert."
  },
 // ERSETZEN Sie das Netzplan-Modul in zusatzmodule.js mit diesem:
  {
    id: "ap1_f2025_3a_netzplan_visuell",
    typ: "netzplan",
    titel: "AP1-2025 (3a): Visueller Netzplan",
    beschreibung: "Berechnen Sie alle fehlenden Zeitpunkte (FAZ, FEZ, SAZ, SEZ) sowie Puffer (GP, FP) und füllen Sie die Felder direkt in den Vorgangsknoten aus.",
    nodes: [
        { id: "a", name: "A", duration: 2, isStart: true },
        { id: "b", name: "B", duration: 25 },
        { id: "c", name: "C", duration: 32 },
        { id: "d", name: "D", duration: 40 },
        { id: "g", name: "G", duration: 8 },
        { id: "e", name: "E", duration: 70 },
        { id: "h", name: "H", duration: 2 },
        { id: "f", name: "F", duration: 15 },
        { id: "i", name: "I", duration: 16 },
        { id: "j", name: "J", duration: 4 }
    ],
    solution: {
      a_faz: 0, a_fez: 2, a_saz: 0, a_sez: 2, a_gp: 0, a_fp: 0,
      b_faz: 2, b_fez: 27, b_saz: 2, b_sez: 27, b_gp: 0, b_fp: 0,
      c_faz: 27, c_fez: 59, c_saz: 35, c_sez: 67, c_gp: 8, c_fp: 8,
      d_faz: 27, d_fez: 67, d_saz: 27, d_sez: 67, d_gp: 0, d_fp: 0,
      g_faz: 27, g_fez: 35, g_saz: 143, g_sez: 151, g_gp: 116, g_fp: 116,
      e_faz: 67, e_fez: 137, e_saz: 67, e_sez: 137, e_gp: 0, e_fp: 0,
      h_faz: 35, h_fez: 37, h_saz: 151, h_sez: 153, h_gp: 116, h_fp: 116,
      f_faz: 137, f_fez: 152, f_saz: 138, f_sez: 153, f_gp: 1, f_fp: 1,
      i_faz: 137, i_fez: 153, i_saz: 137, i_sez: 153, i_gp: 0, i_fp: 0,
      j_faz: 153, j_fez: 157, j_saz: 153, j_sez: 157, j_gp: 0, j_fp: 0
    },
    explanation: [
        "<b>Gesamtdauer: 157 Stunden.</b>",
        "<b>Kritischer Pfad: A - B - D - E - I - J</b> (Alle Vorgänge mit GP=0).",
        "<b>Vorwärtsrechnung (FAZ & FEZ):</b> Start bei 0, summiere die Dauer auf. Bei mehreren Vorgängern gilt der höchste FEZ-Wert. Bsp: FAZ(E) = max(FEZ(C), FEZ(D)) = max(59, 67) = 67.",
        "<b>Rückwärtsrechnung (SAZ & SEZ):</b> Starte am Projektende (157), subtrahiere die Dauer. Bei mehreren Nachfolgern gilt der niedrigste SAZ-Wert. Bsp: SEZ(E) = min(SAZ(F), SAZ(I)) = min(138, 137) = 137.",
        "<b>Pufferberechnung:</b> GP = SAZ - FAZ. FP = min(FAZ aller Nachfolger) - eigener FEZ."
    ]
  },
  {
    id: "ap1_f2025_3d_schreibtischtest_analyse",
    titel: "AP1-2025 (3d): Schreibtischtest Analytics",
    typ: "code_result_checker",
    beschreibung: "Berechnen Sie die drei Rückgabewerte des Funktionsaufrufs analytics_berechnen(12000, 33000, 5562, 7554). Geben Sie die Ergebnisse mit zwei Nachkommastellen an.",
    code_snippet: `def analytics_berechnen(besucher, seitenaufrufe, besucherSuchmaschinen, anzahlBounces):
    durchschnitt = seitenaufrufe / besucher
    prozentsatz = (besucherSuchmaschinen / besucher) * 100
    nonBounce = ((besucher - anzahlBounces) / besucher) * 100
    return (durchschnitt, prozentsatz, nonBounce)`,
    results: [
        { id: "res1", label: "Durchschnittliche Seitenaufrufe/Besucher", type: "number" },
        { id: "res2", label: "Prozentsatz Suchmaschinen-Besucher (%)", type: "number" },
        { id: "res3", label: "Non-Bounce-Rate (%)", type: "number" }
    ],
    solution: { res1: "2.75", res2: "46.35", res3: "37.05" },
    explanation: {
        res1: "<b>Herleitung:</b> Die Formel <code>seitenaufrufe / besucher</code> wird mit den Werten <code>33000 / 12000</code> berechnet, was <b>2.75</b> ergibt.",
        res2: "<b>Herleitung:</b> Die Formel <code>(besucherSuchmaschinen / besucher) * 100</code> wird mit <code>(5562 / 12000) * 100</code> berechnet, was <b>46.35</b> ergibt.",
        res3: "<b>Herleitung:</b> Die Formel <code>((besucher - anzahlBounces) / besucher) * 100</code> wird mit <code>((12000 - 7554) / 12000) * 100</code> berechnet, was <b>37.05</b> ergibt."
    }
  },
  {
    id: "ap1_f2025_3e_schreibtischtest_bewertung",
    titel: "AP1-2025 (3e): Schreibtischtest Bewertung",
    typ: "code_result_checker",
    beschreibung: "Geben Sie die exakten Text-Rückgaben für die beiden Funktionsaufrufe an.",
    code_snippet: `Funktion bewertung_webseite(ladezeit, html_valid, mobile_freundlich, seo_optimierung): ...`,
    // KORREKTUR: 'results' wurde neu strukturiert, um Parameter tabellarisch darzustellen
    results: [
        { 
            id: "call1",
            label: "Aufruf 1",
            type: "text",
            params: {
                ladezeit: 1.5,
                html_valid: "Wahr",
                mobile_freundlich: "Wahr",
                seo_optimierung: 80
            }
        },
        { 
            id: "call2", 
            label: "Aufruf 2",
            type: "text",
            params: {
                ladezeit: 3.0,
                html_valid: "Wahr",
                mobile_freundlich: "Falsch",
                seo_optimierung: 45
            }
        },
    ],
    solution: {
        call1: "Gut, SEO könnte besser sein",
        call2: "Langsam und nicht mobilfreundlich"
    },
    explanation: {
      call1: "<b>Analyse Aufruf 1:</b><br>1. <code>ladezeit < 2</code> (1.5 < 2) ist <b>Wahr</b>.<br>2. <code>html_valid</code> ist <b>Wahr</b>.<br>3. <code>mobile_freundlich</code> ist <b>Wahr</b>.<br>4. <code>seo_optimierung > 80</code> (80 > 80) ist <b>Falsch</b>.<br>5. Sprung in den 'sonst wenn'-Zweig: <code>seo_optimierung > 50</code> (80 > 50) ist <b>Wahr</b>.<br><b>Ergebnis: 'Gut, SEO könnte besser sein'</b>",
      call2: "<b>Analyse Aufruf 2:</b><br>1. <code>ladezeit < 2</code> (3.0 < 2) ist <b>Falsch</b>.<br>2. Sprung in den äußeren 'sonst'-Zweig.<br>3. <code>html_valid</code> ist <b>Wahr</b>.<br>4. <code>mobile_freundlich</code> ist <b>Falsch</b>.<br>5. Sprung in den inneren 'sonst'-Zweig.<br><b>Ergebnis: 'Langsam und nicht mobilfreundlich'</b>"
    }
  },
  {
    id: "ap1_f2025_3e_schreibtischtest_bewertung",
    titel: "AP1-2025 (3e): Schreibtischtest Bewertung",
    typ: "code_result_checker",
    beschreibung: "Geben Sie die exakten Text-Rückgaben für die beiden Funktionsaufrufe an.",
    code_snippet: `Funktion bewertung_webseite(ladezeit, html_valid, mobile_freundlich, seo_optimierung): ...`,
    results: [
        { id: "call1", label: "Aufruf 1: bewertung_webseite(1.5, Wahr, Wahr, 80)", type: "text" },
        { id: "call2", label: "Aufruf 2: bewertung_webseite(3.0, Wahr, Falsch, 45)", type: "text" },
    ],
    solution: {
        call1: "Gut, SEO könnte besser sein",
        call2: "Langsam und nicht mobilfreundlich"
    },
    explanation: {
      call1: "<b>Analyse Aufruf 1:</b><br>1. <code>ladezeit < 2</code> (1.5 < 2) ist <b>Wahr</b>.<br>2. <code>html_valid</code> ist <b>Wahr</b>.<br>3. <code>mobile_freundlich</code> ist <b>Wahr</b>.<br>4. <code>seo_optimierung > 80</code> (80 > 80) ist <b>Falsch</b>.<br>5. Sprung in den 'sonst wenn'-Zweig: <code>seo_optimierung > 50</code> (80 > 50) ist <b>Wahr</b>.<br><b>Ergebnis: 'Gut, SEO könnte besser sein'</b>",
      call2: "<b>Analyse Aufruf 2:</b><br>1. <code>ladezeit < 2</code> (3.0 < 2) ist <b>Falsch</b>.<br>2. Sprung in den äußeren 'sonst'-Zweig.<br>3. <code>html_valid</code> ist <b>Wahr</b>.<br>4. <code>mobile_freundlich</code> ist <b>Falsch</b>.<br>5. Sprung in den inneren 'sonst'-Zweig.<br><b>Ergebnis: 'Langsam und nicht mobilfreundlich'</b>"
    }
  },
  {
    id: "ap1_f2025_4c_kostenrechnung_ki",
    titel: "AP1-2025 (4c): Jährliche KI-Kosten",
    typ: "calculation_task",
    beschreibung: "Errechnen Sie die jährlichen Gesamtkosten für den KI-Chatbot für die drei Anwälte unter Berücksichtigung des entgangenen Umsatzes.",
    inputs: [ { id: "user", label: "Anzahl Anwälte", value: 3, readonly: true }, { id: "kosten_user", label: "Monatskosten pro User (€)", value: 100, readonly: true }, { id: "schulung", label: "Jährliche Schulungskosten (€)", value: 1800, readonly: true }, { id: "stundensatz", label: "Stundensatz Anwalt (€)", value: 200, readonly: true }, { id: "dauer", label: "Dauer Pflichtschulung (Stunden)", value: 3, readonly: true } ],
    formula: "Kosten pro Jahr = (Lizenzkosten + Schulungskosten + Entgangener Umsatz) * Anzahl Anwälte",
    solution: 10800,
    explanation: [
        "<b>Schritt 1: Kosten pro Anwalt pro Jahr ermitteln</b>",
        "&nbsp;&nbsp;Lizenzkosten: 100 €/Monat * 12 Monate = 1.200 €",
        "&nbsp;&nbsp;Schulungskosten (anteilig): 1.800 €",
        "&nbsp;&nbsp;Entgangener Umsatz: 200 €/Std. * 3 Std. Schulung = 600 €",
        "&nbsp;&nbsp;--> Summe pro Anwalt: 1.200 + 1.800 + 600 = 3.600 €",
        "<b>Schritt 2: Gesamtkosten für 3 Anwälte:</b> 3.600 € * 3 = <b>10.800 €</b>"
    ]
  },
   {
    id: "ap1_f2025_4e_ssh_verbindung",
    typ: "form_filler",
    titel: "AP1-2025 (4e): Sichere Server-Verbindung",
    beschreibung: "Füllen Sie das Formular aus, um eine gesicherte Verbindung zum Server (IPv4: 32.42.230.33) aufzubauen. Nutzen Sie den Standardport.",
    fields: [
        { id: "hostname", label: "Host Name (or IP address)", type: "text", placeholder: "IP-Adresse eintragen" },
        { id: "port", label: "Port", type: "number", placeholder: "Standard-Port" },
        { id: "type", label: "Connection type", type: "radio", options: ["SSH", "Serial", "Telnet"] }
    ],
    solution: { hostname: "32.42.230.33", port: "22", type: "SSH" },
    explanation: [
        "<b>Host Name:</b> Die IP-Adresse wird direkt übernommen: 32.42.230.33.",
        "<b>Port:</b> Der Standardport für Secure Shell (SSH) ist <b>22</b>.",
        "<b>Connection type:</b> Es muss <b>SSH</b> gewählt werden, da dies eine gesicherte, verschlüsselte Verbindung ist. Telnet und Serial übertragen Daten (inkl. Passwörter) unverschlüsselt im Klartext."
    ]
  },
  {
    id: "ap1_f2025_4f_redundanz",
    titel: "AP1-2025 (4f): Redundanz & Anomalien",
    typ: "osi_matcher",
    beschreibung: "Ordnen Sie den Begriffen die korrekte Erklärung und das daraus resultierende Problem zu.",
     zuordnungen: {
      "Begriff: Redundanz": ["Mehrfache, überflüssige Speicherung identischer Daten. Bspw. wird die Adresse eines Kunden in jeder seiner Rechnungen erneut gespeichert."],
      "Problem: Änderungsanomalie": ["Ändert man ein Datum nur an einer Stelle (z.B. bei nur einer Rechnung), entstehen widersprüchliche, inkonsistente Datenbestände."]
    }
  }
];