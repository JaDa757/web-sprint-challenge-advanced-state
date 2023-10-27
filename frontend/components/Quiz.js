import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';


function Quiz({ quiz, selectedAnswer, selectAnswer, fetchQuiz, postAnswer }) {
  const handleAnswerSubmission = () => {    
    if (selectedAnswer) {
      postAnswer({ quiz_id: quiz.quiz.quiz_id, answer_id: selectedAnswer });
    }
  };

  useEffect(() => {
    if (!quiz.quiz) {
      fetchQuiz()
    }
  }, []);

  return (
    <div id="wrapper">
      {quiz.quiz ? (
        <>
          <h2>{quiz.quiz.question}</h2>

          <div id="quizAnswers">
            {console.log(quiz)}
            {quiz.quiz.answers ? (
              quiz.quiz.answers.map((answer) => (
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

          <button id="submitAnswerBtn" onClick={handleAnswerSubmission} disabled={!selectedAnswer}>
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

const mapDispatchToProps = {
  fetchQuiz: actionCreators.fetchQuiz,
  postAnswer: actionCreators.postAnswer,
  selectAnswer: actionCreators.selectAnswer,
  setQuizIntoState: actionCreators.setQuiz,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
