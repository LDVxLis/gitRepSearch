export interface RepoOwner {
  login: string;
  avatarUrl: string;
  url: string;
}

export interface Repo {
  id: string;
  name: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
  owner: RepoOwner;
}

export interface SearchRepoEdge {
  node: Repo;
}

export interface SearchReposResponse {
  search: {
    repositoryCount: number;
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
    edges: SearchRepoEdge[];
  };
}

export interface RepoLanguage {
  name: string;
}

export interface RepoDetail {
  name: string;
  stargazerCount: number;
  updatedAt: string;
  description: string;
  url: string;
  owner: RepoOwner;
  languages: {
    nodes: RepoLanguage[];
  };
}

export interface RepoDetailResponse {
  repository: RepoDetail;
}
