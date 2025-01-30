import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import App from "../App"
import { AppContextProvider } from "../state/context"
import { GameLoop } from "../logic/GameLoop"

const widthToNum = (widthStyle: string) => Number(widthStyle.replace("%", ""))

test("Game UI integration with business logic", async () => {
  render(
    <AppContextProvider>
      <GameLoop>
        <App />
      </GameLoop>
    </AppContextProvider>
  )

  // renders the 'Add Animal' button
  const button = screen.getByText(/Add Animal/i)
  expect(button).toBeInTheDocument()

  // allows to choose animal name"
  const input = await screen.getByPlaceholderText(/Type the name here/i)
  expect(input).toBeInTheDocument()

  fireEvent.change(input, { target: { value: "Erl" } })
  expect(input).toHaveValue("Erl")

  // allows to choose animal type and crete animal when name is provided
  const bird = await screen.getByAltText(/bird image/i)
  expect(bird).toBeInTheDocument()

  fireEvent.click(bird)

  // changes the view after creating animal
  const name = await screen.findByText(/Erl/i)
  expect(name).toBeInTheDocument()

  // game loop affects animal metrics
  const happinessMeter = await screen.getByTestId("happiness-meter")
  expect(happinessMeter).toHaveStyle("width: 50%")
  await waitFor(() => {
    expect(widthToNum(happinessMeter.style.width)).toBeLessThan(50)
  })

  // happiness meter increases after playing
  const happinessBefore = widthToNum(happinessMeter.style.width)
  const playButton = await screen.getByText(/Play/i)
  fireEvent.click(playButton)
  const happinessAfter = widthToNum(happinessMeter.style.width)
  expect(happinessAfter).toBeGreaterThan(happinessBefore)

  // hunger meter decreases after feeding
  const hungerMeter = await screen.getByTestId("hunger-meter")
  const hungerBefore = widthToNum(hungerMeter.style.width)
  const feedButton = await screen.getByText(/Feed/i)
  fireEvent.click(feedButton)
  const hungerAfter = widthToNum(hungerMeter.style.width)
  expect(hungerAfter).toBeLessThan(hungerBefore)

  // sleepiness meter decreases after resting
  const sleepinessMeter = await screen.getByTestId("sleepiness-meter")
  const sleepinessBefore = widthToNum(sleepinessMeter.style.width)
  const restButton = await screen.getByText(/Rest/i)
  fireEvent.click(restButton)
  const sleepinessAfter = widthToNum(sleepinessMeter.style.width)
  expect(sleepinessAfter).toBeLessThan(sleepinessBefore)
})
