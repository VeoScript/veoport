import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const create_post = await prisma.posts.create({
      data: {
        image: req.body.image,
        title: req.body.title,
        slug: req.body.title.replace(/\s+/g, '-').toLowerCase(),
        content: req.body.content,
        date: new Date(),
        published: req.body.status,
        tags: req.body.tags,
        userId: req.body.userId
      }
    })
    res.json(create_post)
  } else {
    res.send('post method only...')
  }
}