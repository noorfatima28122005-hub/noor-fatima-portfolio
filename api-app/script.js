const countryInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");
const message = document.getElementById("message");
const countryCard = document.getElementById("countryCard");

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

        const response = await fetch(
            "https://restcountries.com/v3.1/name/" +
            encodeURIComponent(country)
        );

        if (!response.ok) {
            throw new Error("Country not found");
        }

        const data = await response.json();

        const result = data[0];

        const name = result.name.common || "N/A";
        const capital = result.capital
            ? result.capital[0]
            : "N/A";

        const region = result.region || "N/A";

        const population = result.population
            ? result.population.toLocaleString()
            : "N/A";

        let currency = "N/A";

        if (result.currencies) {
            const currencyKey =
                Object.keys(result.currencies)[0];

            currency =
                result.currencies[currencyKey].name;
        }

        let language = "N/A";

        if (result.languages) {
            language =
                Object.values(result.languages)[0];
        }

        const flag =
            result.flag || "🌍";


        countryCard.innerHTML = `
            <div class="country-flag">
                ${flag}
            </div>

            <h2>${name}</h2>

            <div class="country-info">

                <p>
                    <strong>CAPITAL</strong>
                    <span>${capital}</span>
                </p>

                <p>
                    <strong>REGION</strong>
                    <span>${region}</span>
                </p>

                <p>
                    <strong>POPULATION</strong>
                    <span>${population}</span>
                </p>

                <p>
                    <strong>CURRENCY</strong>
                    <span>${currency}</span>
                </p>

                <p>
                    <strong>LANGUAGE</strong>
                    <span>${language}</span>
                </p>

            </div>
        `;

        message.textContent =
            "Country information loaded successfully.";

    } catch (error) {

        console.error(error);

        message.textContent =
            "Country not found. Please check the spelling and try again.";

        countryCard.innerHTML = `
            <div class="country-flag">🌍</div>

            <h2>Sorry!</h2>

            <p>
                We could not find that country.
                Please try again.
            </p>
        `;

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
    function(event) {

        if (event.key === "Enter") {
            searchCountry();
        }

    }
);
