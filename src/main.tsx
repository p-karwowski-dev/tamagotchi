import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { AppContextProvider } from "./state/context.tsx"
import { GameLoop } from "./logic/GameLoop.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <GameLoop>
        <App />
      </GameLoop>
    </AppContextProvider>
  </StrictMode>
)
