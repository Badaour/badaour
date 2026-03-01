// Email de notification d'expédition - appelé depuis l'admin
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { order } = req.body;
  if (!order?.email) return res.status(400).json({ error: 'Données manquantes' });

  const G='#C9A84C', DARK='#1A1714', BG='#FDF8F0', BORDER='#E8D5B7', MUTED='#8B6A3E', BLUE='#1565C0';

  const html = `<!DOCTYPE html><html lang="fr"><body style="margin:0;padding:0;background:#F5ECD9;font-family:Georgia,serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
  <tr><td style="background:${DARK};padding:28px 36px;border-bottom:3px solid ${G};text-align:center">
    <div style="font-size:28px;font-weight:bold;color:${G};letter-spacing:8px">BADAOUR</div>
    <div style="font-size:10px;color:#A0845C;letter-spacing:4px;margin-top:4px">L'AFRIQUE À VOTRE PORTE</div>
  </td></tr>
  <tr><td style="background:${BLUE};padding:20px 36px;text-align:center">
    <div style="font-size:24px;color:#fff;font-weight:bold">✈️ Votre commande est en route !</div>
    <div style="font-size:13px;color:rgba(255,255,255,.85);margin-top:6px">Votre colis a quitté l'Afrique et voyage vers vous.</div>
  </td></tr>
  <tr><td style="background:${BG};padding:24px 36px;text-align:center;border-bottom:1px solid ${BORDER}">
    <div style="font-size:11px;color:${MUTED};letter-spacing:3px;text-transform:uppercase;margin-bottom:8px">Commande</div>
    <div style="font-size:22px;font-weight:bold;color:${DARK};letter-spacing:2px">${order.id}</div>
  </td></tr>
  <tr><td style="background:${BG};padding:24px 36px">
    <p style="margin:0;font-size:15px;color:${DARK};line-height:1.9">
      Bonjour <strong>${order.client}</strong>,<br><br>
      Excellente nouvelle ! Votre commande a été expédiée par notre partenaire logistique <strong>DHL Express</strong>.
      ${order.tracking ? `<br><br>Votre numéro de suivi DHL : <strong style="font-size:16px;color:${BLUE}">${order.tracking}</strong>` : ''}
    </p>
  </td></tr>
  ${order.tracking ? `<tr><td style="background:#EBF3FB;padding:16px 36px;border-top:1px solid #BDDCF0;border-bottom:1px solid #BDDCF0;text-align:center">
    <a href="https://www.dhl.com/ca-en/home/tracking/tracking-express.html?submit=1&tracking-id=${order.tracking}" style="background:${BLUE};color:#fff;text-decoration:none;padding:13px 32px;font-size:12px;font-weight:bold;letter-spacing:2px;border-radius:4px;display:inline-block;text-transform:uppercase">SUIVRE MON COLIS DHL →</a>
  </td></tr>` : ''}
  <!-- TIMELINE -->
  <tr><td style="background:${BG};padding:24px 36px">
    <div style="font-size:11px;font-weight:bold;color:${DARK};letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;border-left:4px solid ${G};padding-left:12px">🗺️ Statut de livraison</div>
    ${[['✅','Commande confirmée','',true],['✅','En préparation','Articles préparés avec soin',true],['✅','Expédiée','Colis parti · '+new Date().toLocaleDateString('fr-CA'),true],['✈️','En transit','Vol Afrique → Canada en cours',false],['🚚','En livraison','Derniers kilomètres',false],['🎉','Livré !','',false]]
      .map(([icon,label,desc,done])=>`
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px"><tr>
      <td width="40" style="vertical-align:top"><div style="width:32px;height:32px;border-radius:50%;background:${done?'#2E7D4F':'#E8D5B7'};text-align:center;line-height:32px;font-size:13px;color:${done?'#fff':'#8B6A3E'}">${done?'✓':icon}</div></td>
      <td style="padding:4px 0 4px 10px;vertical-align:middle">
        <div style="font-size:13px;font-weight:${done?'bold':'normal'};color:${done?DARK:'#bbb'}">${label}</div>
        ${desc ? `<div style="font-size:11px;color:${done?MUTED:'#ccc'};margin-top:1px">${desc}</div>` : ''}
      </td>
    </tr></table>`).join('')}
  </td></tr>
  <tr><td style="background:#FFF8EE;padding:18px 36px;border-top:1px solid ${BORDER};text-align:center">
    <p style="margin:0;font-size:12px;color:${MUTED};line-height:1.9">
      📞 <strong>438-988-6682</strong> · ✉️ <strong>service@badaour.com</strong> · WhatsApp disponible
    </p>
  </td></tr>
  <tr><td style="background:${DARK};padding:22px 36px;text-align:center">
    <div style="font-size:16px;color:${G};letter-spacing:5px;font-weight:bold;margin-bottom:4px">BADAOUR</div>
    <div style="font-size:10px;color:#A0845C">© ${new Date().getFullYear()} · Artisanat 100% authentique</div>
  </td></tr>
</table></td></tr></table></body></html>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'BADAOUR <service@badaour.com>', to: [order.email], subject: `✈️ Votre commande ${order.id} est expédiée ! | BADAOUR`, html }),
    });
    const data = await r.json();
    return res.status(200).json({ success: true, emailId: data.id });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
