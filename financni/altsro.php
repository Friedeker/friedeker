<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Finanční analýza</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <p> Níže si můžete spočítat ověřit finanční zdraví společnosti na základě kalkulace zvoleného bankrotního modelu.
        Jako vstupní údaje můžete použít veřejně dostupné údaje obchodních společností ze <a href="https://www.justice.cz" target="_blank">obchodního rejstříku.</a>
    </p>

    <br>

    <strong>Altmanův model pro společnosti s ručením omezeným.</strong> <br> 
    Z = 0,717X1 + 0,847X2 + 3,107X3 + 0,42X4 +0,998X5 <br> <br>

    <strong>Zadejte vstupní finanční údaje:</strong>
    <form method="post" action="">
        Oběžná aktiva <input type="number" name="OA" value="0"><br>
        Krátkodobé zdroje <input type="number" name="KZ" value="0"><br>
        Celková aktiva <input type="number" name="CA" value="0"><br>
        Zisk po zdanění <input type="number" name="ZPZ" value="0"><br>
        Zisk před zdaněním a úroky <input type="number" name="ZPRZ" value="0"><br>
        Tržní hodnota vlastního kapitálu <input type="number" name="VK" value="0"><br>
        Celkové tržby <input type="number" name="CT" value="0"><br>
        <br>
        <button type="submit" name="calculate">Výpočet</button>
    </form>

    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['calculate'])) {
        // Načtení vstupních hodnot
        $OA = isset($_POST['OA']) ? (float)$_POST['OA'] : 0;
        $KZ = isset($_POST['KZ']) ? (float)$_POST['KZ'] : 0;
        $CA = isset($_POST['CA']) ? (float)$_POST['CA'] : 0;
        $ZPZ = isset($_POST['ZPZ']) ? (float)$_POST['ZPZ'] : 0;
        $ZPRZ = isset($_POST['ZPRZ']) ? (float)$_POST['ZPRZ'] : 0;
        $VK = isset($_POST['VK']) ? (float)$_POST['VK'] : 0;
        $CT = isset($_POST['CT']) ? (float)$_POST['CT'] : 0;

        // Kontrola, zda všechny údaje jsou vyplněny (žádný není 0)
        if ($OA == 0 || $KZ == 0 || $CA == 0 || $ZPZ == 0 || $ZPRZ == 0 || $VK == 0 || $CT == 0) {
            echo "<p style='color: red;'>Všechny vstupní údaje musí být vyplněny a nesmí být 0.</p>";
        } else {
            // Výpočty
            $X1 = $CA !== 0 ? ($OA - $KZ) / $CA : 0;
            $X2 = $CA !== 0 ? $ZPZ / $CA : 0;
            $X3 = $CA !== 0 ? $ZPRZ / $CA : 0;
            $X4 = $KZ !== 0 ? $VK / $KZ : 0;
            $X5 = $CA !== 0 ? $CT / $CA : 0;

            // Výpočet Z
            $Z = 0.717 * $X1 + 0.847 * $X2 + 3.107 * $X3 + 0.42 * $X4 + 0.998 * $X5;

            // Výstup
            echo "<br><strong>Vypočítané poměrové hodnoty:</strong><br>";
            echo "<table border='1'>
                  <tr><td><strong>X1:</strong></td><td>" . number_format($X1, 3) . " - (oběžná aktiva - krátkodobé zdroje) / celková aktiva</td></tr>
                  <tr><td><strong>X2:</strong></td><td>" . number_format($X2, 3) . " - zisk po zdanění / celková aktiva</td></tr>
                  <tr><td><strong>X3:</strong></td><td>" . number_format($X3, 3) . " - zisk před zdaněním a úroky / celková aktiva</td></tr>
                  <tr><td><strong>X4:</strong></td><td>" . number_format($X4, 3) . " - tržní hodnota vlastního kapitálu / celkové dluhy</td></tr>
                  <tr><td><strong>X5:</strong></td><td>" . number_format($X5, 3) . " - celkové tržby / celková aktiva</td></tr>
                  <tr><td><strong>Z:</strong></td><td>" . number_format($Z, 3) . "</td></tr>
                  </table>";

            echo "<br><strong>Výsledná hodnota Z:</strong> " . number_format($Z, 3);

            // Hodnocení společnosti
            function evaluateCompany($Z) {
                if ($Z > 2.9) {
                    return "<span style='color: green;'>Uspokojivá finanční situace firmy.</span>";
                } elseif ($Z > 1.2) {
                    return "<span style='color: orange;'>Šedá zóna neurčitých výsledků.</span>";
                } else {
                    return "<span style='color: red;'>Firma je ohrožena bankrotem.</span>";
                }
            }

            echo "<br><strong>Hodnocení společnosti:</strong> " . evaluateCompany($Z);
        }
    }
    ?>

    <p><strong>Hodnocení výsledků:<br>

    Z > 2,9 → uspokojivá finanční situace firmy<br>

    1,2 < Z ≤ 2,9 → šedá zóna neurčitých výsledků<br>

    Z ≤ 1,2 → firma je ohrožena bankrotem<strong><br></p>

    <p>Zdroj informací <a href="https://cs.wikipedia.org/wiki/Bankrotn%C3%AD_model" target="_blank">Wikipedie</a></p>

    <div class="navigation-buttons">
        <button onclick="window.location.href='index.php'">Zpět</button>
        <button onclick="window.location.href='../index.html'" class="right">Návrat na úvodní stránku</button>
    </div>

    <div class="watermark">Ing. Miroslav Uhlíř</div> 

</body>

</html>
