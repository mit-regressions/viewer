import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

// functional component PlayerReact that uses ReactPlayer

// TODO: parameterize video source and VTT source with props (general spec for 3rd party use!)
export default function Player() {
    return (
        <div className="player-wrapper">
        <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=mToftr444Pc"
            width="100%"
            height="100%"
        />
        </div>
    );
}
