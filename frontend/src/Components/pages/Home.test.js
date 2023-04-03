import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Home } from "./Home";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

let posts = [
  {
    _id: 1,
    word: "Nuke",
    title: "Fake post regarding Nuke",
    ups: 100,
    upvote_ratio: 0.75,
    thumbnail: "www.google.com",
    subreddit: "news",
    created: 1680293179,
  },
];

const server = setupServer(
  rest.get("http://localhost:8080/posts", (req, res, ctx) => {
    return res(ctx.json({ posts }));
  }),
  rest.get("/api/posts", (req, res, ctx) => {
    return res(ctx.json({ posts }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Renders home page", async () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const text = screen.getByText(
    /Posts in last 4 hours including weapons of mass destruction:/i
  );
  expect(text).toBeInTheDocument();

  await waitFor(() => screen.getByText(/Fake post regarding Nuke/i));
});
