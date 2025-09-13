const convertButton = document.querySelector(".converter")
const fromSelect = document.querySelector("#from-currency")
const toSelect = document.querySelector("#to-currency")

// Taxas de câmbio em relação ao Real (BRL = 1)
const exchangeRates = {
    real: 1,
    dolar: 5.20,
    euro: 5.90,
    libra: 6.20,
    iene: 0.034,
    bitcoin: 0.000026
}

function convertValues() {
    const inputValue = parseFloat(document.querySelector(".input").value) || 0
    const fromCurrency = fromSelect.value
    const toCurrency = toSelect.value

    // Converter para BRL primeiro
    const valueInBRL = inputValue / exchangeRates[fromCurrency]

    // Converter para a moeda destino
    const convertedValue = valueInBRL * exchangeRates[toCurrency]

    // Formatar e exibir
    const fromValueElement = document.querySelector(".dolar-value")
    const toValueElement = document.querySelector(".real-value")

    fromValueElement.innerHTML = formatCurrency(inputValue, fromCurrency)
    toValueElement.innerHTML = formatCurrency(convertedValue, toCurrency)
}

function formatCurrency(value, currency) {
    switch (currency) {
        case "real":
            return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
        case "dolar":
            return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
        case "euro":
            return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value)
        case "libra":
            return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value)
        case "iene":
            return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(value)
        case "bitcoin":
            return new Intl.NumberFormat("en-US", { style: "currency", currency: "BTC", minimumFractionDigits: 8 }).format(value)
        default:
            return value.toString()
    }
}

function changeCurrency() {
    const fromCurrency = fromSelect.value
    const toCurrency = toSelect.value

    const fromElement = document.querySelector(".dolar-value1")
    const fromImg = document.querySelector(".dolar")
    const toElement = document.querySelector(".real-value1")
    const toImg = document.querySelector(".real")

    // Atualizar lado esquerdo (de)
    fromElement.innerHTML = getCurrencyName(fromCurrency)
    fromImg.src = getCurrencyImage(fromCurrency)

    // Atualizar lado direito (para)
    toElement.innerHTML = getCurrencyName(toCurrency)
    toImg.src = getCurrencyImage(toCurrency)

    convertValues()
}

function getCurrencyName(currency) {
    switch (currency) {
        case "real": return "Real"
        case "dolar": return "Dólar"
        case "euro": return "Euro"
        case "libra": return "Libra"
        case "iene": return "Iene"
        case "bitcoin": return "Bitcoin"
        default: return currency
    }
}

function getCurrencyImage(currency) {
    switch (currency) {
        case "real": return "./assets/real.png"
        case "dolar": return "./assets/eua.png"
        case "euro": return "./assets/euro.png"
        case "libra": return "./assets/a0fa5b993223b56d3c95277c822d9484d1bc9757.png"
        case "iene": return "./assets/ienejapones.webp"
        case "bitcoin": return "./assets/bitcoin.png"
        default: return "./assets/real.png"
    }
}

fromSelect.addEventListener("change", changeCurrency)
toSelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)

// Inicializar
changeCurrency()
