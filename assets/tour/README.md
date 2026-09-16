# Product tour media

The home page tour section loads two files from this folder, by these exact names:

- `CAMIWORKS_Website_Loop.mp4` (H.264, 1920 by 1080, silent, built to loop)
- `CAMIWORKS_Website_Loop_poster.jpg` (the poster image, 1920 by 1080)

They are served as they are, with no re-encoding, from the site's own origin. `npm test` checks that both are present.
