// This import is only needed when checking authentication status directly from getInitialProps
// import auth0 from '../lib/auth0'
import { useFetchSwaUser } from '../lib/swauser'
import Layout from '../components/layout'

function ProfileCard({ user }) {
  return (
    <>
      <h1>Profile</h1>

      <div>
        <h3>Profile (client rendered)</h3>
        <p>details: {user.me}</p>
      </div>
    </>
  )
}

function Profile() {
  const { user, loading } = useFetchSwaUser({ required: true })

  return (
    <Layout user={user} loading={loading}>
      {loading ? <>Loading...</> : <ProfileCard user={user} />}
    </Layout>
  )
}

export default Profile
