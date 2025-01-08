'use client';

import { useState } from "react";


export default function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | number>('');

  const handleInput = (value: string) => {
    setInput((prev) => prev + value);
  };

  const calculate = () => {
    try {
      // Basic evaluation with Math for advanced operations
      const evalResult = eval(input
        .replace(/\^/g, '**')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/e\^/g, 'Math.exp(')
        .replace(/√/g, 'Math.sqrt(')
      );

      setResult(evalResult);
    } catch (err) {
      console.error(err);
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="mb-4 text-right text-xl font-mono">{input || '0'}</div>
        <div className="mb-4 text-right text-2xl font-bold text-blue-500">{result || ''}</div>

        <div className="grid grid-cols-4 gap-2">
          {/* Buttons */}
          {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '.', '0', '=', '+'].map((value) => (
            <button
              key={value}
              onClick={() => (value === '=' ? calculate() : handleInput(value))}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded font-medium"
            >
              {value}
            </button>
          ))}

          <button onClick={() => handleInput('^')} className="bg-gray-200 hover:bg-gray-300 p-2 rounded font-medium">
            ^
          </button>

          <button onClick={() => handleInput('√(')} className="bg-gray-200 hover:bg-gray-300 p-2 rounded font-medium">
            √
          </button>

          <button onClick={() => handleInput('ln(')} className="bg-gray-200 hover:bg-gray-300 p-2 rounded font-medium">
            ln
          </button>

          <button onClick={() => handleInput('log(')} className="bg-gray-200 hover:bg-gray-300 p-2 rounded font-medium">
            log
          </button>

          <button onClick={() => handleInput('e^')} className="bg-gray-200 hover:bg-gray-300 p-2 rounded font-medium">
            e^x
          </button>

          <button onClick={clearInput} className="bg-red-500 hover:bg-red-600 p-2 rounded text-white font-medium">
            C
          </button>
          
          <button onClick={() => handleInput('(')} className="bg-gray-200 hover:bg-gray-300 p-2 rounded font-medium">
            ( 
          </button>

          <button onClick={() => handleInput(')')} className="bg-gray-200 hover:bg-gray-300 p-2 rounded font-medium">
            )
          </button>
        </div>
      </div>
    </div>
  );
}
