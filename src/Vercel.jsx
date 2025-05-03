import React, { useState, useEffect } from "react";
import { words } from "../constants/words";
import { stages } from "../constants/stages";
import { letters } from "../constants/letters";

function shuffle(word) {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function WordScrambleDrag() {
  const [originalWord, setOriginalWord] = useState("");
  const [scrambledLetters, setScrambledLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [feedback, setFeedback] = useState(0);

  useEffect(() => {
    generateNewWord();
  }, []);

  function generateNewWord() {
    const word = words[Math.floor(Math.random() * words.length)];
    let scrambled = shuffle(word.toUpperCase());
    while (scrambled.join("") === word.toUpperCase()) {
      scrambled = shuffle(word.toUpperCase());
    }
    setOriginalWord(word.toUpperCase());
    setScrambledLetters(scrambled);
    setSelectedLetters([]);
    setFeedback(0);
  }

  function handleSelect(letter, index) {
 
    const updated = [...scrambledLetters];
    updated[index] = null;
    setScrambledLetters(updated);
    setSelectedLetters([...selectedLetters, letter]);
  }

  function handleUnselect(index) {
    const letter = selectedLetters[index];
    const updatedSelected = [...selectedLetters];
    updatedSelected.splice(index, 1);

    const restored = [...scrambledLetters];
    const nullIndex = restored.findIndex((l) => l === null);
    if (nullIndex !== -1) restored[nullIndex] = letter;

    setScrambledLetters(restored);
    setSelectedLetters(updatedSelected);
  }

  function checkAnswer() {
    const userAnswer = selectedLetters.join("");
    if (userAnswer === originalWord) {
      alert("Corect! Ai ghicit cuvântul!");
    } else {
      setFeedback(feedback + 1);
    }
  }
  return (
    <div align="center">
      <h1>Vercel App</h1>
      <img src={stages[feedback]} alt="" width={100} />
      <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
        {Array.from({ length: originalWord.length }).map((_, i) => (
          <div
            key={i}
            style={{
              border: "1px solid black",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "5px",
            }}
            onClick={() => handleUnselect(i)}
          >
            {selectedLetters[i] || ""}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
        {letters.map((letter, i) =>
          letter ? (
            <button
              key={i}
              style={{ margin: "5px" }}
              onClick={() => handleSelect(letter, i)}
            >
              {letter}
            </button>
          ) : null
        )}
      </div>

     <div>
        <button onClick={checkAnswer} style={{ margin: "5px" }}>
          Verifică
        </button>
        <button onClick={generateNewWord} style={{ margin: "5px" }}>
          Reset
        </button>
      </div>
    </div>
  );
}