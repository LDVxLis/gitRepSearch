import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "@/pages/not-found";
import { MainPage } from "@/pages/main";
import { RepoPage } from "@/features/repoDetail/ui/RepoPage";

export const Router = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/repo/:owner/:name" element={<RepoPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
