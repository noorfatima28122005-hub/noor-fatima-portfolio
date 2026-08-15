const countryInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");
const message = document.getElementById("message");

const countryName = document.getElementById("countryName");
const capital = document.getElementById("capital");
const region = document.getElementById("region");
const population = document.getElementById("population");
const currency = document.getElementById("currency");

const countryFlag = document.querySelector(".country-flag");


// Search country
async function searchCountry() {

    const country = countryInput.value.trim();

    // Empty input
    if (country === "") {

        message.textContent = "Please enter a country name.";

        countryName.textContent = "Search a Country";
        capital.textContent = "—";
        region.textContent = "—";
        population.textContent = "—";
        currency.textContent = "—";

        countryFlag.textContent = "🌍";

        return;
    }


    // Loading
    message.textContent = "Loading country information...";

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


        // Country name
        countryName.textContent =
            countryData.name.common || "Unknown";


        // Flag
        countryFlag.textContent =
            countryData.flag || "🌍";


        // Capital
        capital.textContent =
            countryData.capital
                ? countryData.capital[0]
                : "N/A";


        // Region
        region.textContent =
            countryData.region || "N/A";


        // Population
        population.textContent =
            countryData.population
                ? countryData.population.toLocaleString()
                : "N/A";


        // Currency
        if (countryData.currencies) {

            const currencyList =
                Object.values(countryData.currencies);

            if (currencyList.length > 0) {

                const currencyData = currencyList[0];

                currency.textContent =
                    currencyData.name +
                    (
                        currencyData.symbol
                            ? ` (${currencyData.symbol})`
                            : ""
                    );

            } else {

                currency.textContent = "N/A";

            }

        } else {

            currency.textContent = "N/A";

        }


        // Success
        message.textContent =
            "Country information loaded successfully.";

    }


    catch (error) {

        console.error(error);

        message.textContent =
            "Country not found. Please check the spelling and try again.";

        countryName.textContent = "Sorry!";

        capital.textContent = "—";
        region.textContent = "—";
        population.textContent = "—";
        currency.textContent = "—";

        countryFlag.textContent = "🌍";
    }


    // Restore button
    searchButton.disabled = false;
    searchButton.textContent = "Search";
}


// Search button
searchButton.addEventListener(
    "click",
    searchCountry
);


// Enter key
countryInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            searchCountry();
        }

    }
);
