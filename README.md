# Black Rose Protection Website

This is a static HTML/CSS/JS website built for the fictional roleplay company, Black Rose Protection. It is fully data-driven using vanilla JavaScript and `localStorage`, meaning it requires no backend or database and can be hosted entirely for free on GitHub Pages.

## Features
- Premium, dark-themed, cyber-security responsive design.
- Contract Request & Recruitment Forms that securely log via unique IDs and timestamps.
- **Dynamic Content Engine**: Services, Roster, Packages, and Add-ons are rendered dynamically.
- **Admin Command Center**: A comprehensive control panel to Create, Read, Update, and Delete U.I items and view/manage submissions.
- Built-in JSON Backup Export/Import System.

## How the Admin Panel Works
Click the subtle **"[ STAFF LOGIN ]"** text at the very bottom right of the footer.
- **Demo Passcode:** `blackrose`

### ⚠️ Important Note on GitHub Pages Persistence
Because this site uses `localStorage`, any edits made in the Admin Dashboard (like changing prices or roster members) only save to the **current browser/device you are using**. 

**To update the public website for everyone:**
1. Make your edits in the Admin Dashboard to perfect how you want the site to look.
2. Go to the **Data Backup** tab in the admin panel and click **Export JSON Backup**.
3. Open `script.js` in a code editor.
4. Copy the newly exported JSON data into the `defaultData` variable at the top of the file.
5. Push your updated `script.js` to GitHub.

## How to Host on GitHub Pages (Free)
1. Create a free account on [GitHub](https://github.com/).
2. Click the `+` icon in the top right and select **New repository**.
3. Name it `blackrose-protection`. Leave it public.
4. Click **Create repository**.
5. Click **"uploading an existing file"** on the next screen.
6. Drag and drop the `index.html`, `style.css`, and `script.js` files into the box and commit the changes.
7. Go to the repository **Settings** tab (top right of the repo).
8. On the left sidebar, click **Pages**.
9. Under "Build and deployment" -> "Source", make sure it says "Deploy from a branch".
10. Under "Branch", change the dropdown from `None` to `main` (or `master`), and click **Save**.
11. Wait 1-2 minutes. GitHub will provide a link at the top of the Pages settings showing your live website.