<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Finanzanalyse</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <p>Unten können Sie die finanzielle Gesundheit eines Unternehmens anhand der Berechnung des gewählten Insolvenzmodells überprüfen. Als Eingabedaten können Sie öffentlich zugängliche Daten von Handelsgesellschaften aus dem <a href="https://www.justice.cz" target="_blank">Handelsregister</a> verwenden.</p>

    <br>

    <strong>Altman-Insolvenzmodell für Aktiengesellschaften. Es handelt sich um die klassische Version des Altman-Insolvenzmodells.</strong> <br> 
    Z = 1,2X1 + 1,4X2 + 3,3X3 + 0,6X4 + 1,0X5 <br> <br>

    <p>Altman-Modell für Gesellschaften mit beschränker Haftung <a href="altsro.php">Link</a><p>

    <strong>Geben Sie die finanziellen Eingabedaten ein:</strong>
    <form method="post" action="">
        Umlaufvermögen <input type="number" name="OA" value="0"><br>
        Kurzfristige Verbindlichkeiten <input type="number" name="KZ" value="0"><br>
        Gesamtvermögen <input type="number" name="CA" value="0"><br>
        Jahresüberschuss <input type="number" name="ZPZ" value="0"><br>
        Ergebnis vor Steuern und Zinsen <input type="number" name="ZPRZ" value="0"><br>
        Marktwert des Eigenkapitals <input type="number" name="VK" value="0"><br>
        Gesamtumsatz <input type="number" name="CT" value="0"><br>
        <br>
        <button type="submit" name="calculate">Berechnen</button>
    </form>

    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['calculate'])) {
        // Laden der Eingabewerte
        $OA = isset($_POST['OA']) ? (float)$_POST['OA'] : 0;
        $KZ = isset($_POST['KZ']) ? (float)$_POST['KZ'] : 0;
        $CA = isset($_POST['CA']) ? (float)$_POST['CA'] : 0;
        $ZPZ = isset($_POST['ZPZ']) ? (float)$_POST['ZPZ'] : 0;
        $ZPRZ = isset($_POST['ZPRZ']) ? (float)$_POST['ZPRZ'] : 0;
        $VK = isset($_POST['VK']) ? (float)$_POST['VK'] : 0;
        $CT = isset($_POST['CT']) ? (float)$_POST['CT'] : 0;

        // Überprüfung, ob alle Daten ausgefüllt sind (keine Nullwerte)
        if ($OA == 0 || $KZ == 0 || $CA == 0 || $ZPZ == 0 || $ZPRZ == 0 || $VK == 0 || $CT == 0) {
            echo "<p style='color: red;'>Alle Eingabedaten müssen ausgefüllt und dürfen nicht Null sein.</p>";
        } else {
            // Berechnungen
            $X1 = $CA !== 0 ? ($OA - $KZ) / $CA : 0;
            $X2 = $CA !== 0 ? $ZPZ / $CA : 0;
            $X3 = $CA !== 0 ? $ZPRZ / $CA : 0;
            $X4 = $KZ !== 0 ? $VK / $KZ : 0;
            $X5 = $CA !== 0 ? $CT / $CA : 0;

            // Berechnung von Z
            $Z = 1.21 * $X1 + 1.4 * $X2 + 3.3 * $X3 + 0.6 * $X4 + 1.0 * $X5;

            // Ausgabe
            echo "<br><strong>Berechnete Kennzahlen:</strong><br>";
            echo "<table border='1'>
                  <tr><td><strong>X1:</strong></td><td>" . number_format($X1, 3) . " - (Umlaufvermögen - Kurzfristige Verbindlichkeiten) / Gesamtvermögen</td></tr>
                  <tr><td><strong>X2:</strong></td><td>" . number_format($X2, 3) . " - Jahresüberschuss / Gesamtvermögen</td></tr>
                  <tr><td><strong>X3:</strong></td><td>" . number_format($X3, 3) . " - Ergebnis vor Steuern und Zinsen / Gesamtvermögen</td></tr>
                  <tr><td><strong>X4:</strong></td><td>" . number_format($X4, 3) . " - Marktwert des Eigenkapitals / Gesamtverbindlichkeiten</td></tr>
                  <tr><td><strong>X5:</strong></td><td>" . number_format($X5, 3) . " - Gesamtumsatz / Gesamtvermögen</td></tr>
                  <tr><td><strong>Z:</strong></td><td>" . number_format($Z, 3) . "</td></tr>
                  </table>";

            echo "<br><strong>Ergebniswert Z:</strong> " . number_format($Z, 3);

            // Unternehmensbewertung
            function evaluateCompany($Z) {
                if ($Z > 2.99) {
                    return "<span style='color: green;'>Gesunde finanzielle Situation des Unternehmens.</span>";
                } elseif ($Z > 1.81) {
                    return "<span style='color: orange;'>Grauzone mit unsicheren Ergebnissen.</span>";
                } else {
                    return "<span style='color: red;'>Das Unternehmen ist insolvenzgefährdet.</span>";
                }
            }

            echo "<br><strong>Unternehmensbewertung:</strong> " . evaluateCompany($Z);
        }
    }
    ?>

    <p><strong>Bewertung der Ergebnisse:<br>

    Z > 2,99 → gesunde finanzielle Situation des Unternehmens<br>

    1,81 < Z ≤ 2,99 → Grauzone mit unsicheren Ergebnissen<br>

    Z ≤ 1,81 → Das Unternehmen ist insolvenzgefährdet<strong><br></p>

<p>Informationsquelle <a href="https://cs.wikipedia.org/wiki/Bankrotn%C3%AD_model" target="_blank">Wikipedia</a></p>

    <div class="navigation-buttons">
        <button onclick="window.location.href='../index.de.html'" class="right">Zur Startseite zurückkehren</button>
    </div>

    <div class="watermark">Miroslav Uhlíř</div> 

</body>

</html>
