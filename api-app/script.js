const countryInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");

const message = document.getElementById("message");

const countryName = document.getElementById("countryName");
const capital = document.getElementById("capital");
const region = document.getElementById("region");
const population = document.getElementById("population");
const currency = document.getElementById("currency");

const countryFlag = document.querySelector(".country-flag");

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
            `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(country)}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`
                }
            }
        );

        const result = await response.json();

        console.log("API Response:", result);

        if (!response.ok) {
            throw new Error(
                result.message || "API request failed"
            );
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

        capital.textContent =
            data.capitals?.[0] || "N/A";

        region.textContent =
            data.region || "N/A";

        population.textContent =
            data.population
                ? data.population.toLocaleString()
                : "N/A";

        if (data.currencies) {

            const currencyList =
                Object.values(data.currencies);

            currency.textContent =
                currencyList[0]?.name || "N/A";

        } else {

            currency.textContent = "N/A";
        }

        message.textContent =
            "Country information loaded successfully.";

    } catch (error) {

        console.error("API Error:", error);

        message.textContent =
            error.message || "Something went wrong.";

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
