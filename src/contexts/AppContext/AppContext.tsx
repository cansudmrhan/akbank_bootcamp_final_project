import { createContext, useState, useContext, useCallback } from "react";
import type { FC, PropsWithChildren } from "react";
import { Label } from "types";

type IAppContext = {
  labels: Label[];
  setLabels: (labels: Label[]) => void;
};

const initialState: IAppContext = {
  labels: [
    {
      id: 1,
      title: "Önemli",
      color: "red",
    },
    {
      id: 2,
      title: "Önemsiz",
      color: "gray",
    },
  ],
  setLabels: () => {},
};

export const AppContext = createContext<IAppContext>(initialState);

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [labels, setLocalLabels] = useState(initialState.labels);

  const setLabels = useCallback(
    (updatedLabels: Label[]) => {
      setLocalLabels(updatedLabels);
    },
    [labels]
  );

  return (
    <AppContext.Provider value={{ labels, setLabels }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
