```javascript
const searchInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");
const message = document.getElementById("message");
const countryCard = document.getElementById("countryCard");


// Search button
searchButton.addEventListener("click", searchCountry);


// Enter key
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchCountry();
    }
});


// Main search function
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


    // Loading message
    message.textContent = "Searching...";

    countryCard.innerHTML = `
        <div class="country-flag">🔎</div>

        <h2>Searching...</h2>
    `;


    try {

        // REST Countries API
        const response = await fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`
        );


        // Check response
        if (!response.ok) {
            throw new Error("Country not found");
        }


        // Convert response to JSON
        const data = await response.json();


        if (!data || data.length === 0) {
            throw new Error("Country not found");
        }


        // First country result
        const country = data[0];


        // Country name
        const name =
            country.name?.common || "N/A";


        // Country flag
        const flag =
            country.flag || "🌍";


        // Capital
        const capital =
            country.capital?.[0] || "N/A";


        // Region
        const region =
            country.region || "N/A";


        // Population
        const population =
            country.population
                ? country.population.toLocaleString()
                : "N/A";


        // Currency
        let currency = "N/A";

        if (country.currencies) {

            const currencyData =
                Object.values(country.currencies)[0];

            if (currencyData) {
                currency = currencyData.name || "N/A";
            }
        }


        // Language
        let language = "N/A";

        if (country.languages) {

            language =
                Object.values(country.languages)[0] || "N/A";
        }


        // Success message
        message.textContent =
            "Country found successfully!";


        // Display country information
        countryCard.innerHTML = `

            <div class="country-flag">
                ${flag}
            </div>


            <h2>
                ${name}
            </h2>


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


    catch (error) {

        // Error message
        message.textContent =
            "Country not found.";


        // Error card
        countryCard.innerHTML = `

            <div class="country-flag">
                🌍
            </div>


            <h2>
                Sorry!
            </h2>


            <p class="description">
                We could not find that country.
                Please check the spelling and try again.
            </p>

        `;
    }

}
```
