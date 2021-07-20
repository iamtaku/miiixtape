import React from "react";
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import { Main } from "./components/Main";
import { Search } from "./components/Search";
import { Playlist } from "./components/playlist/Playlist";
import { Album } from "./components/Album";
import { Layout } from "./components/Layout";
import { NotFound } from "./pages/NotFound";
import { Artist } from "./components/artist";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PlaylistShare } from "./components/playlist/PlaylistShare";
import { isAuthenticated } from "./helpers/utils";

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
    <Route path="/login">
      <Login />
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
        <ProtectedRoute exact path={path}>
          <Main />
        </ProtectedRoute>
        <ProtectedRoute path={`${path}/search/:search`}>
          <Search />
        </ProtectedRoute>
        <Route path={`${path}/playlist/:service/:playlistId`}>
          <Playlist />
        </Route>
        <ProtectedRoute path={`${path}/album/:service/:albumId`}>
          <Album />
        </ProtectedRoute>
        <ProtectedRoute path={`${path}/artist/:service/:artistId`}>
          <Artist />
        </ProtectedRoute>

        <Route path={`${path}/error`}>
          <Error />
        </Route>
      </Switch>
    </Layout>
  );
};
