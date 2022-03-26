import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { slug } = req.query
    const get_comments = await prisma.comments.findMany({
      where: {
        postSlug: slug
      },
      orderBy: [
        {
          id: 'desc'
        }
      ],
      select: {
        id: true,
        comment: true,
        date: true,
        user: {
          select: {
            id: true,
            image: true,
            name: true,
            bio: true
          }
        }
      }
    })
    res.json(get_comments)
  } else {
    res.send('get method only...')
  }
}