import { gql } from 'graphql-request'

export const GET_BLOG_POSTS_QUERY = gql`
  query Posts() {
    posts(orderBy: date_DESC) {
      id
      title
      excerpt
      slug
      coverImage {
        id
        url
      }
      author {
        id
        name
      }
      date
    }
  }
`