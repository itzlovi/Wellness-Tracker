import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import MoodTracker from './components/MoodTracker';
import SecurityDashboard from './graphs';
import './App.css';

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8e24aa',
    },
    secondary: {
      main: '#e91e63',
    },
    background: {
      default: '#121212',
      paper: '#1e1e2f',
    },
  },
});

// Styled components
const StyledPaper = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  background-color: #1e1e2f;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const Header = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 30px;
`;

const Logo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoIcon = styled(Box)`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #8e24aa, #e91e63);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="app-gradient-bg">
        <SecurityDashboard />
        <Container maxWidth="lg">
          <Header>
          </Header>

          <Grid container spacing={3}>
            {/* Mood Tracker Card */}
            {/* <Grid item xs={12} md={4} component="div">
              <StyledPaper>
                <MoodTracker />
              </StyledPaper>
            </Grid> */}
          </Grid>
        </Container>
        {/* Footer */}
        <footer style={{
          width: '100%',
          marginTop: 48,
          padding: '32px 0 24px 0',
          textAlign: 'center',
          color: '#bdbdbd',
          fontSize: 16,
          letterSpacing: 0.2,
          background: 'none',
          lineHeight: 1.7
        }}>
          <div style={{ fontWeight: 600, color: '#fff', fontSize: 18, marginBottom: 8 }}>Powered by Love❤️</div>
          <div style={{ marginBottom: 6 }}>Have questions? Contact us at:<br /><a href="mailto:developer@wellness.health" style={{ color: '#bb5cff', textDecoration: 'none', fontWeight: 500 }}>developer@wellness.health</a></div>
          <div style={{ fontSize: 15, marginTop: 8 }}>
            <a href="#" style={{ color: '#bdbdbd', textDecoration: 'underline', marginRight: 12 }}>Terms & Conditions</a>
            |
            <a href="#" style={{ color: '#bdbdbd', textDecoration: 'underline', marginLeft: 12 }}>Privacy Policy</a>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
