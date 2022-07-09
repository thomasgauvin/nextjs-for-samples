export default async function meswa(req, res) {
 
   const header = req.headers['x-ms-client-principal'];
   console.log(header+" is the x-ms-client-principal")
   const encoded = Buffer.from(header, 'base64');
   console.log(encoded+" is the encoded")
   const decoded = encoded.toString('ascii');
   console.log(decoded+" is the decoded")
  res.json({ me: decoded })
}
