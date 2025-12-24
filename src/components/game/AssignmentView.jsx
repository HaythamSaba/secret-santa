import { useState } from "react";
import { useSecretSanta } from "../../hooks/useSecretSanta";
import Button from "../shared/Button";
import ParticipantProgress from "./ParticipantProgress";

function AssignmentView() {
  const [showAssignment, setShowAssignment] = useState(false);
  const { state, confirmIdentity, markAsViewed, nextPerson, finishGame } =
    useSecretSanta();

  if (state.status !== "drawn") return null;

  if (Object.keys(state.assignments).length === 0) return null;

  if (state.viewedBy?.length === state.secretSantaList.length) {
    return (
      <div className="mt-8 p-8 bg-green-50 border-2 border-green-400 rounded-3xl text-center shadow-xl shadow-green-600 max-w-xl mx-auto">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-green-700 mb-2">All Done!</h2>
        <p className="text-lg text-green-700">
          Everyone has seen their Secret Santa assignment!
        </p>
        <p className="text-sm text-green-600 my-4">
          The gift exchange can begin! 🎁
        </p>
        <Button onClick={finishGame} content="Finish The Game" size="large" />
      </div>
    );
  }

  if (!state.currentPerson) {
    return (
      <div className="mt-8 p-6 bg-green-50 border-2 border-blue-300 rounded-xl text-center">
        <p className="text-lg text-green-800">Preparing next assignment...</p>
      </div>
    );
  }

  const currentPerson = state.currentPerson;
  const assignedId = state.assignments[currentPerson.id];
  const assignedPerson = state.secretSantaList.find((p) => p.id === assignedId);

  if (!state.isIdentityConfirmed) {
    return (
      <div className="mt-8 p-8 bg-yellow-50 border-3 border-yellow-400 rounded-xl">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">👋</div>
          <h2 className="text-3xl font-bold text-yellow-900 mb-3">
            Pass the device to:
          </h2>
          <p className="text-5xl font-bold text-yellow-700 mb-4">
            {currentPerson.name}
          </p>

          <div className="bg-red-100 border-2 border-red-400 rounded-lg p-4 mb-6 max-w-md mx-auto">
            <p className="text-sm font-semibold text-red-800 mb-2">
              ⚠️ Important!
            </p>
            <p className="text-sm text-red-700">
              You can only view your Secret Santa assignment ONCE. There's no
              way to go back, so make sure to remember it!
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={confirmIdentity}
            className="px-8 py-4 bg-yellow-600 text-white text-xl font-bold rounded-lg hover:bg-yellow-700 transform hover:scale-105 transition-all shadow-lg"
          >
            ✓ Yes, I'm {currentPerson.name}
          </button>
        </div>

        <ParticipantProgress />
      </div>
    );
  }

  return (
    <div className="mt-8 p-8 bg-green-50 border-2 border-green-400 rounded-xl">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-green-800 mb-6">
          {currentPerson.name}, here is your Secret Santa assignment:
        </h2>

        {!showAssignment ? (
          <div className="relative">
            <div className="blur-xl select-none pointer-events-none mb-6 p-8 bg-white rounded-lg">
              <p className="text-4xl font-bold text-green-700">
                🎁 Secret Name Here
              </p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                content="👁️ Show My Secret Santa"
                size="large"
                onClick={() => {
                  setShowAssignment(true);
                }}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="p-8 bg-white rounded-lg border-2 border-green-500 shadow-xl mb-6">
              <p className="text-lg text-green-700 mb-2">
                You are Secret Santa for:
              </p>
              <p className="text-5xl font-bold text-green-800">
                🎁 {assignedPerson?.name || "Unknown"}
              </p>
            </div>

            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-yellow-900 mb-2">
                🤫 Remember to keep it secret!
              </p>
              <p className="text-sm text-yellow-800">
                Memorize this name, then click below to hide it before passing
                the device to the next person.
              </p>
            </div>

            <Button
              content="🙈 Hide & Pass to Next Person"
              size="large"
              onClick={() => {
                markAsViewed(); // ✅ NOW mark as viewed when hiding
                setShowAssignment(false);
                nextPerson();
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default AssignmentView;
