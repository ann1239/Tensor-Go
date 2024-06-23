import { useState } from "react";
import Form from "./Components/Form";
import "./App.css";

const App = () => {
  const [active, setActive] = useState(false);

  function TypewriterText() {
    return (
      <div className="typewriter-text">
        <h1>Welcome</h1>
      </div>
    );
  }

  const buttonClickActive = () => {
    setActive(!active);
  };

  const GoogleButton = () => {
    return (
      <div className="google-auth-button" onClick={buttonClickActive}>
        <span className="google-icon"></span>
        <span className="button-text">Sign in with Google</span>
      </div>
    );
  };

  return (
    <>
      {!active ? (
        <div className="App">
          <header className="App-header">
            <TypewriterText />
            <p>This is our customer service platform</p>
            <p>Please login to continue...</p>
            <GoogleButton />
          </header>
        </div>
      ) : (
        <Form />
      )}
    </>
  );
};

export default App;
