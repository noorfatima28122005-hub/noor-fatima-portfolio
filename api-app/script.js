const countryInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");
const message = document.getElementById("message");

const countryCard = document.querySelector(".country-card");
const countryName = countryCard.querySelector("h2");
const countryFlag = countryCard.querySelector(".country-flag");

const infoItems = countryCard.querySelectorAll(".country-info p");

const capital = infoItems[0].querySelector("span");
const region = infoItems[1].querySelector("span");
const population = infoItems[2].querySelector("span");
const currency = infoItems[3].querySelector("span");
const language = infoItems[4]
    ? infoItems[4].querySelector("span")
    : null;


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
            `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`
        );

        if (!response.ok) {
            throw new Error("Country not found.");
        }

        const countries = await response.json();

        if (!countries || countries.length === 0) {
            throw new Error("Country not found.");
        }

        const data = countries[0];

        // Country name
        countryName.textContent =
            data.name?.common || "Unknown";

        // Country flag
        countryFlag.textContent =
            data.flag || "🌍";

        // Capital
        capital.textContent =
            data.capital?.[0] || "N/A";

        // Region
        region.textContent =
            data.region || "N/A";

        // Population
        population.textContent =
            data.population
                ? data.population.toLocaleString()
                : "N/A";

        // Currency
        const currencies = data.currencies
            ? Object.values(data.currencies)
            : [];

        currency.textContent =
            currencies.length > 0
                ? currencies[0].name +
                  (currencies[0].symbol
                      ? ` (${currencies[0].symbol})`
                      : "")
                : "N/A";

        // Language
        const languages = data.languages
            ? Object.values(data.languages)
            : [];

        if (language) {
            language.textContent =
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

        infoItems.forEach(function (item) {
            const span = item.querySelector("span");

            if (span) {
                span.textContent = "—";
            }
        });

    } finally {

        searchButton.disabled = false;
        searchButton.textContent = "Search";
    }
}


// Search button
searchButton.addEventListener("click", searchCountry);


// Press Enter to search
countryInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchCountry();
    }

});
