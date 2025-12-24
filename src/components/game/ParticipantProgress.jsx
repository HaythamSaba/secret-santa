import { useSecretSanta } from "../../hooks/useSecretSanta";

function ParticipantProgress() {
  const { state } = useSecretSanta();

  return (
    <div className="mt-8 p-4 bg-white rounded-lg border-2 border-yellow-300 shadow-xl">
      <h3 className="text-sm font-semibold text-yellow-900 mb-3 text-center">
        Progress: {state.viewedBy.length} / {state.secretSantaList.length}{" "}
        viewed
      </h3>
      <div className="flex gap-x-8">
        {state.secretSantaList.map((participant) => {
          const hasViewed = state.viewedBy.includes(participant.id);
          return (
            <div
              key={participant.id}
              className={`flex items-center gap-2 text-sm ${
                hasViewed ? "text-green-700" : "text-yellow-800"
              }`}
            >
              <span className="text-lg">{hasViewed ? "✓" : "○"}</span>
              <span className={`italic ${hasViewed ? "line-through" : ""}`}>
                {participant.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ParticipantProgress;
