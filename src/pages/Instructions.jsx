function Instructions() {
  return (
    <div className="p-6 ">
      <h3 className="font-bold text-lg mb-3">📖 How It Works:</h3>
      <ol className="list-decimal list-inside space-y-2 text-gray-700">
        <li>Add at least 2 participants using the form above</li>
        <li>Click "Draw Secret Santas" to randomly assign everyone</li>
        <li>Each person selects their name to see who they're buying for</li>
        <li>Keep it secret! 🤫</li>
      </ol>
    </div>
  );
}

export default Instructions;