```javascript
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


// ========================================
// REST COUNTRIES API KEY
// ========================================

const API_KEY = "PASTE_YOUR_CURRENT_API_KEY_HERE";


// ========================================
// SEARCH COUNTRY
// ========================================

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

        const url =
            `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(country)}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Accept": "application/json"
            }
        });

        const result = await response.json();

        console.log("API response:", result);


        // Check API error
        if (!response.ok) {
            throw new Error(
                result.message || "API request failed."
            );
        }


        // Get country list
        let countries = [];

        if (Array.isArray(result)) {
            countries = result;
        } else if (Array.isArray(result.data)) {
            countries = result.data;
        } else if (Array.isArray(result.data?.objects)) {
            countries = result.data.objects;
        } else if (Array.isArray(result.objects)) {
            countries = result.objects;
        }


        if (countries.length === 0) {
            throw new Error("Country not found.");
        }


        const data = countries[0];


        // ========================================
        // COUNTRY NAME
        // ========================================

        countryName.textContent =
            data.name?.common ||
            data.names?.common ||
            data.name ||
            "Unknown";


        // ========================================
        // FLAG
        // ========================================

        countryFlag.textContent =
            data.flag?.emoji ||
            data.flag ||
            data.emoji ||
            "🌍";


        // ========================================
        // CAPITAL
        // ========================================

        capital.textContent =
            data.capital?.[0] ||
            data.capitals?.[0] ||
            data.capital ||
            "N/A";


        // ========================================
        // REGION
        // ========================================

        region.textContent =
            data.region ||
            data.subregion ||
            "N/A";


        // ========================================
        // POPULATION
        // ========================================

        if (data.population !== undefined) {

            population.textContent =
                Number(data.population).toLocaleString();

        } else {

            population.textContent = "N/A";

        }


        // ========================================
        // CURRENCY
        // ========================================

        let currencies = [];

        if (data.currencies) {
            currencies = Object.values(data.currencies);
        }

        if (currencies.length > 0) {

            const currencyData = currencies[0];

            currency.textContent =
                currencyData.name ||
                currencyData.code ||
                "N/A";

        } else {

            currency.textContent = "N/A";

        }


        // ========================================
        // LANGUAGE
        // ========================================

        let languages = [];

        if (data.languages) {
            languages = Object.values(data.languages);
        }

        if (language) {

            language.textContent =
                languages.length > 0
                    ? languages.join(", ")
                    : "N/A";

        }


        // ========================================
        // SUCCESS
        // ========================================

        message.textContent =
            "Country information loaded successfully.";


    } catch (error) {

        console.error("API Error:", error);

        message.textContent =
            error.message ||
            "Something went wrong. Please try again.";


        countryName.textContent = "Sorry!";
        countryFlag.textContent = "🌍";

        capital.textContent = "—";
        region.textContent = "—";
        population.textContent = "—";
        currency.textContent = "—";

        if (language) {
            language.textContent = "—";
        }


    } finally {

        searchButton.disabled = false;
        searchButton.textContent = "Search";

    }

}


// ========================================
// SEARCH BUTTON
// ========================================

searchButton.addEventListener("click", searchCountry);


// ========================================
// ENTER KEY
// ========================================

countryInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchCountry();
    }

});
```
