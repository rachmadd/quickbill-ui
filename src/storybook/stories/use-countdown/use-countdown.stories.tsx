import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useCountdown } from '@/components/hooks/use-countdown'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/core/typography'

const meta: Meta = {
  title: 'Hooks/useCountdown',
  tags: ['autodocs'],
}

export default meta

type CountdownViewProps = {
  days: string
  hours: string
  minutes: string
  seconds: string
  isFinished: boolean
}

const CountdownView = ({ days, hours, minutes, seconds, isFinished }: CountdownViewProps) => {
  const segments = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ]

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        {segments.map((seg, i) => (
          <div key={seg.label} className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-qb-mist-90 font-mono text-4xl font-bold tabular-nums">
                {seg.value}
              </span>
              <Typography level="sm" className="text-qb-mist-60 mt-1">
                {seg.label}
              </Typography>
            </div>
            {i < segments.length - 1 && (
              <span className="text-qb-mist-40 font-mono text-4xl font-bold">:</span>
            )}
          </div>
        ))}
      </div>
      {isFinished && (
        <Typography level="md" className="font-semibold text-green-600">
          Countdown finished!
        </Typography>
      )}
    </div>
  )
}

export const Default: StoryObj = {
  render: () => {
    // 60 seconds
    const [targetTime] = useState(() => Date.now() + 60 * 1000)
    const { isFinished, days, hours, minutes, seconds: secs } = useCountdown(targetTime)
    return (
      <CountdownView
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={secs}
        isFinished={isFinished}
      />
    )
  },
}

export const WithDays: StoryObj = {
  render: () => {
    // 3 days
    const threeDaysInSeconds = 3 * 86400 * 1000
    const [targetTime] = useState(() => Date.now() + threeDaysInSeconds)
    const { isFinished, days, hours, minutes, seconds: secs } = useCountdown(targetTime)
    return (
      <CountdownView
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={secs}
        isFinished={isFinished}
      />
    )
  },
}

export const WithOnFinished: StoryObj = {
  render: () => {
    const oneMinute = 60 * 1000
    const [finished, setFinished] = useState(false)
    const [targetTime, setTargetTime] = useState(() => Date.now() + oneMinute)
    // set the onFinished as second parameter of useCountdown
    const {
      isFinished,
      days,
      hours,
      minutes,
      seconds: secs,
    } = useCountdown(targetTime, () => {
      setFinished(true)
    })

    return (
      <div className="flex flex-col items-center gap-6">
        <CountdownView
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={secs}
          isFinished={isFinished}
        />
        <Button
          variant="outline"
          onClick={() => {
            setFinished(false)
            // recount
            setTargetTime(Date.now() + oneMinute)
          }}
        >
          Restart
        </Button>
        {finished && (
          <Typography level="md" className="font-semibold text-green-600">
            onFinished called!
          </Typography>
        )}
      </div>
    )
  },
}
