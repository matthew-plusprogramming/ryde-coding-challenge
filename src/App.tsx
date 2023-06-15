import React from 'react';
// Must use the workspace version of typescript for this to not error
import { app, header, link, logo } from './App.module.scss';
import { TemplateComponent } from './components/TemplateComponent';
import reactLogo from './logo.svg';

const App: () => React.JSX.Element = () => (
  <div className={app}>
    <header className={header}>
      <img src={reactLogo} className={logo} alt="logo" />
      <p>
          Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className={link}
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
          Learn React
      </a>
      <TemplateComponent />
    </header>
  </div>
);

export default App;
