import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import Error from "./pages/Error";
import { Global } from "./globalStyle";
import { QueryClientProvider, QueryClient } from "react-query";

import { ReactQueryDevtools } from "react-query/devtools";
import Search from "./pages/Search";
const queryClient = new QueryClient();

function App() {
  // const routes = createRoutes();
  return (
    <div className="App">
      <Global />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          <Sidebar />
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/app" component={Home} />
            <Route exact path="/search/:search" component={Search} />
            <Route path="*" component={Error} />
          </Switch>
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
