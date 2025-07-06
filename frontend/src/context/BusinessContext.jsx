import { createContext, useState } from "react";

export const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <BusinessContext.Provider value={{ businessData, setBusinessData, loading, setLoading }}>
      {children}
    </BusinessContext.Provider>
  );
};
