import React, { createContext } from 'react';

interface TemplateContextInterface {
  test: string;
}

const TemplateContext = createContext<TemplateContextInterface | null>(null);

const TemplateContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const test = '';

  return (
    <TemplateContext.Provider
      value={{
        test
      }}>
      {children}
    </TemplateContext.Provider>
  );
};

export { TemplateContextProvider, TemplateContext };
