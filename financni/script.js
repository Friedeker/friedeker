document.getElementById('calculateButton').addEventListener('click', function () {
    // Načtení hodnot ze vstupních polí
    const OA = parseFloat(document.getElementById('OA').value);
    const KZ = parseFloat(document.getElementById('KZ').value);
    const CA = parseFloat(document.getElementById('CA').value);
    const ZPZ = parseFloat(document.getElementById('ZPZ').value);
    const ZPRZ = parseFloat(document.getElementById('ZPRZ').value);
    const VK = parseFloat(document.getElementById('VK').value);
    const CT = parseFloat(document.getElementById('CT').value);

    // Kontrola, zda jsou všechna čísla větší než 0
    if ([OA, KZ, CA, ZPZ, ZPRZ, VK, CT].some(value => value <= 0 || isNaN(value))) {
        document.getElementById('result').innerHTML = "<p style='color: red;'>Všechny vstupní údaje musí být vyplněny a nesmí být 0.</p>";
        return;
    }

    // Výpočty jednotlivých koeficientů
    const X1 = (OA - KZ) / CA;
    const X2 = ZPZ / CA;
    const X3 = ZPRZ / CA;
    const X4 = VK / KZ;
    const X5 = CT / CA;

    // Výpočet Z-skóre
    const Z = 1.2 * X1 + 1.4 * X2 + 3.3 * X3 + 0.6 * X4 + 1.0 * X5;

    // Hodnocení
    let evaluation = "";
    if (Z > 2.99) {
        evaluation = "<span style='color: green;'>Uspokojivá finanční situace firmy.</span>";
    } else if (Z > 1.81) {
        evaluation = "<span style='color: orange;'>Šedá zóna neurčitých výsledků.</span>";
    } else {
        evaluation = "<span style='color: red;'>Firma je ohrožena bankrotem.</span>";
    }

    // Výstup výsledků
    document.getElementById('result').innerHTML = `
        <br><strong>Vypočítané poměrové hodnoty:</strong><br>
        <table border='1'>
            <tr><td><strong>X1:</strong></td><td>${X1.toFixed(3)} - (oběžná aktiva - krátkodobé zdroje) / celková aktiva</td></tr>
            <tr><td><strong>X2:</strong></td><td>${X2.toFixed(3)} - zisk po zdanění / celková aktiva</td></tr>
            <tr><td><strong>X3:</strong></td><td>${X3.toFixed(3)} - zisk před zdaněním a úroky / celková aktiva</td></tr>
            <tr><td><strong>X4:</strong></td><td>${X4.toFixed(3)} - tržní hodnota vlastního kapitálu / celkové dluhy</td></tr>
            <tr><td><strong>X5:</strong></td><td>${X5.toFixed(3)} - celkové tržby / celková aktiva</td></tr>
            <tr><td><strong>Z:</strong></td><td>${Z.toFixed(3)}</td></tr>
        </table>
        <br><strong>Výsledná hodnota Z:</strong> ${Z.toFixed(3)}<br>
        <strong>Hodnocení společnosti:</strong> ${evaluation}
    `;
});
