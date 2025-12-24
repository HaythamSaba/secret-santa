import { useState } from "react";
import Button from "../shared/Button";
import Modal from "./Modal";
function WelcomeScreen({ onStart }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="text-center max-w-4xl mx-auto h-fit">
      
      <p className="text-xl text-accent-100 mb-4 md:mb-8 max-w-md mx-auto">
        Organize your gift exchange with ease! Add participants, draw names
        randomly, and keep the holiday magic alive.
      </p>

      <div className="mb-4 md:mb-8 flex flex-col sm:flex-row justify-center items-stretch p-4 border-2 border-accent-300 rounded-xl shadow-xl">
        <div className="flex items-center justify-center gap-3 p-3 text-accent-100 md:border-r border-accent-300">
          <span className="text-2xl">✨</span>
          <span className="font-semibold">Quick & Easy Setup</span>
        </div>
        <div className="flex items-center justify-center gap-3 text-accent-100 p-3 md:border-r border-accent-300">
          <span className="text-2xl">🔒</span>
          <span className="font-semibold">Keep Assignments Secret</span>
        </div>
        <div className="flex items-center justify-center gap-3 p-3 text-accent-100">
          <span className="text-2xl">🎲</span>
          <span className="font-semibold">Random Pairing Algorithm</span>
        </div>
      </div>

      <Button onClick={onStart} content="Start Game Now!" size="large" />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
        <p className="text-sm text-accent-100">
          No registration required • Completely free
        </p>
        <Button
          content="📖 How It Works"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default WelcomeScreen;
