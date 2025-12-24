import { useSecretSanta } from "../../hooks/useSecretSanta";
import Button from "../shared/Button";

function  Header({ showNewGameButton = true }) {
  const { startGame } = useSecretSanta();

  const handleStartGame = () => {
    startGame();
  };

  return (
    <header className="bg-linear-to-r from-neutral-600 to-neutral-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <img src="logo.png" alt="Logo"  className="w-12 h-12"/>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-white">Secret Santa</h1>
            </div>
          </div>

          {/* Title Section - Center on larger screens */}
          <div className="">
            <h2 className="text-md sm:text-2xl font-bold text-white tracking-wide">
              ✨ Welcome to Secret Santa ✨
            </h2>
          </div>

          {/* Action Button */}
          {showNewGameButton && (
            <div>
              <Button
                content="🎮 Start New Game"
                onClick={handleStartGame}
                variant="secondary"
                size="medium"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
