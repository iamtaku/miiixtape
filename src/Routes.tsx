import React from "react";
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import { Main } from "./components/Main";
import { Search } from "./components/Search";
import { Playlist } from "./components/Playlist";
import { Album } from "./components/Album";
import { Layout } from "./components/Layout";
import { NotFound } from "./pages/NotFound";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/app">
        <AppRoutes />
      </Route>

      <PageRoutes />
    </Switch>
  </BrowserRouter>
);

const PageRoutes = () => (
  <Switch>
    <Route exact path="/">
      <Landing />
    </Route>
    <Route path="*">
      <NotFound />
    </Route>
  </Switch>
);

const AppRoutes = () => {
  const { path, url } = useRouteMatch();
  console.log(path, url);
  return (
    <Layout>
      <Switch>
        <Route exact path={path}>
          <Main />
        </Route>
        <Route path={`${path}/search/:search`}>
          <Search />
        </Route>
        <Route path={`${path}/playlist/:service/:playlistId`}>
          <Playlist />
        </Route>
        <Route path={`${path}/album/:service/:albumId`}>
          <Album />
        </Route>
        <Route path={`${path}/error`}>
          <Error />
        </Route>
      </Switch>
    </Layout>
  );
};
