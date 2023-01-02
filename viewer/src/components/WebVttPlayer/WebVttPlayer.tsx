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

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function WebVttPlayer(props: WebVttPlayerProps) {
    const [trackLoaded, setTrackLoaded] = useState(false);
    const [metatrackLoaded, setMetatrackLoaded] = useState(false);
    const [query, setQuery] = useState('');

    // TODO: determine if these should be set
    const [playing, setPlaying] = useState(false);

    const trackRef = useRef<TrackEvent>(null);
    const metatrackRef = useRef<TrackEvent>(null);

    const reactPlayerRef = useRef<ReactPlayerRef>(null);
    const nativePlayerRef = useRef<NativePlayerRef>(null);

    const preload = props.preload ? "true" : "false"

    //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
    // const { data, error } = useSWR('/api/staticdata', fetcher);

    //Handle the error state
    // if (error) console.log("Failed to load from SWR!"); //return <div>Failed to load</div>;
    //Handle the loading state
    // if (!data) console.log("Loading with SWR...")// return <div>Loading...</div>;

    useEffect(() => {
        // Get a reference to the track and metatrack elements
        // TODO: this manual timeout is extremely gross! figure out how to conditionally rendder <Transcript> and <Metadata> according to loading of these refs without this awful hard-coded thing. NextJs certainly supports something better for on-time ref loading (SWR? getProps?)
        function checkIfLoaded(tries = 0) {
            tries += 1
            const track = trackRef.current;
            const metatrack = metatrackRef.current;
            if (track && track.track && track.track.cues && track.track.cues.length > 0) {
                setTrackLoaded(true);
            }
            if (metatrack && metatrack.track && metatrack.track.cues && metatrack.track.cues.length > 0) {
                setMetatrackLoaded(true);
            }
            else if (!metatrackLoaded || !trackLoaded) {
                const wait = 25 * Math.pow(tries, 2)
                setTimeout(() => checkIfLoaded(tries), wait);
            }
        }
        checkIfLoaded();

    


    }, []);



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