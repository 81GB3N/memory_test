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
    setClicked(false);
  }, [visible, active]);

  useEffect(() => {
    setClicked(false);
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
      onClick?.();
    }
  };

  return (
    <div className={`square ${visible || active ? "" : "invisible"}`}>
      <button
        disabled={ignoreInputs}
        className={`${clicked ? "clicked" : ""}`}
        onClick={handleClick}
      ></button>
    </div>
  );
}

export default Square;
