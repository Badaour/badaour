import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, customerInfo } = req.body;

    // Build line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'cad',
        product_data: {
          name: item.name,
          description: `Artisan: ${item.artisan} · ${item.country}`,
          metadata: {
            artisan: item.artisan,
            country: item.country,
            category: item.category,
          },
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.qty,
    }));

    // Add shipping as a line item
    lineItems.push({
      price_data: {
        currency: 'cad',
        product_data: {
          name: '🌍 Livraison Afrique → Canada',
          description: 'DHL Express · 14 à 21 jours ouvrables',
        },
        unit_amount: 1800, // $18.00 CAD
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'https://www.badaour.ca'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://www.badaour.ca'}/`,
      customer_email: customerInfo?.email || undefined,
      metadata: {
        customer_name: customerInfo?.name || '',
        customer_address: customerInfo?.address || '',
        customer_city: customerInfo?.city || '',
        customer_province: customerInfo?.province || '',
        customer_postal: customerInfo?.postal || '',
        customer_phone: customerInfo?.phone || '',
      },
      shipping_address_collection: {
        allowed_countries: ['CA'],
      },
      locale: 'fr',
      custom_text: {
        submit: {
          message: 'Votre commande sera expédiée depuis l\'Afrique. Délai: 14-21 jours.',
        },
      },
    });

    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ error: error.message });
  }
}
