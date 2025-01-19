<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Finanzanalyse</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <p>Unten können Sie die finanzielle Gesundheit eines Unternehmens basierend auf der Berechnung des gewählten Insolvenzmodells überprüfen. Als Eingabedaten können öffentlich zugängliche Informationen von Handelsunternehmen aus dem <a href="https://www.justice.cz" target="_blank">Handelsregister</a> verwendet werden.</p>

    <br>

    <strong>Altman-Modell für Gesellschaften mit beschränkter Haftung.</strong> <br>
    Z = 0,717X1 + 0,847X2 + 3,107X3 + 0,42X4 + 0,998X5 <br> <br>

    <strong>Geben Sie die finanziellen Eingabedaten ein:</strong>
    <form method="post" action="">
        Umlaufvermögen <input type="number" name="OA" value="0"><br>
        Kurzfristige Verbindlichkeiten <input type="number" name="KZ" value="0"><br>
        Gesamtvermögen <input type="number" name="CA" value="0"><br>
        Gewinn nach Steuern <input type="number" name="ZPZ" value="0"><br>
        Gewinn vor Steuern und Zinsen <input type="number" name="ZPRZ" value="0"><br>
        Marktwert des Eigenkapitals <input type="number" name="VK" value="0"><br>
        Gesamtumsatz <input type="number" name="CT" value="0"><br>
        <br>
        <button type="submit" name="calculate">Berechnung</button>
    </form>

    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['calculate'])) {
        // Eingabewerte laden
        $OA = isset($_POST['OA']) ? (float)$_POST['OA'] : 0;
        $KZ = isset($_POST['KZ']) ? (float)$_POST['KZ'] : 0;
        $CA = isset($_POST['CA']) ? (float)$_POST['CA'] : 0;
        $ZPZ = isset($_POST['ZPZ']) ? (float)$_POST['ZPZ'] : 0;
        $ZPRZ = isset($_POST['ZPRZ']) ? (float)$_POST['ZPRZ'] : 0;
        $VK = isset($_POST['VK']) ? (float)$_POST['VK'] : 0;
        $CT = isset($_POST['CT']) ? (float)$_POST['CT'] : 0;

        // Überprüfen, ob alle Daten ausgefüllt sind (keines ist 0)
        if ($OA == 0 || $KZ == 0 || $CA == 0 || $ZPZ == 0 || $ZPRZ == 0 || $VK == 0 || $CT == 0) {
            echo "<p style='color: red;'>Alle Eingabedaten müssen ausgefüllt sein und dürfen nicht 0 sein.</p>";
        } else {
            // Berechnungen
            $X1 = $CA !== 0 ? ($OA - $KZ) / $CA : 0;
            $X2 = $CA !== 0 ? $ZPZ / $CA : 0;
            $X3 = $CA !== 0 ? $ZPRZ / $CA : 0;
            $X4 = $KZ !== 0 ? $VK / $KZ : 0;
            $X5 = $CA !== 0 ? $CT / $CA : 0;

            // Berechnung von Z
            $Z = 0.717 * $X1 + 0.847 * $X2 + 3.107 * $X3 + 0.42 * $X4 + 0.998 * $X5;

            // Ausgabe
            echo "<br><strong>Berechnete Kennzahlen:</strong><br>";
            echo "<table border='1'>
                  <tr><td><strong>X1:</strong></td><td>" . number_format($X1, 3) . " - (Umlaufvermögen - kurzfristige Verbindlichkeiten) / Gesamtvermögen</td></tr>
                  <tr><td><strong>X2:</strong></td><td>" . number_format($X2, 3) . " - Gewinn nach Steuern / Gesamtvermögen</td></tr>
                  <tr><td><strong>X3:</strong></td><td>" . number_format($X3, 3) . " - Gewinn vor Steuern und Zinsen / Gesamtvermögen</td></tr>
                  <tr><td><strong>X4:</strong></td><td>" . number_format($X4, 3) . " - Marktwert des Eigenkapitals / Gesamtverbindlichkeiten</td></tr>
                  <tr><td><strong>X5:</strong></td><td>" . number_format($X5, 3) . " - Gesamtumsatz / Gesamtvermögen</td></tr>
                  <tr><td><strong>Z:</strong></td><td>" . number_format($Z, 3) . "</td></tr>
                  </table>";

            echo "<br><strong>Ergebniswert Z:</strong> " . number_format($Z, 3);

            // Unternehmensbewertung
            function evaluateCompany($Z) {
                if ($Z > 2.9) {
                    return "<span style='color: green;'>Zufriedenstellende finanzielle Lage des Unternehmens.</span>";
                } elseif ($Z > 1.2) {
                    return "<span style='color: orange;'>Grauzone unklarer Ergebnisse.</span>";
                } else {
                    return "<span style='color: red;'>Unternehmen ist vom Konkurs bedroht.</span>";
                }
            }

            echo "<br><strong>Unternehmensbewertung:</strong> " . evaluateCompany($Z);
        }
    }
    ?>

    <p><strong>Bewertung der Ergebnisse:<br>

    Z > 2,9 → zufriedenstellende finanzielle Lage des Unternehmens<br>

    1,2 < Z ≤ 2,9 → Grauzone unklarer Ergebnisse<br>

    Z ≤ 1,2 → Unternehmen ist vom Konkurs bedroht<strong><br></p>

    <p>Informationsquelle <a href="https://cs.wikipedia.org/wiki/Bankrotn%C3%AD_model" target="_blank">Wikipedia</a></p>

    <div class="navigation-buttons">
        <button onclick="window.location.href='index.de.php'">Zurück</button>
        <button onclick="window.location.href='../index.html'" class="right">Zur Startseite zurückkehren</button>
    </div>

    <div class="watermark">Miroslav Uhlíř</div> 

</body>

</html>
