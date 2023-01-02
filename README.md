# viewer
interactive player for MIT: REGRESSIONS, with footnotes, sources, and more

Currently using NextJS with create-t3-app and deploying to Vercel (https://vercel.com/regressions)

Uses react-player to play video in-browser, currently experimenting with [webvtt-player](https://github.com/umd-mith/webvtt-player) to display captions + sources + commentary + footnotes as the video plays!

TODO:
- create custom VTT schema with [OHMS support]() for our project's needs (implies ample unit testing and some E2E)
- create VTT builder so we can easily add sources (likely will be a light GUI, don't want to just do plain text editing of VTTs)
- create pretty caption playback

View current deployment at https://viewer-dukeeagle-regressions.vercel.app/