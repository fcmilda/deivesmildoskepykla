import { createTheme } from '@mui/material';

const bakeryTheme = createTheme({
  palette: {
    primary: {
      main: '#D5AC74',
      light: '#DCD7C4',
      dark: '#332821',
      contrastText: '#ffffff',
    },

    bakery: {
      main: '#CB6A75',
      light: '#e0a6ad',
      dark: '#6b2029',
    },

    background: {
      default: '#F8DDC2',
    },

  },
  typography: {
    fontFamily: 'Playfair Display',
  },
});

const bakeryThemeSection = createTheme(bakeryTheme, {
  mixins: {
    section: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      width: 500,
      margin: '40px auto',
      textAlign: 'center',
    },
  },
});

export default bakeryThemeSection;
