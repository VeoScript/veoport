import prisma from '~/lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const all_users = await prisma.user.findMany()
    res.json(all_users)
  } else {
    res.send('get method only...')
  }
}