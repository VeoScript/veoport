import prisma from '~/lib/prisma'

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