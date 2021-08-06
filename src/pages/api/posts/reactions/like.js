import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res){
  const send_like = await prisma.likes.create({
    data: {
      date: new Date(),
      postTitle: req.body.postTitle,
      userId: req.body.userId
    }
  })
  res.json(send_like)
}