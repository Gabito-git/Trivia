import { GameContextProvider } from "./context/gameContext";
import AppRouter from "./router/AppRouter";


const App = () => {
  return(
    <GameContextProvider>
      <AppRouter />ß
    </GameContextProvider>
  )
}

export default App;
