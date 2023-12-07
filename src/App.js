// import logo from './logo.svg';
import './App.css';
import React, { useReducer } from 'react';

const ACTIONS ={
  ADD_DIGITS: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }){
  switch (type){
    case ACTIONS.ADD_DIGITS:
      return {
        ...state,
        currentOperand: state.waitingForOperand ? payload : state.currentOperand + payload,
        waitingForOperand: false,
      };
    case ACTIONS.DELETE_DIGIT:
      return { ...state, currentOperand: state.currentOperand.slice(0, -1) };
    case ACTIONS.CLEAR:
      return { ...state, currentOperand: '', waitingForOperand: false, selectedOperation: null };
    case ACTIONS.CHOOSE_OPERATION:
      return { ...state, waitingForOperand: true, selectedOperation: payload };

      default:
        return state;
  }
}

function App() {
  const [{currentOperand}, dispatch] = useReducer(reducer, {currentOperand: ''})
  const handleButtonClick = (value) => {
    dispatch({ type: ACTIONS.ADD_DIGITS, payload: value });
  };
  const handleDeleteButtonClick = () => {
    dispatch({ type: ACTIONS.DELETE_DIGIT });
  };
  const handleChooseOperation = (operation) => {
    dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: operation });
  };
  
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
          <h2 className='operand'>{currentOperand}</h2>
        </div>

        <div className = "bottom">
          {/* <div> */}
            <button className='btn' onClick={() => handleButtonClick(7)}>7</button>
            <button className='btn' onClick={() => handleButtonClick(8)}>8</button>
            <button className='btn' onClick={() => handleButtonClick(9)}>9</button>
            <button className='btn delete' onClick={handleDeleteButtonClick}>DEL</button>
          {/* </div> */}

          {/* <div> */}
            <button className='btn' onClick={() => handleButtonClick(4)}>4</button>
            <button className='btn' onClick={() => handleButtonClick(5)}>5</button>
            <button className='btn' onClick={() => handleButtonClick(6)}>6</button>
            <button className='btn' onClick={() => handleChooseOperation('+')}>+</button>
          {/* </div> */}

          {/* <div> */}
            <button className='btn' onClick={() => handleButtonClick(1)}>1</button>
            <button className='btn'onClick={() => handleButtonClick(2)}>2</button>
            <button className='btn' onClick={() => handleButtonClick(3)}>3</button>
            <button className='btn'>-</button>
          {/* </div> */}

          {/* <div> */}
            <button className='btn' onClick={() => handleButtonClick('.')}>.</button>
            <button className='btn' onClick={() => handleButtonClick(0)}>0</button>
            <button className='btn'>÷</button>
            <button className='btn'>x</button>
          {/* </div> */}

          {/* <div> */}
            <button className='btn reset' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>RESET</button>
            <button className='btn evaluate'>=</button>
            
          {/* </div> */}
          
        </div>
      </div>
    </div>
  );
}

export default App;
