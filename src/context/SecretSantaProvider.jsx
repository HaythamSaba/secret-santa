import { useReducer } from "react";
import secretSantaReducer, {
  initialState,
} from "../reducers/secretSantaReducer";
import secretSantaContext from "./SecretSantaContext";
import { drawSecretSanta } from "../utils/drawAlgorithm";
export function SecretSantaProvider({ children }) {
  const [state, dispatch] = useReducer(secretSantaReducer, initialState);

  const addParticipant = (name) => {
    if (!name.trim()) {
      dispatch({ type: "SET_ERROR", payload: "Name cannot be empty" });
      return;
    }

    // Check for duplicate names
    const isDuplicate = state.secretSantaList.some(
      (p) => p.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (isDuplicate) {
      dispatch({ type: "SET_ERROR", payload: "This name already exists!" });
      return;
    }

    const participant = {
      id: `participant-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      name: name.trim(),
    };

    dispatch({ type: "ADD_PARTICIPANT", payload: participant });
    dispatch({ type: "SET_ERROR", payload: null });
  };

  const removeParticipant = (id) => {
    dispatch({ type: "REMOVE_PARTICIPANT", payload: id });
  };

  const backToIdle = () => {
    dispatch({ type: "BACK_TO_IDLE" });
  };

  const clearParticipants = () => {
    dispatch({ type: " CLEAR_PARTICIPANTS" });
  };

  const startGame = () => {
    dispatch({ type: "START_GAME" });
  };

  const assignSecretSantas = () => {
    try {
      if (state.secretSantaList.length < 2) {
        dispatch({
          type: "SET_ERROR",
          payload: "Need at least 2 participants",
        });
        return;
      }

      dispatch({ type: "SET_LOADING" });
      setTimeout(() => {
        const assignments = drawSecretSanta(state.secretSantaList);
        dispatch({ type: "ASSIGN_SECRET_SANTA", payload: assignments });
        pickRandomPerson();
      }, 1000);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const pickRandomPerson = () => {
    console.log("pickRandomPerson called"); // Debug
    console.log("secretSantaList:", state.secretSantaList); // Debug
    console.log("viewedBy:", state.viewedBy); // Debug

    // Get people who haven't viewed yet
    const notViewed = state.secretSantaList.filter(
      (p) => !state.viewedBy.includes(p.id)
    );

    console.log("notViewed:", notViewed); // Debug

    if (notViewed.length === 0) {
      console.log("Everyone has viewed! Finishing game..."); // Debug
      dispatch({ type: "FINISH_GAME" });
      return;
    }

    // Pick random person from those who haven't viewed
    const randomIndex = Math.floor(Math.random() * notViewed.length);
    const randomPerson = notViewed[randomIndex];

    console.log("Picked random person:", randomPerson); // Debug

    dispatch({ type: "PICK_RANDOM_PERSON", payload: randomPerson });
  };
  const confirmIdentity = () => {
    dispatch({ type: "CONFIRM_IDENTITY" });
  };

  const markAsViewed = () => {
    if (state.currentPerson) {
      console.log("Marking as viewed:", state.currentPerson.id); // Add this for debugging
      dispatch({
        type: "MARK_AS_VIEWED",
        payload: state.currentPerson.id,
      });
    } else {
      console.log("No current person to mark!"); // Debug
    }
  };

  const nextPerson = () => {
    console.log("nextPerson called, current viewedBy:", state.viewedBy); // Debug
    dispatch({ type: "NEXT_PERSON" });

    // Small delay before picking next person
    setTimeout(() => {
      pickRandomPerson();
    }, 300);
  };

  const resetAssignments = () => {
    dispatch({ type: "RESET_ASSIGNMENTS" });
  };

  const finishGame = () => {
    dispatch({ type: "FINISH_GAME" });
  };

  const value = {
    state,
    addParticipant,
    removeParticipant,
    clearParticipants,
    assignSecretSantas,
    backToIdle,
    resetAssignments,
    startGame,
    finishGame,
    pickRandomPerson,
    confirmIdentity,
    markAsViewed,
    nextPerson,
  };

  return (
    <secretSantaContext.Provider value={value}>
      {children}
    </secretSantaContext.Provider>
  );
}
