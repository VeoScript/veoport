import bcrypt from 'bcryptjs'
import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  const { image, name, email, username, password: rawPassword } = JSON.parse(req.body)

  const salt = await bcrypt.genSalt()
  const password = await bcrypt.hash(rawPassword, salt)

  const signup = await prisma.user.create({
    data: {
      image,
      name,
      email,
      username,
      password
    }
  })
  res.json(signup)
}