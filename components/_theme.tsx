import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0066EE',
    },
    secondary: {
      main: '#6A5FE3',
    },
    error: {
      main: red.A400,
    },
    text:{
      primary: "#000000",
      secondary: '#FFFFFF',
    },
    background: {
      default: '#f2f2f2',
    },
  },
});

export default theme;