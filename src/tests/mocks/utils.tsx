import { render } from "@testing-library/react";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, MemoryRouter } from "react-router-dom";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const renderWithClient = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
};

export const createWrapper = () => {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactChildren }) => (
    <QueryClientProvider client={testQueryClient}>
      <MemoryRouter initialEntries={["plaaaylist/mockplaylist1"]}>
        <Route path="plaaaylist/:playlistId">{children}</Route>
      </MemoryRouter>
    </QueryClientProvider>
  );
};
