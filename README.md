# TypeScript + Playwright AQA Framework (E-Commerce)

[![Playwright Tests](https://github.com/Hyundust/ts-test/actions/workflows/tests.yml/badge.svg)](https://github.com/Hyundust/ts-test/actions/workflows/tests.yml)
[![Live Report](https://img.shields.io/badge/Report-GitHub%20Pages-blue)](https://hyundust.github.io/ts-test/)

A full-featured API and UI test automation framework built with **TypeScript** and **Playwright Test Runner**.

🔗 **Live Test Execution Report:** [hyundust.github.io/ts-test](https://hyundust.github.io/ts-test/)

---

## 🛠 Tech Stack
* **Language:** TypeScript
* **Test Runner:** Playwright Test
* **HTTP Client:** Custom typed client built on Native Fetch API
* **Schema Validation:** Zod
* **Data Generation:** @faker-js/faker
* **UI Architecture:** Page Object Model (POM)
* **CI/CD:** GitHub Actions (Linux Runner + Auto Deploy to GitHub Pages)

---

## 📂 Project Structure
```text
├── .github/workflows/    # CI/CD configuration for GitHub Actions
├── src/
│   ├── client/           # Custom typed HTTP client
│   ├── pages/            # Page Objects (Base, Login, Inventory, Cart, Checkout)
│   ├── schemas/          # Zod schemas for API response validation
│   ├── types/            # DTO interfaces and response types
│   └── utils/            # Test data factories (Faker.js)
└── tests/
    ├── api/              # API tests (Auth, CRUD, Data-Driven)
    ├── fixtures/         # Custom Playwright fixtures
    └── ui/               # UI E2E tests and Network Mocking
```

---

## 🚀 Getting Started

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* [npm](https://www.npmjs.com/)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Hyundust/ts-test.git
cd aqa-ecommerce-lab

# Install dependencies
npm install

# Install Playwright browser binaries
npx playwright install --with-deps chromium
```

### 3. Running Tests

```bash
# Run all tests
npm test

# Run only UI tests
npm run test:ui

# Run only API tests
npm run test:api

# Run tests in UI mode (interactive runner)
npx playwright test --ui
```

### 4. Test Reports

```bash
# View Playwright HTML report
npx playwright show-report

# Generate and open Allure report
npm run allure:generate
npm run allure:open
```