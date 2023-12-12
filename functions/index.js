const functions = require("firebase-functions");
const admin = require("firebase-admin");
// eslint-disable-next-line max-len
const stripe = require("stripe")(functions.config().stripe.secret_key);
const cors = require("cors")({
  origin: true,
  methods: ["POST", "OPTIONS"],
  credentials: true,
});

admin.initializeApp();

exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
  // Handle preflight CORS request
  if (req.method === "OPTIONS") {
    cors(req, res, () => {
      res.status(204).send("");
    });
    return;
  }

  // Handle actual request
  cors(req, res, async () => {
    try {
      const amount = req.body.amount;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "brl",
      });

      res.json({clientSecret: paymentIntent.client_secret});
    } catch (error) {
      console.error("Error creating PaymentIntent:", error);
      res.status(500).send({error: "Error creating PaymentIntent"});
    }
  });
});
