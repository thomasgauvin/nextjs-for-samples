import { removeTokenCookie } from '../../lib/auth-cookies'

export default async function logout(req, res) {
  removeTokenCookie(res)
  console.log(res)
  res.writeHead(302, { Location: '/' })
  res.end()
}
