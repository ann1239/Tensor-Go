// src/components/TypewriterHeader.js

import React, { useState, useEffect } from "react";

const TypewriterHeader = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = 100; // Delay between characters (in milliseconds)

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedText((prevText) => prevText + text[currentIndex]);
        currentIndex++;
        setTimeout(typeNextCharacter, interval);
      } else {
        // Start erasing after a brief pause
        setTimeout(eraseText, 1000);
      }
    };

    const eraseText = () => {
      if (currentIndex > 0) {
        setDisplayedText((prevText) => prevText.slice(0, -1));
        currentIndex--;
        setTimeout(eraseText, interval);
      } else {
        // Repeat the process
        setTimeout(typeNextCharacter, 1000);
      }
    };

    // Start typing
    typeNextCharacter();
  }, [text]);

  return <h1>{displayedText}</h1>;
};

export default TypewriterHeader;
