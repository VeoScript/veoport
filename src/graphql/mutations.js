import { gql } from 'graphql-request'

export const INSERT_POST_COMMENT = gql`
  mutation InsertPostCommentMutation($comment: String!, $commentor: String!, $postID: ID!) {
    createComment(data: {comment: $comment, commentor: $commentor, post: {connect: {id: $postID}}}) {
      comment
      commentor
      post {
        id
      }
    }
  } 
`
// export const PUBLISHED_COMMENT_MUTATION = gql`
//   mutation PublishedCommentMutation($commentID: ID!) {
//     publishComment(where: {id: $commentID}, to: PUBLISHED) {
//       stage
//     }
//   }
// `