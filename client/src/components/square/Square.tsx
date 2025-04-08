import { useState, useEffect } from "react";
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

  // useEffect(() => {
  //   // console.log("resetting clicked");
  //   setClicked(false);
  // }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!clicked && !ignoreInputs && (visible || isActive)) {
      setClicked(true);
      onClick?.();
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
        `}
        onClick={handleClick}
      >
        {/* {isError && isActiveNumber} */}
        {isActive && activeNumber}
      </button>
    </div>
  );
}

export default Square;
