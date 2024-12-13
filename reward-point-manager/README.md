# Customer Rewards Point Management

This is a React-based application that calculates and displays reward points for a customer rewards program. The application fetches transaction data from a mock server, calculates reward points based on configurable rules, and allows users to search and view the data in a paginated table.

## Features

- Fetches transaction data from a mock server.
- Calculates reward points based on transaction amounts.
- Displays data in a paginated table.
- Search functionality to filter by Customer ID or Month.
- Responsive UI with support for different screen sizes.
- Loading and error handling.

## Project Structure

This project is organized into the following directories:

- **`/src`**: Contains all source code and components.
- **`/src/components`**: UI components.
- **`/src/services`**: Business logic services.
- **`/src/styles`**: Styling files 
- **`/src/utils`**: Unit Test Scripts
- **`/src/config`**: Configuration file for reward calculation rules.

## Getting Started

### Prerequisites

- Node.js and npm installed.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GokulSandeepPM/GokulSandeep-UIAssignment
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

5. Run unit test:

   ```bash
   npm test
   ```

## Configuration

The reward calculation rules can be modified in the `src/config/rewardConfig.js` file.