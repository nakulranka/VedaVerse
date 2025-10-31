import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Quiz,
  LocalHospital,
  Spa,
  FitnessCenter,
  AccountCircle,
  ExitToApp
} from '@mui/icons-material';

import authService from './auth-service.js';
import AuthDialog from './components/AuthDialog.jsx';
import Quiz from './components/Quiz.jsx';
import HerbsGuide from './components/HerbsGuide.jsx';
import YogaGuide from './components/YogaGuide.jsx';
import DoctorSearch from './components/DoctorSearch.jsx';

// Create Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Green for Ayurveda
    },
    secondary: {
      main: '#FF7043', // Orange accent
    },
    background: {
      default: '#F8F9FA',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setUserMenuAnchor(null);
      setCurrentPage('home');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const menuItems = [
    { id: 'home', label: 'Home', icon: <Home /> },
    { id: 'quiz', label: 'Prakriti Quiz', icon: <Quiz /> },
    { id: 'herbs', label: 'Herbs Guide', icon: <Spa /> },
    { id: 'yoga', label: 'Yoga Guide', icon: <FitnessCenter /> },
    { id: 'doctors', label: 'Find Doctors', icon: <LocalHospital /> },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'quiz':
        return <Quiz user={user} />;
      case 'herbs':
        return <HerbsGuide />;
      case 'yoga':
        return <YogaGuide />;
      case 'doctors':
        return user ? <DoctorSearch user={user} /> : <div>Please sign in to book appointments</div>;
      default:
        return (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h2" component="h1" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
              VedaVerse
            </Typography>
            <Typography variant="h5" gutterBottom color="text.secondary" sx={{ mb: 4 }}>
              AI-Powered Personalized Ayurvedic Healthcare
            </Typography>
            <Typography variant="body1" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
              Discover your unique body constitution through our Prakriti quiz, explore traditional herbs and yoga practices, 
              and connect with certified Ayurvedic practitioners for personalized healthcare guidance.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => setCurrentPage('quiz')}
                sx={{ minWidth: 200 }}
              >
                Take Prakriti Quiz
              </Button>
              {!user && (
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setAuthDialogOpen(true)}
                  sx={{ minWidth: 200 }}
                >
                  Get Started
                </Button>
              )}
            </Box>
          </Box>
        );
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* App Bar */}
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: 'pointer' }}
              onClick={() => setCurrentPage('home')}
            >
              VedaVerse
            </Typography>

            {user ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user.displayName ? user.displayName[0].toUpperCase() : user.email[0].toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={() => setUserMenuAnchor(null)}
                >
                  <MenuItem onClick={() => setUserMenuAnchor(null)}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>
                    <ListItemIcon><ExitToApp /></ListItemIcon>
                    Sign Out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={() => setAuthDialogOpen(true)}
              >
                Sign In
              </Button>
            )}
          </Toolbar>
        </AppBar>

        {/* Navigation Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 250, pt: 2 }}>
            <List>
              {menuItems.map((item) => (
                <ListItem
                  key={item.id}
                  button
                  onClick={() => {
                    setCurrentPage(item.id);
                    setDrawerOpen(false);
                  }}
                  selected={currentPage === item.id}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Container component="main" sx={{ flex: 1, py: 3 }}>
          {renderPage()}
        </Container>

        {/* Auth Dialog */}
        <AuthDialog
          open={authDialogOpen}
          onClose={() => setAuthDialogOpen(false)}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;