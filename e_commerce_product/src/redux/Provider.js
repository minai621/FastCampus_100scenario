"use client";
import { Provider as ReduxProvider } from "react-redux";

const Provider = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default Provider;
