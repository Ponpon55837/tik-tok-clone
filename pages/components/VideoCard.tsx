interface Video {
  videoRef: any;
  url: string;
  setVideoRef: any;
  autoplay: boolean;
}

const VideoCard = ({ videoRef, url, setVideoRef, autoplay }: Video) => {
  return (
    <div className="video">
      <div className="video-player">
        <video
          controls
          className="video-player"
          src={url}
          ref={(ref) => {
            videoRef.current = ref;
            setVideoRef(ref);
          }}
          loop
          autoPlay={autoplay}
        />
      </div>
    </div>
  );
};

export default VideoCard;
