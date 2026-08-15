const countryInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");
const message = document.getElementById("message");

const countryCard = document.getElementById("countryCard");
const countryFlag = countryCard.querySelector(".country-flag");

const countryName = countryCard.querySelector("h2");

const infoItems = countryCard.querySelectorAll(".country-info p");

const capital = infoItems[0].querySelector("span");
const region = infoItems[1].querySelector("span");
const population = infoItems[2].querySelector("span");
const currency = infoItems[3].querySelector("span");
const language = infoItems[4].querySelector("span");

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
                result.message || "API request failed"
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
            data.capitals?.[0] || "N/A";


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
                    currencyData.name || "N/A";

            } else {

                currency.textContent = "N/A";
            }

        } else {

            currency.textContent = "N/A";
        }


        // Language
        if (data.languages) {

            const languageList =
                Object.values(data.languages);

            language.textContent =
                languageList.length > 0
                    ? languageList.join(", ")
                    : "N/A";

        } else {

            language.textContent = "N/A";
        }


        message.textContent =
            "Country information loaded successfully.";


    } catch (error) {

        console.error("API Error:", error);

        message.textContent =
            error.message || "Country not found. Please try again.";

        countryName.textContent = "Sorry!";
        countryFlag.textContent = "🌍";

        capital.textContent = "—";
        region.textContent = "—";
        population.textContent = "—";
        currency.textContent = "—";
        language.textContent = "—";

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


// Press Enter
countryInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            searchCountry();
        }

    }
);
