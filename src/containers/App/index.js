import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Favorite from '@material-ui/icons/Favorite';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

import ScanContainer from 'containers/ScanContainer';

import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#313030' },
    secondary: { main: '#FFB74D' },
  },
});

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  footer: {
    padding: theme.spacing(1),
    backgroundColor: '#253238',
    color: '#ddd',
    marginTop: 'auto',
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position='absolute' className={classes.appBar} color='primary'>
          <Toolbar>
            <Typography variant='h6' color='inherit' noWrap className={classes.toolbarTitle}>
              <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 120 120'>
                <g fillRule='evenodd'>
                  <path
                    d='M65.343 5.286v77.708l49.653 31.997V37.283z'
                    fill='#ff6788'
                    fillOpacity='.816'
                  />
                  <path
                    d='M35.227 5.08v77.707l49.653 31.997V37.076z'
                    fill='#f0d48d'
                    fillOpacity='.804'
                  />
                  <path
                    d='M5.02 5.009v77.707l49.653 31.998V37.006z'
                    fill='#68d865'
                    fillOpacity='.772'
                  />
                </g>
              </svg>
              <span className='imersoIconText'>
                <span className='imersoSubString'>im</span>
                <span className='rotatedE'>e</span>
                <span className='imersoSubString'>rso</span>
              </span>
            </Typography>
            <span className='imersoIconText'>Software Challenge</span>
          </Toolbar>
        </AppBar>
        <div className='app'>
          <ScanContainer />
        </div>
        <footer className={classes.footer}>
          <Container maxWidth='sm'>
            <Typography variant='body1' style={{ fontFamily: 'Lato', fontWeight: 600 }}>
              ©Imerso 2019
            </Typography>
            <Typography variant='body2' style={{ color: '#888888' }}>
              {'Coded with '}
              <Favorite style={{ fontSize: '12px', color: '#F50057' }} />
              {' by '}
              <Link color='inherit' href='https://github.com/jacobgarcia'>
                <u>Jacob Garcia</u>
              </Link>
            </Typography>
          </Container>
        </footer>
      </ThemeProvider>
    </div>
  );
}

export default App;
