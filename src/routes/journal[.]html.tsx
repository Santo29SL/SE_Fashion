import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL from the original multi-page site.
export const Route = createFileRoute("/journal.html")({
  beforeLoad: () => {
    throw redirect({ to: "/journal", statusCode: 301 });
  },
});
