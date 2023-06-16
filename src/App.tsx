import React from 'react';

// Component imports
import {
  DataVisualizationContainer
} from 'components/DataVisualizationContainer/DataVisualizationContainer';
import { Header } from 'components/Header/Header';
import {
  VerticalFlexContainer
} from 'components/VerticalFlexContainer/VerticalFlexContainer';

// Style imports
import { pageContainer } from './App.module.scss';

const App: () => React.JSX.Element = () => (
  <VerticalFlexContainer className={pageContainer}>
    <Header />
    <DataVisualizationContainer />
  </VerticalFlexContainer>
);

export default App;
