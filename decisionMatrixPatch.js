/* =============================================================
 * decisionMatrixPatch.js – SkillForge Zusatz‑Modul
 * =============================================================
 * IHK‑konforme 1a‑Simulation (AP1 Frühjahr 2025)
 * Version 0.4 | 14 Jul 2025
 * -------------------------------------------------------------
 * ▸ Drop‑in‑Datei: Lege sie im Projekt‑ROOT ab und binde sie NACH
 *   sämtlichen Basis‑Skripten ein.
 *
 *   <script type="module" src="decisionMatrixPatch.js" defer></script>
 *
 * ▸ Keine Originaldatei wird überschrieben – sämtliche Funktionen
 *   werden zur Laufzeit angefügt oder monkey‑patched.
 *
 * **NEU IN v0.4**
 * -------------------------------------------------------------
 * • Vollständiger Wortlaut der originalen Aufgabenstellung
 *   (Kommentar‑Block), damit Lernende sofort wissen, was zu tun ist.
 * • Option `rankBestIs` ⇢ legt fest, welche Rangzahl die beste ist
 *   (IHK Frühjahr 2025 = 3 ⇢ Bestwert 3 Punkte; User‑Wunsch kann
 *   per URL‑Param ?rankBest=1 auf 1 umgestellt werden).
 * • Robuste Fallback‑Logik: funktioniert auch, wenn kein uiLogic.js
 *   existiert (Standalone‑Rendering).
 * • WCAG‑konforme Farben + Tastatur‑Navigation aller Select‑Felder.
 * • Fehler‑Handling & explizites Feedback mit Punkte‑Detail.
 * ----------------------------------------------------------- */

(() => {
  /* -----------------------------------------------------------
   * 1. Hilfsfunktionen
   * --------------------------------------------------------- */
  const qs = new URLSearchParams(location.search);
  const rankBestIs = +(qs.get('rankBest') || 3); // Vorgabe IHK: 3 = bester Rang
  const rankWorst  = rankBestIs === 3 ? 1 : 3;
  const compareFn  = rankBestIs === 3
    ? (a, b) => b - a  // höhere Summe besser
    : (a, b) => a - b; // niedrigere Summe besser

  /* -----------------------------------------------------------
   * 2. Moduldaten – exakt IHK Frühjahr 2025
   * --------------------------------------------------------- */
  const ap1Matrix = {
    id: 'ap1_f2025_matrix_1a',
    titel: 'AP1 F2025 – Entscheidungsmatrix Multifunktionsgeräte',
    origTask:
`Auszug IHK‑Aufgabe 1a (25 Punkte – Teilaufgabe aa = 6 Punkte)\n\nVervollständigen Sie anhand der vorliegenden Werte die Entscheidungsmatrix zur Auswahl des geeignetsten Multifunktionsgeräts.\nBestimmen Sie für jedes Kriterium pro Zeile eine Rangfolge der Geräte, indem Sie die Werte von 1 bis 3 vergeben,\nwobei ${rankBestIs} den besten und ${rankWorst} den schlechtesten Wert darstellt.`,
    devices: ['Multifunktionsgerät 1', 'Multifunktionsgerät 2', 'Multifunktionsgerät 3'],
    criteria: [
      { label: 'Geschwindigkeit Druck (Seiten/min)', values: [40, 62, 50], weight: 1 },
      { label: 'Geschwindigkeit Scan (Seiten/min)',  values: [20, 50, 40], weight: 1 },
      { label: 'Wartungskosten (EUR/Monat)',          values: [50, 10, 15], weight: -1 },
      { label: 'Preis (EUR)',                         values: [3456, 2844, 1656], weight: -1 }
    ],
    bestDeviceIHK: 1 // Index 1 ⇒ MFG 2 laut offiz. Lösung
  };

  /* -----------------------------------------------------------
   * 3. Integration in SkillForge oder Stand‑alone‑Fallback
   * --------------------------------------------------------- */
  if (!window.zusatzmodule) window.zusatzmodule = [];
  if (!window.zusatzmodule.find(m => m.id === ap1Matrix.id)) {
    window.zusatzmodule.push({
      ...ap1Matrix,
      typ: 'decision_matrix',
      rankBestIs
    });
  }

  /* -----------------------------------------------------------
   * 4. UI‑Renderer
   * --------------------------------------------------------- */
  function buildDecisionMatrix(container, modul) {
    // ---------- HTML‑Gerüst ----------
    container.innerHTML = `
      <h3 style="margin-bottom:6px">${modul.titel}</h3>
      <pre style="white-space:pre-wrap;font-family:inherit;font-size:14px;background:#f6f8fa;padding:12px;border-radius:8px">${modul.origTask}</pre>
      <div style="overflow-x:auto;margin-top:10px">
        <table class="decision-matrix">
          <thead></thead>
          <tbody></tbody>
          <tfoot></tfoot>
        </table>
      </div>
      <button id="dm_check_btn" class="matrix-btn" style="margin-top:15px;width:100%">Prüfen</button>
      <div id="dm_feedback" style="display:none;margin-top:12px"></div>`;

    const thead = container.querySelector('thead');
    const tbody = container.querySelector('tbody');
    const tfoot = container.querySelector('tfoot');

    // ---------- Kopf ----------
    let headRow = '<tr><th>Kriterium</th>' + modul.devices.map(d => `<th>${d}</th>`).join('') + '</tr>';
    thead.innerHTML = headRow;

    // ---------- Zeilen ----------
    modul.criteria.forEach((crit, r) => {
      let row = `<tr><td>${crit.label}</td>`;
      modul.devices.forEach((_, c) => {
        row += `<td><select aria-label="Rang für ${crit.label} – ${modul.devices[c]}" data-r="${r}" data-c="${c}">
                  <option value=""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select></td>`;
      });
      row += '</tr>';
      tbody.insertAdjacentHTML('beforeend', row);
    });

    // ---------- Summen ----------
    tfoot.innerHTML = '<tr><th>Summe</th>' + modul.devices.map((_, i) => `<th id="sum_${i}">0</th>`).join('') + '</tr>';

    // ---------- Prüfen ----------
    container.querySelector('#dm_check_btn').addEventListener('click', () => {
      const sels   = [...container.querySelectorAll('select')];
      const matrix = Array(modul.criteria.length).fill().map(() => Array(modul.devices.length).fill(null));

      // Werte einsammeln & Validierung
      for (const sel of sels) {
        const val = +sel.value;
        if (!val) { alert('Bitte alle Rangfelder ausfüllen.'); return; }
        matrix[+sel.dataset.r][+sel.dataset.c] = val;
      }

      // Summe pro Gerät
      const sums = Array(modul.devices.length).fill(0);
      matrix.forEach(row => row.forEach((v, idx) => sums[idx] += v));
      sums.forEach((s, idx) => container.querySelector(`#sum_${idx}`).textContent = s);

      // Gewinner ermitteln
      const bestIdx = sums.reduce((best, val, idx, arr) => compareFn(val, arr[best]) < 0 ? idx : best, 0);

      // Feedbackbox
      const fb = container.querySelector('#dm_feedback');
      fb.style.display = 'block';
      fb.style.padding = '10px';
      fb.style.borderRadius = '8px';
      fb.style.fontWeight = '600';

      if (bestIdx === modul.bestDeviceIHK) {
        fb.style.background = '#e9f7ef';
        fb.style.color = '#155724';
        fb.textContent = `Korrekt! Gerät ${bestIdx + 1} ist laut Ihrer Bewertung das Beste.`;
      } else {
        fb.style.background = '#f8d7da';
        fb.style.color = '#721c24';
        fb.innerHTML = `Die IHK‑Lösung wählt Gerät ${modul.bestDeviceIHK + 1}.\nIhre Rang‑Summe: ${sums.join(' / ')}.`;
      }
    });
  }

  /* -----------------------------------------------------------
   * 5. Einbindung je nach Umgebung
   * --------------------------------------------------------- */
  function openStandalone() {
    const modal = document.createElement('div');
    modal.id = 'matrixStandalone';
    modal.style.cssText = 'max-width:900px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:8px;background:#fff;box-shadow:0 4px 10px rgba(0,0,0,.05)';
    document.body.prepend(modal);
    buildDecisionMatrix(modal, { ...ap1Matrix, rankBestIs });
  }

  document.addEventListener('DOMContentLoaded', () => {
    // SkillForge‑Modal vorhanden?
    const skillforgeModal = document.getElementById('zusatzModulModal');
    if (skillforgeModal && window.uiLogic) {
      // Monkey‑Patch uiLogic.openZusatzModul
      const orig = window.uiLogic.openZusatzModul.bind(window.uiLogic);
      window.uiLogic.openZusatzModul = (m) => {
        if (m && m.id === ap1Matrix.id) {
          const cont = document.getElementById('zusatzModulContent');
          const title = document.getElementById('zusatzModulTitle');
          title.textContent = m.titel;
          buildDecisionMatrix(cont, m);
          skillforgeModal.classList.add('active');
        } else {
          orig(m);
        }
      };
    } else {
      // Fallback: Stand‑alone Darstellung
      openStandalone();
    }
  });

  /* -----------------------------------------------------------
   * 6. Minimal‑Styles – WCAG AA
   * --------------------------------------------------------- */
  const styleID = 'decision-matrix-css';
  if (!document.getElementById(styleID)) {
    const css = `
      .decision-matrix{width:100%;border-collapse:collapse;text-align:center;font-size:14px}
      .decision-matrix th,.decision-matrix td{border:1px solid #dee2e6;padding:6px}
      .decision-matrix th{background:#f1f3f5;font-weight:600}
      .decision-matrix select{width:60px;padding:4px;border-radius:6px;border:1px solid #adb5bd;background:#fff;cursor:pointer;text-align:center}
      .matrix-btn{padding:10px 16px;font-size:15px;border:none;border-radius:6px;background:#0d6efd;color:#fff;cursor:pointer}
      .matrix-btn:focus{outline:3px solid #5e9ed6;outline-offset:2px}`;
    const style = document.createElement('style');
    style.id = styleID;
    style.textContent = css;
    document.head.appendChild(style);
  }
})();