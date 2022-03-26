import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  const send_unlike = await prisma.likes.deleteMany({
    where: {
      postSlug: req.body.postSlug,
      userId: req.body.userId
    }
  })
  res.json(send_unlike)
}