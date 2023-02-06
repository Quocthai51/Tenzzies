import React from "react";
import "./Dice.css";
const Dice = (props) => {
  const diceStyle = props.isHeld
    ? "Board--Dice Board--Dice--Held"
    : "Board--Dice";
  return (
    <div className="Board--Dice">
      <div className={diceStyle} onClick={props.hold}>
        <p className="Dice--Text">{props.value}</p>
      </div>
    </div>
  );
};

export default Dice;
