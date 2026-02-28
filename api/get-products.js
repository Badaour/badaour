export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const token = process.env.GITHUB_TOKEN;
    const r = await fetch('https://api.github.com/repos/Badaour/badaour/contents/public/products.json', {
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
    });
    const data = await r.json();
    const products = JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'));
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
