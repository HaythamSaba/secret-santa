const Input = ({ name, setName, isDisabled }) => {
  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="flex-1 w-full px-4 py-2.5 sm:py-2 text-accent-100 bg-transparent border-2 border-accent-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-300 focus:border-accent-300 disabled:bg-neutral-300 disabled:border-neutral-400 disabled:text-neutral-600 disabled:cursor-not-allowed placeholder:text-accent-200 transition-all"
      placeholder="Enter participant name"
      disabled={isDisabled}
    />
  );
};

export default Input;
