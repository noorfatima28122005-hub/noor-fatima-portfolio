const countryInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");

const message = document.getElementById("message");

const countryCard = document.getElementById("countryCard");

const capital = document.getElementById("capital");
const region = document.getElementById("region");
const population = document.getElementById("population");
const currency = document.getElementById("currency");
const language = document.getElementById("language");


async function searchCountry() {

    const country = countryInput.value.trim();

    if (country === "") {
        message.textContent = "Please enter a country name.";
        return;
    }


    message.textContent = "Loading country information...";


    try {

        const response = await fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`
        );


        if (!response.ok) {
            throw new Error("Country not found");
        }


        const data = await response.json();

        const countryData = data[0];


        const countryName = countryData.name?.common || "Unknown";

        const countryCapital =
            countryData.capital?.[0] || "Not available";

        const countryRegion =
            countryData.region || "Not available";

        const countryPopulation =
            countryData.population
                ? countryData.population.toLocaleString()
                : "Not available";


        let countryCurrency = "Not available";

        if (countryData.currencies) {

            const currencyCode =
                Object.keys(countryData.currencies)[0];

            const currencyName =
                countryData.currencies[currencyCode]?.name;

            countryCurrency =
                currencyName
                    ? `${currencyName} (${currencyCode})`
                    : currencyCode;
        }


        let countryLanguage = "Not available";

        if (countryData.languages) {

            countryLanguage =
                Object.values(countryData.languages).join(", ");
        }


        document.querySelector(".country-card h2").textContent =
            countryName;

        capital.textContent =
            countryCapital;

        region.textContent =
            countryRegion;

        population.textContent =
            countryPopulation;

        currency.textContent =
            countryCurrency;

        language.textContent =
            countryLanguage;


        const flag =
            countryData.flags?.emoji || "🌍";

        document.querySelector(".country-flag").textContent =
            flag;


        message.textContent =
            "Country information loaded successfully.";

    } catch (error) {

        message.textContent =
            "Country not found. Please try another country.";

        document.querySelector(".country-card h2").textContent =
            "Search a country";

        capital.textContent = "—";
        region.textContent = "—";
        population.textContent = "—";
        currency.textContent = "—";
        language.textContent = "—";

        document.querySelector(".country-flag").textContent =
            "🌍";
    }
}


searchButton.addEventListener(
    "click",
    searchCountry
);


countryInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            searchCountry();
        }

    }
);
