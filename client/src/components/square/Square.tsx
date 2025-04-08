import { useState, useEffect, use } from "react";
import "./square.css";
import { square_animation_time } from "./FillSquares";

interface SquareProps {
  visible?: boolean;
  isActive?: boolean;
  transitionStart: number | undefined;
  ignoreInputs: boolean;
  isError: boolean;
  activeNumber: number;
  onClick?: () => void;
}

function Square({
  visible = false,
  transitionStart,
  ignoreInputs,
  isActive,
  onClick,
  isError,
  activeNumber,
}: SquareProps) {
  const [clicked, setClicked] = useState(false);
  const [wrongClicked, setWrongClicked] = useState(false);

  useEffect(() => {
    setClicked(false);
    if (transitionStart !== undefined && isActive) {
      const timer = setTimeout(() => {
        setClicked(true);
        setTimeout(() => {
          setClicked(false);
        }, square_animation_time); // Duration of the clicked state
      }, transitionStart);

      return () => clearTimeout(timer);
    }
  }, [transitionStart]);

  useEffect(() => {
    setClicked(false);
  }, [isError]);

  // useEffect(() => {
  //   // console.log("resetting clicked");
  //   setClicked(false);
  // }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!clicked && !ignoreInputs && (visible || isActive)) {
      if (!isActive) {
        setWrongClicked(true);
      }
      onClick?.();
      setClicked(true);
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div className={`square ${visible || isActive ? "" : "invisible"}`}>
      <button
        disabled={ignoreInputs}
        className={`
          ${clicked ? "clicked" : ""}
          ${isError ? "error" : ""}
          ${wrongClicked ? "wrong-clicked" : ""}
        `}
        onClick={handleClick}
      >
        {isError && activeNumber}
      </button>
    </div>
  );
}

export default Square;
