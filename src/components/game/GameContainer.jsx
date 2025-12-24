import { useSecretSanta } from "../../hooks/useSecretSanta";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import ParticipantForm from "../participants/ParticipantForm";
import ParticipantList from "../participants/ParticipantList";
import AssignmentView from "./AssignmentView";
import DrawButton from "./DrawButton";
import WelcomeScreen from "../layout/WelcomeScreen";
import ErrorDisplay from "./ErrorDisplay";
import Button from "../shared/Button";

const GameContainer = () => {
  const { state, startGame, backToIdle } = useSecretSanta();

  return (
    <div className="bg-secondary-700 min-h-screen flex flex-col">
      <Header showNewGameButton={state.status !== "idle"} />
      <div className="text-center pt-6 sm:pt-8 lg:pt-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-100 mb-2">
          🎅 Secret Santa Generator
        </h1>
      </div>
      {/* Main Content Area */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-8">
        {state.status === "idle" && <WelcomeScreen onStart={startGame} />}

        {state.status === "active" && (
          <div className="max-w-xl mx-auto w-full">
            <div className="text-center mb-8">
              <p className="text-base sm:text-lg text-accent-100">
                Add participants and let the magic happen!
              </p>
            </div>

            <div className="">
              <ErrorDisplay />
              <ParticipantForm />
              <ParticipantList />
              <DrawButton />
            </div>
          </div>
        )}

        {state.status === "loading" && (
          <div className="max-w-xl mx-auto w-full text-center">
            
            <DrawButton />
          </div>
        )}

        {state.status === "drawn" && (
          <div className="max-w-3xl mx-auto w-full">
            <AssignmentView />
          </div>
        )}

        {state.status === "error" && (
          <div className="max-w-xl mx-auto w-full">

            <div className="space-y-6">
              <ErrorDisplay />
              <ParticipantForm />
              <ParticipantList />
              <DrawButton />
            </div>
          </div>
        )}

        {state.status === "finished" && (
          <div className="max-w-2xl mx-auto w-full text-center">
            <div className="py-8">
              <div className="text-6xl sm:text-7xl lg:text-8xl mb-6">🎉</div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-100 mb-4">
                Game Completed!
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-green-100 mb-8 max-w-lg mx-auto">
                Hope everyone has a wonderful Secret Santa exchange!
              </p>
              <Button
                onClick={backToIdle}
                size="large"
                content="🎮 Start New Game"
              />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default GameContainer;
