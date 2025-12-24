const GAME_STATUS = {
  IDLE: "idle",
  ACTIVE: "active",
  LOADING: "loading",
  DRAWN: "drawn",
  ERROR: "error",
  FINISHED: "finished",
};

export const initialState = {
  status: GAME_STATUS.IDLE,
  secretSantaList: [],
  assignments: {},
  viewedBy: [],
  currentPerson: null,
  isIdentityConfirmed: false,
  error: null,
};

export default function secretSantaReducer(state, action) {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        status: GAME_STATUS.ACTIVE,
        error: null,
      };
    case "ADD_PARTICIPANT":
      return {
        ...state,
        secretSantaList: [...state.secretSantaList, action.payload],
      };
    case "REMOVE_PARTICIPANT":
      return {
        ...state,
        secretSantaList: state.secretSantaList.filter(
          (p) => p.id !== action.payload
        ),
      };
    case "UPDATE_PARTICIPANT":
      return {
        ...state,
        secretSantaList: state.secretSantaList.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };

    case "BACK_TO_IDLE":
      return {
        ...state,
        status: GAME_STATUS.IDLE,
        error: null,
      };

    case "CLEAR_PARTICIPANTS":
      return {
        ...state,
        secretSantaList: [],
        assignments: {},
        status: GAME_STATUS.IDLE,
        currentPerson: null,
        isIdentityConfirmed: false,
        error: null,
      };

    case "ASSIGN_SECRET_SANTA":
      return {
        ...state,
        assignments: action.payload,
        status: GAME_STATUS.DRAWN,
        error: null,
        viewedBy: [],
        currentPerson: null,
        isIdentityConfirmed: false,
      };

    case "PICK_RANDOM_PERSON":
      return {
        ...state,
        currentPerson: action.payload,
        isIdentityConfirmed: false,
      };

    case "CONFIRM_IDENTITY":
      return {
        ...state,
        isIdentityConfirmed: true,
      };

    case "MARK_AS_VIEWED":
      return {
        ...state,
        viewedBy: [...state.viewedBy, action.payload],
      };

    case "NEXT_PERSON": {
      // ✅ FIXED: Calculate next person with FRESH state
      console.log("NEXT_PERSON - Current viewedBy:", state.viewedBy);
      console.log("NEXT_PERSON - secretSantaList:", state.secretSantaList);

      // Get people who haven't viewed yet (using fresh state)
      const notViewed = state.secretSantaList.filter(
        (p) => !state.viewedBy.includes(p.id)
      );

      console.log("NEXT_PERSON - notViewed:", notViewed);

      // If everyone has viewed, finish the game
      if (notViewed.length === 0) {
        console.log("NEXT_PERSON - Everyone has viewed! Finishing...");
        return {
          ...state,
          status: GAME_STATUS.FINISHED,
          currentPerson: null,
          isIdentityConfirmed: false,
        };
      }

      // Pick random person from those who haven't viewed
      const randomIndex = Math.floor(Math.random() * notViewed.length);
      const randomPerson = notViewed[randomIndex];

      console.log("NEXT_PERSON - Picked:", randomPerson);

      return {
        ...state,
        currentPerson: randomPerson,
        isIdentityConfirmed: false,
      };
    }

    case "RESET_ASSIGNMENTS":
      return {
        ...state,
        assignments: {},
        viewedBy: [],
        currentPerson: null,
        isIdentityConfirmed: false,
        status: GAME_STATUS.ACTIVE,
      };
    case "SET_LOADING":
      return {
        ...state,
        status: GAME_STATUS.LOADING,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        status: action.payload ? GAME_STATUS.ERROR : state.status,
      };
    case "FINISH_GAME":
      return {
        ...state,
        status: GAME_STATUS.FINISHED,
        error: null,
        secretSantaList: [],
        assignments: {},
        viewedBy: [],
        currentPerson: null,
        isIdentityConfirmed: false,
      };

    default:
      return state;
  }
}
