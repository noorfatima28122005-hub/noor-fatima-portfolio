```javascript
const countryInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchBtn");

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

        countryName.textContent = "Search a country";
        capital.textContent = "—";
        region.textContent = "—";
        population.textContent = "—";
        currency.textContent = "—";
        countryFlag.textContent = "🌍";

        return;
    }

    message.textContent = "Loading country information...";

    searchButton.disabled = true;
    searchButton.textContent = "Searching...";

    try {

        const response = await fetch(
            `https://api.restcountries.com/countries/v5/name?q=${encodeURIComponent(country)}`,
            {
                headers: {
                    "Authorization": "Bearer rc_live_demo"
                }
            }
        );

        if (!response.ok) {
            throw new Error("Country not found");
        }

        const result = await response.json();

        const countryData = result.data.objects[0];

        if (!countryData) {
            throw new Error("Country not found");
        }

        countryName.textContent =
            countryData.names?.common || "Unknown";

        countryFlag.textContent =
            countryData.flag?.emoji || "🌍";

        capital.textContent =
            countryData.capitals?.[0] || "N/A";

        region.textContent =
            countryData.region || "N/A";

        population.textContent =
            countryData.population
                ? countryData.population.toLocaleString()
                : "N/A";

        if (countryData.currencies) {

            const currencyList =
                Object.values(countryData.currencies);

            if (currencyList.length > 0) {

                const currencyData = currencyList[0];

                currency.textContent =
                    currencyData.name ||
                    "N/A";

            } else {

                currency.textContent = "N/A";
            }

        } else {

            currency.textContent = "N/A";
        }

        message.textContent =
            "Country information loaded successfully.";

    } catch (error) {

        console.error(error);

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
```
