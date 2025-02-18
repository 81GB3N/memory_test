import { useState, useEffect } from "react";
import "./square.css";
import { transition_time } from "./FillSquares";

interface SquareProps {
  visible?: boolean;
  active?: boolean;
  transitionStart: number | undefined;
  ignoreInputs: boolean;
  onClick?: () => void;
}

function Square({
  visible = false,
  transitionStart,
  active,
  ignoreInputs,
  onClick,
}: SquareProps) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (transitionStart !== undefined && active) {
      const timer = setTimeout(() => {
        setClicked(true);
        setTimeout(() => {
          setClicked(false);
        }, transition_time); // Duration of the clicked state
      }, transitionStart);

      return () => clearTimeout(timer);
    }
  }, [transitionStart]);

  const handleClick = () => {
    if (!clicked && !ignoreInputs && (visible || active)) {
      setClicked(true);
    }
    //  else if (!clicked && visible && !ignoreInputs) {
    //   setClicked(true);
    // }
  };

  return (
    <div
      className={`square ${visible || active ? "" : "invisible"}`}
      onClick={onClick}
    >
      <button
        disabled={ignoreInputs}
        className={`${clicked ? "clicked" : ""}`}
        onClick={handleClick}
      ></button>
    </div>
  );
}

export default Square;

// import React from "react";
// import "./square.css";

// interface SquareProps {
//   clicked: boolean;
// }

// const Square: React.FC<SquareProps> = ({ clicked }) => {
//   return <button className={`square ${clicked ? "clicked" : ""}`}></button>;
// };

// export default Square;
