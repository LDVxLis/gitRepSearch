import { useUnit } from "effector-react";
import { $isSearchLoading, $repos } from "../model";
import { RepoItem } from "@/entities/repo/ui/RepoItem";
import styles from "./RepoList.module.css";

export const RepoList = () => {
  const [repos, isLoading] = useUnit([$repos, $isSearchLoading]);

  if (isLoading) {
    return (
      <ul className={styles.list}>
        {Array.from({ length: 10 }).map((_, idx) => (
          <li key={idx} className={styles.listItem}>
            <div className={styles.skeletonItem} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={styles.list}>
      {repos.map((repo) => (
        <li key={repo.node.id} className={styles.listItem}>
          <RepoItem
            name={repo.node.name}
            stars={repo.node.stargazerCount}
            updatedAt={new Date(repo.node.updatedAt).toLocaleDateString()}
            to={`/repo/${repo.node.owner.login}/${repo.node.name}`}
          />
        </li>
      ))}
    </ul>
  );
};
