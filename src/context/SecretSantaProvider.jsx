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

        // ✅ Still need to pick the FIRST random person after drawing
        pickRandomPerson();
      }, 1000);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const pickRandomPerson = () => {
    console.log("pickRandomPerson called (initial)");

    const notViewed = state.secretSantaList.filter(
      (p) => !state.viewedBy.includes(p.id)
    );

    if (notViewed.length === 0) {
      dispatch({ type: "FINISH_GAME" });
      return;
    }

    const randomIndex = Math.floor(Math.random() * notViewed.length);
    const randomPerson = notViewed[randomIndex];

    console.log("Picked first random person:", randomPerson);
    dispatch({ type: "PICK_RANDOM_PERSON", payload: randomPerson });
  };
  const confirmIdentity = () => {
    dispatch({ type: "CONFIRM_IDENTITY" });
  };

  const markAsViewed = () => {
    if (state.currentPerson) {
      dispatch({
        type: "MARK_AS_VIEWED",
        payload: state.currentPerson.id,
      });
    }
  };

  const nextPerson = () => {
    console.log("nextPerson called");
    // Just dispatch - the reducer handles everything now!
    dispatch({ type: "NEXT_PERSON" });
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
