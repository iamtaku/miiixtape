import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Main from "./components/grid/Main";
import { Navbar } from "./components/navbar/Navbar";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Error } from "./components/grid/Error";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtoolsPanel } from "react-query/devtools";
import Search from "./components/grid/Search";
import Player from "./components/players/Player";
import { LayoutWrapper as LayoutGrid } from "./components/Layout";
import { Playlist } from "./components/grid/Playlist";
import { AppProvider } from "./state/context";
const queryClient = new QueryClient();

function App() {
  // if (!token) return <Landing />;
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Route exact path="/" component={Landing} />
          <Route path="/app">
            <AppProvider>
              <LayoutGrid>
                <Navbar />
                <Sidebar />
                <Switch>
                  <Route exact path="/app" component={Main} />
                  <Route exact path="/app/search/:search" component={Search} />
                  <Route
                    exact
                    path="/app/playlist/:service/:playlistId"
                    component={Playlist}
                  />
                  <Route exact path="/app/error" component={Error} />
                </Switch>
                <Player />
              </LayoutGrid>
            </AppProvider>
          </Route>
          {/* work on 404 page */}
        </Router>
        <ReactQueryDevtoolsPanel />
      </QueryClientProvider>
    </div>
  );
}

export default App;
