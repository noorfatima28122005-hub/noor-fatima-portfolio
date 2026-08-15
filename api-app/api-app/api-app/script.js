const searchInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");
const message = document.getElementById("message");
const countryCard = document.getElementById("countryCard");


// Search button click
searchButton.addEventListener("click", searchCountry);


// Enter key
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchCountry();
    }
});


// Search country function
async function searchCountry() {

    const countryName = searchInput.value.trim();


    // Empty input
    if (!countryName) {

        message.textContent = "Please enter a country name.";

        countryCard.innerHTML = `
            <div class="country-flag">🌍</div>

            <h2>Search a country</h2>

            <div class="country-info">

                <p>
                    <strong>CAPITAL</strong>
                    <span>—</span>
                </p>

                <p>
                    <strong>REGION</strong>
                    <span>—</span>
                </p>

                <p>
                    <strong>POPULATION</strong>
                    <span>—</span>
                </p>

                <p>
                    <strong>CURRENCY</strong>
                    <span>—</span>
                </p>

                <p>
                    <strong>LANGUAGE</strong>
                    <span>—</span>
                </p>

            </div>
        `;

        return;
    }


    // Searching message
    message.textContent = "Searching...";

    countryCard.innerHTML = `
        <div class="country-flag">🔎</div>
        <h2>Searching...</h2>
    `;


    try {

        // API
        const response = await fetch(
            `https://countries.dev/name/${encodeURIComponent(countryName)}`
        );


        // Check API response
        if (!response.ok) {
            throw new Error("Country not found");
        }


        // Convert API response to JSON
        const data = await response.json();


        // Check data
        if (!data || !Array.isArray(data) || data.length === 0) {
            throw new Error("Country not found");
        }


        // Get first country
        const country = data[0];


        // Get country name
        const name =
            country.name || "N/A";


        // Get flag
        const flag =
            country.flag || "🌍";


        // Get capital
        const capital =
            country.capital || "N/A";


        // Get region
        const region =
            country.region || "N/A";


        // Get population
        const population =
            country.population
                ? Number(country.population).toLocaleString()
                : "N/A";


        // Get currency
        let currency = "N/A";

        if (country.currencies) {

            if (Array.isArray(country.currencies)) {

                currency =
                    country.currencies[0]?.name || "N/A";

            } else {

                const currencies =
                    Object.values(country.currencies);

                currency =
                    currencies[0]?.name || "N/A";
            }
        }


        // Get language
        let language = "N/A";

        if (country.languages) {

            if (Array.isArray(country.languages)) {

                language =
                    country.languages[0]?.name || "N/A";

            } else {

                const languages =
                    Object.values(country.languages);

                language =
                    languages[0] || "N/A";
            }
        }


        // Success message
        message.textContent =
            "Country found successfully!";


        // Show country information
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

    }


    // Error
    catch (error) {

        console.error("API Error:", error);

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
