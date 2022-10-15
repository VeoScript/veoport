import { withIronSession } from 'next-iron-session'
import bcrypt from 'bcryptjs'
import prisma from '~/lib/prisma'

async function handler(req, res) {
  const { username, password } = req.body

  const findUser = await prisma.user.findMany({
    where: {
      username: username
    },
    select: {
      id: true,
      username: true,
      password: true
    }
  })

  if (!findUser[0]) {
    return res.status(400).json({
      message: 'This account is not registered!'
    })
  }

  const getId = findUser[0].id
  const getUsername = findUser[0].username
  const getHashedPassword = findUser[0].password

  const matchedPassword = await bcrypt.compare(password, getHashedPassword)

  if (!matchedPassword) {
    return res.status(400).json({
      message: 'Incorrect password!'
    })
  }

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