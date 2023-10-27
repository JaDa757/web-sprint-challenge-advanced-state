import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';


function Form(props) {
  const {    
    postQuiz,
    newQuestion,
    newTrueAnswer,
    newFalseAnswer,
    inputChange,    
  } = props;
 
  const [infoMessage, setInfoMessage] = useState('');

  const validateForm = () => {
    return newQuestion.trim() !== '' &&
      newTrueAnswer.trim() !== '' &&
      newFalseAnswer.trim() !== ''    
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    
    try {
      const payload = {
        newQuestion,
        newTrueAnswer,
        newFalseAnswer,
      };      
      postQuiz(payload)     
            
      }       
     catch (error) {
      console.error('Error:', error);
      setInfoMessage('Failed to submit answer.');
    }
  };

  const onChange = (evt) => {
    const { id, value } = evt.target;
    inputChange({ field: id, value });
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
          disabled={!validateForm()}
        >
          Submit new quiz
        </button>
      </form>
      {infoMessage && <div>{infoMessage}</div>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  newQuestion: state.form.newQuestion,
  newTrueAnswer: state.form.newTrueAnswer,
  newFalseAnswer: state.form.newFalseAnswer,
});

export default connect(mapStateToProps, actionCreators)(Form);
