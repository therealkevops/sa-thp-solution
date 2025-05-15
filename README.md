# Stripe Press Book Store

A Node.js e-commerce application that allows customers to purchase books using Stripe's payment processing. This application demonstrates the integration of Stripe Elements for secure payment collection and processing.

## Features

- Modern, responsive UI using Bootstrap 4.6
- Secure payment processing with Stripe Elements
- Real-time payment validation and error handling
- Detailed success page with payment confirmation
- Centralized item management
- Amount formatting and currency handling

## Application Overview

This application is built with:
- Node.js and Express for the backend
- Handlebars (hbs) for templating
- Bootstrap 4.6 for styling
- Stripe Elements for payment processing

### Key Components

1. **Item Management**
   - Items are stored in a centralized object in `app.js`
   - Each item has a title and amount (in cents)
   - Easy to add or modify items without changing multiple files

2. **Checkout Flow**
   - Clean, user-friendly checkout form
   - Email collection
   - Stripe Payment Element integration
   - Real-time payment validation
   - Loading states and error handling

3. **Payment Processing**
   - Secure payment intent creation
   - Client-side payment confirmation
   - Server-side payment verification
   - Detailed success page with transaction details

4. **Success Page**
   - Displays payment amount and currency
   - Shows Stripe payment ID
   - Indicates payment status
   - Lists payment method used
   - Shows purchased item details
   - Option to return to home page

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sa-takehome-project-node
cd sa-takehome-project-node
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment:
   - Rename `sample.env` to `.env`
   - Add your Stripe API keys:
     ```
     STRIPE_PUBLISHABLE_KEY=pk_test_your_key
     STRIPE_SECRET_KEY=sk_test_your_key
     ```

4. Start the application:
```bash
npm start
```

5. Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

- `app.js` - Main application file with routes and item definitions
- `views/` - Handlebars templates
  - `layouts/main.hbs` - Main layout template
  - `checkout.hbs` - Checkout page with Stripe Elements
  - `success.hbs` - Payment confirmation page
  - `index.hbs` - Home page with book listings
- `public/` - Static assets
  - `js/checkout.js` - Stripe Elements initialization and payment handling
  - `css/custom.css` - Custom styles

## Testing

Use these test card numbers to simulate different scenarios:
- Success: 4242 4242 4242 4242
- Requires Authentication: 4000 0025 0000 3155
- Declined: 4000 0000 0000 9995

## Security Features

- Stripe Elements for secure card collection
- Server-side payment verification
- Amount validation
- Error handling for failed payments
- No sensitive data stored on server
