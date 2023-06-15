import React, { HTMLProps, useState } from 'react';

// Style imports

// Page imports

// Component imports

// Context imports

interface TemplatePageProps extends HTMLProps<HTMLDivElement> {
  testProp: string;
}

const TemplatePage: React.FC<TemplatePageProps> = ({
  testProp
}) => {
  const [ testState, setTestState ] = useState<string>('');
  return (
    <>

    </>
  );
};

export { TemplatePage };
