import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL from the original multi-page site.
export const Route = createFileRoute("/heritage.html")({
  beforeLoad: () => {
    throw redirect({ to: "/heritage", statusCode: 301 });
  },
});
