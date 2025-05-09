import { gql } from "@apollo/client";

export const GET_VIEWER_REPOS = gql`
  query GetViewerRepos($cursor: String) {
    viewer {
      repositories(
        first: 10
        after: $cursor
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            id
            name
            stargazerCount
            updatedAt
            owner {
              login
            }
          }
        }
      }
    }
  }
`;
