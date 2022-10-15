import bcrypt from 'bcryptjs'
import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  const { image, name, email, username, password: rawPassword } = JSON.parse(req.body)

  const findUser = await prisma.user.findMany({
    select: {
      email: true,
      username: true,
    }
  })

  const check_email_exist = findUser.some((user) => user.email === email)
  const check_username_exist = findUser.some((user) => user.username === username)

  if (check_email_exist || check_username_exist) {
    return res.status(400).json({
      message: 'This account is not available!'
    })
  }

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