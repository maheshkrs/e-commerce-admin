import React, { useState, useEffect } from "react";
import { createContext } from "react";
export const ProjectContext = React.createContext();

const ProjectProvider = ({ children }) => {
  const [isData, setIsData] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <ProjectContext.Provider
      value={{
        isData,
        isLoggedIn,
        setIsData,
        setIsLoggedIn,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider };
