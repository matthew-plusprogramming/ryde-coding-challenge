import classname from 'classnames';
import { motion } from 'framer-motion';
import React, { HTMLProps, useState } from 'react';

interface TemplateComponentProps extends HTMLProps<HTMLDivElement> {
  testProp?: string;
}

const TemplateComponent: React.FC<TemplateComponentProps> = ({
  testProp,
  className
}) => {
  const [ testState, setTestState ] = useState<string>('');
  return (
    <motion.div className={classname(className)}>

    </motion.div>
  );
};

export { TemplateComponent };
