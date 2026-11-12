import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL from the original multi-page site (shop.html?realm=…).
export const Route = createFileRoute("/shop.html")({
  beforeLoad: ({ location }) => {
    const realm = new URLSearchParams(location.searchStr).get("realm");
    throw redirect({ to: "/shop", search: realm ? { realm } : {}, statusCode: 301 });
  },
});
