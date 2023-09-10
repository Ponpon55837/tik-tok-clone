import { useRef, useEffect } from 'react'
import VideoCard from '@components/VideoCard'
import BottomNavbar from '@components/BottomNavbar'
import TopNavbar from '@components/TopNavbar'
import { useImmer } from 'use-immer'

interface Video {
  videos: {
    title: string
    cover: string
    play_url: string
  }[]
}

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement[]>([])
  const [state, produce] = useImmer<Video>({
    videos: [],
  })

  const { videos } = state

  // 儲存 video ref 陣列
  const handleVideoRef = (index: number) => (ref: HTMLVideoElement) => {
    if (ref) {
      videoRef.current[index] = ref
    }
  }

  // 取得 api 資料
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        'https://ubhp00gak0.execute-api.ap-northeast-1.amazonaws.com/for_you_list',
      )
      const data = await res.json()
      if (res.status === 200) {
        produce((draft) => {
          draft.videos = data?.items
        })
      } else {
        produce((draft) => {
          draft.videos = []
        })
        alert('error')
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null, // 指定觸發位置，這裡為預設值，代表視窗
      rootMargin: '-20px', // 指定觸發位置的偏移量，這裡為底部偏移 0px 觸發
      threshold: 0.8,
    }

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target as HTMLVideoElement
          videoElement.play()
        } else {
          const videoElement = entry.target as HTMLVideoElement
          videoElement.pause()
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions)

    // 使用observer.observe()觀察videoRef.current的影片進度
    videoRef.current?.length > 0 &&
      videoRef.current.forEach((videoRef) => {
        observer.observe(videoRef)
      })

    // disconnect observer
    return () => {
      observer.disconnect()
    }
  }, [videos])

  return (
    <div className="app">
      <div className="container">
        {videos?.length > 0 &&
          videos.map((video, index: number) => (
            <div key={index}>
              <TopNavbar profilePic={video.cover} title={video.title ?? ''} />
              <VideoCard
                videoRef={videoRef}
                url={video.play_url}
                setVideoRef={handleVideoRef(index)}
                autoplay={index === 0}
              />
            </div>
          ))}
        <BottomNavbar />
      </div>
    </div>
  )
}

export default App
