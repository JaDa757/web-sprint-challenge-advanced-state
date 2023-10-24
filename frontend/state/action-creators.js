import axios from "axios";
import * as types from './action-types';

export function moveClockwise() {
  return { type: types.MOVE_CLOCKWISE }
}

export function moveCounterClockwise() {
  return { type: types.MOVE_COUNTERCLOCKWISE }
}

export function selectAnswer(answer_id) {
  return { type: types.SET_SELECTED_ANSWER, payload: answer_id }
}

export function setMessage(message) {
  return { type: types.SET_INFO_MESSAGE, payload: message }
}

export function formSuccessMessage(newQuestion) {
  return { type: types.SET_INFO_MESSAGE, payload: `Congrats: ${newQuestion} is a great question!` };
}

export function incorrectAnswerMessage() {
  return { type: types.SET_INFO_MESSAGE, payload: 'What a shame! That was the incorrect answer' };
}

export function correctAnswerMessage() {
  return { type: types.SET_INFO_MESSAGE, payload: 'Nice job! That was the correct answer' };
}

export function setQuiz(quiz) {
  return { type: types.SET_QUIZ_INTO_STATE, payload: quiz }
}

export function inputChange(formData) {
  return { type: 'INPUT_CHANGE', payload: formData };
}

export function resetForm() {
  return { type: 'RESET_FORM' };
}

// ❗ Async action creators
export function fetchQuiz() {
  return async (dispatch) => {
    dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: null });
    try {
      const response = await axios.get('http://localhost:9000/api/quiz/next');
      const quizData = response.data;
      dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: quizData });
    } catch (error) {
      dispatch({ type: types.SET_INFO_MESSAGE, payload: 'Failed to fetch the quiz' });
    }
  };
}

export function postAnswer(payload) {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:9000/api/quiz/answer', payload);
      if (response.status === 200) {
        // Dispatch a success message
        dispatch({ type: types.SET_INFO_MESSAGE, payload: `Congrats: ${payload.newQuestion} is a great question!` });
      } else {
        // Handle error cases
        dispatch({ type: types.SET_INFO_MESSAGE, payload: 'Failed to submit answer' });
      }
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      dispatch({ type: types.SET_INFO_MESSAGE, payload: 'Failed to submit answer' });
    }
  };
}

export function postQuiz(payload) {
  return function (dispatch) {
    return axios.post('http://localhost:9000/api/quiz/answer', payload)
      .then((response) => {
        if (response.status === 200) {
          const feedback = response.data.feedback;
          dispatch({ type: types.SET_INFO_MESSAGE, message: feedback });
          dispatch({ type: types.RESET_FORM });
          return feedback;
        } else {
          throw new Error('Failed to submit answer');
        }
      })
      .catch((error) => {
        throw error;
      });
  };
}


// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
