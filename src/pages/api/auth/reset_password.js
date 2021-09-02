import bcrypt from 'bcryptjs'
import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const raw_password = req.body.newpassword
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(raw_password, salt)

    const reset_password = await prisma.user.update({
      where: {
        id: parseInt(req.body.id)
      },
      data: {
        password: password
      }
    })
    res.json(reset_password)
  } else {
    res.send('put method only...')
  }
}