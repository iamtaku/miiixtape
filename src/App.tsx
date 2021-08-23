import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { AppProvider } from "./state/context";
import { Routes } from "./Routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 1000 * 60 * 59,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: true,
    },
  },
});

function App(): JSX.Element {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
