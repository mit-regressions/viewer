import ReactPlayer from "react-player/lazy";
// import CustomReactPlayer from "./CustomReactPlayer";

interface PlayerRef {
    seeking: boolean;
    played: number;
    duration: number;
    seekTo: (time: number) => void;
}
// inherit prop playing from parent component
export default function VideoPlayer({ playerRef, playing, videoUrl, transcriptUrl }: { playerRef: React.RefObject<PlayerRef>, playing: boolean, videoUrl: string, transcriptUrl: string }) {
    // ReactPlayer.addCustomPlayer(CustomReactPlayer);
    return (
        <ReactPlayer
            ref={playerRef}
            crossOrigin="anonymous"
            playing={playing}
            controls={true}
            // url="https://youtu.be/TGKk3iwoI9I"
            url={videoUrl}
            onSeek={e => console.log('onSeek', e)}
            config={{
                file: {
                    forceVideo: true,
                    tracks: [
                        {   
                            label: 'English',
                            kind: 'captions',
                            src: transcriptUrl,
                            srcLang: 'en',
                            default: true,
                        },
                    ],
                },
            }}
        />
    );
}