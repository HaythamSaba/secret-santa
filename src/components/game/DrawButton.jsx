import { useSecretSanta } from "../../hooks/useSecretSanta";
import Button from "../shared/Button";

const DrawButton = () => {
  const { state, assignSecretSantas, clearParticipants } = useSecretSanta();

  if (state.status === "loading") {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600"></div>
        <span className="ml-3 text-lg font-semibold text-accent-200">
          Drawing names...
        </span>
      </div>
    );
  }

  return (
    <div className="flex gap-3 justify-center">
      {state.status === "active" ? (
        state.secretSantaList.length <= 2 ? null : (
          <>
            <Button
              content="🎁 Draw Secret Santas!"
              onClick={assignSecretSantas}
              disabled={state.secretSantaList.length <= 2}
            />
            {state.secretSantaList.length > 0 && (
              <Button
                content="🗑️ Clear Participants"
                onClick={clearParticipants}
              />
            )}
          </>
        )
      ) : (
        state.status === "drawn" && (
          <p className="text-lg font-semibold text-accent-300">
            Scroll down to see assignments
          </p>
        )
      )}
    </div>
  );
};

export default DrawButton;
