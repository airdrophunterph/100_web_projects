import { useState } from 'react';
import { Link } from 'react-router-dom';

const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [hasResult, setHasResult] = useState(false);

  const handleNumber = (num) => {
    if (hasResult) {
      setDisplay(num);
      setEquation(num);
      setHasResult(false);
    } else if (display === '0' && num !== '.') {
      setDisplay(num);
      setEquation(equation + num);
    } else if (num === '.' && display.includes('.')) {
      return;
    } else {
      setDisplay(display + num);
      setEquation(equation + num);
    }
  };

  const handleOperator = (op) => {
    setHasResult(false);
    const lastChar = equation.slice(-1);
    
    if (['+', '-', '×', '÷'].includes(lastChar)) {
      setEquation(equation.slice(0, -1) + op);
    } else {
      setEquation(equation + op);
    }
    setDisplay('0');
  };

  const calculate = () => {
    try {
      let exp = equation
        .replace(/×/g, '*')
        .replace(/÷/g, '/');
      
      // eslint-disable-next-line no-eval
      const result = eval(exp);
      const formatted = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '');
      
      setDisplay(formatted);
      setEquation(formatted);
      setHasResult(true);
    } catch {
      setDisplay('Error');
      setEquation('');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setHasResult(false);
  };

  const toggleSign = () => {
    if (display !== '0') {
      const newDisplay = display.startsWith('-') ? display.slice(1) : '-' + display;
      setDisplay(newDisplay);
      // Update equation accordingly
      if (hasResult) {
        setEquation(newDisplay);
      }
    }
  };

  const percentage = () => {
    const result = (parseFloat(display) / 100).toString();
    setDisplay(result);
    if (hasResult) {
      setEquation(result);
    }
  };

  const Button = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`h-16 rounded-full text-xl font-medium transition-all active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-4 flex flex-col">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-xs bg-black rounded-3xl p-4 shadow-2xl">
          {/* Display */}
          <div className="h-32 flex flex-col justify-end items-end px-2 mb-4">
            <div className="text-gray-500 text-lg h-6 overflow-hidden">{equation || ' '}</div>
            <div className="text-white text-5xl font-light truncate w-full text-right">{display}</div>
          </div>
          
          {/* Buttons */}
          <div className="grid grid-cols-4 gap-3">
            <Button onClick={clear} className="bg-gray-400 text-black hover:bg-gray-300">AC</Button>
            <Button onClick={toggleSign} className="bg-gray-400 text-black hover:bg-gray-300">±</Button>
            <Button onClick={percentage} className="bg-gray-400 text-black hover:bg-gray-300">%</Button>
            <Button onClick={() => handleOperator('÷')} className="bg-orange-500 text-white hover:bg-orange-400">÷</Button>
            
            <Button onClick={() => handleNumber('7')} className="bg-gray-700 text-white hover:bg-gray-600">7</Button>
            <Button onClick={() => handleNumber('8')} className="bg-gray-700 text-white hover:bg-gray-600">8</Button>
            <Button onClick={() => handleNumber('9')} className="bg-gray-700 text-white hover:bg-gray-600">9</Button>
            <Button onClick={() => handleOperator('×')} className="bg-orange-500 text-white hover:bg-orange-400">×</Button>
            
            <Button onClick={() => handleNumber('4')} className="bg-gray-700 text-white hover:bg-gray-600">4</Button>
            <Button onClick={() => handleNumber('5')} className="bg-gray-700 text-white hover:bg-gray-600">5</Button>
            <Button onClick={() => handleNumber('6')} className="bg-gray-700 text-white hover:bg-gray-600">6</Button>
            <Button onClick={() => handleOperator('-')} className="bg-orange-500 text-white hover:bg-orange-400">−</Button>
            
            <Button onClick={() => handleNumber('1')} className="bg-gray-700 text-white hover:bg-gray-600">1</Button>
            <Button onClick={() => handleNumber('2')} className="bg-gray-700 text-white hover:bg-gray-600">2</Button>
            <Button onClick={() => handleNumber('3')} className="bg-gray-700 text-white hover:bg-gray-600">3</Button>
            <Button onClick={() => handleOperator('+')} className="bg-orange-500 text-white hover:bg-orange-400">+</Button>
            
            <button 
              onClick={() => handleNumber('0')} 
              className="col-span-2 h-16 rounded-full bg-gray-700 text-white text-xl font-medium hover:bg-gray-600 text-left pl-7"
            >
              0
            </button>
            <Button onClick={() => handleNumber('.')} className="bg-gray-700 text-white hover:bg-gray-600">.</Button>
            <Button onClick={calculate} className="bg-orange-500 text-white hover:bg-orange-400">=</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorApp;
