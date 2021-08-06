import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const create_comment = await prisma.comments.create({
      data: {
        comment: req.body.comment,
        date: new Date(),
        postTitle: req.body.postTitle,
        userId: req.body.userId
      }
    })
    res.json(create_comment)
  } else {
    res.send('post method only...')
  }
}