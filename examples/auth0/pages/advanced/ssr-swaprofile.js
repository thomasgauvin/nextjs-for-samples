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
   const encoded = Buffer.from(header, 'base64');
   const decoded = encoded.toString('ascii');

  if (!decoded) {
    res.writeHead(302, {
      Location: '/.auth/login/aad',
    })
    res.end()
    return
  }

  return { props: { user: { me: JSON.parse(decoded) } } }
}

export default Profile
