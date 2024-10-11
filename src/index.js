import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

const Main = () => {
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  // Create a theme based on the darkMode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light', // Toggle between dark and light mode
    },
  });
  React.useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    document.body.classList.toggle('light', !darkMode);
  }, [darkMode]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}> {/* Wrap App in ThemeProvider */}
        <App setDarkMode={setDarkMode} /> {/* Pass setDarkMode to App */}
      </ThemeProvider>
    </Provider>
  );
};

root.render(<Main />);

