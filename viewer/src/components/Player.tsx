import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/router';
import { Player as WebVttPlayer } from "webvtt-player";

// functional component PlayerReact that uses ReactPlayer
// TODO: parameterize video source and VTT source with props (general spec for 3rd party use!). must define spec.
export default function Player() {
    
    // get files in directory "../../data" without using fs
    const router = useRouter();

    const audioUrl = router.asPath + 'data/MIT Regressions intro audio.mp3'
    const transcriptUrl = router.asPath + "data/MIT Regressions intro captions.vtt"
    const metadataUrl = router.asPath + "data/MIT Regressions intro metadata.vtt"

    return (
        <>
            <div className="player-wrapper">
                <ReactPlayer
                    className="react-player"
                    url="https://youtu.be/TGKk3iwoI9I"
                    width="100%"
                    height="100%"
                    config={{
                        file: {
                            tracks: [
                                {
                                    kind: 'subtitles',
                                    label: 'test',
                                    src: 'subs/mit regressions subtitles unfinished.vtt',
                                    srcLang: 'en',
                                    default: true
                                },
                            ]
                        }
                    }}
                />
            </div>
            <WebVttPlayer
                audio={audioUrl}
                transcript={transcriptUrl}
                metadata={metadataUrl} />
        </>
    );
}
