# JSON Server

This project uses [JSON Server](https://github.com/typicode/json-server) to quickly set up a REST API with a simple JSON file as the database. It allows you to mock a backend for testing or development purposes.

## Prerequisites

Before running this project, ensure you have [Node.js](https://nodejs.org/) installed on your system.

## Installation

1. Clone this repository to your local machine.
   
   ```bash
   git clone https://github.com/GokulSandeepPM/GokulSandeep-UIAssignment
   ```

2. Navigate into the project folder:

   ```bash
   cd json-server
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

   This will install `json-server` as a development dependency.

## Configuration

The project uses `json-server` to serve a mock REST API. By default, it watches the `transaction.json` file and serves it on port `5000`.

### Scripts

- **Start the server**

   To start the JSON server, run the following command:

   ```bash
   npm run start:server
   ```

   This will start the server on [http://localhost:5000](http://localhost:5000). The server will watch the `transaction.json` file for changes, so you can modify the file, and the server will automatically reload.

### Database File

The database is stored in `transaction.json`. You can modify this file to add, update, or delete data, and the server will reflect those changes in real-time.

## Usage

Once the server is running, you can access the mock API with the following routes:

- **GET** `/transactions` - Retrieve a list of transactions.

