export default async function meswa(req, res) {
 
  const header = req.headers['x-ms-client-principal'];
  const encoded = Buffer.from(header, 'base64');
  const decoded = encoded.toString('ascii');
  res.json({ me: JSON.parse(decoded) })
}
