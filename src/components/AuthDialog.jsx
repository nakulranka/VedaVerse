import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Tabs,
  Tab,
  CircularProgress,
  Paper,
  Fade,
  Slide,
  IconButton,
  InputAdornment,
  Divider,
  Chip
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Close,
  Google as GoogleIcon,
  Facebook as FacebookIcon
} from '@mui/icons-material';
import authService from '../services/auth-service';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function AuthDialog({ open, onClose }) {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setError('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      displayName: ''
    });
  };

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    setError('');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.signIn(formData.email, formData.password);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await authService.signUp(formData.email, formData.password, formData.displayName);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 248, 225, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 215, 0, 0.3)',
          boxShadow: '0 20px 60px rgba(139, 69, 19, 0.3)',
        }
      }}
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' }}
    >
      <Box
        sx={{
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #FFD700 0%, #8B4513 50%, #FFD700 100%)',
            borderRadius: '16px 16px 0 0'
          }
        }}
      >
        <DialogTitle sx={{ position: 'relative', pt: 4 }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary',
              '&:hover': {
                background: 'rgba(139, 69, 19, 0.1)',
                transform: 'rotate(90deg)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <Close />
          </IconButton>

          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography 
              variant="h3" 
              sx={{
                background: 'linear-gradient(45deg, #8B4513 30%, #FFD700 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                mb: 1
              }}
            >
              🕉️ VedaVerse
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Welcome to Divine Wellness
            </Typography>
            <Chip 
              label="✨ Join the Sacred Journey ✨"
              sx={{
                mt: 2,
                background: 'linear-gradient(45deg, rgba(255, 215, 0, 0.2) 30%, rgba(139, 69, 19, 0.2) 90%)',
                border: '1px solid rgba(255, 215, 0, 0.5)',
                fontWeight: 600
              }}
            />
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ px: 4, pb: 2 }}>
          <Paper
            elevation={0}
            sx={{
              p: 1,
              background: 'rgba(255, 255, 255, 0.7)',
              borderRadius: 3,
              border: '1px solid rgba(255, 215, 0, 0.3)'
            }}
          >
            <Tabs 
              value={tab} 
              onChange={handleTabChange} 
              centered
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 600,
                  '&.Mui-selected': {
                    color: '#8B4513'
                  }
                },
                '& .MuiTabs-indicator': {
                  background: 'linear-gradient(45deg, #8B4513 30%, #FFD700 90%)',
                  height: 3,
                  borderRadius: 2
                }
              }}
            >
              <Tab label="🔐 Sign In" />
              <Tab label="✨ Create Account" />
            </Tabs>
          </Paper>

          <Fade in={Boolean(error)} timeout={300}>
            <Box>
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mt: 3,
                    borderRadius: 2,
                    background: 'rgba(244, 67, 54, 0.1)',
                    border: '1px solid rgba(244, 67, 54, 0.3)',
                    '& .MuiAlert-icon': {
                      color: '#d32f2f'
                    }
                  }}
                >
                  {error}
                </Alert>
              )}
            </Box>
          </Fade>

          {/* Sign In Tab */}
          <TabPanel value={tab} index={0}>
            <Fade in={tab === 0} timeout={500}>
              <Box component="form" onSubmit={handleSignIn} sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  margin="normal"
                  required
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: '#8B4513' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.8)',
                      '&:hover fieldset': {
                        borderColor: '#FFD700'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8B4513'
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#8B4513'
                    }
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  margin="normal"
                  required
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#8B4513' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#8B4513' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.8)',
                      '&:hover fieldset': {
                        borderColor: '#FFD700'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8B4513'
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#8B4513'
                    }
                  }}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ 
                    mt: 4, 
                    mb: 2,
                    height: 56,
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #8B4513 30%, #A0522D 90%)',
                    boxShadow: '0 8px 25px rgba(139, 69, 19, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #A0522D 30%, #CD853F 90%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(139, 69, 19, 0.4)',
                    },
                    '&:disabled': {
                      background: 'rgba(139, 69, 19, 0.3)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? (
                    <CircularProgress size={26} sx={{ color: 'white' }} />
                  ) : (
                    '🚀 Begin Sacred Journey'
                  )}
                </Button>

                <Divider sx={{ my: 3 }}>
                  <Chip label="or continue with" size="small" />
                </Divider>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    sx={{
                      borderRadius: 2,
                      borderColor: 'rgba(139, 69, 19, 0.3)',
                      color: '#8B4513',
                      '&:hover': {
                        borderColor: '#8B4513',
                        background: 'rgba(139, 69, 19, 0.05)'
                      }
                    }}
                  >
                    Google
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FacebookIcon />}
                    sx={{
                      borderRadius: 2,
                      borderColor: 'rgba(139, 69, 19, 0.3)',
                      color: '#8B4513',
                      '&:hover': {
                        borderColor: '#8B4513',
                        background: 'rgba(139, 69, 19, 0.05)'
                      }
                    }}
                  >
                    Facebook
                  </Button>
                </Box>
              </Box>
            </Fade>
          </TabPanel>

          {/* Sign Up Tab */}
          <TabPanel value={tab} index={1}>
            <Fade in={tab === 1} timeout={500}>
              <Box component="form" onSubmit={handleSignUp} sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.displayName}
                  onChange={handleInputChange('displayName')}
                  margin="normal"
                  autoComplete="name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: '#8B4513' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.8)',
                      '&:hover fieldset': {
                        borderColor: '#FFD700'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8B4513'
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#8B4513'
                    }
                  }}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  margin="normal"
                  required
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: '#8B4513' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.8)',
                      '&:hover fieldset': {
                        borderColor: '#FFD700'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8B4513'
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#8B4513'
                    }
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  margin="normal"
                  required
                  autoComplete="new-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#8B4513' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#8B4513' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.8)',
                      '&:hover fieldset': {
                        borderColor: '#FFD700'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8B4513'
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#8B4513'
                    }
                  }}
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange('confirmPassword')}
                  margin="normal"
                  required
                  autoComplete="new-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#8B4513' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          sx={{ color: '#8B4513' }}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.8)',
                      '&:hover fieldset': {
                        borderColor: '#FFD700'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8B4513'
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#8B4513'
                    }
                  }}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ 
                    mt: 4, 
                    mb: 2,
                    height: 56,
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #8B4513 30%, #A0522D 90%)',
                    boxShadow: '0 8px 25px rgba(139, 69, 19, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #A0522D 30%, #CD853F 90%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(139, 69, 19, 0.4)',
                    },
                    '&:disabled': {
                      background: 'rgba(139, 69, 19, 0.3)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? (
                    <CircularProgress size={26} sx={{ color: 'white' }} />
                  ) : (
                    '✨ Create Divine Account'
                  )}
                </Button>

                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  textAlign="center"
                  sx={{ mt: 2, lineHeight: 1.6 }}
                >
                  🌟 By creating an account, you agree to embark on a sacred journey of wellness and discovery 🌟
                </Typography>
              </Box>
            </Fade>
          </TabPanel>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default AuthDialog;