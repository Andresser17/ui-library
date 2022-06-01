// src/mocks/handlers.js
import { rest } from "msw";

const PORT = 3001;

export const handlers = [
  // Upload file
  rest.post("/upload-single-file", (req, res, ctx) => {
    const file = req.body.get("file");

    return res(
      ctx.json({
        message: `file ${file.name} has saved on the server`,
        url: `http://localhost:${PORT}/${file.name}`,
      })
    );
  }),

  rest.post("/upload-error", (req, res, ctx) => {
    return res.networkError("Failed to connect");
  }),

  // Delete file by name
  rest.delete("/delete-single-file", (req, res, ctx) => {
    const filename = req.body.filename;

    return res(
      ctx.json({
        message: `file ${filename} has been delete from server`,
        url: `http://localhost:${PORT}/${filename}`,
      })
    );
  }),
];
