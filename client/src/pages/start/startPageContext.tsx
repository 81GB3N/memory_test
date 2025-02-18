import React, { createContext, useState, useContext, ReactNode } from "react";

interface DisplayPageProps {
  forward: boolean;
  setForward: (value: boolean) => void;
}

const DisplayPageContext = createContext<DisplayPageProps | undefined>(
  undefined
);

export const DisplayPageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [forward, setForward] = useState(true);

  return (
    <DisplayPageContext.Provider value={{ forward, setForward }}>
      {children}
    </DisplayPageContext.Provider>
  );
};

export const usePageContext = (): DisplayPageProps => {
  const context = useContext(DisplayPageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a DisplayPageProvider");
  }
  return context;
};
