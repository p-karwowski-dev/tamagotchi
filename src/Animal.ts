import { gameConfig } from "./gameConfig"

export type AnimalType = "poodle" | "cat" | "bird"

export interface AnimalProps {
  name: string
  type: AnimalType
  hunger?: number
  happiness?: number
  sleepiness?: number
  id?: number
}

export class Animal {
  private name: string
  private type: AnimalType
  private hunger: number
  private happiness: number
  private sleepiness: number
  private id: number

  constructor({ name, type, hunger, happiness, sleepiness, id }: AnimalProps) {
    this.name = name
    this.type = type
    this.hunger = hunger ?? 50
    this.happiness = happiness ?? 50
    this.sleepiness = sleepiness ?? 50
    this.id = id || new Date().getTime()
  }

  private setWithMinMax(value: number): number {
    return value > 100 ? 100 : value < 0 ? 0 : value
  }

  private updateHunger(value: number): void {
    this.hunger = this.setWithMinMax(this.hunger + value)
  }

  private updateHappiness(value: number): void {
    this.happiness = this.setWithMinMax(this.happiness + value)
  }

  private updateSleepiness(value: number): void {
    this.sleepiness = this.setWithMinMax(this.sleepiness + value)
  }

  private modifier(value: number): number {
    return this.sleepiness == 100 || this.hunger == 100 ? value * 4 : value
  }

  private newAnimal(): Animal {
    return new Animal(this.getInfo)
  }

  get getInfo(): AnimalProps {
    return {
      name: this.name,
      type: this.type,
      hunger: this.hunger,
      happiness: this.happiness,
      sleepiness: this.sleepiness,
      id: this.id,
    }
  }

  public feed(): Animal {
    this.updateHunger(gameConfig.animals[this.type].feed)
    return this.newAnimal()
  }

  public play(): Animal {
    this.updateHappiness(gameConfig.animals[this.type].play)
    return this.newAnimal()
  }

  public sleep(): Animal {
    this.updateSleepiness(gameConfig.animals[this.type].sleep)
    return this.newAnimal()
  }

  public idle(): Animal {
    this.updateHunger(gameConfig.animals[this.type].noFeed)
    this.updateHappiness(this.modifier(gameConfig.animals[this.type].noPlay))
    this.updateSleepiness(gameConfig.animals[this.type].noSleep)
    return this.newAnimal()
  }
}
