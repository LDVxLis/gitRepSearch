import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/shared/api/apolloClient";
import { Router } from "./router";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <ApolloProvider client={apolloClient}>
    <React.StrictMode>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>
);
