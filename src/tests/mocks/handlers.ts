import { rest } from "msw";
import { mockTracks } from "./db";

const serverResponse = {
  data: [
    { attributes: { name: "mockitem1" } },
    { attributes: { name: "mockitem2" } },
  ],
};

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
  rest.delete("*/playlists/:playlistId", (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
