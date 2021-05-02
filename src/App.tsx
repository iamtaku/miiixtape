import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Main from "./pages/Main";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import Error from "./pages/Error";
import { QueryClientProvider, QueryClient } from "react-query";

import { ReactQueryDevtools } from "react-query/devtools";
import Search from "./components/grid/Search";
const queryClient = new QueryClient();

const token = window.localStorage.getItem("token");

function App() {
  // if (!token) return <Landing />;
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Route exact path="/" component={Landing} />
          <Route exact path="/app">
            <Navbar />
            <Sidebar />
            <Switch>
              <Route exact path="/app" component={Main} />
              <Route exact path="/search/:search" component={Search} />
            </Switch>
          </Route>
          {/* work on 404 page */}
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
