/* eslint-disable react-refresh/only-export-components */
import { createContext, FC, ReactNode, useContext, useReducer } from "react"
import { Animal, AnimalType } from "../logic/Animal"
import { reducer } from "./reducer"

export type Action =
  | { type: "CREATE_ANIMAL"; payload: { name: string; type: AnimalType } }
  | { type: "FEED" | "REST" | "PLAY" | "IDLE"; payload: { id: string } }

export type AnimalsRecord = Record<string, Animal>

interface AppContext {
  animalsRecord: AnimalsRecord
  dispatch: React.ActionDispatch<[action: Action]>
}

interface AppContextProviderProps {
  children: ReactNode
}

const appContext = createContext<AppContext | null>(null)

export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}) => {
  const [animalsRecord, dispatch] = useReducer(reducer, {})

  return (
    <appContext.Provider value={{ animalsRecord, dispatch }}>
      {children}
    </appContext.Provider>
  )
}

export const useAppContext = (): AppContext => {
  const context = useContext(appContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider")
  }
  return context
}

export const useAnimal = (id: string): Animal => {
  const { animalsRecord } = useAppContext()
  const animal = animalsRecord[id]
  if (!animal) {
    throw new Error(`Animal with id ${id} not found`)
  }
  return animal
}
