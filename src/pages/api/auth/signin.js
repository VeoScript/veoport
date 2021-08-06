import { withIronSession } from 'next-iron-session'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function handler(req, res) {
  const findUser = await prisma.user.findMany({
    where: {
      username: req.body.username
    },
    select: {
      id: true,
      username: true
    }
  })

  const getId = findUser[0].id
  const getUsername = findUser[0].username

  req.session.set('user', {
    id: getId,
    username: getUsername,
    admin: true
  })

  await req.session.save()
  res.send('Signed In')
}

export default withIronSession(handler, {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "veoport",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  }
})