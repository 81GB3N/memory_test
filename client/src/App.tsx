import "./App.css";
import Test from "./pages/test";
import Start from "./pages/start/start";
import { DisplayPageProvider } from "./pages/start/startPageContext";
import { useState } from "react";

function App() {
  const [selectedPage, setSelectedPage] = useState<string>("start");

  const handleStartClick = () => {
    setSelectedPage("test");
    document.documentElement.requestFullscreen();
  };

  return (
    <>
      <DisplayPageProvider>
        {selectedPage === "start" ? (
          <Start onClick={handleStartClick}></Start>
        ) : (
          <Test></Test>
        )}
      </DisplayPageProvider>
    </>
  );
}

export default App;
