export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { products } = req.body;
  if (!Array.isArray(products)) return res.status(400).json({ error: 'Invalid products' });

  const token = process.env.GITHUB_TOKEN;
  if (!token) return res.status(500).json({ error: 'GitHub token not configured' });

  try {
    // Get current SHA
    const infoRes = await fetch('https://api.github.com/repos/Badaour/badaour/contents/data/products.json', {
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
    });
    const info = await infoRes.json();
    const sha = info.sha;

    // Update file
    const content = Buffer.from(JSON.stringify(products, null, 2)).toString('base64');
    const updateRes = await fetch('https://api.github.com/repos/Badaour/badaour/contents/data/products.json', {
      method: 'PUT',
      headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/vnd.github.v3+json' },
      body: JSON.stringify({ message: 'update: produits mis à jour depuis admin', content, sha })
    });

    if (!updateRes.ok) {
      const err = await updateRes.json();
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
