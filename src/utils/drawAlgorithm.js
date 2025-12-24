export function drawSecretSanta(participants) {
  if (participants.length < 2) {
    throw new Error("Need at least 2 participants");
  }

  const shuffled = [...participants].sort(() => Math.random() - 0.5);
  const assignments = {};

  for (let i = 0; i < shuffled.length; i++) {
    const giver = shuffled[i];
    const receiver = shuffled[(i + 1) % shuffled.length];
    assignments[giver.id] = receiver.id;
  }

  return assignments;
}

