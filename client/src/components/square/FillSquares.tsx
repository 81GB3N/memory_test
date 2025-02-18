import Square from "./Square";
import { useState, useEffect, useRef } from "react";
import { usePageContext } from "../../pages/start/startPageContext";
import ScorePage from "../../pages/ScorePage";

export const transition_time = 750;
const square_size = 100;

export default function FillSquares() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numOfVisibleSquares, setNumOfVisibleSquares] = useState<number>(10);
  const [numOfActiveSquares, setNumOfActiveSquares] = useState<number>(2); // set some ratio
  const [numOfSquares, setNumOfSquares] = useState<number>(numOfVisibleSquares);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(true);
  const [showScorePage, setShowScorePage] = useState<boolean>(false);
  const { forward } = usePageContext();

  // //update the number of squares based on the height of the container
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const containerHeight = container.clientHeight;
      const containerWidth = container.clientWidth;
      const squareNum =
        (Math.floor(containerHeight / square_size) - 1) *
        (Math.floor(containerWidth / square_size) - 1);
      setNumOfSquares(squareNum);
    }
  }, []);

  // loadingTime -= 2 * transition_time;
  const [activeSquares, setActiveSquares] = useState<Set<number>>(new Set());
  const [visibleSquares, setVisibleSquares] = useState<Set<number>>(new Set());
  const animationInterval = useRef<Map<number, number>>(new Map());

  useEffect(() => {
    const newActiveSquares = new Set<number>();
    setInputsDisabled(true);
    setActiveSquares(new Set());
    setVisibleSquares(new Set());

    while (newActiveSquares.size < numOfActiveSquares) {
      const randomIndex = Math.floor(Math.random() * numOfSquares);
      newActiveSquares.add(randomIndex);
    }

    const newVisibleSquares = new Set<number>();
    while (newVisibleSquares.size < numOfVisibleSquares - numOfActiveSquares) {
      const randomIndex = Math.floor(Math.random() * numOfSquares);
      if (!newActiveSquares.has(randomIndex)) {
        newVisibleSquares.add(randomIndex);
      }
    }

    const newAnimationInterval: Map<number, number> = new Map();
    let counter = 3;
    let newLoadingTime = 0;
    for (const visibleIndex of newActiveSquares) {
      newLoadingTime = Math.max(newLoadingTime, transition_time * counter);
      newAnimationInterval.set(visibleIndex, transition_time * counter);
      counter++;
    }

    newLoadingTime += 1 * transition_time;

    animationInterval.current = newAnimationInterval;

    setActiveSquares(newActiveSquares);
    setVisibleSquares(newVisibleSquares);

    const timer = setTimeout(() => {
      console.log("inputs are now enabled");
      setInputsDisabled(false);
    }, newLoadingTime);

    return () => clearTimeout(timer);
  }, [numOfSquares, numOfActiveSquares]);

  const activeSquaresStack = Array.from(activeSquares);
  if (forward) {
    activeSquaresStack.reverse();
  }
  const checkIndex = (index: number) => {
    console.log(activeSquaresStack);
    if (activeSquaresStack[activeSquaresStack.length - 1] === index) {
      activeSquaresStack.pop();
      if (activeSquaresStack.length === 0) {
        setNumOfVisibleSquares(
          numOfActiveSquares <= 3
            ? numOfVisibleSquares + 2
            : numOfVisibleSquares + 1
        );
        setNumOfActiveSquares(numOfActiveSquares + 1);
      }
      console.log("correct");
    } else {
      setShowScorePage(true);
    }
  };

  if (showScorePage) {
    return (
      <ScorePage
        score={numOfActiveSquares === 2 ? 0 : numOfActiveSquares - 1}
      />
    );
  }

  return (
    <div className="app" ref={containerRef}>
      <div id="container">
        {Array.from({ length: numOfSquares }, (_, index) => (
          <Square
            key={index}
            active={activeSquares.has(index)}
            visible={visibleSquares.has(index)}
            transitionStart={animationInterval.current?.get(index) ?? undefined}
            ignoreInputs={inputsDisabled}
            onClick={() => (!inputsDisabled ? checkIndex(index) : null)}
          />
        ))}
      </div>
    </div>
  );
}
