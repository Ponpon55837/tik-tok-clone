import { useEffect } from 'react'

interface Video {
  videoRefs: any
  url: string
  autoplay: boolean
}

const VideoCard = ({ videoRefs, url, autoplay }: Video) => {
  useEffect(() => {
    videoRefs.current[0].play()
  }, [])

  return (
    <div className="video">
      <div className="video-player">
        <video
          controls
          className="video-player"
          src={url}
          ref={(element) => {
            if (element && !videoRefs.current.includes(element)) {
              videoRefs.current.push(element)
            }
          }}
          loop
          autoPlay={autoplay}
        />
      </div>
    </div>
  )
}

export default VideoCard
