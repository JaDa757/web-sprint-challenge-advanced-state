import React from 'react';
import { connect } from 'react-redux';

function Message(props) {
  const { infoMessage, correctAnswer, } = props;

  return (
    <div id="message">
      {infoMessage && <div>{infoMessage}</div>}
      {correctAnswer === true && <div>Nice job! That was the correct answer</div>}
      {correctAnswer === false && <div>What a shame! That was the incorrect answer</div>}
     
    </div>
  );
}

const mapStateToProps = (state) => ({
  infoMessage: state.infoMessage,
  correctAnswer: state.correctAnswer,
  newQuestion: state.form.newQuestion,
});

export default connect(mapStateToProps)(Message);
