import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const change_password = await prisma.user.update({
      where: {
        id: req.body.id
      },
      data: {
        password: req.body.new_password
      }
    })
    res.json(change_password)
  } else {
    res.send('put method only...')
  }
}