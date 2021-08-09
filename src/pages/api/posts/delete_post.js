import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'DELETE') {

    const delete_post = await prisma.posts.delete({
      where: {
        id: req.body.post_id
      }
    })
    
    const delete_comment = await prisma.comments.deleteMany({
      where: {
        post: {
          id: req.body.post_id
        }
      }
    })

    const delete_likes = await prisma.likes.deleteMany({
      where: {
        post: {
          id: req.body.post_id
        }
      }
    })

    const transaction = await prisma.$transaction([delete_post, delete_comment, delete_likes])

    res.json(transaction)

  } else {
    res.send('delete method only...')
  }
}