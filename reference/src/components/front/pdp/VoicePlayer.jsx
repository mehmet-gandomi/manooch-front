import { useState, useRef, useEffect } from 'react'
import playCircleIcon from '../../../assets/images/front/pdp/play-circle.svg'

const WAVEFORM_HEIGHTS = [6, 16, 12, 12, 20, 20, 14, 14, 14, 18, 14, 24, 20, 14, 18, 10, 10]

const VoicePlayer = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const mockTimerRef = useRef(null)

  const handleToggle = () => {
    if (isPlaying) {
      audioRef.current?.pause()
      clearTimeout(mockTimerRef.current)
      setIsPlaying(false)
      return
    }
    if (audioSrc) {
      const audio = new Audio(audioSrc)
      audioRef.current = audio
      audio.onended = () => setIsPlaying(false)
      audio.play().catch(() => {})
    } else {
      mockTimerRef.current = setTimeout(() => setIsPlaying(false), 4000)
    }
    setIsPlaying(true)
  }

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      clearTimeout(mockTimerRef.current)
    }
  }, [])

  return (
    <button
      onClick={handleToggle}
      className="bg-bg-base rounded-xl px-2 py-1 flex items-center gap-2 shrink-0"
      title={isPlaying ? 'توقف پخش' : 'پخش صدا'}
    >
      <img src={playCircleIcon} alt="پخش" className="w-5 h-5 shrink-0" />
      <div className={`flex items-center gap-0.5 ${isPlaying ? 'animate-pulse' : ''}`}>
        {WAVEFORM_HEIGHTS.map((h, i) => (
          <div
            key={i}
            className="w-0.5 rounded-full shrink-0 bg-primary"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
    </button>
  )
}

export default VoicePlayer
