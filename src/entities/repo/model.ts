import { createEffect, createEvent, createStore } from "effector";
import { apolloClient } from "@/shared/api/apolloClient";
import type { RepoDetail } from "./types";
import { GET_REPO_DETAIL } from "./graphql/getRepoDetail.gql";

export const repoDetailCleared = createEvent();

export const fetchRepoDetailFx = createEffect<
  {
    owner: string;
    name: string;
  },
  RepoDetail
>({
  async handler({ owner, name }) {
    const { data } = await apolloClient.query({
      query: GET_REPO_DETAIL,
      variables: { owner, name },
    });

    return data.repository;
  },
});

export const $repoDetail = createStore<RepoDetail | null>(null)
  .on(fetchRepoDetailFx.doneData, (_, repo) => repo)
  .reset(repoDetailCleared);

export const $error = createStore<string | null>(null).on(
  fetchRepoDetailFx.failData,
  (_, err) => (err instanceof Error ? err.message : "Ошибка")
);

export const $isLoading = fetchRepoDetailFx.pending;
