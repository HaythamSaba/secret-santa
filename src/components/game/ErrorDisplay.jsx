import { useSecretSanta } from "../../hooks/useSecretSanta";
const ErrorDisplay = () => {
  const { state } = useSecretSanta();
  if (!state.error) return null;
  return (
    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-fit mx-auto">
      {state.error}
    </div>
  );
};

export default ErrorDisplay;
