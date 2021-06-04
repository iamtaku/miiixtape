import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtoolsPanel } from "react-query/devtools";
import { AppProvider } from "./state/context";
import { Routes } from "./Routes";
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Routes />
          <ReactQueryDevtoolsPanel />
        </AppProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
