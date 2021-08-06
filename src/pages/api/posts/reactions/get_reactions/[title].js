import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { title } = req.query
    const get_reactions = await prisma.likes.findMany({
      where: {
        postTitle: title
      },
      select: {
        id: true,
        postTitle: true,
        userId: true
      }
    })
    res.json(get_reactions)
  } else {
    res.send('get method only...')
  }
}