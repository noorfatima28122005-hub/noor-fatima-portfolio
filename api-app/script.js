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
            `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`
        );

        if (!response.ok) {
            throw new Error("Country not found");
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            throw new Error("Country not found");
        }

        const country = data[0];

        const name = country.name?.common || "N/A";

        const flag = country.flag || "🌍";

        const capital = country.capital?.[0] || "N/A";

        const region = country.region || "N/A";

        const population = country.population
            ? country.population.toLocaleString()
            : "N/A";

        const currency = country.currencies
            ? Object.values(country.currencies)[0]?.name || "N/A"
            : "N/A";

        const language = country.languages
            ? Object.values(country.languages)[0] || "N/A"
            : "N/A";

        message.textContent = "Country found successfully!";

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

        message.textContent = "Country not found.";

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
