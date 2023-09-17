import { useState, useEffect } from "react";
import "./App.css";
import "./nations.css";
import nations from "./nations";
function App() {
  const [RandomCounties, setRandomCounties] = useState([]);
  const [flagCountry, setFlagCountry] = useState({});
  const [score, setScore] = useState({ total: 0, correct: 0, incorrect: 0 });
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [showOptions, setShowOptions] = useState(true);
  const generateRandomNations = () => {
    let ct = [];
    for (let i = 0; i < 4; i++) {
      const r = Math.floor(Math.random() * nations.length);
      ct.push(nations[r]);
    }
    setRandomCounties(ct);
    const index = Math.floor(Math.random() * 4);
    setFlagCountry(ct[index]);
  };
  const checkAnswer = (country) => {
    setShowOptions(false);
    if (country.name === flagCountry.name) {
      setCorrectAnswer(true);
      setScore({
        ...score,
        correct: score.correct + 1,
        total: score.total + 1,
      });
    } else {
      setCorrectAnswer(false);
      setScore({
        ...score,
        incorrect: score.incorrect + 1,
        total: score.total + 1,
      });
    }
    setShowAnswer(true);
    setTimeout(() => {
    setShowOptions(true);
      setShowAnswer(false);
      nextQuestion();
    }, 5000);
  };
  const nextQuestion = () => {
    generateRandomNations();
  };
  useEffect(() => {
    generateRandomNations();
  }, []);
  console.log(RandomCounties, flagCountry);
  return (
    <div className="App">
      <span className={`fi fi-${flagCountry.code}`}></span>
      <h3>Your Progress</h3>
      <h4>
        Total answers : {score.total} / Correct answers : {score.correct} / Incorrect answers :{" "}
        {score.incorrect}
      </h4>
      <div>
        {showOptions &&
          RandomCounties.map((c) => (
            <button type="button" className="" onClick={(e) => checkAnswer(c)}>
              {c.name}
            </button>
          ))}
      </div>
      {showAnswer && (
        <h2 className={correctAnswer ? "correct" : "incorrect"}>
          {correctAnswer
            ? "correct Answer"
            : `Correct Option : ${flagCountry.name}`}
        </h2>
      )}
    </div>
  );
}

export default App;
