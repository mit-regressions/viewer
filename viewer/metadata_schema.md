### Base data point

```jsx
{
  "start": "",
  "end": "",
  "uid": "",
  "type": "music" | "commentary" | "transcript" | "video_source" | "narration_source" | "ohms"
  "data": {}
}

```

### Special data types

##### music

```jsx
{
	"type": "music"
	"title": "",
	"artist": "",
	"year": ""

	"hyperlink": ""
}
```

##### **transcript**

```jsx
{
	"type": "transcript"
	"text": "", // note: may contain VTT-compatible styling 
}
```

##### **footage_source**

```jsx
{
	"type": "footage_source",
	"title": ""
  "attribution": "",
	"year": ""

	"hyperlinks": {
    "hyperlink": "http://example.org",
    "hyperlink_text": "",
    "hyperlink_text_alt":, ""
	}
}
```

##### **narration_source**

```jsx
{
	"type": "narration_source"
	"title": ""
  "attribution": "",
	"year": ""

	"hyperlinks": {
    "hyperlink": "http://example.org",
    "hyperlink_text": "",
    "hyperlink_text_alt":, ""
	}
}
```

##### **ohms** (or **general_concept**) 

Based on [oral history metadata standard](http://ohda.matrix.msu.edu/2014/11/indexing-interviews-in-ohms/)

```jsx
{ // directly copied from webvtt-player (which copies the OHMS standard)
  "title": "",
  "title_alt": "",
  "synopsis": "",
  "synopsis_alt": "",
  "keywords": "",
  "keywords_alt": "",
  "subjects": "",
  "subjects_alt": "",
  "gpspoints": {
    "gps": "00.0000000, 00.0000000",
    "gps_zoom": "0",
    "gps_text": "",
    "gps_text_alt": ""
  },
  "hyperlinks": {
    "hyperlink": "http://example.org",
    "hyperlink_text": "",
    "hyperlink_text_alt":, ""
  }
}
```
