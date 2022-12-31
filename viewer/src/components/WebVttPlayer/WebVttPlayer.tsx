import React, { Component } from 'react'
import Transcript from './Transcript'
import Metadata from './Metadata'
import Search from './Search'
import './WebVttPlayer.module.css'

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

// type for props
type WebVttProps = {
  video: string,
  transcript: string,
  metadata: string,
  preload: boolean
}


interface VideoRef {
  seeking: boolean;
  played: number;
  duration: number;
  seekTo: (time: number) => void;
}

class WebVttPlayer extends Component<WebVttProps, { loaded: boolean, currentTime: number, query: string, seeking: boolean, played: Float64Array, playing: boolean }> {
  metatrack: React.RefObject<unknown>
  video: React.RefObject<unknown>
  audio: React.RefObject<unknown>
  track: React.RefObject<unknown>

  constructor(props: WebVttProps) {
    super(props)
    this.state = {
      loaded: false,
      currentTime: 0,
      query: '',
      seeking: false,
      played: new Float64Array(0),
      playing: false,
    }

    this.track = React.createRef()
    this.metatrack = React.createRef()
    this.audio = React.createRef()
    this.video = React.createRef();
    // const playerRef=useRef();
    
    this.onLoaded = this.onLoaded.bind(this)
    this.seek = this.seek.bind(this)
    this.checkIfLoaded = this.checkIfLoaded.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
  }

  componentDidMount() {
    this.checkIfLoaded()
  }

  handlePause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }


  render() {
    let track = null
    let metatrack = null
    if (this.state.loaded) {
      track = this.track.current.track
      metatrack = this.metatrack.current.track
      console.log("loaded video.current : ", this.video.current);
    }
    const preload = this.props.preload ? "true" : "false"
    const metadata = this.props.metadata
      ? <Metadata
        url={this.props.metadata}
        seek={this.seek}
        track={metatrack} />
      : ""

    return (
      <div className="webvtt-player">
        <div className="media">
          <div className="player">
            
            <ReactPlayer
              // a ref that works in our class component
              ref={this.video}
              controls={true}
              onPause={this.handlePause}
              crossOrigin="anonymous"
              className="react-player"
              url="https://youtu.be/TGKk3iwoI9I"
              onSeek={e => console.log('onSeek', e)}
              onProgress={this.handleProgress}
            />
            <audio
              controls
              crossOrigin="anonymous"
              onLoad={this.onLoaded}
              preload={preload}
              ref={this.audio}>
              <source src={this.props.audio} />
              <track default
                kind="subtitles"
                src={this.props.transcript}
                ref={this.track} />
              <track default
                kind="metadata"
                src={this.props.metadata}
                ref={this.metatrack} />
            </audio>
          </div>
          <div className="tracks">
            <Transcript
              url={this.props.transcript}
              seek={this.seek}
              track={track}
              query={this.state.query} />
            {metadata}
          </div>
          <Search query={this.state.query} updateQuery={this.updateQuery} />
        </div>
      </div>
    )
  }

  onLoaded() {
    this.setState({ loaded: true })
  }

  checkIfLoaded(tries = 0) {
    tries += 1
    const e = this.track.current
    if (e && e.track && e.track.cues && e.track.cues.length > 0) {
      this.onLoaded()
    } else if (!this.state.loaded) {
      const wait = 25 * Math.pow(tries, 2)
      setTimeout(this.checkIfLoaded, wait, tries)
    }
  }

  // handleSeekMouseDown = e => {
  //   this.setState({ seeking: true })
  // }

  // handleSeekChange = e => {
  //   this.setState({ played: parseFloat(e.target.value) })
  // }

  // handleSeekMouseUp = e => {
  //   this.setState({ seeking: false })
  //   this.player.seekTo(parseFloat(e.target.value))
  // }

  handleProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  // ORIGINAL
  seek(secs: number) {
    // scrub audio
    this.audio.current.currentTime = secs
    this.audio.current.play()

    // scrub video
    this.setState({ seeking: true })
    console.log("this.video", this.video);
    this.video.current?.seekTo(parseFloat(secs)) // TODO: should probs refactor ref to this.player

  }

  updateQuery(query: string) {
    this.setState({ query: query })
  }

}

export default WebVttPlayer