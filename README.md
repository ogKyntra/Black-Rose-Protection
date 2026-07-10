# Black Rose Protection — Netlify Deployment

Static site + 5 serverless functions (Netlify Functions) using **Netlify Blobs**
as the database. No build step required.

## Deploy

1. Push this folder to a GitHub/GitLab/Bitbucket repo (or drag-and-drop deploy
   the folder in the Netlify UI).
2. In Netlify: **Add new site → Import an existing project**, point it at the repo.
3. Build settings are already defined in `netlify.toml`:
   - Build command: *(none)*
   - Publish directory: `.`
   - Functions directory: `netlify/functions`
4. Deploy. Netlify Blobs works with zero extra config — no database to provision.

## Environment variables (optional, set in Site configuration → Environment variables)

| Key | Purpose | Default if unset |
|---|---|---|
| `ADMIN_PASSCODE` | Password for the staff/admin terminal (`[ STAFF LOGIN ]`) | `blackrose` |
| `CONTRACT_WEBHOOK_URL` | Discord webhook URL — fires when a protection contract request is submitted | none (webhook step is skipped) |
| `APPLICATION_WEBHOOK_URL` | Discord webhook URL — fires when a recruitment application is submitted | none (webhook step is skipped) |

After adding/changing env vars, trigger a redeploy for them to take effect.

## Notes

- All site content (services, roster, add-ons, pricing) is edited live through
  the staff terminal and stored in a Netlify Blobs store called `brp_database`.
  It's shared across all visitors — there's no separate CMS.
- The default admin passcode is `blackrose` unless you set `ADMIN_PASSCODE`.
  It's sent to the function in plaintext JSON over HTTPS — fine for an RP
  community site, but don't reuse it anywhere sensitive.
- `localStorage` is only used as an offline fallback cache; the source of
  truth is always the cloud store once a connection is available.
