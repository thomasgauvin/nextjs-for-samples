// This import is only included in the server build, because it's only used by getServerSideProps

import Layout from '../../components/layout'

function Profile({ user }) {
  return (
    <Layout user={user}>
      <h1>Profile</h1>

      <div>
        <h3>Profile (server rendered)</h3>
        <p>Details: {user.me}</p>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req, res }) {
   const header = req.headers['x-ms-client-principal'];
   console.log(header+" is the x-ms-client-principal")
   const encoded = Buffer.from(header, 'base64');
   console.log(encoded+" is the encoded")
   const decoded = encoded.toString('ascii');
   console.log(decoded+" is the decoded")
  if (!decoded) {
    res.writeHead(302, {
      Location: '/.auth/login/aad',
    })
    res.end()
    return
  }
  console.log("json: "+JSON.parse(decoded))
  return { props: { user: { me: JSON.parse(decoded) } } }
}

export default Profile
