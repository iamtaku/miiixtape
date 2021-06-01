import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import { Main } from "./components/Main";
import { Error } from "./components/grid/Error";
import { Search } from "./components/Search";
import { Playlist } from "./components/Playlist";
import { Album } from "./components/Album";

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/app">
        <Main />
      </Route>
      <Route exact path="/app/search/:search">
        <Search />
      </Route>
      <Route exact path="/app/playlist/:service/:playlistId">
        <Playlist />
      </Route>
      <Route exact path="/app/album/:service/:albumId">
        <Album />
      </Route>
      <Route path="*">
        <Error />
      </Route>
    </Switch>
    {/* work on 404 page */}
  </BrowserRouter>
);
