import React, { Component } from 'react'
import MetadataPoint from './MetadataPoint'

class Metadata extends Component<MetadataProps> {

  render() {
    const lines = []
    if (this.props.track && this.props.track.cues) {
      for (let i = 0; i < this.props.track.cues.length; i++) {
        lines.push(
          <MetadataPoint
            key={`point-${i}`}
            cue={this.props.track.cues[i]} 
            active={false} 
            seek={this.props.seek} />
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

type MetadataProps = {
  url: string,
  track: TextTrack,
  seek: (time: number) => void
}

export default Metadata