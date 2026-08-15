const countryInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");

const message = document.getElementById("message");

const countryName = document.getElementById("countryName");
const capital = document.getElementById("capital");
const region = document.getElementById("region");
const population = document.getElementById("population");
const currency = document.getElementById("currency");

const countryFlag = document.querySelector(".country-flag");

const API_KEY = "YOUR_NEW_API_KEY_HERE";


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

        const url =
            `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(country)}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${API_KEY}`
            }
        });

        const result = await response.json();

        console.log("Status:", response.status);
        console.log("API Response:", result);

        if (!response.ok) {

            const apiError =
                result.errors?.[0]?.message ||
                `API Error: ${response.status}`;

            throw new Error(apiError);
        }

        const countries = result.data?.objects || [];

        if (countries.length === 0) {
            throw new Error("No country found.");
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
                ? Number(data.population).toLocaleString()
                : "N/A";

        // Currency
        if (data.currencies) {

            const currencyList =
                Object.values(data.currencies);

            if (currencyList.length > 0) {

                const currencyData = currencyList[0];

                currency.textContent =
                    currencyData.name ||
                    currencyData.code ||
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

        console.error("ERROR:", error);

        message.textContent =
            "Error: " + error.message;

        countryName.textContent = "Unable to load";
        capital.textContent = "—";
        region.textContent = "—";
        population.textContent = "—";
        currency.textContent = "—";
        countryFlag.textContent = "⚠️";

    } finally {

        searchButton.disabled = false;
        searchButton.textContent = "Search";
    }
}


// Search button
searchButton.addEventListener("click", searchCountry);


// Enter key
countryInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchCountry();
    }

});
