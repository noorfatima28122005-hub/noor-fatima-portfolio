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
        return;
    }

    searchButton.disabled = true;
    searchButton.textContent = "Searching...";
    message.textContent = "Loading country information...";

    try {

        const url =
            `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(country)}&api-key=rc_live_demo`;

        const response = await fetch(url);

        const result = await response.json();

        console.log(result);

        if (!response.ok || !result.data || !result.data.objects) {
            throw new Error("Country not found");
        }

        const data = result.data.objects[0];

        if (!data) {
            throw new Error("Country not found");
        }


        countryName.textContent =
            data.names?.common || "N/A";


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

            const currencies =
                Object.values(data.currencies);

            currency.textContent =
                currencies[0]?.name || "N/A";

        } else {

            currency.textContent = "N/A";

        }


        message.textContent =
            "Country information loaded successfully.";

    }

    catch (error) {

        console.error("API Error:", error);

        message.textContent =
            "Country not found. Please try again.";

        countryName.textContent = "Sorry!";
        capital.textContent = "—";
        region.textContent = "—";
        population.textContent = "—";
        currency.textContent = "—";
        countryFlag.textContent = "🌍";

    }

    finally {

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
    function(event) {

        if (event.key === "Enter") {
            searchCountry();
        }

    }
);
```
