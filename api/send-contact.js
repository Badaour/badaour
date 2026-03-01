// Email pour le formulaire de contact
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, city, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Champs manquants' });

  const G='#C9A84C', DARK='#1A1714', BG='#FDF8F0', BORDER='#E8D5B7', MUTED='#8B6A3E';

  // Email au client - accusé de réception
  const clientHTML = `<!DOCTYPE html><html lang="fr"><body style="margin:0;padding:0;background:#F5ECD9;font-family:Georgia,serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
  <tr><td style="background:${DARK};padding:28px 36px;border-bottom:3px solid ${G};text-align:center">
    <div style="font-size:28px;font-weight:bold;color:${G};letter-spacing:8px">BADAOUR</div>
    <div style="font-size:10px;color:#A0845C;letter-spacing:4px;margin-top:4px">L'AFRIQUE À VOTRE PORTE</div>
  </td></tr>
  <tr><td style="background:#2E7D4F;padding:18px 36px;text-align:center">
    <div style="font-size:20px;color:#fff;font-weight:bold">📩 Message bien reçu !</div>
  </td></tr>
  <tr><td style="background:${BG};padding:28px 36px">
    <p style="margin:0;font-size:15px;color:${DARK};line-height:1.9">
      Bonjour <strong>${name}</strong>,<br><br>
      Merci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les <strong>24 heures</strong>.<br><br>
      Pour toute urgence, vous pouvez nous joindre directement :<br>
      📞 <strong>438-988-6682</strong> · 📱 WhatsApp disponible
    </p>
  </td></tr>
  <tr><td style="background:#FFF8EE;padding:18px 36px;border-top:1px solid ${BORDER};border-bottom:1px solid ${BORDER}">
    <div style="font-size:11px;color:${MUTED};letter-spacing:2px;text-transform:uppercase;margin-bottom:10px">Votre message</div>
    <p style="margin:0;font-size:13px;color:${DARK};line-height:1.7;font-style:italic">"${message}"</p>
  </td></tr>
  <tr><td style="background:${DARK};padding:20px 36px;text-align:center">
    <div style="font-size:14px;color:${G};letter-spacing:4px;font-weight:bold">BADAOUR</div>
    <div style="font-size:10px;color:#A0845C;margin-top:4px">service@badaour.com · 438-988-6682</div>
  </td></tr>
</table></td></tr></table></body></html>`;

  // Email à l'admin
  const adminHTML = `<!DOCTYPE html><html lang="fr"><body style="margin:0;padding:20px;background:#f0f0f0;font-family:Arial,sans-serif">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;max-width:600px;margin:0 auto;overflow:hidden">
  <tr><td style="background:${DARK};padding:18px 24px;border-bottom:3px solid ${G}">
    <div style="color:${G};font-weight:bold;font-size:18px">📩 Nouveau message de contact</div>
  </td></tr>
  <tr><td style="padding:20px 24px">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><span style="color:#888;font-size:12px">Nom</span><br><strong>${name}</strong></td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><span style="color:#888;font-size:12px">Email</span><br><a href="mailto:${email}" style="color:#1a73e8">${email}</a></td></tr>
      ${phone ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee"><span style="color:#888;font-size:12px">Téléphone</span><br>${phone}</td></tr>` : ''}
      ${city ? `<tr><td style="padding:8px 0;border-bottom:1px solid #eee"><span style="color:#888;font-size:12px">Ville</span><br>${city}</td></tr>` : ''}
      <tr><td style="padding:8px 0"><span style="color:#888;font-size:12px">Message</span><br><p style="margin:6px 0 0;font-size:14px;line-height:1.7">${message}</p></td></tr>
    </table>
    <div style="margin-top:16px">
      <a href="mailto:${email}?subject=Re: Votre message BADAOUR" style="background:${DARK};color:${G};text-decoration:none;padding:10px 22px;font-size:12px;font-weight:bold;border-radius:4px;display:inline-block">RÉPONDRE →</a>
    </div>
  </td></tr>
</table></body></html>`;

  try {
    // Envoyer les 2 emails en parallèle
    await Promise.all([
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: 'BADAOUR <service@badaour.com>', to: [email], subject: '📩 Votre message a bien été reçu — BADAOUR', html: clientHTML }),
      }),
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: 'BADAOUR Contact <service@badaour.com>', to: ['service@badaour.com'], subject: `📩 Nouveau contact de ${name} — ${email}`, html: adminHTML }),
      }),
    ]);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
