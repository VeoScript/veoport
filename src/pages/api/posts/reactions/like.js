import prisma from '~/lib/prisma'

export default async function handler(req, res){
  const send_like = await prisma.likes.create({
    data: {
      date: new Date(),
      postSlug: req.body.postSlug,
      userId: req.body.userId
    }
  })
  res.json(send_like)
}