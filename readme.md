# LinkedIn Voyager API GraphQL Scraper

This script interacts with LinkedIn's Voyager API via GraphQL to search for skills on a user's profile. 
It generates combinations of characters, queries the API with each combination, and writes the results to a file. 

The script includes functions for making API requests, handling delays, generating character combinations, and writing results to a file.

The character combinations length is 3, change this one if you need more skills.

## Features

- **LinkedIn API Search**: Queries LinkedIn's API for skills based on generated keywords.
- **Keyword Generation**: Dynamically generates keyword combinations of specified lengths.
- **Data Export**: Appends the API results (skill titles) to a file called `result.txt`.

## Prerequisites

- Node.js (version 14 or higher)
- Axios for making HTTP requests
- File system (fs) for writing results

## Setup

1. Clone or download this repository.
2. Run `npm install` to install dependencies (e.g., `axios`).
3. Fill in the required variables in the script:
    - `linkedinUserId`: Your LinkedIn user ID.
    - `csrf`: CSRF token, which can be found in your LinkedIn session.
    - `liAtCookie`: The `li_at` cookie value from your LinkedIn session.
    - `jsessionIdCookie`: The `JSESSIONID` cookie value from your LinkedIn session.
    - `queryId`: The QueryID value from a manual skill search

## Usage

1. Open the script file and fill in the LinkedIn session details mentioned above.
2. Run the script using Node.js:
   ```bash
   node <script-name>.js
