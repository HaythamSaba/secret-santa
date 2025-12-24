import { useSecretSanta } from "../../hooks/useSecretSanta";

const ParticipantProgress = () => {
  const { state } = useSecretSanta();

  return (
    <div className="mb-8 p-4 bg-bg-primary rounded-lg border-2 border-accent-300">
      <h3 className="text-sm font-semibold text-yellow-900 mb-3 text-center">
        Progress: {state.viewedBy.length} / {state.secretSantaList.length}{" "}
        viewed
      </h3>
      <div className="space-y-2">
        {state.secretSantaList.map((participant) => {
          const hasViewed = state.viewedBy.includes(participant.id);
          return (
            <div
              className={`flex items-center gap-2  text-sm ${
                hasViewed ? "text-green-700" : "text-yellow-800"
              }`}
            >
              <span className="text-lg">{hasViewed ? "✅" : "👀"}</span>
              <span className={hasViewed ? "line-through" : ""}>
                {participant.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParticipantProgress;
