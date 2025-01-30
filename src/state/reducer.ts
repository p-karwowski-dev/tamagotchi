import { Animal } from "../logic/Animal"
import { Action, AnimalsRecord } from "./context"

export const reducer = (
  state: AnimalsRecord,
  action: Action
): AnimalsRecord => {
  switch (action.type) {
    case "CREATE_ANIMAL": {
      const { name, type } = action.payload
      if (name && type) {
        const animal = new Animal({ name, type })
        const id = animal.getInfo.id as string
        return { ...state, [id]: animal }
      }
      return state
    }
    case "FEED":
      return { ...state, [action.payload.id]: state[action.payload.id].feed() }
    case "REST":
      return { ...state, [action.payload.id]: state[action.payload.id].rest() }
    case "PLAY":
      return { ...state, [action.payload.id]: state[action.payload.id].play() }
    case "IDLE":
      return { ...state, [action.payload.id]: state[action.payload.id].idle() }
    default:
      return state
  }
}
