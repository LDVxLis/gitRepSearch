import React from "react";
import { Link } from "react-router-dom";
import styles from "./RepoItem.module.css";

type Props = {
  name: string;
  stars: number;
  updatedAt: string;
  to: string;
};

export const RepoItem: React.FC<Props> = ({ name, stars, updatedAt, to }) => {
  return (
    <div data-testid="repo-item" className={styles.repoItem}>
      <Link to={to} className={styles.link}>
        {name}
      </Link>
      <div className={styles.meta}>
        <span>Количество звёзд: {stars}</span>
        <span>Дата последнего коммита: {updatedAt}</span>
      </div>
    </div>
  );
};
