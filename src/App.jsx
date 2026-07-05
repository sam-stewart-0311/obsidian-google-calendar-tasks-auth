import { useState } from 'react'
import './App.css'

function App() {

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const error = params.get("error");

  const [copied, setCopied] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleCopy = async (e) => {
    if (!code) return;

    await navigator.clipboard.writeText(code);

    // capture cursor position
    setPos({ x: e.clientX, y: e.clientY });

    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className='container-c main'>
      <div 
        className={`container-c message-container ${code && "clickable"}`}
        onClick={code && handleCopy}
      >
        {
          code ? (
            <span>Code: {code}</span>
          ) : error ? (
            <span>Error: {error}</span>
          ) : 
          <span>nothing to see here...</span>
        }
      </div>
      {copied && (
        <div
          className="copied-badge"
          style={{
            position: "fixed",
            left: pos.x + 10,
            top: pos.y + 10,
            pointerEvents: "none",
          }}
        >
          Copied!
        </div>
      )}
    </div>
  )
}

export default App
