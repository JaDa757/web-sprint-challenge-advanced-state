import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';
import axios from 'axios';

function Form(props) {
  const {
    formSuccessMessage,
    setInfoMessage,
    postAnswer,
  } = props;

  const [newQuestion, setNewQuestion] = useState('');
  const [newTrueAnswer, setNewTrueAnswer] = useState('');
  const [newFalseAnswer, setNewFalseAnswer] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    setIsFormValid(
      newQuestion.trim() !== '' &&
      newTrueAnswer.trim() !== '' &&
      newFalseAnswer.trim() !== ''
    );
  };

  const onSubmit = async (evt) => {
  evt.preventDefault();

  try {
    const quizData = await getNextQuiz();

    if (quizData) {
      const firstAnswer = quizData.answers[0];
      const payload = {
        quiz_id: quizData.quiz_id,
        answer_id: firstAnswer.answer_id,
        newQuestion: newQuestion, // Access newQuestion from state
        newTrueAnswer: newTrueAnswer, // Access newTrueAnswer from state
        newFalseAnswer: newFalseAnswer, // Access newFalseAnswer from state
      };

      postAnswer(payload);

        setNewQuestion('');
        setNewTrueAnswer('');
        setNewFalseAnswer('');
        setIsFormValid(false);
        formSuccessMessage(newQuestion);
      } else {
        setInfoMessage('Failed to fetch quiz data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getNextQuiz = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/quiz/next');
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch the next quiz');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const onChange = (evt) => {
    const { id, value } = evt.target;

    if (id === 'newQuestion') {
      setNewQuestion(value);
    } else if (id === 'newTrueAnswer') {
      setNewTrueAnswer(value);
    } else if (id === 'newFalseAnswer') {
      setNewFalseAnswer(value);
    }

    validateForm();
  };

  return (
    <div>
      <form id="form" onSubmit={onSubmit}>
        <h2>Create a New Quiz</h2>
        <input
          maxLength={50}
          onChange={onChange}
          value={newQuestion}
          id="newQuestion"
          placeholder="Enter a question"
        />
        <input
          maxLength={50}
          onChange={onChange}
          value={newTrueAnswer}
          id="newTrueAnswer"
          placeholder="Enter a true answer"
        />
        <input
          maxLength={50}
          onChange={onChange}
          value={newFalseAnswer}
          id="newFalseAnswer"
          placeholder="Enter a false answer"
        />
        <button
          id="submitNewQuizBtn"
          type="submit"
          disabled={!isFormValid}
        >
          Submit new quiz
        </button>
      </form>
    </div>
  );
}

export default connect(null, actionCreators)(Form);
