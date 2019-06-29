import React from 'react';

import ScanContainer from 'containers/ScanContainer';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#FFB74D' }, // Purple and green play nicely together.
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <div className='app'>
      <header>Software Challenge</header>
      <ScanContainer />
    </div>
  </ThemeProvider>
);

export default App;
