import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false, // Required for Stripe webhooks
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log('✅ Paiement reçu:', {
        id: session.id,
        amount: session.amount_total / 100,
        currency: session.currency,
        customer: session.customer_email,
        name: session.metadata?.customer_name,
      });
      // TODO: Send confirmation email, update database, notify artisan
      break;
    }
    case 'payment_intent.payment_failed': {
      console.log('❌ Paiement échoué:', event.data.object.id);
      break;
    }
    default:
      console.log(`Unhandled event: ${event.type}`);
  }

  res.status(200).json({ received: true });
}
