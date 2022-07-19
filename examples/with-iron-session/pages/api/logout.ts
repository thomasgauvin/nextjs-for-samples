import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import type { User } from 'pages/api/user'

export default withIronSessionApiRoute(logoutRoute, sessionOptions)

async function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  await req.session.destroy()
  await req.session.save()
  res.json({ isLoggedIn: false, login: '', avatarUrl: '' })
}
