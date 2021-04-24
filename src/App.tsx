import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Callback from "./pages/Callback";
import Error from "./pages/Error";
import { Global } from "./globalStyle";
// import styled from 'styled-components';
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <Global />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/app" component={Home} />
            <Route path="/callback" component={Callback} />
            <Route path="*" component={Error} />
          </Switch>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
