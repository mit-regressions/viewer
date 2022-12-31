import { useRouter } from 'next/router';
import WebVttPlayerFunctional from "./WebVttPlayer/WebVttPlayerFunctional";

// functional component PlayerReact that uses ReactPlayer
// TODO: better parameterize video source and VTT source with props (general spec for 3rd party use!). must define spec.
export default function Player() {

    const router = useRouter();

    const videoUrl = '/data/MIT Regressions intro video.mp4' // BIZARRE BUG: react-player component only works when I live-reload URL to valid path. if Chrome loads directly, then returns "failed to load media".
    const audioUrl = router.asPath + 'data/MIT Regressions intro audio.mp3'
    const transcriptUrl = router.asPath + "data/MIT Regressions intro captions.vtt"
    const metadataUrl = router.asPath + "data/MIT Regressions intro metadata.vtt"

    return (
        <>
            <div id="control-panel" className="flex flex-row">
                    <button id="show-metadata" className="bg-gray-200 hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4">Show Metadata</button>
            </div>
            <WebVttPlayerFunctional
                preload={false}
                audio={audioUrl}
                videoUrl={videoUrl}
                transcript={transcriptUrl}
                metadataUrl={metadataUrl}
            />
        </>
    );
}
