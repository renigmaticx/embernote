import { experimental_extendTheme } from '@mui/material/styles';

const theme = experimental_extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          light: '#ffffff',
          main: '#ffffff',
          dark: '#cccccc',
          contrastText: '#000000'
        },
        secondary: {
          light: '#cfcfcf',
          main: '#000000',
          dark: '#707070',
          contrastText: '#000000'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          light: '#2c2c2c',
          main: '#000000',
          dark: '#000000',
          contrastText: '#ffffff'
        },
        secondary: {
          light: '#ffffff',
          main: '#ffffff',
          dark: '#cccccc',
          contrastText: '#000000'
        }
      }
    }
  }
});

export default theme;
