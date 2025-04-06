import { createContext, useContext } from "react";

export const ContentLoadContext = createContext(false);

export const useContentLoaded = () => useContext(ContentLoadContext);
