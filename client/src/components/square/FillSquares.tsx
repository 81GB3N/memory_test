import Square from "./Square";
import { useState, useEffect, useRef } from "react";
import { usePageContext } from "../../pages/start/startPageContext";
import ScorePage from "../../pages/ScorePage";

export const transition_time = 750;
const square_size = 100;

export default function FillSquares() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numOfVisibleSquares, setNumOfVisibleSquares] = useState<number>(2);
  const [numOfActiveSquares, setNumOfActiveSquares] = useState<number>(1); // set some ratio
  const [numOfSquares, setNumOfSquares] = useState<number>(10);
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

  // //finds a set number of squares to show
  // const activeSquares = new Set<number>();
  // while (activeSquares.size < numOfActiveSquares) {
  //   const randomIndex = Math.floor(Math.random() * numOfSquares);
  //   activeSquares.add(randomIndex);
  // }

  // const visibleSquares = new Set<number>();
  // while (visibleSquares.size < numOfVisibleSquares - numOfActiveSquares) {
  //   const randomIndex = Math.floor(Math.random() * numOfSquares);
  //   if (!activeSquares.has(randomIndex)) {
  //     visibleSquares.add(randomIndex);
  //   }
  // }

  // const animationInterval: Map<number, number> = new Map();

  // //each square gets an animation interval
  // let counter = 2; //set some delay time 2 * 750ms
  // let loadingTime = 0;
  // for (const visibleIndex of activeSquares) {
  //   loadingTime = Math.max(loadingTime, transition_time * counter);
  //   animationInterval.set(visibleIndex, transition_time * counter);
  //   counter++;
  // }

  // loadingTime -= 2 * transition_time;
  const [activeSquares, setActiveSquares] = useState<Set<number>>(new Set());
  const [visibleSquares, setVisibleSquares] = useState<Set<number>>(new Set());
  const animationInterval = useRef<Map<number, number>>(new Map());

  useEffect(() => {
    const newActiveSquares = new Set<number>();
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
    let counter = 2;
    let newLoadingTime = 0;
    for (const visibleIndex of newActiveSquares) {
      newLoadingTime = Math.max(newLoadingTime, transition_time * counter);
      newAnimationInterval.set(visibleIndex, transition_time * counter);
      counter++;
    }

    newLoadingTime -= 2 * transition_time;
    animationInterval.current = newAnimationInterval;

    setActiveSquares(newActiveSquares);
    setVisibleSquares(newVisibleSquares);

    const timer = setTimeout(() => {
      setInputsDisabled(false);
    }, newLoadingTime);

    return () => clearTimeout(timer);
  }, [numOfSquares, numOfActiveSquares]);

  const activeSquaresStack = Array.from(activeSquares);
  if (forward) {
    activeSquaresStack.reverse();
  }
  const checkIndex = (index: number) => {
    if (activeSquaresStack[activeSquaresStack.length - 1] === index) {
      activeSquaresStack.pop();
      if (activeSquaresStack.length === 0) {
        setNumOfVisibleSquares(numOfVisibleSquares + 2);
        setNumOfActiveSquares(numOfActiveSquares + 1);
      }
      console.log("correct");
    } else {
      setShowScorePage(true);
    }
  };

  if (showScorePage) {
    return <ScorePage score={numOfActiveSquares} />;
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
            onClick={() => checkIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
