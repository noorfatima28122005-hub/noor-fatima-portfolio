```javascript id="q4n8vz"
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


// Your REST Countries API key
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
                result.message || "API request failed."
            );
        }


        // Get countries from API response
        const countries =
            result.data?.objects ||
            result.data ||
            result.objects ||
            [];


        if (!Array.isArray(countries) || countries.length === 0) {
            throw new Error("Country not found.");
        }


        const data = countries[0];


        // COUNTRY NAME
        countryName.textContent =
            data.name?.common ||
            data.names?.common ||
            data.name ||
            "Unknown";


        // FLAG
        countryFlag.textContent =
            data.flag?.emoji ||
            data.flag ||
            "🌍";


        // CAPITAL
        capital.textContent =
            data.capital?.[0] ||
            data.capitals?.[0] ||
            "N/A";


        // REGION
        region.textContent =
            data.region ||
            "N/A";


        // POPULATION
        population.textContent =
            data.population
                ? Number(data.population).toLocaleString()
                : "N/A";


        // CURRENCY
        const currencies =
            data.currencies
                ? Object.values(data.currencies)
                : [];


        if (currencies.length > 0) {

            currency.textContent =
                currencies[0].name ||
                currencies[0].code ||
                "N/A";

        } else {

            currency.textContent = "N/A";

        }


        // LANGUAGE
        const languages =
            data.languages
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
            error.message ||
            "Country not found. Please try again.";


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


// SEARCH BUTTON
searchButton.addEventListener(
    "click",
    searchCountry
);


// ENTER KEY
countryInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            searchCountry();
        }

    }
);
```
