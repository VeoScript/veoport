import bcrypt from 'bcryptjs'
import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const raw_password = req.body.new_password
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(raw_password, salt)

    const change_password = await prisma.user.update({
      where: {
        id: req.body.id
      },
      data: {
        password: password
      }
    })
    res.json(change_password)
  } else {
    res.send('put method only...')
  }
}