import { createEffect, createEvent, createStore, sample } from "effector";
import { apolloClient } from "@/shared/api/apolloClient";
import { gql } from "@apollo/client";
import type { SearchRepoEdge } from "@/entities/repo/types";
import { GET_VIEWER_REPOS } from "@/entities/repo/graphql/getViewerRepos.gql";

export const queryChanged = createEvent<string>();
export const pageChanged = createEvent<number>();
export const pageMounted = createEvent();

export const $query = createStore("").on(queryChanged, (_, q) => q);
export const $page = createStore(1).on(pageChanged, (_, p) => p);
export const $cursorMap = createStore<Record<number, string>>({});
export const $repos = createStore<SearchRepoEdge[]>([]);
export const $totalPages = createStore(0);

$cursorMap.reset(queryChanged);
$repos.reset(queryChanged);
$page.reset(queryChanged);
$totalPages.reset(queryChanged);

export const fetchReposFx = createEffect<
  {
    query: string;
    cursor?: string;
    page: number;
  },
  {
    repos: SearchRepoEdge[];
    page: number;
    nextCursor?: string;
    totalCount: number;
  }
>({
  async handler({ query, cursor, page }) {
    const isSearch = query.trim() !== "";
    console.log(isSearch);
    const { data } = await apolloClient.query({
      query: isSearch
        ? gql`
            query SearchRepos($query: String!, $cursor: String) {
              search(
                query: $query
                type: REPOSITORY
                first: 10
                after: $cursor
              ) {
                repositoryCount
                pageInfo {
                  endCursor
                  hasNextPage
                }
                edges {
                  node {
                    ... on Repository {
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
          `
        : GET_VIEWER_REPOS,
      variables: { query, cursor },
    });

    const repos = isSearch
      ? (data.search.edges as SearchRepoEdge[])
      : (data.viewer.repositories.edges as SearchRepoEdge[]);

    const nextCursor = isSearch
      ? data.search.pageInfo.endCursor
      : data.viewer.repositories.pageInfo.endCursor;

    const totalCount = isSearch
      ? data.search.repositoryCount
      : data.viewer.repositories.totalCount;

    return {
      repos,
      page,
      nextCursor: nextCursor ?? undefined,
      totalCount,
    };
  },
});

export const $isSearchLoading = fetchReposFx.pending;

sample({
  clock: [$query, $page],
  source: {
    query: $query,
    page: $page,
    cursorMap: $cursorMap,
  },
  fn: ({ query, page, cursorMap }) => ({
    query,
    cursor: page > 1 ? cursorMap[page - 1] : undefined,
    page,
  }),
  target: fetchReposFx,
});

sample({
  clock: fetchReposFx.doneData,
  fn: ({ repos }) => repos,
  target: $repos,
});

sample({
  clock: fetchReposFx.doneData,
  source: $cursorMap,
  fn: (map, { page, nextCursor }) => {
    if (!nextCursor) return map;
    return {
      ...map,
      [page]: nextCursor,
    };
  },
  target: $cursorMap,
});

sample({
  clock: fetchReposFx.doneData,
  fn: ({ totalCount }) => Math.min(10, Math.ceil(totalCount / 10)),
  target: $totalPages,
});

const parsedParams = sample({
  clock: pageMounted,
  fn: () => {
    const params = new URLSearchParams(window.location.search);
    console.log(params.get("query"));

    return {
      query: params.get("query") ?? "",
      page: parseInt(params.get("page") ?? "1", 10),
    };
  },
});

sample({
  source: parsedParams,
  fn: ({ query }) => query,
  target: queryChanged,
});

sample({
  source: parsedParams,
  fn: ({ page }) => page,
  target: pageChanged,
});

sample({
  clock: parsedParams,
  source: $cursorMap,
  fn: (cursorMap, { query, page }) => ({
    query,
    page,
    cursor: page > 1 ? cursorMap[page - 1] : undefined,
  }),
  target: fetchReposFx,
});
