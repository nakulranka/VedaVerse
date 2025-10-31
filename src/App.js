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
  CssBaseline,
  Grid,
  Card
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

import authService, { AuthProvider } from './services/auth-service';
import AuthDialog from './components/AuthDialog';
import QuizComponent from './components/QuizComponent';
import HerbsGuide from './components/HerbsGuide';
import YogaGuide from './components/YogaGuide';
import DoctorSearch from './components/DoctorSearch';
import ProfileComponent from './components/ProfileComponent';

// Create divine golden theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // Divine brown
      light: '#A0522D',
      dark: '#654321',
    },
    secondary: {
      main: '#FFD700', // Golden
      light: '#FFF8DC',
      dark: '#DAA520',
    },
    background: {
      default: 'linear-gradient(135deg, #FFF8E1 0%, #F5DEB3 100%)',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: '#2E2E2E',
      secondary: '#5D4037',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      background: 'linear-gradient(45deg, #8B4513 30%, #FFD700 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 600,
      color: '#8B4513',
    },
    h4: {
      fontWeight: 600,
      color: '#8B4513',
    },
    h6: {
      fontWeight: 500,
      color: '#5D4037',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
            },
            '100%': {
              transform: 'scale(1.02)',
            },
          },
          '@keyframes float': {
            '0%, 100%': {
              transform: 'translateY(0px)',
            },
            '50%': {
              transform: 'translateY(-20px)',
            },
          },
          '@keyframes fadeInUp': {
            '0%': {
              opacity: 0,
              transform: 'translateY(30px)',
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
          '@keyframes shimmer': {
            '0%': {
              backgroundPosition: '-200% 0',
            },
            '100%': {
              backgroundPosition: '200% 0',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 8px 32px rgba(139, 69, 19, 0.1)',
          border: '1px solid rgba(255, 215, 0, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          background: 'linear-gradient(45deg, #8B4513 30%, #A0522D 90%)',
          borderRadius: 25,
          boxShadow: '0 4px 20px rgba(139, 69, 19, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            background: 'linear-gradient(45deg, #A0522D 30%, #CD853F 90%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 25px rgba(139, 69, 19, 0.4)',
          },
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
        },
        outlined: {
          borderColor: '#FFD700',
          color: '#8B4513',
          borderRadius: 25,
          '&:hover': {
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            borderColor: '#DAA520',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(139, 69, 19, 0.3)',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #FFD700 0%, transparent 50%, #FFD700 100%)',
          },
        },
      },
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
    // Require authentication for all pages except home
    if (!user && currentPage !== 'home') {
      return (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 8,
            background: 'linear-gradient(135deg, rgba(255, 248, 225, 0.9) 0%, rgba(245, 222, 179, 0.9) 100%)',
            borderRadius: 4,
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 215, 0, 0.3)',
            boxShadow: '0 20px 60px rgba(139, 69, 19, 0.15)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FFD700" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              zIndex: 0,
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h3" 
              gutterBottom
              sx={{
                background: 'linear-gradient(45deg, #8B4513 30%, #FFD700 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                mb: 2
              }}
            >
              🔐 Sacred Access Required
            </Typography>
            <Typography variant="h6" gutterBottom color="text.secondary" sx={{ mb: 4 }}>
              Please sign in to access the divine wisdom of VedaVerse
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, maxWidth: 500, mx: 'auto', lineHeight: 1.7 }}>
              🌟 Your personalized Ayurvedic journey awaits! Sign in to discover your unique constitution, 
              explore sacred herbs, practice guided yoga, and connect with certified practitioners. 🌟
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => setAuthDialogOpen(true)}
              sx={{ 
                minWidth: 250,
                py: 2,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                background: 'linear-gradient(45deg, #8B4513 30%, #A0522D 90%)',
                boxShadow: '0 8px 25px rgba(139, 69, 19, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #A0522D 30%, #CD853F 90%)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 35px rgba(139, 69, 19, 0.4)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              🚀 Begin Your Sacred Journey
            </Button>
          </Box>
        </Box>
      );
    }

    switch (currentPage) {
      case 'quiz':
        return <QuizComponent />;
      case 'herbs':
        return <HerbsGuide />;
      case 'yoga':
        return <YogaGuide />;
      case 'doctors':
        return <DoctorSearch user={user} />;
      case 'profile':
        return <ProfileComponent />;
      default:
        return (
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 8,
              background: 'linear-gradient(135deg, #FFF8E1 0%, #F5DEB3 50%, #FFEAA7 100%)',
              minHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FFD700" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                zIndex: 0,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0,
                animation: 'float 6s ease-in-out infinite'
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="h1" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontSize: { xs: '3rem', md: '4.5rem' },
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(139, 69, 19, 0.3)',
                  mb: 2,
                  animation: 'pulse 2s ease-in-out infinite alternate'
                }}
              >
                🕉️ VedaVerse 🕉️
              </Typography>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  mb: 4,
                  color: '#8B4513',
                  fontWeight: 500,
                  textShadow: '1px 1px 2px rgba(139, 69, 19, 0.2)',
                  animation: 'fadeInUp 1s ease-out'
                }}
              >
                Divine Ayurvedic Wellness Platform
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 6, 
                  maxWidth: 800, 
                  mx: 'auto',
                  color: '#5D4037',
                  lineHeight: 1.6,
                  fontWeight: 400,
                  animation: 'fadeInUp 1.2s ease-out'
                }}
              >
                ✨ Discover your unique Prakriti through ancient wisdom ✨<br/>
                🌿 Connect with certified practitioners • 🧘‍♀️ Practice personalized yoga • 🌱 Explore healing herbs
              </Typography>
              
              <Grid container spacing={3} sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card 
                    sx={{ 
                      p: 2, 
                      cursor: 'pointer',
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 248, 225, 0.95) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 215, 0, 0.3)',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(139, 69, 19, 0.15)',
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.05)',
                        boxShadow: '0 20px 60px rgba(139, 69, 19, 0.25)',
                        border: '2px solid rgba(255, 215, 0, 0.6)',
                        '& .icon': {
                          transform: 'scale(1.2) rotate(10deg)',
                        }
                      },
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      animation: 'fadeInUp 1.4s ease-out'
                    }}
                    onClick={() => user ? setCurrentPage('quiz') : setAuthDialogOpen(true)}
                  >
                    <Quiz className="icon" sx={{ fontSize: 48, color: '#FFD700', mb: 2, transition: 'all 0.3s ease' }} />
                    <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                      Prakriti Quiz
                    </Typography>
                    <Typography variant="body2" textAlign="center" color="text.secondary">
                      Discover your unique body constitution through 20 comprehensive questions
                    </Typography>
                    {!user && (
                      <Typography variant="caption" sx={{ mt: 1, color: '#8B4513', fontWeight: 600 }}>
                        🔐 Sign in required
                      </Typography>
                    )}
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card 
                    sx={{ 
                      p: 2, 
                      cursor: 'pointer',
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 248, 225, 0.95) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 215, 0, 0.3)',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(139, 69, 19, 0.15)',
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.05)',
                        boxShadow: '0 20px 60px rgba(139, 69, 19, 0.25)',
                        border: '2px solid rgba(255, 215, 0, 0.6)',
                        '& .icon': {
                          transform: 'scale(1.2) rotate(10deg)',
                        }
                      },
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      animation: 'fadeInUp 1.6s ease-out'
                    }}
                    onClick={() => user ? setCurrentPage('herbs') : setAuthDialogOpen(true)}
                  >
                    <Spa className="icon" sx={{ fontSize: 48, color: '#8FBC8F', mb: 2, transition: 'all 0.3s ease' }} />
                    <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                      Herbs Guide
                    </Typography>
                    <Typography variant="body2" textAlign="center" color="text.secondary">
                      Explore traditional Ayurvedic herbs and their healing properties
                    </Typography>
                    {!user && (
                      <Typography variant="caption" sx={{ mt: 1, color: '#8B4513', fontWeight: 600 }}>
                        🔐 Sign in required
                      </Typography>
                    )}
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card 
                    sx={{ 
                      p: 2, 
                      cursor: 'pointer',
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 248, 225, 0.95) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 215, 0, 0.3)',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(139, 69, 19, 0.15)',
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.05)',
                        boxShadow: '0 20px 60px rgba(139, 69, 19, 0.25)',
                        border: '2px solid rgba(255, 215, 0, 0.6)',
                        '& .icon': {
                          transform: 'scale(1.2) rotate(10deg)',
                        }
                      },
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      animation: 'fadeInUp 1.8s ease-out'
                    }}
                    onClick={() => user ? setCurrentPage('yoga') : setAuthDialogOpen(true)}
                  >
                    <FitnessCenter className="icon" sx={{ fontSize: 48, color: '#FF6B6B', mb: 2, transition: 'all 0.3s ease' }} />
                    <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                      Yoga & Pranayama
                    </Typography>
                    <Typography variant="body2" textAlign="center" color="text.secondary">
                      Practice personalized yoga poses and breathing techniques
                    </Typography>
                    {!user && (
                      <Typography variant="caption" sx={{ mt: 1, color: '#8B4513', fontWeight: 600 }}>
                        🔐 Sign in required
                      </Typography>
                    )}
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card 
                    sx={{ 
                      p: 2, 
                      cursor: 'pointer',
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 248, 225, 0.95) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 215, 0, 0.3)',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(139, 69, 19, 0.15)',
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.05)',
                        boxShadow: '0 20px 60px rgba(139, 69, 19, 0.25)',
                        border: '2px solid rgba(255, 215, 0, 0.6)',
                        '& .icon': {
                          transform: 'scale(1.2) rotate(10deg)',
                        }
                      },
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      animation: 'fadeInUp 2s ease-out'
                    }}
                    onClick={() => user ? setCurrentPage('doctors') : setAuthDialogOpen(true)}
                  >
                    <LocalHospital className="icon" sx={{ fontSize: 48, color: '#4ECDC4', mb: 2, transition: 'all 0.3s ease' }} />
                    <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                      Find Doctors
                    </Typography>
                    <Typography variant="body2" textAlign="center" color="text.secondary">
                      Connect with certified Ayurvedic practitioners
                    </Typography>
                    {!user && (
                      <Typography variant="caption" sx={{ mt: 1, color: '#8B4513', fontWeight: 600 }}>
                        🔐 Sign in required
                      </Typography>
                    )}
                  </Card>
                </Grid>
              </Grid>

              {!user && (
                <Box sx={{ mt: 8, animation: 'fadeInUp 2.2s ease-out' }}>
                  <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#8B4513', fontWeight: 600 }}>
                    🌟 Ready to Discover Your Divine Nature? 🌟
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setAuthDialogOpen(true)}
                    sx={{ 
                      minWidth: 300,
                      py: 3,
                      px: 6,
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      borderRadius: 4,
                      background: 'linear-gradient(45deg, #8B4513 30%, #A0522D 90%)',
                      boxShadow: '0 12px 40px rgba(139, 69, 19, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #A0522D 30%, #CD853F 90%)',
                        transform: 'translateY(-4px) scale(1.05)',
                        boxShadow: '0 20px 60px rgba(139, 69, 19, 0.5)',
                      },
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                        transition: 'left 0.5s',
                      },
                      '&:hover::before': {
                        left: '100%',
                      }
                    }}
                  >
                    🚀 Begin Your Sacred Wellness Journey
                  </Button>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mt: 3, 
                      color: 'text.secondary',
                      fontStyle: 'italic'
                    }}
                  >
                    ✨ Join thousands discovering their Ayurvedic constitution ✨
                  </Typography>
                </Box>
              )}

              {user && (
                <Box sx={{ mt: 8, animation: 'fadeInUp 2.2s ease-out' }}>
                  <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#8B4513', fontWeight: 600 }}>
                    🙏 Welcome back, {user.displayName || user.email}! 🙏
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
                    Continue your sacred wellness journey
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => setCurrentPage('quiz')}
                      sx={{ minWidth: 200, py: 2 }}
                    >
                      Take Prakriti Quiz 🧬
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => setCurrentPage('profile')}
                      sx={{ minWidth: 200, py: 2 }}
                    >
                      View Profile 👤
                    </Button>
                  </Box>
                </Box>
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
                  <MenuItem onClick={() => {
                    setCurrentPage('profile');
                    setUserMenuAnchor(null);
                  }}>
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

// Wrap App with AuthProvider
const AppWithAuth = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithAuth;