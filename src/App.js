import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Calendar from './components/Calendar';
import Header from './components/Header';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Calendar />
            </Container>
        </ThemeProvider>
    );
}

export default App;
