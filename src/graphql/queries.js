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
        picture {
          url
        }
      }
      date
      tags
    }
  }
`
// For Post Slug getStaticProps
export const GET_BLOG_POSTS_SLUG_QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      content{
        html
      }
      slug
      coverImage {
        id
        url
      }
      author {
        id
        name
      }
      comments {
        id
        commentor
        comment
        createdAt
      }
      date
      tags
    }
  }
`

// For Post Slug getStaticPaths
export const GET_BLOG_POST_SLUG_QUERY = gql`
  {
    posts {
      id
      title
      content{
        html
      }
      slug
      coverImage {
        id
        url
      }
      author {
        id
        name
      }
      comments {
        id
        commentor
        comment
        createdAt
      }
      date
      tags
    }
  }
`
