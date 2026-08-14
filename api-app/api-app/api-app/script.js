const searchInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchBtn");
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
        countryCard.innerHTML = `
            <div class="country-flag">🌍</div>
            <h2>Search a country</h2>
        `;
        return;
    }

    message.textContent = "Searching...";

    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`
        );

        if (!response.ok) {
            throw new Error("Country not found");
        }

        const data = await response.json();
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
            <div class="country-flag">${flag}</div>

            <h2>${name}</h2>

            <div class="country-info">

                <p>
                    <strong>Capital:</strong>
                    <span>${capital}</span>
                </p>

                <p>
                    <strong>Region:</strong>
                    <span>${region}</span>
                </p>

                <p>
                    <strong>Population:</strong>
                    <span>${population}</span>
                </p>

                <p>
                    <strong>Currency:</strong>
                    <span>${currency}</span>
                </p>

                <p>
                    <strong>Language:</strong>
                    <span>${language}</span>
                </p>

            </div>
        `;

    } catch (error) {
        message.textContent = "Country not found.";

        countryCard.innerHTML = `
            <div class="country-flag">🌍</div>

            <h2>Sorry!</h2>

            <p class="description">
                We could not find that country.
                Please check the spelling and try again.
            </p>
        `;
    }
}
