# GokulSandeep-UIAssignment
---
# JSON Server & Customer Rewards Point Management

This repository contains two projects: a mock server for transaction data and a React-based customer rewards point management application. These components work together to provide an environment for calculating and displaying reward points based on transaction data.

## Contents

1. [JSON Server](#json-server)
2. [Customer Rewards Point Management](#customer-rewards-point-management)

---

## JSON Server

This project uses [JSON Server](https://github.com/typicode/json-server) to quickly set up a REST API with a simple JSON file as the database. It serves as a mock backend to simulate transaction data for the customer rewards point management application.

### Prerequisites

Before running this project, ensure you have [Node.js](https://nodejs.org/) installed on your system.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/GokulSandeepPM/GokulSandeep-UIAssignment
   ```

2. Navigate into the `json-server` folder:

   ```bash
   cd json-server
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

   This will install `json-server` as a development dependency.

### Configuration

The project uses `json-server` to serve a mock REST API. By default, it watches the `transaction.json` file and serves it on port `5000`.

#### Scripts

- **Start the server**

   To start the JSON server, run the following command:

   ```bash
   npm run start:server
   ```

   This will start the server on [http://localhost:5000](http://localhost:5000). The server will watch the `transaction.json` file for changes, so you can modify the file, and the server will automatically reload.

#### Database File

The database is stored in `transaction.json`. You can modify this file to add, update, or delete data, and the server will reflect those changes in real-time.

### Routes

Once the server is running, you can access the mock API with the following routes:

- **GET** `/transactions` - Retrieve a list of transactions.

---

## Customer Rewards Point Management

This is a React-based application that calculates and displays reward points for a customer rewards program. The application fetches transaction data from the mock server (provided by the JSON Server), calculates reward points based on configurable rules, and displays the data in a paginated table.

### Features

- Fetches transaction data from the mock server.
- Calculates reward points based on transaction amounts.
- Displays data in a paginated table.
- Search functionality to filter by Customer ID or Month.
- Responsive UI with support for different screen sizes.
- Loading and error handling.

### Project Structure

This project is organized into the following directories:

- **`/src`**: Contains all source code and components.
- **`/src/components`**: UI components.
- **`/src/services`**: Business logic services.
- **`/src/styles`**: Styling files.
- **`/src/utils`**: Unit test scripts.
- **`/src/config`**: Configuration file for reward calculation rules.

### Getting Started

#### Prerequisites

- Node.js and npm installed.

#### Installation

1. Clone the repository:

   ```bash
   cd rewards-point-manager
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm start
   ```

4. The application will be available at `http://localhost:3000`.

5. Run unit tests:

   ```bash
   npm test
   ```

### Configuration

The reward calculation rules can be modified in the `src/config/rewardConfig.js` file.

---

## Conclusion

This repository provides a fully working mock server and React application for managing and displaying customer reward points. The mock backend simulates transactions, and the frontend calculates rewards based on configurable rules.