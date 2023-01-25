import { createContext } from "react";
import { Navigation } from "../../../server/types";

export const NavigationDataContext = createContext<Navigation | null>(null);
export const NavigationDataDispatchContext =
  createContext<React.Dispatch<Navigation> | null>(null);
