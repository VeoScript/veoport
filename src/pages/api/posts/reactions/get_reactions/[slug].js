import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { slug } = req.query
    const get_reactions = await prisma.likes.findMany({
      where: {
        postSlug: slug
      },
      select: {
        id: true,
        postSlug: true,
        userId: true
      }
    })
    res.json(get_reactions)
  } else {
    res.send('get method only...')
  }
}