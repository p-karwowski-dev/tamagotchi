import "./App.css"
import { useState } from "react"
import { Animal } from "./components/AnimalCard"
import { NewCard } from "./components/NewCard"
import { useAppContext } from "./state/context"

function App() {
  const [areAnimalsShown, showAnimals] = useState(true)
  const { animalsRecord } = useAppContext()
  const animalIds = Object.keys(animalsRecord)

  return (
    <div className="animal-page">
      <div className="button-wrapper">
        <button onClick={() => showAnimals(false)}>Add Animal</button>
      </div>

      <div className="animal-wrapper">
        {areAnimalsShown && animalIds.length ? (
          animalIds.map((id) => <Animal key={id} id={id} />)
        ) : (
          <NewCard close={() => showAnimals(true)} />
        )}
      </div>
    </div>
  )
}

export default App
