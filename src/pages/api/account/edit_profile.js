import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const edit_profile = await prisma.user.update({
      where: {
        id: req.body.id
      },
      data: {
        image: req.body.image,
        name: req.body.name,
        email: req.body.email,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        github: req.body.github,
        bio: req.body.bio
      }
    })
    res.json(edit_profile)
  } else {
    res.send('put method only...')
  }
}