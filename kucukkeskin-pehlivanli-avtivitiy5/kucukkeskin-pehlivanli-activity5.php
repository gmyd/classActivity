<?php
$amount = isset($_GET["from_value"]) ? floatval($_GET["from_value"]) : "";
$from_currency = isset($_GET["from_currency"]) ? $_GET["from_currency"] : "USD";
$to_currency = isset($_GET["to_currency"]) ? $_GET["to_currency"] : "USD";
$convertedAmount = "";

function getExchangeRates() {
    $url = "https://api.frankfurter.app/latest?from=USD&to=CAD,EUR";
    $response = file_get_contents($url);
    $data = json_decode($response, true);

    if (isset($data["rates"])) {
        return [
            "USD" => [
                "CAD" => $data["rates"]["CAD"],
                "EUR" => $data["rates"]["EUR"]
            ],
            "CAD" => [
                "USD" => 1 / $data["rates"]["CAD"],  
                "EUR" => (1 / $data["rates"]["CAD"]) * $data["rates"]["EUR"] 
            ],
            "EUR" => [
                "USD" => 1 / $data["rates"]["EUR"],  
                "CAD" => (1 / $data["rates"]["EUR"]) * $data["rates"]["CAD"] 
            ]
        ];
    } else {
        return false;
    }
}

$exchange_rates = getExchangeRates();

if ($amount !== "" && $exchange_rates) {
    if (isset($exchange_rates[$from_currency][$to_currency])) {
        $convertedAmount = $amount * $exchange_rates[$from_currency][$to_currency];
    } elseif ($from_currency == $to_currency) {
        $convertedAmount = $amount;
    } else {
        $convertedAmount = "Exchange rate not available!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Currency Converter</title>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 50px;
        }
        table {
            border-collapse: collapse;
            width: 400px;
        }
        td {
            padding: 5px;
        }
        input, select, button {
            padding: 5px;
            font-size: 14px;
        }
        button {
            margin-top: 10px;
        }
    </style>
</head>
<body>

    <h2>Currency Converter</h2>
    <form method="GET">
        <table>
            <tr>
                <td>From:</td>
                <td>
                    <input type="number" name="from_value" value="<?php echo $amount; ?>" required>
                </td>
                <td>Currency:</td>
                <td>
                    <select name="from_currency">
                        <option value="USD" <?php if($from_currency == "USD") echo "selected"; ?>>US Dollar</option>
                        <option value="CAD" <?php if($from_currency == "CAD") echo "selected"; ?>>Canadian Dollar</option>
                        <option value="EUR" <?php if($from_currency == "EUR") echo "selected"; ?>>Euro</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>To:</td>
                <td>
                    <input type="text" value="<?php echo ($convertedAmount !== "") ? number_format($convertedAmount, 2) : ''; ?>" disabled>
                </td>
                <td>Currency:</td>
                <td>
                    <select name="to_currency">
                        <option value="USD" <?php if($to_currency == "USD") echo "selected"; ?>>US Dollar</option>
                        <option value="CAD" <?php if($to_currency == "CAD") echo "selected"; ?>>Canadian Dollar</option>
                        <option value="EUR" <?php if($to_currency == "EUR") echo "selected"; ?>>Euro</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: right;">
                    <button type="submit">Convert</button>
                </td>
            </tr>
        </table>
    </form>

</body>
</html>