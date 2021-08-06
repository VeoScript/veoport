import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const send_unlike = await prisma.likes.deleteMany({
    where: {
      postTitle: req.body.postTitle,
      userId: req.body.userId
    }
  })
  res.json(send_unlike)
}