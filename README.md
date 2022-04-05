# pleromar

Views your exported data from Pleroma

## Intro

Pleroma now offers [a backend API](https://docs-develop.pleroma.social/backend/development/API/pleroma_api/#create-a-user-backup-archive) to export user data backups. If you manages to request the archive (well, somehow, since the API is not yet exposed in the frontend), you may view it with pleromar.

## Usage

Pleromar is now available at [pleromar.vercel.app](pleromar.vercel.app).

To use it, you have to do the extraction yourself first, then click the `Start!` button in the web page, and select the files you want to view.

* `actor.json`: This file stores your account profile (avatar, name, etc.). Since your images (avatars and backgrounds) are stored instead on your instance server, you might want to make sure that your instance is still up.
* `outbox.json`: To view this file, you need to select `actor.json` first. You may specify the scope of which you want to view your toots (or notes, status, or whatsoever) with the checkboxes in the top right corner.
* `likes.json`: Your likes. Note that you are to deal with the copyright issues yourself.
* `bookmarks.json`: Your bookmarks.

After clicking the `I'm Done` button or having selected all the four files, the control buttons, checkboxes and the pleromar headings will be removed and now you may use your browser to archive the whole page (try `Ctrl+S`).

## Workaround

Unlike Mastodon, archives from Pleroma do not contain the media files in toots and profiles, so we need to load online resources when viewing the archive.

### CORS

Since it fetches contents across domains, you will very like need to workaround this with, for example, [CORS Everywhere](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/).

### Download for Offline

Well it seems only [Firefox](https://www.mozilla.org/en-US/firefox/) supports download the whole page along with all its resources. And this means:
* With Firefox, if you save the whole page with `Ctrl+S` or the `Save page as...` button, I guarantee that your downloaded page is fully functional offline.
* With Chromium (I did not test with Chrome), your saved page will still load online resources (images mostly). If your server is to be shutdown, your images will then be gone.
