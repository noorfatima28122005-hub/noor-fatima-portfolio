const searchInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");
const message = document.getElementById("message");
const countryCard = document.getElementById("countryCard");

searchButton.addEventListener("click", searchCountry);

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchCountry();
    }
});

async function searchCountry() {
    const countryName = searchInput.value.trim();

    if (!countryName) {
        message.textContent = "Please enter a country name.";
        return;
    }

    message.textContent = "Searching...";

    countryCard.innerHTML = `
        <div class="country-flag">🔎</div>
        <h2>Searching...</h2>
    `;

    try {
        const response = await fetch(
            `https://api.restcountries.com/countries/v5/name?q=${encodeURIComponent(countryName)}`,
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

        const countries = result?.data?.objects;

        if (!countries || countries.length === 0) {
            throw new Error("Country not found");
        }

        const country = countries[0];

        const name = country.names?.common || "N/A";

        const flag = country.flag?.emoji || "🌍";

        const capital =
            country.capitals?.[0]?.name || "N/A";

        const region =
            country.region || "N/A";

        const population =
            country.population
                ? country.population.toLocaleString()
                : "N/A";

        let currency = "N/A";

        if (country.currencies) {
            const currencyList = Object.values(
                country.currencies
            );

            if (currencyList.length > 0) {
                currency =
                    currencyList[0].name || "N/A";
            }
        }

        let language = "N/A";

        if (country.languages) {
            const languageList =
                Object.values(country.languages);

            if (languageList.length > 0) {
                language =
                    languageList[0].name || "N/A";
            }
        }

        message.textContent =
            "Country found successfully!";

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

    } catch (error) {

        console.error(error);

        message.textContent =
            "Country not found.";

        countryCard.innerHTML = `
            <div class="country-flag">
                🌍
            </div>

            <h2>Sorry!</h2>

            <p class="description">
                We could not find that country.
                Please check the spelling and try again.
            </p>
        `;
    }
}
