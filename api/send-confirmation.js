// api/send-confirmation.js
// Envoie un email de confirmation de commande BADAOUR via Resend

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { order } = req.body;

  if (!order) {
    return res.status(400).json({ error: 'Données de commande manquantes' });
  }

  try {
    const emailHtml = generateEmailHTML(order);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'BADAOUR <service@badaour.com>',
        to: [order.email],
        bcc: ['service@badaour.com'], // Copie pour BADAOUR
        subject: `✅ Commande confirmée — ${order.id} | BADAOUR`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Erreur envoi email' });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, emailId: data.id });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: error.message });
  }
}

function generateEmailHTML(order) {
  const G = '#D4AF37';
  const DARK = '#1A0A00';
  const RED = '#8B1A00';
  const BG = '#FDF6EC';
  const BORDER = '#E8D5B7';
  const MUTED = '#8B6A3E';
  const GREEN = '#2E8B57';

  const itemsHTML = order.items.map(item => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid ${BORDER};">
        <div style="font-weight: bold; color: ${DARK}; font-size: 14px;">${item.name}</div>
        <div style="color: ${MUTED}; font-size: 12px; margin-top: 2px;">✂️ ${item.artisan} · 🌍 ${item.country}</div>
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid ${BORDER}; text-align: center; color: ${MUTED}; font-size: 14px;">
        ${item.qty || 1}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid ${BORDER}; text-align: right; font-weight: bold; color: ${RED}; font-size: 14px;">
        ${(item.price * (item.qty || 1)).toFixed(2)} $CA
      </td>
    </tr>
  `).join('');

  const subtotal = order.items.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  const taxes = (subtotal * 0.14975).toFixed(2);

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de commande BADAOUR</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5ECD9; font-family: Georgia, 'Times New Roman', serif;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5ECD9; padding: 30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

          <!-- HEADER -->
          <tr>
            <td style="background-color: ${DARK}; padding: 28px 36px; border-bottom: 3px solid ${G}; text-align: center;">
              <div style="font-size: 32px; font-weight: bold; color: ${G}; letter-spacing: 8px; text-transform: uppercase;">BADAOUR</div>
              <div style="font-size: 10px; color: #A0845C; letter-spacing: 4px; margin-top: 4px; text-transform: uppercase;">L'AFRIQUE À VOTRE PORTE</div>
            </td>
          </tr>

          <!-- CONFIRMATION BANNER -->
          <tr>
            <td style="background-color: ${GREEN}; padding: 18px 36px; text-align: center;">
              <div style="font-size: 22px; color: white; font-weight: bold;">✅ Commande confirmée !</div>
              <div style="font-size: 13px; color: rgba(255,255,255,0.85); margin-top: 4px;">Merci pour votre commande, elle est entre de bonnes mains.</div>
            </td>
          </tr>

          <!-- ORDER ID -->
          <tr>
            <td style="background-color: ${BG}; padding: 24px 36px; text-align: center; border-bottom: 1px solid ${BORDER};">
              <div style="font-size: 11px; color: ${MUTED}; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px;">Numéro de commande</div>
              <div style="display: inline-block; background-color: ${DARK}; color: ${G}; padding: 10px 28px; font-size: 20px; font-weight: bold; letter-spacing: 3px; border-radius: 3px;">${order.id}</div>
              <div style="margin-top: 10px; font-size: 12px; color: ${MUTED};">Commande du ${order.date} · Payé via ${order.payMethod}</div>
            </td>
          </tr>

          <!-- GREETING -->
          <tr>
            <td style="background-color: ${BG}; padding: 24px 36px;">
              <p style="margin: 0; font-size: 15px; color: ${DARK}; line-height: 1.8;">
                Bonjour <strong>${order.client}</strong>,<br><br>
                Votre commande a été reçue et confirmée. Nos artisans africains vont maintenant préparer vos articles avec soin. 
                Vous recevrez une notification à chaque étape de livraison.
              </p>
            </td>
          </tr>

          <!-- ARTICLES -->
          <tr>
            <td style="background-color: ${BG}; padding: 0 36px 24px;">
              <div style="font-size: 12px; font-weight: bold; color: ${DARK}; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 14px; border-left: 4px solid ${G}; padding-left: 12px;">
                📦 Vos articles
              </div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <thead>
                  <tr>
                    <th style="text-align: left; font-size: 11px; color: ${MUTED}; letter-spacing: 1px; text-transform: uppercase; padding-bottom: 8px; border-bottom: 2px solid ${DARK};">Article</th>
                    <th style="text-align: center; font-size: 11px; color: ${MUTED}; letter-spacing: 1px; text-transform: uppercase; padding-bottom: 8px; border-bottom: 2px solid ${DARK};">Qté</th>
                    <th style="text-align: right; font-size: 11px; color: ${MUTED}; letter-spacing: 1px; text-transform: uppercase; padding-bottom: 8px; border-bottom: 2px solid ${DARK};">Prix</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
              </table>

              <!-- TOTAUX -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 16px;">
                <tr>
                  <td style="font-size: 13px; color: ${MUTED}; padding: 4px 0;">Sous-total</td>
                  <td style="font-size: 13px; text-align: right; color: ${DARK}; padding: 4px 0;">${subtotal.toFixed(2)} $CA</td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: ${MUTED}; padding: 4px 0;">Livraison internationale</td>
                  <td style="font-size: 13px; text-align: right; color: ${DARK}; padding: 4px 0;">${order.shipping.toFixed(2)} $CA</td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: ${MUTED}; padding: 4px 0;">Taxes (14.975%)</td>
                  <td style="font-size: 13px; text-align: right; color: ${DARK}; padding: 4px 0;">${taxes} $CA</td>
                </tr>
                <tr>
                  <td colspan="2" style="border-top: 2px solid ${DARK}; padding-top: 10px; margin-top: 6px;"></td>
                </tr>
                <tr>
                  <td style="font-size: 16px; font-weight: bold; color: ${DARK}; padding-top: 6px;">Total</td>
                  <td style="font-size: 18px; font-weight: bold; color: ${RED}; text-align: right; padding-top: 6px;">${order.total.toFixed(2)} $CA</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- DELIVERY -->
          <tr>
            <td style="background-color: #FFF8EE; padding: 20px 36px; border-top: 1px solid ${BORDER}; border-bottom: 1px solid ${BORDER};">
              <div style="font-size: 12px; font-weight: bold; color: ${DARK}; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; border-left: 4px solid ${G}; padding-left: 12px;">
                📍 Adresse de livraison
              </div>
              <div style="font-size: 13px; color: ${DARK}; line-height: 1.9;">
                <strong>${order.client}</strong><br>
                ${order.address}
              </div>
              <div style="margin-top: 14px; background-color: ${BG}; border-left: 4px solid ${G}; padding: 10px 14px; font-size: 12px; color: ${MUTED};">
                ✈️ <strong>Délai estimé :</strong> 14 à 21 jours ouvrables · Livraison Afrique → Canada (DHL Express)
              </div>
            </td>
          </tr>

          <!-- TRACKING STEPS -->
          <tr>
            <td style="background-color: ${BG}; padding: 24px 36px;">
              <div style="font-size: 12px; font-weight: bold; color: ${DARK}; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; border-left: 4px solid ${G}; padding-left: 12px;">
                🗺️ Étapes de livraison
              </div>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                  ['✅', 'Commande confirmée', 'Reçue et validée — Aujourd\'hui'],
                  ['🧵', 'En préparation', 'L\'artisan prépare votre commande'],
                  ['📦', 'Expédiée', 'Colis parti du pays d\'origine'],
                  ['✈️', 'En transit', 'Vol Afrique → Canada en cours'],
                  ['🛃', 'Dédouanement', 'Passage des douanes canadiennes'],
                  ['🚚', 'En livraison', 'En route chez vous'],
                  ['🎉', 'Livré !', 'Votre colis a été livré'],
                ].map(([icon, label, desc], i) => `
                <tr>
                  <td width="36" style="vertical-align: top; padding: 6px 0;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background-color: ${i === 0 ? GREEN : BORDER}; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 32px; font-size: ${i === 0 ? '14px' : '12px'};">
                      ${i === 0 ? '✓' : icon}
                    </div>
                  </td>
                  <td style="padding: 6px 0 6px 12px; vertical-align: top;">
                    <div style="font-size: 13px; font-weight: ${i === 0 ? 'bold' : 'normal'}; color: ${i === 0 ? DARK : '#aaa'};">${label}</div>
                    <div style="font-size: 11px; color: ${i === 0 ? MUTED : '#ccc'}; margin-top: 1px;">${desc}</div>
                  </td>
                </tr>
                `).join('')}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background-color: ${BG}; padding: 10px 36px 28px; text-align: center;">
              <a href="https://www.badaour.ca" style="display: inline-block; background-color: ${DARK}; color: ${G}; text-decoration: none; padding: 13px 32px; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; border-radius: 2px; margin-right: 10px;">
                SUIVRE MA COMMANDE
              </a>
            </td>
          </tr>

          <!-- CONTACT -->
          <tr>
            <td style="background-color: #FFF8EE; padding: 18px 36px; border-top: 1px solid ${BORDER}; border-bottom: 1px solid ${BORDER};">
              <p style="margin: 0; font-size: 12px; color: ${MUTED}; text-align: center; line-height: 1.8;">
                Une question ? Contactez-nous :<br>
                📞 <strong>438-988-6682</strong> · ✉️ <strong>service@badaour.com</strong><br>
                <span style="font-size: 11px;">Réponse sous 24h · WhatsApp disponible</span>
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: ${DARK}; padding: 22px 36px; text-align: center;">
              <div style="font-size: 16px; color: ${G}; letter-spacing: 4px; font-weight: bold; margin-bottom: 6px;">BADAOUR</div>
              <div style="font-size: 10px; color: #A0845C; letter-spacing: 2px; margin-bottom: 12px;">L'AFRIQUE À VOTRE PORTE · MONTRÉAL, QUÉBEC</div>
              <div style="font-size: 11px; color: #666; line-height: 1.8;">
                © 2025 BADAOUR · Commerce éthique · Artisanat 100% authentique<br>
                <span style="color: #444;">Fait avec ❤️ pour la diaspora africaine</span>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
}
