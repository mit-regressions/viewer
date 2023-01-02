import React, { Component } from 'react'
import TranscriptLine from './TranscriptLine'
// import './Track.css' // currently exists in global instead. TODO: consolidate this styling

class Transcript extends Component<TranscriptProps> {

  render() {
    const lines = []
    if (this.props.track && this.props.track.cues) {
      for (let i = 0; i < this.props.track.cues.length; i++) {
        lines.push(
          <TranscriptLine
            key={`line-${i}`}
            cue={this.props.track.cues[i]}
            active={false}
            seek={this.props.seek}
            query={this.props.query} />
        )
      }
    }
    return (
      <div className="track">
        {lines}
      </div>
    )
  }

}

type TranscriptProps = {
  track: TextTrack,
  url: string,
  seek: (time: number) => void,
  query: string
}

export default Transcript