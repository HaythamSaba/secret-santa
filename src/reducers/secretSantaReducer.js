const GAME_STATUS = {
  IDLE: "idle", // Welcome screen
  ACTIVE: "active", // Adding participants
  LOADING: "loading", // Processing (could be used for animations)
  DRAWN: "drawn", // Names have been drawn
  ERROR: "error", // Something went wrong
  FINISHED: "finished", // Game complete (could reset)
};

export const initialState = {
  status: GAME_STATUS.IDLE, // Current game state
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
        currentPerson: action.payload, // This should receive the full person object
        isIdentityConfirmed: false,
      };

    case "CONFIRM_IDENTITY":
      return {
        ...state,
        isIdentityConfirmed: true,
      };

    case "MARK_AS_VIEWED":
      console.log("MARK_AS_VIEWED dispatched with:", action.payload); // Debug
      console.log("Current viewedBy:", state.viewedBy); // Debug
      return {
        ...state,
        viewedBy: [...state.viewedBy, action.payload],
      };

    case "NEXT_PERSON":
      return {
        ...state,
        currentPerson: null,
        isIdentityConfirmed: false,
      };
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
