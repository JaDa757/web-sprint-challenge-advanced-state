import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';
import axios from 'axios';

function Quiz({ quiz, selectedAnswer, setQuiz, selectAnswer, setMessage }) {
  const submitAnswer = () => {
    if (selectedAnswer) {
      axios
        .post('http://localhost:9000/api/quiz/answer', {
          quiz_id: quiz.quiz_id,
          answer_id: selectedAnswer,
        })
        .then((response) => {
          if (response.status === 200 && response.data.message) {
            setMessage(response.data.message);
          } else {
            setMessage('Something went wrong. Please try again.');
          }
          selectAnswer(null);
          loadNextQuiz();
        })
        .catch((error) => {
          console.error('Error:', error);
          setMessage('What a shame! That was the incorrect answer');
          selectAnswer(null);
          loadNextQuiz();
        });
    }
  };

  const loadNextQuiz = async () => {
    try {
      console.log('Fetching the next quiz...');
      const response = await axios.get('http://localhost:9000/api/quiz/next');
      console.log('Received response:', response);

      if (response.status === 200) {
        setQuiz(response.data);
      } else {
        console.error('Failed to fetch the next quiz');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (!quiz) {
      loadNextQuiz();
    }
  }, [quiz]);

  return (
    <div id="wrapper">
      {quiz ? (
        <>
          <h2>{quiz.question}</h2>

          <div id="quizAnswers">
            {quiz.answers ? (
              quiz.answers.map((answer) => (
                <div
                  key={answer.answer_id}
                  className={`answer ${selectedAnswer === answer.answer_id ? 'selected' : ''}`}
                >
                  {answer.text}
                  <button
                    onClick={() => selectAnswer(answer.answer_id)}
                    disabled={selectedAnswer === answer.answer_id}
                  >
                    {selectedAnswer === answer.answer_id ? 'SELECTED' : 'Select'}
                  </button>
                </div>
              ))
            ) : null}
          </div>

          <button id="submitAnswerBtn" onClick={submitAnswer} disabled={!selectedAnswer}>
            Submit answer
          </button>
        </>
      ) : (
        'Loading next quiz...'
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  quiz: state.quiz,
  selectedAnswer: state.selectedAnswer,
});

export default connect(mapStateToProps, actionCreators)(Quiz);
