import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUnit } from "effector-react";
import {
  $error,
  $isLoading,
  $repoDetail,
  fetchRepoDetailFx,
  repoDetailCleared,
} from "@/entities/repo/model";
import styles from "./RepoPage.module.css";

export const RepoPage = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const [repo, isLoading, error] = useUnit([$repoDetail, $isLoading, $error]);
  const navigate = useNavigate();

  useEffect(() => {
    if (owner && name) {
      fetchRepoDetailFx({ owner, name });
    }

    return () => {
      repoDetailCleared();
    };
  }, [owner, name]);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;
  if (!repo) return null;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Назад к результатам
      </button>

      <h1>{repo.name}</h1>
      <p>Количество звёзд: {repo.stargazerCount}</p>
      <p>
        Дата последнего коммита: {new Date(repo.updatedAt).toLocaleDateString()}
      </p>

      <hr />

      <div className={styles.owner}>
        <img src={repo.owner.avatarUrl} alt="owner" className={styles.avatar} />

        <a href={repo.owner.url} target="_blank">
          {repo.owner.login}
        </a>
      </div>

      <hr />

      <p className={styles.languages}>
        <strong>Языки:</strong>{" "}
        {Array.isArray(repo.languages?.nodes) && repo.languages.nodes.length > 0
          ? repo.languages.nodes.map((lang) => lang.name).join(", ")
          : "Не указаны используемые языки"}
      </p>

      <p className={styles.description}>{repo.description || "Нет описания"}</p>
    </div>
  );
};
