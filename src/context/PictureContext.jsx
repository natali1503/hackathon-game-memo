import { createContext, useContext, useReducer } from 'react';
import { randomArrPicture } from '../utils/randomizationPictures';
import { changeStatusPicture } from '../utils/changeStatusPicture';
import { checkVictory } from '../utils/checkVictory';
import { actionTypes } from '../constants/actionTypes';

const initialState = {
  game: {
    gameStarted: false, //начата ли игра
    afterIsShowHistory: false, //была ли показана история
    pictureLayout: [], // массив с объектами картинок
    pictureOpen: 0, //счетчик количества открытых картинок
    numberPictureOpen: [], //индексы открытых картинок
    moves: 0, //счетчик ходов
    isGameOver: false,
    time: '',
  },
  history: {
    isShowHistory: false,
    historyGame: [],
    currentStepHistory: 0,
  },
};
const PictureContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.START_GAME: {
      return {
        ...state,
        game: {
          ...state.game,
          pictureLayout: randomArrPicture(),
          gameStarted: true,
          afterIsShowHistory: false,
        },
      };
    }
    case actionTypes.PICTURE_OPEN: {
      if (state.game.pictureOpen === 2 || state.game.isGameOver) return state;
      if (
        state.game.numberPictureOpen.length === 1 &&
        action.payload[0] === state.game.numberPictureOpen[0][0]
      ) {
        return state;
      }
      return {
        ...state,
        game: {
          ...state.game,
          pictureOpen: state.game.pictureOpen + 1,
          pictureLayout: changeStatusPicture(
            state.game.pictureLayout,
            action.payload
          ),
          numberPictureOpen: [...state.game.numberPictureOpen, action.payload],
        },
      };
    }
    case actionTypes.PICTURES_MATCHED: {
      return {
        ...state,
        game: {
          ...state.game,
          pictureOpen: 0,
          moves: state.game.moves + 1,
          numberPictureOpen: [],
          isGameOver: checkVictory(state.game.pictureLayout),
        },
        history: {
          ...state.history,
          historyGame: [...state.history.historyGame, state.game],
        },
      };
    }
    case actionTypes.PICTURE_CLOSE: {
      return {
        ...state,
        game: {
          ...state.game,
          pictureLayout: changeStatusPicture(
            state.game.pictureLayout,
            action.payload
          ),
          pictureOpen: 0,
          numberPictureOpen: [],
          moves: state.game.moves + 1,
        },

        history: {
          ...state.history,
          historyGame: [...state.history.historyGame, state.game],
        },
      };
    }
    case actionTypes.VICTORY: {
      return {
        ...state,
        history: {
          ...state.history,
          historyGame: [...state.history.historyGame, state.game],
        },
      };
    }

    case actionTypes.RESET: {
      return {
        ...initialState,
        game: {
          ...initialState.game,
          gameStarted: true,
          pictureLayout: randomArrPicture(),
        },
      };
    }
    case actionTypes.SHOW_HISTORY: {
      if (!state.history.isShowHistory)
        return {
          ...state,
          game: state.history.historyGame[state.history.currentStepHistory],
          history: {
            ...state.history,
            isShowHistory: true,
            currentStepHistory: state.history.currentStepHistory + 1,
          },
        };
      const isEndOfHistory =
        state.history.currentStepHistory === state.history.historyGame.length;
      if (isEndOfHistory) {
        return {
          ...state,
          game: { ...state.game, afterIsShowHistory: true, isGameOver: true },
          history: {
            ...state.history,
            isShowHistory: false,
            currentStepHistory: 0,
          },
        };
      }
      return {
        ...state,
        game: state.history.historyGame[state.history.currentStepHistory],
        history: {
          ...state.history,
          currentStepHistory: state.history.currentStepHistory + 1,
        },
      };
    }
    case actionTypes.TIME: {
      return {
        ...state,
        game: { ...state.game, time: action.payload },
      };
    }
    default:
      throw new Error('Неизвестный тип');
  }
}

function PictureProvaider({ children }) {
  const [{ game, history }, dispatch] = useReducer(reducer, initialState);
  const {
    gameStarted,
    pictureLayout,
    pictureOpen,
    numberPictureOpen,
    moves,
    isGameOver,
    time,
    afterIsShowHistory,
  } = game;
  const isGame = gameStarted && !isGameOver;
  const startGame = !gameStarted && !isGameOver;
  const isVictory = gameStarted && isGameOver;
  const { historyGame, isShowHistory } = history;
  const movesAll = history.historyGame.length;
  return (
    <PictureContext.Provider
      value={{
        gameStarted,
        pictureLayout,
        pictureOpen,
        numberPictureOpen,
        moves,
        historyGame,
        isShowHistory,
        dispatch,
        time,
        movesAll,
        startGame,
        isGame,
        isVictory,
        afterIsShowHistory,
      }}
    >
      {children}
    </PictureContext.Provider>
  );
}
function usePicture() {
  const contex = useContext(PictureContext);
  if (contex === undefined)
    throw new Error('PictureContext используется вне PictureProvider');

  return contex;
}

export { PictureProvaider, usePicture };
