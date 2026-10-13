'use client'

import { useEffect, useRef, useState } from 'react'

type CountdownReturn = {
  isFinished: boolean
  days: string
  hours: string
  minutes: string
  seconds: string
}

/**
 * Counts down from a target Unix timestamp.
 *
 * @param targetTime - Target time in milliseconds (Unix timestamp)
 * @param onFinished - Optional callback invoked when the countdown finishes
 */
export function useCountdown(targetTime: number, onFinished?: () => void): CountdownReturn {
  const [timeLeft, setTimeLeft] = useState(() => targetTime - Date.now())
  const isFinished = timeLeft <= 0
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null)
  const onFinishedRef = useRef(onFinished)

  useEffect(() => {
    onFinishedRef.current = onFinished
  })

  useEffect(() => {
    setTimeLeft(targetTime - Date.now())

    const interval = setInterval(() => {
      const remaining = targetTime - Date.now()
      setTimeLeft(remaining)
      if (remaining <= 0) {
        clearInterval(interval)
        onFinishedRef.current?.()
      }
    }, 1000)

    intervalRef.current = interval

    return () => clearInterval(interval)
  }, [targetTime])

  const formatTime = (ms: number) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000))
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor(totalSeconds / 60) % 60
    const seconds = totalSeconds % 60

    return { days, hours, minutes, seconds }
  }

  const { days, hours, minutes, seconds } = formatTime(timeLeft)

  return {
    isFinished,
    days: days < 10 ? `0${days}` : `${days}`,
    hours: hours < 10 ? `0${hours}` : `${hours}`,
    minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
    seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
  }
}
