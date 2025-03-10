document.getElementById('calculateButton').addEventListener('click', function () {
    // Werte aus den Eingabefeldern abrufen
    const OA = parseFloat(document.getElementById('OA').value);
    const KZ = parseFloat(document.getElementById('KZ').value);
    const CA = parseFloat(document.getElementById('CA').value);
    const ZPZ = parseFloat(document.getElementById('ZPZ').value);
    const ZPRZ = parseFloat(document.getElementById('ZPRZ').value);
    const VK = parseFloat(document.getElementById('VK').value);
    const CT = parseFloat(document.getElementById('CT').value);

    // Überprüfung, ob alle Zahlen größer als 0 sind
    if ([OA, KZ, CA, ZPZ, ZPRZ, VK, CT].some(value => value = 0 || isNaN(value))) {
        document.getElementById('result').innerHTML = "<p style='color: red;'>Alle Eingabedaten müssen ausgefüllt sein und dürfen nicht 0 sein.</p>";
        return;
    }

    // Berechnung der einzelnen Koeffizienten
    const X1 = (OA - KZ) / CA;
    const X2 = ZPZ / CA;
    const X3 = ZPRZ / CA;
    const X4 = VK / KZ;
    const X5 = CT / CA;

    // Berechnung des Z-Scores
    const Z = 0.717 * X1 + 0.847 * X2 + 3.107 * X3 + 0.42 * X4 + 0.998 * X5;

    // Bewertung
    let evaluation = "";
    if (Z > 2.9) {
        evaluation = "<span style='color: green;'>Zufriedenstellende finanzielle Situation des Unternehmens.</span>";
    } else if (Z > 1.2) {
        evaluation = "<span style='color: orange;'>Grauzone mit unklaren Ergebnissen.</span>";
    } else {
        evaluation = "<span style='color: red;'>Das Unternehmen ist von Insolvenz bedroht.</span>";
    }

    // Ausgabe der Ergebnisse
    document.getElementById('result').innerHTML = `
        <br><strong>Berechnete Verhältniswerte:</strong><br>
        <table border='1'>
            <tr><td><strong>X1:</strong></td><td>${X1.toFixed(3)} - (Umlaufvermögen - kurzfristige Verbindlichkeiten) / Gesamtvermögen</td></tr>
            <tr><td><strong>X2:</strong></td><td>${X2.toFixed(3)} - Gewinn nach Steuern / Gesamtvermögen</td></tr>
            <tr><td><strong>X3:</strong></td><td>${X3.toFixed(3)} - Gewinn vor Steuern und Zinsen / Gesamtvermögen</td></tr>
            <tr><td><strong>X4:</strong></td><td>${X4.toFixed(3)} - Marktwert des Eigenkapitals / kurzfristige Verbindlichkeiten</td></tr>
            <tr><td><strong>X5:</strong></td><td>${X5.toFixed(3)} - Gesamteinnahmen / Gesamtvermögen</td></tr>
            <tr><td><strong>Z:</strong></td><td>${Z.toFixed(3)}</td></tr>
        </table>
        <br><strong>Ermittelter Z-Wert:</strong> ${Z.toFixed(3)}<br>
        <strong>Bewertung des Unternehmens:</strong> ${evaluation}
    `;
});
