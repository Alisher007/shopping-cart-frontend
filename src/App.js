import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import devToolsEnhancer from 'remote-redux-devtools';
import { BrowserRouter} from 'react-router-dom'
import bookReducer from './components/reducer/bookReducer';
import Router1 from './components';
import './App.css';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

let store = createStore(bookReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
// store.subscribe(() => console.log(store.getState()) )

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        typography: {
          useNextVariants: true,
        },
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <div className="App">
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <Router1 />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
    </div>
  );
}

export default App;
