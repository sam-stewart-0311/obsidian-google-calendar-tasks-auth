import { useState } from 'react'
import './App.css'

function App() {

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const error = params.get("error");

  return (
    <div className='container-c main'>
      <div className='container-c'>
        {
          code ? (
            <span>{code}</span>
          ) : error ? (
            <span>{error}</span>
          ) : 
          <span>nothing to see here...</span>
        }
      </div>
    </div>
  )
}

export default App
