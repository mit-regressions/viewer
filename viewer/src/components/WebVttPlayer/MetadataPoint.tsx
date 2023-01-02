import React, { Component } from 'react'
// import './MetadataPoint.css'



type MetadataPointProps = {
  cue: VTTCue
  active: boolean
  seek: (time: number) => void
}

interface MetadataPointData {
  "uid": string,
  "type": string,
  // data is one of four interfaces: music, commentary, transcript, or video_source
  "data": MusicData | CommentaryData | TranscriptData | VideoSourceData | NarrationSourceData | OhmsData
}

interface MusicData {
  "type": "music",
  "title": string,
  "title_alt": string,
  "artist": string,
  "year": string,
  "label": string,
  "hyperlink": string,
}

interface CommentaryData {
  "type": "commentary",
  "text": string, // may contain VTT-compatible styling, as specified at https://www.w3.org/TR/webvtt1/#model-overview
}

interface TranscriptData {
  "type": "transcript",
  "text": string, // may contain VTT-compatible styling, as specified at https://www.w3.org/TR/webvtt1/#model-overview
}

interface VideoSourceData {
  "type": "video_source",
  "title": string,
  "artist": string, // optional - may be empty string
  "attribution": string,
  "year": string,
  "notes": string,
  "retrieved_from": string,
  "hyperlink": string,
}

interface NarrationSourceData {
  "type": "narration_source",
  "title": string,
  "attribution": string,
  "year": string,
  "retrieval_date": string,
  "source_type" : string, // PDF, etc

  "hyperlink": string,
}

 // adopting the OHMS standard http://ohda.matrix.msu.edu/2014/11/indexing-interviews-in-ohms/
interface OhmsData {
  "type": "ohms",
  "title": string,
  "title_alt": string,
  "synopsis": string,
  "synopsis_alt": string,
  "keywords": string,
  "keywords_alt": string,
  "subjects": string,
  "subjects_alt": string,
  "gpspoints": {
    "gps": string,
    "gps_zoom": string,
    "gps_text": string,
    "gps_text_alt": string
  },
  "hyperlinks": {
    "hyperlink": string,
    "hyperlink_text": string,
    "hyperlink_text_alt": string
  }
}
class MetadataPoint extends Component<MetadataPointProps, { isActive: boolean}> {

  
  constructor(props: MetadataPointProps) {
    super(props)
    this.state = {
      isActive: false
    }
    this.props.cue.onenter = this.onEnter.bind(this)
    this.props.cue.onexit = this.onExit.bind(this)
    this.onClick = this.onClick.bind(this)
    // get current theme (but in a class component)
  }

  render() {
    let style = ''
    if (this.state.isActive) {
      // active
      style = "bg-gray-200"
    }
    // exect JSON.parse data to be of type MetadataPointData
    const point = JSON.parse(this.props.cue.text) as MetadataPointData
    const data = point.data

    let song = null
    let footage = null

    // get type of data
    if (point.type == "music") {
      // const song is point.data as MusicData
      song = data as MusicData
    }

    if (point.type == "video_source") {
      footage = data as VideoSourceData
    }

    return (
      <div className={`point ${style}`}>
        <div className="time" onClick={this.onClick}>
        [{this.startTime()} - {this.endTime()}]
        </div>
        <div className="text">
          {point.type == "music" &&
            <div className="music" onClick={this.onClick}>
                <SongCard song={song} />
            </div>
        }
        {point.type == "video_source" &&
          <div className="footage" onClick={this.onClick}>
                <VideoSourceCard videoSource={footage} />
          </div>
        }
        </div>
      </div>
    )
  }

  onClick() {
    this.props.seek(this.props.cue.startTime)
  }

  startTime() {
    return this.formatSeconds(this.props.cue.startTime)
  }

  endTime() {
    return this.formatSeconds(this.props.cue.endTime)
  }

  onEnter() {
    this.setState({isActive: true})
  }

  onExit() {
    this.setState({isActive: false})
  }

  formatSeconds(t) {
    let mins = Math.floor(t / 60)
    if (mins < 10) {
      mins = `0${mins}`
    }

    let secs = Math.floor(t % 60)
    if (secs < 10) {
      secs = `0${secs}`
    }

    return `${mins}:${secs}`
  }

}

const VideoSourceCard: React.FC<VideoSourceData> = ({videoSource}) => {
  return (
    <div className="bg-white shadow-md p-4">
      <h2 className="text-lg font-bold">{videoSource.title}</h2>
      <div className="text-gray-600">
        <p className="mb-1">{videoSource.artist}</p>
        <p className="mb-1">{videoSource.year}</p>
        {/* render the html that may be inside of {videoSource.notes} */}
        <div className="mb-1" dangerouslySetInnerHTML={{__html: videoSource.notes}} />
      </div>
      <a
        href={videoSource.hyperlink}
        className="top-0 right-0 bottom-0 bg-gray-500 hover:bg-gray-400 text-white text-xs font-bold px-3 py-1"
      >
        Link
      </a>
    </div>
  );
};

// TODO: fix typing
const SongCard: React.FC<MusicData> = ({song}) => {
  return (
    <div className="bg-yellow-50 shadow-md p-4">
      <h2 className="text-lg font-bold">{song.title}</h2>
      <div className="text-gray-600">
        <p className="mb-1">{song.artist}</p>
        <p className="mb-1">{song.year}</p>
        <p className="mb-1">{song.label}</p>
      </div>
    </div>
  );
};

export default MetadataPoint