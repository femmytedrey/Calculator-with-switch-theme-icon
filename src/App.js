// import logo from './logo.svg';
import './App.css';
import React, { useReducer } from 'react';
import DigitButton from './DigitButton';

export const ACTIONS ={
  ADD_DIGITS: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer (state, { type, payload }) {
  switch(type){
    case ACTIONS.ADD_DIGITS:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  
  return (
    <div className="App">
      <div className='card'>
        <div className = "top">
          <div className='left'>
            <p>Calc</p>
          </div>

          <div className='right'>
            <div className='rightLeft'>
              <p className='themeLabel'>THEME</p>
            </div>

            <div className='rightRight'>
              {/* <div className='rightRightTop'> */}
                <p className='theme'>123</p>
              {/* </div> */}
              {/* <div className='rightRightBottom'> */}
                <div className='slider'>
                  <div className='selction1'></div>
                  <div className='selction2'></div>
                  <div className='selction3'></div>
                </div>
              {/* </div> */}
            </div>
          </div>
        </div>

        <div className = "middle">
          <p className='previous-operand'>{previousOperand} {operation}</p>
          <h2 className='operand'>{currentOperand}</h2>
        </div>

        <div className = "bottom">
          {/* <div> */}
            <DigitButton digit= "7" dispatch={dispatch} />
            <DigitButton digit= "8" dispatch={dispatch} />
            <DigitButton digit= "9" dispatch={dispatch} />
            <button className='btn delete'>DEL</button>
          {/* </div> */}

          {/* <div> */}
            <DigitButton digit= "4" dispatch={dispatch} />
            <DigitButton digit= "5" dispatch={dispatch} />
            <DigitButton digit= "6" dispatch={dispatch} />
            <button className='btn'>+</button>
          {/* </div> */}

          {/* <div> */}
            <DigitButton digit= "1" dispatch={dispatch} />
            <DigitButton digit= "2" dispatch={dispatch} />
            <DigitButton digit= "3" dispatch={dispatch} />
            <button className='btn'>-</button>
          {/* </div> */}

          {/* <div> */}
          <DigitButton digit= "." dispatch={dispatch} />
            <DigitButton digit= "0" dispatch={dispatch} />
            <button className='btn'>÷</button>
            <button className='btn'>x</button>
          {/* </div> */}

          {/* <div> */}
            <button className='btn reset'>RESET</button>
            <button className='btn evaluate'>=</button>
            
          {/* </div> */}
          
        </div>
      </div>
    </div>
  );
}

export default App;
