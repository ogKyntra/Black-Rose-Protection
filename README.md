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

## Configuration (admin passcode & Discord webhooks)

These are set directly in the code — no Netlify dashboard/env var setup needed.
Edit **`netlify/functions/config.js`**:

```js
module.exports = {
    ADMIN_PASSCODE: "blackrose",
    CONTRACT_WEBHOOK_URL: "",
    APPLICATION_WEBHOOK_URL: ""
};
```

| Key | Purpose | Default if empty |
|---|---|---|
| `ADMIN_PASSCODE` | Password for the staff/admin terminal (`[ STAFF LOGIN ]`) | `blackrose` |
| `CONTRACT_WEBHOOK_URL` | Discord webhook URL — fires when a protection contract request is submitted | webhook step is skipped |
| `APPLICATION_WEBHOOK_URL` | Discord webhook URL — fires when a recruitment application is submitted | webhook step is skipped |

Save the file, commit, and redeploy for changes to take effect.

## Notes

- All site content (services, roster, add-ons, pricing) is edited live through
  the staff terminal and stored in a Netlify Blobs store called `brp_database`.
  It's shared across all visitors — there's no separate CMS.
- The default admin passcode is `blackrose` unless you change it in `config.js`.
  It's sent to the function in plaintext JSON over HTTPS — fine for an RP
  community site, but don't reuse it anywhere sensitive. Since it now lives in
  the codebase, don't commit a real/sensitive passcode to a public repo.
- `localStorage` is only used as an offline fallback cache; the source of
  truth is always the cloud store once a connection is available.
