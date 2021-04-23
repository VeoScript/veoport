import { GraphQLClient } from 'graphql-request'
import { INSERT_POST_COMMENT } from '~/graphql/mutations'

const client = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.VEOPORTAL_MUTATIONS}`
  }
})

const mutation = INSERT_POST_COMMENT

export default async (req, res) => {
  const { comment, commentor, postID } = JSON.parse(req.body)
  const variables = { comment, commentor, postID }
  try {
    const data = await client.request(mutation, variables)
    res.status(201).json(data)
  } catch (err) {
    res.send(err)
    console.log(err)
  }
}