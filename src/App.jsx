import { useState, useRef } from 'react'
import './App.css'

function App() {

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const error = params.get("error");

  const [copied, setCopied] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const timeoutRef = useRef(null);

  const handleCopy = async (e) => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    await navigator.clipboard.writeText(code);

    // clear previous animation timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // reset animation state first (important trick)
    setCopied(false);

    // force reflow so animation can restart cleanly
    requestAnimationFrame(() => {
      setPos({ x: e.clientX, y: e.clientY });
      setCopied(true);

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };

  return (
    <div className='container-c main'>
      <div 
        className={`container-c message-container ${code && "clickable"}`}
        onClick={code && handleCopy}
      >
        {
          code ? (
            <span><strong>Copy Code:</strong> {code}</span>
          ) : error ? (
            <span><strong>Error:</strong> {error}</span>
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
