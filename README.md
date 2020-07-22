## Docker-Puppeteer-CLI-Bridge
Solution that enables you to quickly turn HTML-based content (including CSS, JS and asynchronous rendering) into PDF documents.

## Components and Features

- Converter - Docker container holding Node solution to generate PDF files (MVP based on Puppeteer Node library) 
- Client - Node client which communicates with Converter (acts as a bridge)
- Express HTTP server - enables communication between the external application and the PDF generator over the Node Client

PDFs can be generated using following approaches:

 - using Node Client as a CLI tool
 - invoking Express server API endpoint

## Prerequisites

 - Docker
 - Docker Compose
 - Node (nodejs)
 - Node Package Manager (npm)

## Setup

 1. Clone the repository

        git clone https://github.com/lukabartolicFS/Docker-Puppeteer-CLI-Bridge.git
2. Navigate to the cloned project directory

       cd Docker-Puppeteer-CLI-Bridge
3. Install project dependencies

       npm install
4. Build Docker container

       docker-compose build

## Usage

### HTTP API

**Run the Express HTTP server using the default port:**

    npm run start:http
...or run it by defining a custom port:

    PORT=1111 npm run start:http
**Make a request:**

    **POST /convert**

|Parameter|Sample value|Note
|--|--|--|
|url|https://www.google.com/|Required if `html` is not provided
|html|`<html>I am a HTML</html>`|Required if `url` is not provided

Either the `url` or `html` needs to be provided as the parameter

**Parse the response:**
Response is a Base64 encoded data of generated binary file. Decode it and store it as a file or use its decoded buffered data as you wish.
I.e. in PHP: `$pdfBinary = base64_decode($response->getBody()->getContents());`

## CLI
    npm run command:generate <url|html> <value>
- if using `url` the `value` must be a valid URL
- if using `html` the `value` must be a HTML

Example:

    npm run command:generate url https://www.google.com/ > file.pdf
    
- outputs generated PDF file into a file named `file.pdf`.
