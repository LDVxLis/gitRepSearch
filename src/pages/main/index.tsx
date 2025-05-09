import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Paginator } from "@/widgets/paginator/Paginator";
import {
  $isSearchLoading,
  $page,
  $query,
  $totalPages,
  pageChanged,
  pageMounted,
} from "@/features/searchRepos/model";
import { SearchInput } from "@/features/searchRepos/ui/SearchInput";
import { RepoList } from "@/features/searchRepos/ui/RepoList";

export const MainPage = () => {
  const [params, setParams] = useSearchParams();

  const [loading, currentPage, totalPages, query] = useUnit([
    $isSearchLoading,
    $page,
    $totalPages,
    $query,
  ]);

  useEffect(() => {
    pageMounted();
  }, []);

  useEffect(() => {
    const current = params.get("query");
    const page = params.get("page");

    if (current !== query || page !== String(currentPage)) {
      setParams({ query, page: String(currentPage) });
    }
  }, [query, currentPage, setParams]);

  const handlePageChange = (page: number) => {
    pageChanged(page);
  };

  return (
    <div>
      <SearchInput />
      <RepoList />

      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        disabled={loading}
      />
    </div>
  );
};
