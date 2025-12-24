import { useSecretSanta } from "../../hooks/useSecretSanta";
import Button from "../shared/Button";

const ParticipantList = () => {
  const { state, removeParticipant } = useSecretSanta();

  function getInitials(name) {
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0].toUpperCase())
      .join("");
  }

  // Example
  getInitials("Jou Dole"); // "JD"

  if (!state.secretSantaList.length)
    return (
      <div className="text-center text-accent-100 py-8">
        No participants yet. Add some to get started!
      </div>
    );

  return (
    <div className="max-w-xl w-full mb-6 mx-auto min-h-fit">
      <h3 className="font-bold text-lg mb-3 text-accent-400 text-center">
        We have {state.secretSantaList.length} Participants
      </h3>
      <p className="mb-4 text-accent-100 text-center">
        You must have at least 3 participants to start the game.
      </p>

      {state.secretSantaList.map((participant) => (
        <div
          key={participant.id}
          className="flex w-full items-center justify-between p-2 pl-4 bg-green-200 rounded-xl my-4 max-w-xl"
        >
          <div className="flex items-center gap-4">
            <span className="bg-green-300 rounded-full p-2 flex justify-center items-center w-12 h-12 text-black text-xl font-bold shadow-xl border-2 border-green-400">
              {getInitials(participant.name)}{" "}
            </span>
            <span className="font-medium">{participant.name}</span>
          </div>
          <Button
            onClick={() => removeParticipant(participant.id)}
            content="Remove"
            size="large"
            variant="outline"
          />
        </div>
      ))}
    </div>
  );
};

export default ParticipantList;
