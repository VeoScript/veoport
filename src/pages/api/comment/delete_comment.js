import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const delete_comment = await prisma.comments.delete({
      where: {
        id: req.body.comment_id
      },
    })
    res.json(delete_comment)
  } else {
    res.send('delete method only...')
  }
}