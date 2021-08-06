import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const signup = await prisma.user.create({
      data: {
        image: req.body.image,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }
    })
    res.json(signup)
  } else {
    res.send('post method only...')
  }
}