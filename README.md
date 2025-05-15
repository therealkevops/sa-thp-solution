# 📚 Stripe Press Book Store

Simple Node.js e-commerce app showcasing Stripe payment integration.

## ✨ Features

- 🎨 Modern UI with Bootstrap 4.6
- 💳 Stripe Elements integration
- 🔒 Secure payment processing
- 📱 Responsive design
- 💰 Real-time payment validation

## 🚀 Quick Start

1. Clone and install:
```bash
git clone https://github.com/yourusername/stripe-press
cd stripe-press
npm install
```

2. Set up environment:
```bash
cp sample.env .env
# Add your Stripe keys to .env:
# STRIPE_PUBLISHABLE_KEY=pk_test_...
# STRIPE_SECRET_KEY=sk_test_...
```

3. Run it:
```bash
npm start
```

Visit `http://localhost:3000` 🎉

## 💫 Payment Flow

1. 🛍️ **Select** - Choose a book
2. 🔐 **Setup** - Create payment intent
3. 💳 **Pay** - Enter card details
4. ✅ **Confirm** - Process payment
5. 🧾 **Verify** - View receipt

## 🧪 Testing

Test cards:
- ✅ Success: `4242 4242 4242 4242`
- 🔒 3D Secure: `4000 0025 0000 3155`
- ❌ Decline: `4000 0000 0000 9995`

## 📁 Structure

```
├── app.js         # Main server file
├── views/         # Handlebars templates
├── public/        # Static assets
└── .env          # Environment config
```

## 🔒 Security

- No card data touches our server
- Server-side amount validation
- Secure Elements integration
- Error handling for all cases

## 🛠️ Tech Stack

- Node.js + Express
- Handlebars (hbs)
- Bootstrap 4.6
- Stripe Elements
