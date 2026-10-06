# Harry Copeman portfolio

The responsive image grid reads image and uploaded video blocks from the private Are.na portfolio channel.
Captions use each image’s description, falling back to its title.

## Hosting

The `/api/portfolio` endpoint is a Vercel serverless function. In the Vercel
project’s Settings → Environment Variables, add `ARENA_ACCESS_TOKEN` with an
Are.na personal access token that can read the channel, then deploy again.
Do not put the token in client JavaScript or commit it to Git.

The channel stays private on Are.na. Images and captions returned by the gallery
endpoint are publicly visible on the website.

For a local preview, set `ARENA_ACCESS_TOKEN` in the ignored `.env.local` file
and run `npm run dev` with Node.js 24 or later. Open http://127.0.0.1:3000.
No Vercel account or deployment is needed. The local server binds only to your computer
and serves the page, public assets, and the gallery API; it does not serve secret files.
If hosted elsewhere, deploy `api/portfolio.js` through that host’s server-function
adapter and supply the same environment variable.

Uploaded videos autoplay muted and loop inline when visible, including in the lightbox.
Offscreen videos pause to reduce background work.
