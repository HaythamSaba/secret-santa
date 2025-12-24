import GameContainer from "./components/game/GameContainer";
import { SecretSantaProvider } from "./context/SecretSantaProvider";
function App() {
  return (
    <SecretSantaProvider>
      <GameContainer />
    </SecretSantaProvider>
  );
}

export default App;
