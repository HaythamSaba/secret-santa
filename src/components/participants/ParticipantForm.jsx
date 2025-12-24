import { useState } from "react";
import { useSecretSanta } from "../../hooks/useSecretSanta";
import Button from "../shared/Button";
import Input from "../shared/Input";
function ParticipantForm() {
  const [name, setName] = useState("");
  const { addParticipant, state } = useSecretSanta();

  const handleButtonClick = () => {
    if (name.trim()) addParticipant(name);
    setName("");
  };

  const isDisabled = state.status === "drawn" || state.status === "loading";

  return (
    <div className="w-full max-w-xl mx-auto mb-6 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
        <Input name={name} setName={setName} isDisabled={isDisabled} />
        <Button
          content="Add Participant"
          onClick={handleButtonClick}
          disabled={isDisabled || !name.trim()}
        />
      </div>
      {state.error && (
        <p className="text-red-500 text-sm mt-2 px-1">⚠️ {state.error}</p>
      )}
    </div>
  );
}

export default ParticipantForm;
