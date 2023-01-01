import { useLayoutEffect, useState, useEffect, useRef } from 'react';
import dynamic from "next/dynamic";
// const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import Transcript from './Transcript'
import Metadata from './Metadata'
import Search from './Search'
const VideoPlayer = dynamic(() => import("../VideoPlayer"), { ssr: false });

type WebVttPlayerProps = {
    audio: string,
    videoUrl: string, // TODO: make naming scheme consistent lol
    transcript: string,
    metadataUrl: string,
    preload: boolean,
};

interface ReactPlayerRef {
    seeking: boolean;
    played: number;
    duration: number;
    seekTo: (time: number) => void;
}

interface NativePlayerRef {
    currentTime: number;
    ended: boolean;
    loop: boolean;
    muted: boolean;
    play: () => void;
}

export default function WebVttPlayer(props: WebVttPlayerProps) {
    const [trackLoaded, setTrackLoaded] = useState(false);
    const [metatrackLoaded, setMetatrackLoaded] = useState(false);
    const [query, setQuery] = useState('');

    // TODO: determine if these should be set
    const [currentTime, setCurrentTime] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [played, setPlayed] = useState(new Float64Array(0));
    const [playing, setPlaying] = useState(false);

    const trackRef = useRef(null);
    const metatrackRef = useRef(null);

    const reactPlayerRef = useRef<ReactPlayerRef>(null);
    const nativePlayerRef = useRef<NativePlayerRef>(null);

    const preload = props.preload ? "true" : "false"

    useLayoutEffect(() => {

        // Get a reference to the track and metatrack elements
        const track = trackRef.current;
        const metatrack = metatrackRef.current;

        // Check if the tracks are fully loaded
        if (track && track.track && track.track.cues && track.track.cues.length > 0) {
            setTrackLoaded(true);
        }
        if (metatrack && metatrack.track && metatrack.track.cues && metatrack.track.cues.length > 0) {
            setMetatrackLoaded(true);
        }

    }, [trackLoaded, metatrackLoaded]);



    // if we figure out how to get access to Track refs with react-player (even in YouTube videos! That would be awesome), then we can start using this 
    function reactPlayerSeek(secs: string) {

        if (reactPlayerRef.current) {
            reactPlayerRef.current.seekTo(parseFloat(secs))
        }
        setPlaying(true);
    }

    function seek(secs: number) {
        if (nativePlayerRef.current) {

            nativePlayerRef.current.currentTime = secs;
            nativePlayerRef.current.play();
        }
        setPlaying(true);
    }

    return (
        <>
            <div className="flex w-full overflow-hidden">
                <div className="w-1/2 player">
                    {/* <VideoPlayer playerRef={video} playing={playing} videoUrl={props.videoUrl} transcriptUrl={props.transcript} /> */}
                    {/* a vanilla video element with source and tracks. so much easier oh my god */}
                    <video
                        // width="75%"
                        preload={preload}
                        // ignore ref errors for now
                        ref={nativePlayerRef}
                        crossOrigin="anonymous"
                        controls={true}
                        autoPlay={true}
                    >
                        <source src={props.videoUrl} type="video/mp4" />
                        <track
                            ref={trackRef}
                            kind="subtitles"
                            src={props.transcript}
                            srcLang="en"
                            default={true}
                        />
                        <track default
                            kind="metadata"
                            src={props.metadataUrl}
                            ref={metatrackRef} />
                    </video>
                </div>
                <div className="w-1/2">
                    <div className="webvtt-player">
                        <div className="media h-1\/3">
                            <div className="tracks">
                                {trackLoaded ? (
                                    <>
                                        <Transcript
                                            url={props.transcript}
                                            seek={seek}
                                            track={trackRef.current.track}
                                            query={query}
                                        />
                                    </>
                                ) : (
                                    "Loading transcript..."
                                )}
                                {metatrackLoaded && props.metadataUrl ? (
                                    <>
                                        <Metadata
                                            url={props.metadataUrl}
                                            seek={seek}
                                            track={metatrackRef.current.track}
                                        />
                                    </>
                                ) : (
                                    "\nLoading metadata..." // TODO: make better logic for showing if we wanna serve metadata
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}