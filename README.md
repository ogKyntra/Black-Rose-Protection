# Black Rose Protection Static Website

A GitHub Pages friendly website for the fictional roleplay company **Black Rose Protection**.

## Files

- `index.html` — public website
- `admin.html` — staff/admin dashboard
- `style.css` — full theme and layout
- `script.js` — public website, admin tools, calculator, local submissions, webhook sending, and export system
- `assets/` — logo, icon, and banner images

## Admin Access

Open `admin.html` and use this passcode:

```txt
blackrose
```

This is a static GitHub Pages website, so the passcode is stored in the frontend files. It is for roleplay/admin convenience, not strong real-world security.

## Editing Website Data

The admin dashboard lets you preview edits locally using your browser's localStorage.

You can edit:

- Site settings
- Services
- Add-ons
- Roster
- Cost settings
- Discord webhook URLs

To publish public content changes for everyone:

1. Open `admin.html`.
2. Make your edits.
3. Save changes.
4. Go to **Export script.js**.
5. Click **Export Updated script.js**.
6. Replace the real `script.js` in your GitHub repo with the exported one.
7. Commit/push the change.

The export system only replaces the `DEFAULT_DATA` block in `script.js`.

## Discord Webhooks

Webhook URLs are saved only in your browser localStorage and are **not exported** into `script.js`.

This is because GitHub Pages is frontend-only, so any webhook placed inside public code can be exposed. Use webhook support only if you accept that risk.

## Local Submissions

Contract requests and applications are saved locally in the browser that receives them. Since this is GitHub Pages only, submissions are not globally stored on a server.

If webhook URLs are configured in admin, contract/application submissions will also send to the chosen Discord channels.

## GitHub Pages Setup

1. Upload all files to your GitHub repository.
2. Make sure `index.html` is in the root.
3. Go to repository **Settings** → **Pages**.
4. Publish from the main branch.
5. Visit your GitHub Pages URL.

## Asset Paths

Images are expected here:

```txt
assets/logo.png
assets/icon.png
assets/banner.png
```

Keep those filenames or update the paths in `index.html`, `admin.html`, and `style.css`.
