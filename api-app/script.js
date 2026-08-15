const countryInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");
const message = document.getElementById("message");

const countryName = document.querySelector(".country-card h2");
const countryFlag = document.querySelector(".country-flag");

const infoValues = document.querySelectorAll(".country-info p span");

const API_KEY = "rc_live_9a912b4b31804010a72182fbb3572592";

async function searchCountry() {
    const country = countryInput.value.trim();

    if (country === "") {
        message.textContent = "Please enter a country name.";
        return;
    }

    message.textContent = "Searching...";
    searchButton.disabled = true;
    searchButton.textContent = "Searching...";

    try {
        const response = await fetch(
            `https://api.restcountries.com/countries/v5/name?q=${encodeURIComponent(country)}`,
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`
                }
            }
        );

        const result = await response.json();

        console.log("API Response:", result);

        if (!response.ok) {
            throw new Error(result.message || "API request failed");
        }

        const countries = result.data?.objects || [];

        if (countries.length === 0) {
            throw new Error("Country not found");
        }

        const data = countries[0];

        countryName.textContent =
            data.names?.common || "Unknown";

        countryFlag.textContent =
            data.flag?.emoji || "🌍";

        infoValues[0].textContent =
            data.capitals?.[0] || "N/A";

        infoValues[1].textContent =
            data.region || "N/A";

        infoValues[2].textContent =
            data.population
                ? data.population.toLocaleString()
                : "N/A";

        const currencies = data.currencies
            ? Object.values(data.currencies)
            : [];

        infoValues[3].textContent =
            currencies.length > 0
                ? currencies[0].name +
                  (currencies[0].symbol
                      ? ` (${currencies[0].symbol})`
                      : "")
                : "N/A";

        const languages = data.languages
            ? Object.values(data.languages)
            : [];

        if (infoValues[4]) {
            infoValues[4].textContent =
                languages.length > 0
                    ? languages.join(", ")
                    : "N/A";
        }

        message.textContent =
            "Country information loaded successfully.";

    } catch (error) {

        console.error("API Error:", error);

        message.textContent =
            error.message || "Something went wrong.";

        countryName.textContent = "Sorry!";
        countryFlag.textContent = "🌍";

        infoValues.forEach(function (item) {
            item.textContent = "—";
        });

    } finally {

        searchButton.disabled = false;
        searchButton.textContent = "Search";
    }
}

searchButton.addEventListener("click", searchCountry);

countryInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchCountry();
    }
});
