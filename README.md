# documentary metadata viewer v0.1
interactive player for [MIT: REGRESSIONS](https://regressions.net), with footnotes, music, and footage sources revealing themselves as they appear in the movie. This viewer can be extended to support any source-heavy film or documentary! 

<img width="1777" alt="image" src="https://user-images.githubusercontent.com/10426513/210282642-36142be5-a12c-4895-8cdf-a878e243cb81.png">


This player reads transcript and metadata from a user-supplied [.VTT file](https://www.w3.org/TR/webvtt1/).

Snippet of .VTT metadata used in the [current demo](https://viewer-dukeeagle-regressions.vercel.app/):

```vtt
00:00:45.601 --> 00:00:47.499
{
    "uid": "3",
    "type": "video_source",
    "data": {
        "type": "video_source",
        "title": "MIT: Progressions",
        "artist": "David and Sheri Espar",
        "year": "1969",
        "notes": "AI-upscaled and frame-interpolated",
        "retrieved_from": "Kenneth Friedman (YouTube)",
        "hyperlink": "https://www.youtube.com/watch?v=p3mq5E0GwLA&ab_channel=KennethFriedman"
    }
}
```

Metadata is read according to this custom schema:


### State of project

This project has lots of work remaining! We are proud present our initial v0.1 of the viewer as a proof-of-concept. Roadmap:
- [x] custom .VTT schema defined and implemented
- [x] custom .VTT viewer with bindings to video player implemented
- [ ] "timeline" view for easier metadata viewing at-a-glance
- [ ] custom .VTT metadata populator GUI for easily labeling large movies / videos (This will be necessary for precesely labeling all 3.5 hours of MIT: REGRESSIONS!)

This repo also needs proper CI, testing, linting, and refactoring in order to be reliable in the long-term. #1 priority is clearing tech debt before new features!

# Live demo!
🚀 View current deployment at https://viewer-dukeeagle-regressions.vercel.app/
 
Bult on top of the excellent [webvtt-player](https://github.com/umd-mith/webvtt-player), which just supports audio metadata and transcription viewing. Converted this package to Typescript and a more modern, functional React format.

Built with create-t3-app and deploying to Vercel (https://vercel.com/regressions)

# Full schema definition
See [`./viewer/metadata_schema.md`](https://github.com/mit-regressions/viewer/blob/main/viewer/metadata_schema.md) for full definition of our custom .VTT metadata format
