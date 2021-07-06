import { render } from "@testing-library/react";
import { rest } from "msw";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
export const handlers = [
  rest.get(`*/users`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          id: "95bfe1ab-837e-413e-80a8-4165fb6af580",
          type: "user",
          attributes: {
            username: "mocked-username",
            spotify_id: null,
            access_token: null,
            refresh_token: null,
          },
        },
      })
    );
  }),
  rest.get("*/test", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        working: "yes",
      })
    );
  }),
];

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
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};
