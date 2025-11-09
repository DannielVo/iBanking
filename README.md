# iBanking Application – Tuition Payment Subsystem

**iBanking Tuition Payment** is a modern frontend application built with **React.js**, simulating an online tuition payment process within a digital banking system. It allows users to log in, check tuition fees, verify transactions using OTP, and securely complete tuition payments through their banking accounts.

## Key Features

- **User Authentication** – Login using pre-issued credentials (no registration function included).
- **Auto-Filled Payer Information** – Payer details are automatically displayed after login and locked from editing to ensure accuracy.
- **Tuition Fee Lookup** – Enter a student ID to automatically fetch the student’s name and tuition amount to be paid.
- **Payment Validation** – Displays available balance; users can only make full payments if their balance is sufficient.
- **OTP Verification** – One-time password is generated and sent via email for transaction authentication
- **Transaction Confirmation** – After successful payment, the system deducts balance, clears tuition debt, sends a confirmation email, and records the transaction history
- **Concurrency Handling** – Ensures safe concurrent processing, preventing race conditions on the same account or tuition record.
- **Responsive UI** – Clean and intuitive design optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend:** React.js
- **State Management:** Context API
- **Routing:** React Router

## Project Structure

```bash
frontend/
├── public/             # Static files and root HTML
├── src/
│   ├── assets/         # Images and static assets
│   ├── components/     # Reusable components
│   ├── pages/          # Main pages (Login, Profile, Payment History)
│   ├── context/        # Global state using Context API
│   ├── App.js          # Root component
│   └── index.js        # Entry point of the app
├── package.json        # Project information and dependencies
└── README.md           # Project documentation
```

## Getting Started

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **Run the application:**

   ```bash
   npm run dev
   ```
