import { useUnit } from "effector-react";
import { Input } from "@/shared/ui/Input/Input";
import { queryChanged, pageChanged, $query } from "../model";

export const SearchInput = () => {
  const [query, changeQuery, resetPage] = useUnit([
    $query,
    queryChanged,
    pageChanged,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeQuery(e.target.value);
    resetPage(1);
  };

  return (
    <Input
      value={query}
      onChange={handleChange}
      placeholder="Поиск репозиториев"
    />
  );
};
