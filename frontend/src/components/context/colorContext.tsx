import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { useAuth } from "../Auth/ProtectedRoutes";

interface ColorProviderProps {
  children: ReactNode;
}

export interface Color {
  [key:string]:string;
}

interface ColorContextValue {
  colors: Color;
  changeStateColor: (name: string, value: string) => void;
}

// Provide a default value that matches the ColorContextValue type
const defaultColors: Color = {
  TODO: "#000000",
  INPROGRESS: "#000000",
  TESTING: "#000000",
  COMPLETED: "#000000",
};

const defaultContextValue: ColorContextValue = {
  colors: defaultColors,
  changeStateColor: () => {},
};

const ColorContext = createContext<ColorContextValue>(defaultContextValue);

export const ColorProvider = ({ children }: ColorProviderProps) => {
  const { user } = useAuth();
  const [colors, setColors] = useState<Color>(defaultColors);

  const changeStateColor = (name: string, value: string) => {
    setColors((prevColors) => ({
      ...prevColors,
      [name]: value,
    }));
    console.log(name, value);
  };

  useEffect(() => {
    if (user) {
      setColors({
        TODO: user.todoColor ?? "#000000",
        INPROGRESS: user.inProgressColor ?? "#000000",
        TESTING: user.testingColor ?? "#000000",
        COMPLETED: user.completedColor ?? "#000000",
      });
    }
    console.log("colors from the state", colors);
  }, [user]);

  return (
    <ColorContext.Provider value={{ colors, changeStateColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);