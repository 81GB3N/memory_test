import Button from "../../components/button/Button";
import "./../pages.css";
import { useState } from "react";
import { usePageContext } from "./startPageContext";

interface StartProps {
  onClick: () => void;
}

export default function Start({ onClick }: StartProps) {
  const [start, setStart] = useState(false);
  // const [forward, setDirection] = useState(true);
  const { setForward } = usePageContext();

  const handleStartClick = () => {
    onClick();
  };

  const startMenu = <Button onClick={handleStartClick}>Pradėti</Button>;

  const handleOptionClick = (option: boolean) => {
    setStart(true);
    setForward(option);
  };

  const testOptions = (
    <>
      <Button onClick={() => handleOptionClick(true)}>Priekiu</Button>
      <Button onClick={() => handleOptionClick(false)}>Galu</Button>
    </>
  );

  return (
    <div className="display_container">{start ? startMenu : testOptions}</div>
  );
}
