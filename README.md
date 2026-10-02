# COVID-19 Global Dashboard

An interactive web dashboard for exploring historical COVID-19 statistics by country.

The project started as a Python-based desktop notification application and was extended into a web-based dashboard using **Python, Flask, BeautifulSoup, HTML, CSS, and JavaScript**.

## Try it here ...

https://covid-19-dashboard-yhgl.onrender.com/

Deployed on Render for demonstration purposes.

## Features

* 🌍 Worldwide COVID-19 statistics overview
* 🔎 Country selection and automatic statistics loading
* 📊 Country-level statistics table
* 🔍 Search countries within the worldwide table
* 📱 Responsive dashboard for desktop and mobile
* 🔄 REST API powered by Flask
* 🌐 Data retrieved from Worldometer

## Dashboard

The dashboard provides:

* Total COVID-19 cases
* Total deaths
* Total recovered
* Country count
* Country-specific statistics
* Worldwide country comparison

The country explorer automatically updates when a country is selected from the dropdown.

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Python
* Flask
* Flask-CORS
* BeautifulSoup
* Requests
* Gunicorn

### Data Source

COVID-19 statistics are retrieved from **Worldometer**.

> **Data note:** Worldometer's COVID-19 tracker stopped updating on April 13, 2024. Therefore, this project should be considered a dashboard for historical COVID-19 data rather than a source of live COVID-19 statistics.

## Project Structure

```text
COVID19-dashboard/
│
├── backend/
│   ├── app.py
│   └── scraper.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
├── README.md
└── requirements.txt
```

## Setup and Run

### Prerequisites

Make sure Python is installed on your system.

### 1. Clone the repository

```bash
git clone <repository-url>
cd COVID19-dashboard
```

Replace `<repository-url>` with the URL of this GitHub repository.

### 2. Create a virtual environment

From the project root:

```bash
python -m venv .venv
```

### 3. Activate the virtual environment

#### Windows PowerShell

```powershell
.\.venv\Scripts\Activate.ps1
```

#### Windows Command Prompt

```cmd
.venv\Scripts\activate.bat
```

#### Linux / macOS

```bash
source .venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Run the application

From the project root:

```bash
python backend/app.py
```

The Flask development server will start locally.

Open the dashboard in your browser:

```text
http://127.0.0.1:5000
```

or:

```text
http://localhost:5000
```

### 6. Stop the application

To stop the development server, press:

```text
Ctrl + C
```

## Render Deployment

The application is deployed on **Render** for demonstration purposes.

The project uses Gunicorn as the production WSGI server.

### Build Command

```bash
pip install -r requirements.txt
```

### Start Command

```bash
gunicorn --chdir backend app:app --bind 0.0.0.0:$PORT
```

The repository root is used as the Render service root so that both the `backend` and `frontend` directories are available to the Flask application.

## API Endpoints

The Flask backend provides the following endpoints:

| Endpoint                     | Description                       |
| ---------------------------- | --------------------------------- |
| `/`                          | Dashboard homepage                |
| `/api/worldwide`             | Worldwide COVID-19 summary        |
| `/api/countries`             | List of available countries       |
| `/api/countries/data`        | Statistics for all countries      |
| `/api/country?country=India` | Statistics for a selected country |

### Example

```text
/api/country?country=India
```

Returns country-level information including:

```json
{
    "country": "India",
    "total_cases": "...",
    "new_cases": "...",
    "total_deaths": "...",
    "new_deaths": "...",
    "total_recovered": "...",
    "new_recovered": "...",
    "active_cases": "...",
    "serious_critical": "..."
}
```

## Architecture

```text
                    Worldometer
                         │
                         ▼
                  Python Scraper
                         │
                         ▼
                      Flask
                         │
                    REST API
                         │
                         ▼
               HTML / CSS / JavaScript
                         │
                         ▼
                Interactive Dashboard
```

## Future Improvements

Potential future improvements include:

* Historical COVID-19 trend charts
* Sortable statistics table
* Additional Worldometer statistics
* Country comparison
* Automatic background monitoring
* Improved caching to reduce requests to the data source
* Production monitoring and logging

## Background

This project originally began as a simple Python COVID-19 notifier that retrieved country statistics and displayed desktop notifications.

It was later expanded into an interactive web application to demonstrate:

* Web scraping
* REST API development
* Flask backend development
* Frontend/backend integration
* JavaScript-based dynamic UI updates
* Full-stack project deployment

---

## Author

**Shiv Modi** — B.Tech. + M.Tech., IIT Bombay  
[GitHub](https://github.com/shivmodi21) · [Portfolio](https://shivmodi21.github.io/) · [LinkedIn](https://www.linkedin.com/in/shivmodi210/)