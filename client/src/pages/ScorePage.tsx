import Button from "../components/button/Button";

interface ScorePageProps {
  score: number;
}

export default function ScorePage({ score }: ScorePageProps) {
  const playAgain = () => {
    window.location.reload();
  };

  return (
    <div className="display_container">
      <h1 className="result">Rezultatas: {score}</h1>
      <Button onClick={playAgain}>Iš naujo</Button>
    </div>
  );
}
