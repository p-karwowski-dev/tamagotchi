import { useState } from "react"
import { useAppContext } from "../state/context"
import { AnimalType } from "../logic/Animal"

interface NewCardProps {
  close: () => void
}

export const NewCard = ({ close }: NewCardProps) => {
  const [name, setName] = useState("")
  const { dispatch } = useAppContext()

  const addAnimal = (type: AnimalType) => {
    dispatch({ type: "CREATE_ANIMAL", payload: { name, type } })
    close()
  }

  return (
    <div className="animal-container">
      <h2 id="animal name">Choose the name</h2>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        aria-labelledby="animal name"
        placeholder="Type the name here"
      />
      {name && (
        <>
          <h1>Pick the type!</h1>
          <div className="animal-animal">
            <img
              onClick={() => addAnimal("bird")}
              src="bird.svg"
              alt="bird image"
              className="animal-image-small"
            />
            <img
              onClick={() => addAnimal("cat")}
              src="cat.svg"
              alt="cat image"
              className="animal-image-small"
            />
            <img
              onClick={() => addAnimal("dog")}
              src="dog.svg"
              alt="dog image"
              className="animal-image-small"
            />
          </div>
        </>
      )}
    </div>
  )
}
