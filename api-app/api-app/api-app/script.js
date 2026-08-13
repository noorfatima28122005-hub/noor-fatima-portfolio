const input =
    document.querySelector("#countryInput") ||
    document.querySelector("#searchInput") ||
    document.querySelector(".search-box input");

const button =
    document.querySelector("#searchBtn") ||
    document.querySelector("#searchButton") ||
    document.querySelector(".search-box button");

const message = document.querySelector("#message");
const countryCard = document.querySelector(".country-card");

async function searchCountry() {
    const countryName = input.value.trim();

    if (!countryName) {
        message.textContent = "Please enter a country name.";
        countryCard.style.display = "none";
        return;
    }

    message.textContent = "Searching...";
    countryCard.style.display = "none";

    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`
        );

        if (!response.ok) {
            throw new Error("Country not found");
        }

        const data = await response.json();
        const country = data[0];

        const flag = country.flags?.emoji || "🌍";
        const name = country.name?.common || "N/A";
        const officialName = country.name?.official || "N/A";
        const capital = country.capital?.[0] || "N/A";
        const region = country.region || "N/A";
        const subregion = country.subregion || "N/A";
        const population = country.population
            ? country.population.toLocaleString()
            : "N/A";
        const currency = country.currencies
            ? Object.values(country.currencies)[0]?.name || "N/A"
            : "N/A";
        const languages = country.languages
            ? Object.values(country.languages).join(", ")
            : "N/A";

        countryCard.innerHTML = `
            <div class="country-flag">${flag}</div>

            <h2>${name}</h2>

            <div class="country-info">
                <p>
                    <strong>Official Name</strong>
                    ${officialName}
                </p>

                <p>
                    <strong>Capital</strong>
                    ${capital}
                </p>

                <p>
                    <strong>Region</strong>
                    ${region}
                </p>

                <p>
                    <strong>Subregion</strong>
                    ${subregion}
                </p>

                <p>
                    <strong>Population</strong>
                    ${population}
                </p>

                <p>
                    <strong>Currency</strong>
                    ${currency}
                </p>

                <p>
                    <strong>Languages</strong>
                    ${languages}
                </p>
            </div>
        `;

        message.textContent = "Country found successfully.";
        countryCard.style.display = "block";

    } catch (error) {
        message.textContent =
            "Country not found. Please check the spelling and try again.";

        countryCard.style.display = "none";
    }
}

button.addEventListener("click", searchCountry);

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchCountry();
    }
});
