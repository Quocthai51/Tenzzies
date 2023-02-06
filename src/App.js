import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Dice from "./Dice";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(setAllDice());
  const [tenzies, setTenzies] = useState(false);
  function createDice() {
    return Math.ceil(Math.random() * 6);
  }
 

  const allSame = dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (allSame) {
      setTenzies(true);
      console.log("Tenzies!");
    }
  }, [dice]);

  function setAllDice() {
    let diceArr = [];
    for (let i = 0; i < 10; i++) {
      const newDice = {
        id: nanoid(),
        value: createDice(),
        isHeld: false,
      };
      diceArr.push(newDice);
    }
    return diceArr;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isHeld ? die : { ...die, value: createDice(), isHeld: false }
        )
      );
    } else {
      setTenzies(false);
      setDice(setAllDice());
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }
  const diceElements = dice.map((die) => (
    <Dice key={die.id} {...die} hold={() => holdDice(die.id)} />
  ));

  return (
    <div className="App">
      <div className="Board--Container">
        {tenzies && <Confetti />}

        <h2 style={{ marginTop: 40 }}>Tenzies</h2>
        <div className="Board--TextBox">
          <p className="Board--Desc">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls
          </p>
        </div>

        <div className="Board--HoldDice">{diceElements}</div>
        {tenzies && (
          <div className="Board--TextBox">
            <h2 style={{ fontSize: 17 }}>
              You have won the game! Click New Game to play again!
            </h2>
          </div>
        )}
        <button className="Board--Button" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </div>
  );
}

export default App;
