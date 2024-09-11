import React, { Component, createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { GlobalStyles } from "../constants/globalstyles";

interface ColorProps {
  primary_black: string;
  primary_white: string;
  primary_darkblue: string;
  primary_blue: string;
  primary_midblue: string;
  primary_lightblue: string;
  primary_lightgrey: string;
  primary_darkgrey: string;
  primary_orange: string;
  primary_green: string;
  primary_lightergrey: string;
  primary_darkergrey: string;
}

interface ColorContextInterface {
  colors: ColorProps;
  theme: any;
}

const ColorContext = createContext({} as ColorContextInterface);

export const ColorContextProvider = ({ children } : {children: React.ReactNode}) => {
  const [colors, setColors] = useState(GlobalStyles?.colors);
  const theme = useColorScheme();

  useEffect(() => {
    if (theme !== "dark") {
      setColors(GlobalStyles?.colors_dark);
    } else {
      setColors(GlobalStyles?.colors);
    }
  }, [theme]);

  const value = {
    colors,
    theme,
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

export const useColors = () => {
  return useContext(ColorContext);
};
