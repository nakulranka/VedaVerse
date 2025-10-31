import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, CircularProgress, Button } from '@mui/material';
import { User } from 'firebase/auth';

// Hooks
import useAuth from './hooks/useAuth';

// Components
import Header from './components/Header';
import Welcome from './components/Welcome';
import Quiz from './components/Quiz';
import Results from './components/Results';
import HerbsGuide from './components/HerbsGuide';
import YogaGuide from './components/YogaGuide';
import Footer from './components/Footer';
import AuthDialog from './components/auth/AuthDialog';

// Styles
import './App.css';

// Create Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // Saddle brown - Ayurvedic earth tone
      light: '#A0522D',
      dark: '#654321',
    },
    secondary: {
      main: '#2E7D32', // Green for nature/herbs
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

type ViewType = 'welcome' | 'quiz' | 'results' | 'herbs' | 'yoga';

interface AppProps {}

function App(): JSX.Element {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('welcome');
  const [quizResults, setQuizResults] = useState<any>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const handleNavigation = (view: ViewType) => {
    setCurrentView(view);
    if (view !== 'results') {
      setQuizResults(null);
    }
  };

  const startQuiz = () => {
    setCurrentView('quiz');
    setQuizResults(null);
  };

  const handleQuizComplete = (results: any) => {
    setQuizResults(results);
    setCurrentView('results');
  };

  const restartQuiz = () => {
    setCurrentView('welcome');
    setQuizResults(null);
  };

  const handleAuthSuccess = (user: User) => {
    console.log('User authenticated:', user);
    setAuthDialogOpen(false);
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          flexDirection="column"
          gap={2}
        >
          <CircularProgress size={60} />
          <Box>Loading VedaVerse...</Box>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header 
          currentView={currentView} 
          onNavigate={handleNavigation}
          user={user}
          onAuthClick={() => setAuthDialogOpen(true)}
        />
        
        <main className="main-content">
          {currentView === 'welcome' && (
            <Welcome 
              onStartQuiz={startQuiz} 
              onNavigate={handleNavigation}
              user={user}
              onAuthClick={() => setAuthDialogOpen(true)}
            />
          )}
          
          {currentView === 'quiz' && (
            <Quiz onComplete={handleQuizComplete} />
          )}
          
          {currentView === 'results' && quizResults && (
            <Results results={quizResults} onRestart={restartQuiz} />
          )}
          
          {currentView === 'herbs' && (
            <HerbsGuide />
          )}
          
          {currentView === 'yoga' && (
            <YogaGuide />
          )}
        </main>
        
        <Footer />

        {/* Authentication Dialog */}
        <AuthDialog
          open={authDialogOpen}
          onClose={() => setAuthDialogOpen(false)}
          onSuccess={handleAuthSuccess}
        />

        {/* User Info Panel (for development) */}
        {user && (
          <Box
            position="fixed"
            top={10}
            right={10}
            p={2}
            bgcolor="primary.main"
            color="white"
            borderRadius={1}
            fontSize="0.8rem"
            zIndex={1000}
          >
            Welcome, {user.displayName || user.email}!
            <br />
            <Button 
              size="small" 
              variant="outlined" 
              color="inherit" 
              onClick={() => {
                // Sign out functionality
                import('./services/authService').then(({ authService }) => {
                  authService.signOut();
                });
              }}
              sx={{ mt: 1, fontSize: '0.7rem' }}
            >
              Sign Out
            </Button>
          </Box>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;