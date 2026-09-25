/* =================================
   Configuration
================================= */

// const API_URL = "http://127.0.0.1:5000";
const API_URL = "";


/* =================================
   DOM Elements
================================= */

// Country Explorer
const countrySelect = document.getElementById("country-select");
const countryResult = document.getElementById("country-result");
const selectedCountry = document.getElementById("selected-country");
const countryCases = document.getElementById("country-cases");
const countryDeaths = document.getElementById("country-deaths");
const countryRecovered = document.getElementById("country-recovered");


// Country Table
const countrySearch = document.getElementById("country-search");
const countryTableBody = document.getElementById("country-table-body");


// Global Overview
const worldCases = document.getElementById("world-cases");
const worldDeaths = document.getElementById("world-deaths");
const worldRecovered = document.getElementById("world-recovered");
const countryCount = document.getElementById("country-count");


// Theme
const themeToggle = document.getElementById("theme-toggle");
const THEME_STORAGE_KEY = "covid-dashboard-theme";


/* =================================
   Application State
================================= */

let countriesData = [];
let countryNames = [];


/* =================================
   Helper Functions
================================= */

function formatNumber(value) {

    if (
        value === null ||
        value === undefined ||
        value === "" ||
        value === "-"
    ) {
        return "--";
    }

    return value;
}


function showLoading(message = "Loading country statistics...") {

    countryTableBody.innerHTML = `
        <tr>
            <td colspan="4">${message}</td>
        </tr>
    `;
}


function showError(message) {

    countryTableBody.innerHTML = `
        <tr>
            <td colspan="4">${message}</td>
        </tr>
    `;
}


/* =================================
   Fetch Countries
================================= */

async function fetchCountries() {

    try {

        showLoading();

        const response = await fetch(
            `${API_URL}/api/countries/data`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch country data.");
        }

        const data = await response.json();

        countriesData = data;

        countryNames = data.map(country => country.country);

        populateCountryDropdown(countryNames);

        populateCountryTable(countriesData);

        countryCount.textContent = data.length;

    } catch (error) {

        console.error("Country fetch error:", error);

        showError(
            "Unable to load country data."
        );
    }
}

async function fetchWorldwideData() {

    try {

        const response = await fetch(
            `${API_URL}/api/worldwide`
        );

        if (!response.ok) {
            throw new Error(
                "Unable to fetch worldwide data."
            );
        }

        const data = await response.json();

        updateWorldwideDashboard(data);

    } catch (error) {

        console.error(
            "Worldwide data error:",
            error
        );

        worldCases.textContent = "--";
        worldDeaths.textContent = "--";
        worldRecovered.textContent = "--";
    }
}

function updateWorldwideDashboard(data) {

    worldCases.textContent =
        formatNumber(data.total_cases);

    worldDeaths.textContent =
        formatNumber(data.total_deaths);

    worldRecovered.textContent =
        formatNumber(data.total_recovered);

    countryCount.textContent =
        countriesData.length;
}


/* =================================
   Populate Country Dropdown
================================= */

function populateCountryDropdown(countries) {

    countrySelect.innerHTML = `
        <option value="">
            Select a country
        </option>
    `;

    countries.forEach(country => {

        const option = document.createElement("option");

        option.value = country;
        option.textContent = country;

        countrySelect.appendChild(option);
    });
}


/* =================================
   Fetch Selected Country
================================= */

async function fetchCountryData(country) {

    if (!country) {
        return;
    }

    try {
        const response = await fetch(
            `${API_URL}/api/country?country=${encodeURIComponent(country)}`
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.error || "Unable to fetch country data."
            );
        }


        updateCountryDashboard(data);


    } catch (error) {

        console.error("Country data error:", error);

        selectedCountry.textContent = "Error";

        countryCases.textContent = "--";
        countryDeaths.textContent = "--";
        countryRecovered.textContent = "--";


    }
}


/* =================================
   Update Country Dashboard
================================= */

function updateCountryDashboard(data) {

    selectedCountry.textContent =
        data.country || "--";

    countryCases.textContent =
        formatNumber(data.total_cases);

    countryDeaths.textContent =
        formatNumber(data.total_deaths);

    countryRecovered.textContent =
        formatNumber(data.total_recovered);
}


/* =================================
   Country Table
================================= */

function populateCountryTable(countries) {

    if (!countries || countries.length === 0) {

        showError("No country data available.");

        return;
    }

    countryTableBody.innerHTML = "";

    const visibleCountries = countries.slice(0, 5);

    visibleCountries.forEach(country => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${country.country}</td>
            <td>${formatNumber(country.total_cases)}</td>
            <td>${formatNumber(country.total_deaths)}</td>
            <td>${formatNumber(country.total_recovered)}</td>
        `;

        countryTableBody.appendChild(row);
    });


    // Show "..." when more countries are available
    if (countries.length > 5) {

        const row = document.createElement("tr");

        row.classList.add("more-countries");

        row.innerHTML = `
            <td colspan="4">...</td>
        `;

        countryTableBody.appendChild(row);
    }
}


/* =================================
   Search Country Table
================================= */

countrySearch.addEventListener(
    "input",
    function () {

        const searchTerm =
            countrySearch.value
                .trim()
                .toLowerCase();

        const filteredCountries =
            countriesData.filter(country =>
                country.country
                    .toLowerCase()
                    .includes(searchTerm)
            );

        populateCountryTable(filteredCountries);
    }
);


/* =================================
   Dropdown Change
================================= */

countrySelect.addEventListener(
    "change",
    function () {

        const country =
            countrySelect.value;


        if (country) {
            fetchCountryData(country);
        }
    }
);


/* =================================
   Theme Toggle
================================= */

function syncThemeToggle(theme) {

    const isDark = theme === "dark";

    themeToggle.setAttribute("aria-checked", String(isDark));

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}


function setTheme(theme) {

    document.documentElement.setAttribute("data-theme", theme);

    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
        console.error("Unable to save theme preference:", error);
    }

    syncThemeToggle(theme);
}


themeToggle.addEventListener("click", function () {

    const currentTheme =
        document.documentElement.getAttribute("data-theme") === "dark"
            ? "dark"
            : "light";

    setTheme(currentTheme === "dark" ? "light" : "dark");
});


syncThemeToggle(
    document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light"
);


/* =================================
   Initialize Dashboard
================================= */

fetchCountries();
fetchWorldwideData();