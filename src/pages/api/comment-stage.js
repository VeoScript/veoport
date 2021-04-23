import { GraphQLClient } from 'graphql-request'
import { PUBLISHED_COMMENT_MUTATION } from '~/graphql/mutations'

const client = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.VEOPORTAL_MUTATIONS}`
  }
})

const mutation = PUBLISHED_COMMENT_MUTATION

export default async (req, res) => {
  const { postID } = JSON.parse(req.body)
  const variables = { postID }
  try {
    const data = await client.request(mutation, variables)
    res.status(201).json(data)
  } catch (err) {
    res.send(err)
    console.log(err)
  }
}