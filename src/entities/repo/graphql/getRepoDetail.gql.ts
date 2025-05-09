import { gql } from "@apollo/client";

export const GET_REPO_DETAIL = gql`
  query RepoDetail($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      stargazerCount
      updatedAt
      description
      owner {
        login
        url
        avatarUrl
      }
      languages(first: 100) {
        nodes {
          name
        }
      }
    }
  }
`;
