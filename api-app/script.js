const countryInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");
const message = document.getElementById("message");

const countryName = document.getElementById("countryName");
const countryFlag = document.getElementById("countryFlag");
const capital = document.getElementById("capital");
const region = document.getElementById("region");
const population = document.getElementById("population");
const currency = document.getElementById("currency");
const language = document.getElementById("language");

// REST Countries API Key
const API_KEY = "rc_live_9a912b4b31804010a72182fbb3572592";

async function searchCountry() {

    const country = countryInput.value.trim();

    if (!country) {
        message.textContent = "Please enter a country name.";
        return;
    }

    message.textContent = "Searching...";
    searchButton.disabled = true;
    searchButton.textContent = "Searching...";

    try {

        const response = await fetch(
            `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(country)}`,
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Accept": "application/json"
                }
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.errors?.[0]?.message ||
                result.message ||
                "API request failed."
            );
        }

        const countries = result.data?.objects || [];

        if (countries.length === 0) {
            throw new Error("Country not found.");
        }

        const data = countries[0];

        // Country Name
        countryName.textContent =
            data.names?.common || "Unknown";

        // Flag
        countryFlag.textContent =
            data.flag?.emoji || "🌍";

        // Capital (FIXED)
        capital.textContent =
            data.capitals?.[0]?.name ||
            data.capitals?.[0] ||
            "N/A";

        // Region
        region.textContent =
            data.region || "N/A";

        // Population
        population.textContent =
            data.population != null
                ? Number(data.population).toLocaleString()
                : "N/A";

        // Currency
        const currencies = data.currencies
            ? Object.values(data.currencies)
            : [];

        currency.textContent =
            currencies.length
                ? currencies[0].name +
                  (currencies[0].symbol
                      ? ` (${currencies[0].symbol})`
                      : "")
                : "N/A";

        // Language (FIXED)
        const languages = data.languages
            ? Object.values(data.languages)
            : [];

        language.textContent =
            languages.length
                ? languages.map(lang => lang.name || lang).join(", ")
                : "N/A";

        message.textContent =
            "Country information loaded successfully.";

    } catch (error) {

        console.error("API Error:", error);

        message.textContent =
            error.message || "Something went wrong.";

        countryName.textContent = "Sorry!";
        countryFlag.textContent = "🌍";
        capital.textContent = "—";
        region.textContent = "—";
        population.textContent = "—";
        currency.textContent = "—";
        language.textContent = "—";

    } finally {

        searchButton.disabled = false;
        searchButton.textContent = "Search";

    }

}

// Search Button
searchButton.addEventListener("click", searchCountry);

// Enter Key
countryInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchCountry();
    }

});
