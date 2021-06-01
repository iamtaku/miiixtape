import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import { Main } from "./components/Main";
import { Error } from "./components/grid/Error";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtoolsPanel } from "react-query/devtools";
import { Search } from "./components/Search";
import { Playlist } from "./components/Playlist";
import { Album } from "./components/Album";
import { AppProvider } from "./state/context";
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
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
          </Router>
          <ReactQueryDevtoolsPanel />
        </QueryClientProvider>
      </AppProvider>
    </div>
  );
}

export default App;
