import { ReactNode, useEffect, useRef, useState } from "react"
import { gameConfig } from "./gameConfig"
import { useAppContext } from "../state/context"

export const GameLoop = ({ children }: { children: ReactNode }) => {
  const timerRef = useRef<number | null>(null)
  const [ticks, setTicks] = useState<number>(0)
  const { animalsRecord, dispatch } = useAppContext()

  function stopGameLoop() {
    if (timerRef.current) clearInterval(timerRef.current)
  }

  useEffect(() => {
    Object.keys(animalsRecord).forEach((id) => {
      dispatch({ type: "IDLE", payload: { id } })
    })
  }, [ticks])

  useEffect(() => {
    if (timerRef.current) stopGameLoop()

    timerRef.current = setInterval(() => {
      setTicks((prev: number) => prev + 1)
    }, gameConfig.speed)

    return () => {
      if (timerRef.current) stopGameLoop()
    }
  }, [])

  return children
}
