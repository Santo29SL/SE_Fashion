<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Site styling lives in `src/styles/southern-edit.css`, imported into `src/styles.css` as `layer(base)` with Tailwind's preflight omitted — it is the original site's stylesheet and its own reset keeps the migrated look intact.
- Bag, currency, toasts and the quick-view / bag / lookbook dialogs live in `src/components/southern/ShopProvider.tsx` and are rendered once by `SiteChrome` in the root route — one shared store across all pages, persisted under the original `southern_edit_*` localStorage keys so returning visitors keep their bag.
- Pure shop rules (bag math, free-shipping threshold, catalog filter/sort, price formatting) live in `src/lib/southern/` with tests beside them — keep logic out of components so it stays testable.
- `src/lib/southern/throwDeck.ts` is the original imperative throw-deck physics engine, mounted into a container by `LookbookDialog` — keep it framework-free; only its options/handle types are typed.
- Legacy `*.html` URLs from the original multi-page site redirect to the new paths via `src/routes/*[.]html.tsx` — keep them so old links keep working.
- Hosted photos are Lovable asset pointers (`src/assets/*.asset.json`) owned by this project; re-upload with lovable-assets rather than copying pointers from another project.
