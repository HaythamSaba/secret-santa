import { useState } from "react";
import { useSecretSanta } from "../hooks/useSecretSanta";
import Button from "../components/shared/Button";

function UiContext() {
  const [name, setName] = useState("");
  const { state, addParticipant } = useSecretSanta();

  const isDisabled = state.status === "drawn" || state.status === "loading";
  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter participant name"
          disabled={isDisabled}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
        />
        <Button
          content="Add Participant"
          onClick={() => addParticipant(name)}
          disabled={isDisabled || !name.trim()}
        />
      </div>
      {state.error && <p className="text-red-500">{state.error}</p>}
    </div>
  );
}

export default UiContext;
