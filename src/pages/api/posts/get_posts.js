import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const get_posts = await prisma.posts.findMany({
      where: {
        published: 'published'
      },
      orderBy: [
        {
          date: 'desc'
        }
      ],
      select: {
        id: true,
        image: true,
        title: true,
        slug: true,
        content: true,
        date: true,
        published: true,
        tags: true,
        likes: true,
        comment: true,
        user: {
          select: {
            id: true,
            image: true,
            name: true,
            email: true,
            username: true,
            bio: true
          }
        }
      }
    })
    res.json(get_posts)
  } else {
    res.send('get method only...')
  }
}