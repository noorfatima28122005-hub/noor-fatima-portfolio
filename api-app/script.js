const searchInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");
const message = document.getElementById("message");
const countryCard = document.getElementById("countryCard");


// Fetch with timeout
async function fetchWithTimeout(url, timeout = 10000) {

    const controller = new AbortController();

    const timer = setTimeout(() => {
        controller.abort();
    }, timeout);

    try {

        const response = await fetch(url, {
            signal: controller.signal
        });

        return response;

    } finally {

        clearTimeout(timer);

    }
}


// Search country
async function searchCountry() {

    const countryName = searchInput.value.trim();

    if (!countryName) {

        message.textContent = "Please enter a country name.";

        countryCard.innerHTML = `
            <div class="country-flag">🌍</div>
            <h2>Search a country</h2>
            <p>Enter a country name to get information.</p>
        `;

        return;
    }


    // Loading
    message.textContent = "Searching...";

    searchButton.disabled = true;
    searchButton.textContent = "Searching...";


    countryCard.innerHTML = `
        <div class="country-flag">🔎</div>
        <h2>Searching...</h2>
        <p>Please wait...</p>
    `;


    try {

        // REST Countries API
        const url =
            `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fields=name,capital,region,population,currencies,languages,flags`;

        const response = await fetchWithTimeout(url, 10000);


        if (!response.ok) {
            throw new Error("Country not found");
        }


        const data = await response.json();


        if (!data || data.length === 0) {
            throw new Error("Country not found");
        }


        const country = data[0];


        const name =
            country.name?.common || "N/A";


        const capital =
            country.capital?.[0] || "N/A";


        const region =
            country.region || "N/A";


        const population =
            country.population
                ? country.population.toLocaleString()
                : "N/A";


        const currency =
            country.currencies
                ? Object.values(country.currencies)[0]?.name || "N/A"
                : "N/A";


        const language =
            country.languages
                ? Object.values(country.languages)[0] || "N/A"
                : "N/A";


        const flag =
            country.flags?.svg
                ? `<img src="${country.flags.svg}" alt="${name} flag" class="flag-image">`
                : "🌍";


        // Display result
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

        console.error("API Error:", error);


        if (error.name === "AbortError") {

            message.textContent =
                "The API is taking too long to respond. Please try again.";

        } else {

            message.textContent =
                "Country not found. Please check the spelling and try again.";

        }


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
searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchCountry();

        }

    }
);
