// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import * as types from './action-types'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case types.MOVE_CLOCKWISE: {
      const nextIndex = state + 1
      return nextIndex > 5 ? 0 : nextIndex
    }
    case types.MOVE_COUNTERCLOCKWISE: {
      const nextIndex = state - 1
      return nextIndex < 0 ? 5 : nextIndex
    }
    default:
      return state
  }
}

const initialQuizState = {
  quiz: null,
  selectedAnswer: null,
  infoMessage: '',
  correctAnswer: null,
  newQuestion: null,
};

function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case types.SET_QUIZ_INTO_STATE:
      return { ...state, quiz: action.payload };
    case types.SET_SELECTED_ANSWER:
      return { ...state, selectedAnswer: action.payload };
    case types.SET_INFO_MESSAGE:
      return { ...state, infoMessage: action.payload };
    default:
      return state;
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case types.SET_SELECTED_ANSWER:
      return action.payload;
    default:
      return state;
  }
}

const initialMessageState = '';

function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case types.SET_INFO_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
