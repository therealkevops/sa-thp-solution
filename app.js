const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// view engine setup (Handlebars)
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Item definitions
const items = {
  '1': {
    title: "The Art of Doing Science and Engineering",
    amount: 2300
  },
  '2': {
    title: "The Making of Prince of Persia: Journals 1985-1993",
    amount: 2500
  },
  '3': {
    title: "Working in Public: The Making and Maintenance of Open Source",
    amount: 2800
  }
};

/**
 * Home route
 */
app.get('/', function(req, res) {
  res.render('index');
});

/**
 * Checkout route
 */
app.get('/checkout', function(req, res) {
  const item = req.query.item;
  const itemData = items[item];

  res.render('checkout', {
    title: itemData ? itemData.title : null,
    amount: itemData ? (itemData.amount / 100).toFixed(2) : null,
    error: itemData ? null : "No item selected",
    item: item,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
  });
});

/**
 * Success route
 */
app.get('/success', async function(req, res) {
  const { payment_intent } = req.query;

  try {
    // Retrieve the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
    
    // Format the amount from cents to dollars
    const amount = (paymentIntent.amount / 100).toFixed(2);
    
    res.render('success', { 
      payment_intent: payment_intent,
      amount: amount,
      currency: paymentIntent.currency.toUpperCase(),
      payment_status: paymentIntent.status,
      payment_method: paymentIntent.payment_method_types[0],
      metadata: paymentIntent.metadata
    });
  } catch (err) {
    res.render('success', { 
      error: 'Could not retrieve payment details'
    });
  }
});

/**
 * Create payment intent
 */
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { item } = req.body;
    const itemData = items[item];

    if (!itemData) {
      return res.status(400).json({ error: 'Invalid item' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: itemData.amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        item_id: item,
        title: itemData.title
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Start server
 */
app.listen(3000, () => {
  console.log('Getting served on port 3000');
});
