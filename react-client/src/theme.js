import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#191970', // Deine primäre Farbe
            dark: '#1b1b53'
        },
        secondary: {
            main: '#dcdcdc', // Deine sekundäre Farbe
        },
    },
});

export default theme;