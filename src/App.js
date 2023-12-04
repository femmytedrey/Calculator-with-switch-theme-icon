import logo from './logo.svg';
import './App.css';

function App() {
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
          <h2>399,981.00</h2>
        </div>

        <div className = "bottom">
          {/* <div> */}
            <button className='btn'>7</button>
            <button className='btn'>8</button>
            <button className='btn'>9</button>
            <button className='btn delete'>DEL</button>
          {/* </div> */}

          {/* <div> */}
            <button className='btn'>4</button>
            <button className='btn'>5</button>
            <button className='btn'>6</button>
            <button className='btn'>+</button>
          {/* </div> */}

          {/* <div> */}
            <button className='btn'>1</button>
            <button className='btn'>2</button>
            <button className='btn'>3</button>
            <button className='btn'>-</button>
          {/* </div> */}

          {/* <div> */}
            <button className='btn'>.</button>
            <button className='btn'>0</button>
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
