import { removeTokenCookie } from '../../lib/auth-cookies'

export default async function logout(req, res) {
  removeTokenCookie(res)
  res.writeHead(307, { Location: '/' })
  res.end()
}
