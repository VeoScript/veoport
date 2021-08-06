import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const update_post = await prisma.posts.updateMany({
      where: {
        id: req.body.postId,
        userId: req.body.userId
      },
      data: {
        image: req.body.image,
        title: req.body.title,
        content: req.body.content,
        date: new Date(),
        published: req.body.status,
        tags: req.body.tags,
        userId: req.body.userId
      }
    })
    res.json(update_post)
  } else {
    res.send('put method only...')
  }
}