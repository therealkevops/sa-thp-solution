// This is a public sample test API key.
// Don't submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

// Initialize Stripe with the publishable key
const stripe = Stripe(document.querySelector('meta[name="stripe-key"]').getAttribute('content'));

// Get the item ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const item = urlParams.get('item');

let elements;

initialize();

document
  .querySelector("#payment-form")
  .addEventListener("submit", handleSubmit);

// Fetches a payment intent and captures the client secret
async function initialize() {
  try {
    const response = await fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const { clientSecret } = await response.json();

    const appearance = {
      theme: 'stripe',
      variables: {
        colorPrimary: '#0d6efd',
      }
    };

    elements = stripe.elements({ 
      appearance, 
      clientSecret,
    });

    const paymentElement = elements.create("payment", {
      layout: "tabs"
    });

    await paymentElement.mount("#payment-element");
  } catch (error) {
    showMessage("Failed to initialize payment: " + error.message);
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  try {
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/success",
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        showMessage(error.message);
      } else {
        showMessage("An unexpected error occurred.");
      }
    }
  } catch (error) {
    showMessage("Payment failed: " + error.message);
  }

  setLoading(false);
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.classList.add("visible");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.remove("visible");
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}