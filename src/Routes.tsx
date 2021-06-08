import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import { Main } from "./components/Main";
import { Error } from "./components/grid/Error";
import { Search } from "./components/Search";
import { Playlist } from "./components/Playlist";
import { Album } from "./components/Album";
import { InnerLayout, Layout } from "./components/Layout";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Layout>
        <Route exact path="/app">
          <Main />
        </Route>
        <Route exact path="/app/search/:search">
          <Search />
        </Route>
        <Route exact path="/app/playlist/:service/:playlistId">
          <InnerLayout>
            <Playlist />
          </InnerLayout>
        </Route>
        <Route exact path="/app/album/:service/:albumId">
          <InnerLayout>
            <Album />
          </InnerLayout>
        </Route>
      </Layout>
      <Route path="*">
        <Error />
      </Route>
    </Switch>
  </BrowserRouter>
);
