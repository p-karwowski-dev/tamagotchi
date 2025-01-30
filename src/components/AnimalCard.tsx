import { memo } from "react"
import { AnimalProps } from "../logic/Animal"
import { useAnimal, useAppContext } from "../state/context"

export const Animal = memo(({ id }: { id: string }) => {
  const animal = useAnimal(id)
  const { dispatch } = useAppContext()
  const { name, type, hunger, happiness, sleepiness } =
    animal.getInfo as AnimalProps

  const act = (type: "FEED" | "REST" | "PLAY") => () => {
    dispatch({ type, payload: { id } })
  }

  return (
    <div className="animal-container">
      <div>
        <img src={`${type}.svg`} alt="Your animal" className="animal-image" />
        <h1>{name}</h1>
      </div>
      <div className="animal-stats">
        <div className="stat">
          <strong>Hunger:</strong>
          <div className="meter">
            <div className="meter-fill" style={{ width: hunger + "%" }}></div>
          </div>
          <button onClick={act("FEED")} className="action-button">
            Feed
          </button>
        </div>
        <div className="stat">
          <strong>Happiness:</strong>
          <div className="meter">
            <div
              className="meter-fill"
              style={{ width: happiness + "%" }}
            ></div>
          </div>
          <button onClick={act("PLAY")} className="action-button">
            Play
          </button>
        </div>
        <div className="stat">
          <strong>sleepiness:</strong>
          <div className="meter">
            <div
              className="meter-fill"
              style={{ width: sleepiness + "%" }}
            ></div>
          </div>
          <button onClick={act("REST")} className="action-button">
            Rest
          </button>
        </div>
      </div>
    </div>
  )
})
