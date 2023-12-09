// import logo from './logo.svg';
import './App.css';
import React, { useReducer, useState, useEffect } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

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
    //   if (payload.digit === '0' && (state.currentOperand === null || state.currentOperand === undefined)) {
    //     return {
    //       ...state,
    //       currentOperand: '0'
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       currentOperand: payload.digit
    //     };
    //   }
      if(state.overwrite){
        return{
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      if(state.currentOperand === null || state.currentOperand === undefined){
        if(payload.digit === '.'){
          return{
            ...state,
            currentOperand: "0."
          }
        }
      }
      if(payload.digit === '0' && state.currentOperand === '0') return state
      if(payload.digit === '.' && state.currentOperand.includes('.')) return state

      // if(payload.digit === '.'){
      //   return {
      //     ...state,
      //     currentOperand: state.currentOperand === '' ? '0.' : `${state.currentOperand}${payload.digit}`,
      //   };
      // }
        
      return {  
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }

    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null){
        return state
      }
      if(state.currentOperand == null){
        return{
          ...state,
          operation: payload.operation
        }
      }
      if(state.previousOperand == null){
        return{
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      return{
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }

    case ACTIONS.EVALUATE:
      if(state.currentOperand == null || state.previousOperand == null || state.operation == null){
        return state
      }
      
      return{
        ...state,
        overwrite: true,
        previousOperand: null,
        currentOperand: evaluate(state),
        operation: null
      }

      case ACTIONS.DELETE_DIGIT:
        if(state.overwrite){
          return{
            ...state,
            currentOperand: null,
            overwrite: false
          }
        }
        if(state.currentOperand == null){
          return state
        }
        if(state.currentOperand.length === 1){
          return{ ...state, currentOperand: null }
        }
        return { ...state, currentOperand: state.currentOperand.slice(0, -1) };
        
      
    case ACTIONS.CLEAR:
      return {}
  }
}

function evaluate({ currentOperand, previousOperand, operation }){
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case '+':
      computation = prev + current
      break
    case '-':
      computation = prev - current
      break
    case '*':
      computation = prev * current
      break
    case '÷':
      computation = prev / current
      break
  }

  return computation.toString()
}

const integer_formatter = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand) {
  if(operand ==  null) return
  const [integer, decimal] = operand.split('.')
  if(decimal == null) return integer_formatter.format(integer)
  return `${integer_formatter.format(integer)}.${decimal}`
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})
  const [currentTheme, setCurrentTheme] = useState('theme1')
  
  useEffect(() => {
    document.body.className = currentTheme;
  }, [currentTheme]);

  const handleThemeClick = (themeNumber) => {
    setCurrentTheme(`theme${themeNumber}`);
    const selections = {
      selection1: document.querySelector('.selction1'),
      selection2: document.querySelector('.selction2'),
      selection3: document.querySelector('.selction3'),
    };
    // const body = document.body;
    // body.classList.remove('theme1', 'theme2', 'theme3')
    // body.classList.add(`theme${themeNumber}`)

    Object.values(selections).forEach((selection) => {
      selection.style.display = 'none';
    })

    selections[`selection${themeNumber}`].style.display = 'block';

    

    console.log(`Theme ${themeNumber} clicked`)


    
  };

  
  return (
    <div className="App">
      <div className='card'>
        <div className = "top">
          <div className='left'>
            <p className='calc'>calc</p>
          </div>

          <div className='right'>
            <div className='rightLeft'>
              <p className='themeLabel'>THEME</p>
            </div>

            <div className='rightRight'>
              {/* <div className='rightRightTop'> */}
                <div className='theme'>
                  <div className='theme1' onClick={() => handleThemeClick(1)}>1</div>
                  <div className='theme2' onClick={() => handleThemeClick(2)}>2</div>
                  <div className='theme3' onClick={() => handleThemeClick(3)}>3</div>
                </div>
              {/* </div> */}
              {/* <div className='rightRightBottom'> */}
                <div className='slider'>
                  <div className='selection-container'>
                    <div className='selction1'></div>
                  </div>
                  <div className='selection-container'>
                    <div className='selction2'></div>
                  </div>
                  <div className='selection-container'>
                    <div className='selction3'></div>
                  </div>
                </div>
              {/* </div> */}
            </div>
          </div>
        </div>

        <div className = "middle">
          <div className='previousOperandContainer'>
            <p className='previous-operand'>{ formatOperand(previousOperand)} {operation}</p>
          </div>
          <div className='currentOperandContainer'>
            <h2 className='operand'>{ formatOperand(currentOperand) }</h2>
          </div>
        </div>

        <div className = "bottom">
          {/* <div> */}
            <DigitButton digit= "7" dispatch={dispatch} />
            <DigitButton digit= "8" dispatch={dispatch} />
            <DigitButton digit= "9" dispatch={dispatch} />
            <button className='btn delete' onClick={() => dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
          {/* </div> */}

          {/* <div> */}
            <DigitButton digit= "4" dispatch={dispatch} />
            <DigitButton digit= "5" dispatch={dispatch} />
            <DigitButton digit= "6" dispatch={dispatch} />
            <OperationButton operation= "+" dispatch={dispatch} />
          {/* </div> */}

          {/* <div> */}
            <DigitButton digit= "1" dispatch={dispatch} />
            <DigitButton digit= "2" dispatch={dispatch} />
            <DigitButton digit= "3" dispatch={dispatch} />
            <OperationButton operation= "-" dispatch={dispatch} />
          {/* </div> */}

          {/* <div> */}
          <DigitButton digit= "." dispatch={dispatch} />
            <DigitButton digit= "0" dispatch={dispatch} />
            <OperationButton operation= "÷" dispatch={dispatch} />
            <OperationButton operation= "*" dispatch={dispatch} />
          {/* </div> */}

          {/* <div> */}
            <button className='btn reset' onClick={() => dispatch({ type: ACTIONS.CLEAR})}>RESET</button>
            <button className='btn evaluate' onClick={() => dispatch({ type: ACTIONS.EVALUATE})}>=</button>
            
          {/* </div> */}
          
        </div>
      </div>
    </div>
  );
}

export default App;
