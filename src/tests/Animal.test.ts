import { Animal, AnimalProps } from "../logic/Animal"

describe("Animal", () => {
  let animal: Animal

  beforeEach(() => {
    animal = new Animal({ name: "Kitty", type: "cat" })
  })

  test("Creates instance of Animal with provided name and type", () => {
    expect(animal).toBeInstanceOf(Animal)
    expect(animal.getInfo.name).toBe("Kitty")
    expect(animal.getInfo.type).toBe("cat")
  })

  test("Playing with animals makes them happy", () => {
    animal = animal.play()
    expect(animal.getInfo.happiness).toBeGreaterThan(50)
  })

  test("Feeding animals makes them less hungry", () => {
    animal = animal.feed()
    expect(animal.getInfo.hunger).toBeLessThan(50)
  })

  test("Resting animals makes them less sleepy", () => {
    animal = animal.rest()
    expect(animal.getInfo.sleepiness).toBeLessThan(50)
  })

  test("Animals start neutral on all metrics", () => {
    expect(animal.getInfo).toEqual({
      name: "Kitty",
      type: "cat",
      hunger: 50,
      happiness: 50,
      sleepiness: 50,
      id: animal.getInfo.id,
    })
  })

  test("Happiness should decrease over time", () => {
    animal = animal.idle()
    expect(animal.getInfo.happiness).toBeLessThan(50)
  })

  test("Hunger should increase over time", () => {
    animal = animal.idle()
    expect(animal.getInfo.hunger).toBeGreaterThan(50)
  })

  test("Sleepiness should increase over time", () => {
    animal = animal.idle()
    expect(animal.getInfo.sleepiness).toBeGreaterThan(50)
  })

  test("Happiness should decrease faster when sleepiness or hunger is full", () => {
    let hungryAnimal = new Animal({ name: "Kitty", type: "cat", hunger: 100 })
    let sleepyAnimal = new Animal({
      name: "Kitty",
      type: "cat",
      sleepiness: 100,
    })

    hungryAnimal = hungryAnimal.idle()
    sleepyAnimal = sleepyAnimal.idle()
    animal = animal.idle()

    const normalHappinessRate = animal.getInfo.happiness as number

    expect(hungryAnimal.getInfo.happiness).toBeLessThan(normalHappinessRate)
    expect(sleepyAnimal.getInfo.happiness).toBeLessThan(normalHappinessRate)
  })

  describe("Each animal type should have metrics which increase/decrease at different rates", () => {
    let dog = new Animal({ name: "Teamo", type: "dog" })
    let cat = new Animal({ name: "Cat", type: "cat" })
    let bird = new Animal({ name: "Bird", type: "bird" })

    dog = dog.idle()
    cat = cat.idle()
    bird = bird.idle()

    test.each(["hunger", "happiness", "sleepiness"])(
      "%s",
      (name: string): void => {
        const aProp = name as keyof AnimalProps
        const isDifferent =
          dog.getInfo[aProp] !== cat.getInfo[aProp] &&
          cat.getInfo[aProp] !== bird.getInfo[aProp] &&
          bird.getInfo[aProp] !== dog.getInfo[aProp]
        expect(isDifferent).toBe(true)
      }
    )
  })

  describe("Checking min and max metrics from 0 to 100", () => {
    test("Animal can't be too happy", () => {
      animal = new Animal({ name: "Kitty", type: "cat", happiness: 100 })
      animal = animal.play()
      expect(animal.getInfo.happiness).toBe(100)
    })

    test("Animal can't be too sad", () => {
      animal = new Animal({ name: "Kitty", type: "cat", happiness: 0 })
      animal = animal.idle()
      expect(animal.getInfo.happiness).toBe(0)
    })

    test("Animal can't be too hungry", () => {
      animal = new Animal({ name: "Kitty", type: "cat", hunger: 100 })
      animal = animal.idle()
      expect(animal.getInfo.hunger).toBe(100)
    })

    test("Animal can't be too full", () => {
      animal = new Animal({ name: "Kitty", type: "cat", hunger: 0 })
      animal = animal.feed()
      expect(animal.getInfo.hunger).toBe(0)
    })

    test("Animal can't be too sleepy", () => {
      animal = new Animal({ name: "Kitty", type: "cat", sleepiness: 100 })
      animal = animal.idle()
      expect(animal.getInfo.sleepiness).toBe(100)
    })

    test("Animal can't be too awake", () => {
      animal = new Animal({ name: "Kitty", type: "cat", sleepiness: 0 })
      animal = animal.rest()
      expect(animal.getInfo.sleepiness).toBe(0)
    })
  })
})
