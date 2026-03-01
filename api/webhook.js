import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = { api: { bodyParser: false } };

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  return Buffer.concat(chunks);
}

async function sendEmail(from, to, subject, html, bcc = []) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: Array.isArray(to) ? to : [to], bcc, subject, html }),
  });
  return r.json();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const meta = session.metadata || {};
    const customerEmail = session.customer_email;
    const customerName = meta.customer_name || 'Client';
    const orderId = 'BAD-' + Date.now().toString(36).toUpperCase();
    const total = (session.amount_total / 100).toFixed(2);

    // 1. Email confirmation client
    await sendEmail(
      'BADAOUR <service@badaour.com>',
      customerEmail,
      `✅ Commande confirmée — ${orderId} | BADAOUR`,
      confirmationHTML({ id: orderId, client: customerName, email: customerEmail, total: parseFloat(total), date: new Date().toLocaleDateString('fr-CA'), address: meta.address || '', payMethod: 'Carte bancaire', items: [], shipping: 18 }),
    );

    // 2. Notification admin
    await sendEmail(
      'BADAOUR Boutique <service@badaour.com>',
      'service@badaour.com',
      `🛍️ NOUVELLE COMMANDE ${orderId} — ${total}$ CAD`,
      adminNotifHTML({ id: orderId, client: customerName, email: customerEmail, total: parseFloat(total), address: meta.address || '', date: new Date().toLocaleString('fr-CA') }),
    );
  }

  res.status(200).json({ received: true });
}

// ─── TEMPLATE CONFIRMATION CLIENT ──────────────────────────────────────────
function confirmationHTML(order) {
  const G='#C9A84C',DARK='#1A1714',BG='#FDF8F0',BORDER='#E8D5B7',MUTED='#8B6A3E',GREEN='#2E7D4F',RED='#8B1A00';
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5ECD9;font-family:Georgia,serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5ECD9;padding:30px 0"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
  <!-- HEADER -->
  <tr><td style="background:${DARK};padding:28px 36px;border-bottom:3px solid ${G};text-align:center">
    <div style="font-size:32px;font-weight:bold;color:${G};letter-spacing:8px">BADAOUR</div>
    <div style="font-size:10px;color:#A0845C;letter-spacing:4px;margin-top:4px">L'AFRIQUE À VOTRE PORTE</div>
  </td></tr>
  <!-- BANNER VERT -->
  <tr><td style="background:${GREEN};padding:20px 36px;text-align:center">
    <div style="font-size:24px;color:#fff;font-weight:bold">✅ Commande confirmée !</div>
    <div style="font-size:13px;color:rgba(255,255,255,.85);margin-top:6px">Merci pour votre confiance. Nos artisans africains préparent vos articles.</div>
  </td></tr>
  <!-- ORDER ID -->
  <tr><td style="background:${BG};padding:24px 36px;text-align:center;border-bottom:1px solid ${BORDER}">
    <div style="font-size:11px;color:${MUTED};letter-spacing:3px;text-transform:uppercase;margin-bottom:8px">Numéro de commande</div>
    <div style="display:inline-block;background:${DARK};color:${G};padding:10px 28px;font-size:20px;font-weight:bold;letter-spacing:3px;border-radius:4px">${order.id}</div>
    <div style="margin-top:10px;font-size:12px;color:${MUTED}">Commande du ${order.date} · Paiement sécurisé Stripe</div>
  </td></tr>
  <!-- BODY -->
  <tr><td style="background:${BG};padding:24px 36px">
    <p style="margin:0;font-size:15px;color:${DARK};line-height:1.9">
      Bonjour <strong>${order.client}</strong>,<br><br>
      Votre commande a été reçue et confirmée avec succès. Nous allons maintenant coordonner avec nos artisans partenaires en Afrique pour préparer votre commande avec le plus grand soin.<br><br>
      Vous recevrez une notification par email à chaque étape : préparation, expédition, transit et livraison.
    </p>
  </td></tr>
  <!-- TOTAL -->
  <tr><td style="background:#FFF8EE;padding:16px 36px;border-top:1px solid ${BORDER};border-bottom:1px solid ${BORDER}">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="font-size:13px;color:${MUTED}">Livraison internationale (DHL Express)</td>
        <td style="text-align:right;font-size:13px;color:${DARK}">18.00 $CA</td>
      </tr>
      <tr><td colspan="2" style="border-top:2px solid ${DARK};padding-top:10px"></td></tr>
      <tr>
        <td style="font-size:16px;font-weight:bold;color:${DARK}">Total payé</td>
        <td style="text-align:right;font-size:20px;font-weight:bold;color:${RED}">${order.total.toFixed(2)} $CA</td>
      </tr>
    </table>
  </td></tr>
  <!-- LIVRAISON -->
  ${order.address ? `<tr><td style="background:${BG};padding:20px 36px;border-bottom:1px solid ${BORDER}">
    <div style="font-size:11px;font-weight:bold;color:${DARK};letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;border-left:4px solid ${G};padding-left:12px">📍 Adresse de livraison</div>
    <div style="font-size:13px;color:${DARK};line-height:1.8"><strong>${order.client}</strong><br>${order.address}</div>
    <div style="margin-top:12px;border-left:4px solid ${G};padding:10px 14px;font-size:12px;color:${MUTED};background:#FFF8EE">
      ✈️ <strong>Délai estimé :</strong> 14 à 21 jours ouvrables · DHL Express Afrique → Canada
    </div>
  </td></tr>` : ''}
  <!-- ÉTAPES -->
  <tr><td style="background:${BG};padding:24px 36px">
    <div style="font-size:11px;font-weight:bold;color:${DARK};letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;border-left:4px solid ${G};padding-left:12px">🗺️ Suivi de votre commande</div>
    ${[['✅','Commande confirmée','Reçue et validée — Aujourd\'hui',true],['🧵','En préparation','L\'artisan prépare vos articles',false],['📦','Expédiée','Colis expédié depuis l\'Afrique',false],['✈️','En transit','Vol Afrique → Canada',false],['🚚','En livraison','Derniers kilomètres',false],['🎉','Livré !','Votre colis est arrivé',false]]
      .map(([icon,label,desc,done])=>`
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px"><tr>
      <td width="40" style="vertical-align:top">
        <div style="width:32px;height:32px;border-radius:50%;background:${done?GREEN:BORDER};text-align:center;line-height:32px;font-size:13px;color:${done?'#fff':MUTED}">${done?'✓':icon}</div>
      </td>
      <td style="padding:4px 0 4px 10px;vertical-align:middle">
        <div style="font-size:13px;font-weight:${done?'bold':'normal'};color:${done?DARK:'#bbb'}">${label}</div>
        <div style="font-size:11px;color:${done?MUTED:'#ccc'};margin-top:1px">${desc}</div>
      </td>
    </tr></table>`).join('')}
  </td></tr>
  <!-- CTA -->
  <tr><td style="background:${BG};padding:10px 36px 28px;text-align:center">
    <a href="https://www.badaour.ca" style="display:inline-block;background:${DARK};color:${G};text-decoration:none;padding:14px 36px;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;border-radius:4px">SUIVRE MA COMMANDE →</a>
  </td></tr>
  <!-- CONTACT -->
  <tr><td style="background:#FFF8EE;padding:18px 36px;border-top:1px solid ${BORDER};text-align:center">
    <p style="margin:0;font-size:12px;color:${MUTED};line-height:1.9">
      Questions ? Nous sommes là pour vous.<br>
      📞 <strong>438-988-6682</strong> · 📱 WhatsApp disponible · ✉️ <strong>service@badaour.com</strong>
    </p>
  </td></tr>
  <!-- FOOTER -->
  <tr><td style="background:${DARK};padding:24px 36px;text-align:center">
    <div style="font-size:18px;color:${G};letter-spacing:5px;font-weight:bold;margin-bottom:6px">BADAOUR</div>
    <div style="font-size:10px;color:#A0845C;letter-spacing:2px;margin-bottom:14px">L'AFRIQUE À VOTRE PORTE · MONTRÉAL, QUÉBEC</div>
    <div style="font-size:11px;color:#555;line-height:1.8">© ${new Date().getFullYear()} BADAOUR · Commerce éthique · Artisanat 100% authentique<br>Fait avec ❤️ pour la diaspora africaine</div>
  </td></tr>
</table></td></tr></table></body></html>`;
}

// ─── TEMPLATE NOTIF ADMIN ──────────────────────────────────────────────────
function adminNotifHTML(order) {
  const G='#C9A84C',DARK='#1A1714',BG='#FDF8F0',GREEN='#2E7D4F',RED='#8B1A00';
  return `<!DOCTYPE html><html lang="fr"><body style="margin:0;padding:20px;background:#f0f0f0;font-family:Arial,sans-serif">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;max-width:600px;margin:0 auto">
  <tr><td style="background:${DARK};padding:20px 28px;border-bottom:3px solid ${G}">
    <div style="font-size:11px;color:#A0845C;letter-spacing:3px">BADAOUR · ADMIN</div>
    <div style="font-size:22px;color:${G};font-weight:bold;margin-top:4px">🛍️ Nouvelle commande reçue !</div>
  </td></tr>
  <tr><td style="padding:24px 28px">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><span style="color:#888;font-size:12px">Commande</span><br><strong style="font-size:18px;color:${DARK}">${order.id}</strong></td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><span style="color:#888;font-size:12px">Client</span><br><strong>${order.client}</strong> · ${order.email}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><span style="color:#888;font-size:12px">Montant</span><br><strong style="font-size:20px;color:${RED}">${order.total.toFixed(2)} $CA</strong></td></tr>
      ${order.address ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee"><span style="color:#888;font-size:12px">Adresse</span><br>${order.address}</td></tr>` : ''}
      <tr><td style="padding:8px 0"><span style="color:#888;font-size:12px">Date</span><br>${order.date}</td></tr>
    </table>
    <div style="margin-top:20px;text-align:center">
      <a href="https://badaour.vercel.app/#/admin" style="background:${DARK};color:${G};text-decoration:none;padding:12px 28px;font-weight:bold;font-size:12px;letter-spacing:2px;border-radius:4px;display:inline-block">VOIR DANS L'ADMIN →</a>
    </div>
  </td></tr>
  <tr><td style="background:#f8f8f8;padding:14px 28px;text-align:center;font-size:11px;color:#999">
    BADAOUR · service@badaour.com · 438-988-6682
  </td></tr>
</table></body></html>`;
}
