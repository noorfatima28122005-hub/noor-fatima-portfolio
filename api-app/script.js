const countryInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");

const message = document.getElementById("message");

const countryName = document.getElementById("countryName");
const capital = document.getElementById("capital");
const region = document.getElementById("region");
const population = document.getElementById("population");
const currency = document.getElementById("currency");

const countryFlag = document.querySelector(".country-flag");


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
            throw new Error("Country not found");
        }

        const data = await response.json();

        const countryData = data[0];

        countryName.textContent =
            countryData.name.common;

        countryFlag.textContent =
            countryData.flag || "🌍";

        capital.textContent =
            countryData.capital
                ? countryData.capital[0]
                : "N/A";

        region.textContent =
            countryData.region || "N/A";

        population.textContent =
            countryData.population
                ? countryData.population.toLocaleString()
                : "N/A";

        if (countryData.currencies) {

            const currencies =
                Object.values(countryData.currencies);

            currency.textContent =
                currencies[0].name || "N/A";

        } else {

            currency.textContent = "N/A";

        }

        message.textContent =
            "Country information loaded successfully.";

    } catch (error) {

        console.error("Error:", error);

        message.textContent =
            "Country not found. Please try again.";

        countryName.textContent = "Sorry!";
        capital.textContent = "—";
        region.textContent = "—";
        population.textContent = "—";
        currency.textContent = "—";
        countryFlag.textContent = "🌍";

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
