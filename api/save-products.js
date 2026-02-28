import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { products } = req.body;
    const token = process.env.GITHUB_TOKEN;
    
    // Get current SHA
    const getRes = await fetch('https://api.github.com/repos/Badaour/badaour/contents/public/products.json', {
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
    });
    const getData = await getRes.json();
    
    const content = Buffer.from(JSON.stringify(products, null, 2)).toString('base64');
    
    await fetch('https://api.github.com/repos/Badaour/badaour/contents/public/products.json', {
      method: 'PUT',
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'update: produits mis à jour via admin', content, sha: getData.sha })
    });
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Save products error:', error);
    return res.status(500).json({ error: error.message });
  }
}
