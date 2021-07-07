import { render } from "@testing-library/react";
import { rest } from "msw";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { mockTracks } from "./db";
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
  rest.get("*/playlists", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(serverResponse));
  }),
  rest.get("*/test", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        working: "yes",
      })
    );
  }),
  rest.post("*/playlists", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        data: {
          id: "mockid1",
          type: "playlist",
          attributes: {
            name: "mockPlaylist1",
          },
        },
      })
    );
  }),
  rest.post("*/playlists/:playlistId/playlist_items", (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        data: {
          id: "mockplaylist1",
          type: "playlist",
          attributes: {
            name: "mockplaylist",
          },
          relationships: {
            user: {
              data: {
                id: "67eaa554-124e-4a97-abe3-6a9857a68ebb",
                type: "user",
              },
            },
            playlist_items: {
              data: mockTracks,
            },
          },
          songs: {
            data: [
              { id: "1", type: "song" },
              { id: "2", type: "song" },
              { id: "3", type: "song" },
            ],
          },
        },
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

const serverResponse = {
  data: [
    { attributes: { name: "mockitem1" } },
    { attributes: { name: "mockitem2" } },
  ],
};

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
