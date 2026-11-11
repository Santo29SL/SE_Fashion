import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL from the original multi-page site.
export const Route = createFileRoute("/index.html")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
});
