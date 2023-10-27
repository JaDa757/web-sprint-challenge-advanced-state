import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Wheel(props) {
  const {
    wheel,
    moveClockwise,
    moveCounterClockwise,
  } = props

  return (
    <div id="wrapper">
      <div id="wheel">
        {
          [...Array(6).keys()].map(key => {
            return (
              <div
                className={`cog ${wheel === key ? 'active' : ''}`} key={key}
                style={{ "--i": key }}>
                {wheel === key ? 'B' : null}
              </div>
            )
          })
        }
      </div>
      <div id='keypad'>
        <button id='counterClockwiseBtn' onClick={moveCounterClockwise}>Counter clockwise</button>
        <button id='clockwiseBtn' onClick={moveClockwise}>Clockwide</button>
      </div>
    </div>
  )
}
export default connect(st => st, actionCreators)(Wheel)
