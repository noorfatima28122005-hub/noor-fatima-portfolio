const countryInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");

const message = document.getElementById("message");

const countryName = document.getElementById("countryName");
const capital = document.getElementById("capital");
const region = document.getElementById("region");
const population = document.getElementById("population");
const currency = document.getElementById("currency");

const countryFlag = document.querySelector(".country-flag");


// REST Countries API
const API_URL = "https://api.restcountries.com/countries/v5";


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
            `${API_URL}?q=${encodeURIComponent(country)}&limit=10`,
            {
                headers: {
                    "Authorization": "Bearer rc_live_demo"
                }
            }
        );

        const result = await response.json();

        console.log("API Response:", result);

        if (!response.ok) {
            throw new Error(
                result.errors?.[0]?.message || "API request failed"
            );
        }

        const countries = result.data?.objects || [];

        if (countries.length === 0) {
            throw new Error("Country not found");
        }

        const data = countries[0];


        // Country name
        countryName.textContent =
            data.names?.common || "Unknown";


        // Flag
        countryFlag.textContent =
            data.flag?.emoji || "🌍";


        // Capital
        capital.textContent =
            data.capitals?.[0]?.name || "N/A";


        // Region
        region.textContent =
            data.region || "N/A";


        // Population
        population.textContent =
            data.population
                ? data.population.toLocaleString()
                : "N/A";


        // Currency
        if (data.currencies) {

            const currencyList =
                Object.values(data.currencies);

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


        // Success
        message.textContent =
            "Country information loaded successfully.";


    } catch (error) {

        console.error("API Error:", error);

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


// Search button
searchButton.addEventListener(
    "click",
    searchCountry
);


// Enter key
countryInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            searchCountry();
        }

    }
);
