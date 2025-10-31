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
  CircularProgress
} from '@mui/material';
import authService from '../auth-service.js';

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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="h2" textAlign="center">
          Welcome to VedaVerse
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* Sign In Tab */}
        <TabPanel value={tab} index={0}>
          <Box component="form" onSubmit={handleSignIn} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              margin="normal"
              required
              autoComplete="email"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange('password')}
              margin="normal"
              required
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </Box>
        </TabPanel>

        {/* Sign Up Tab */}
        <TabPanel value={tab} index={1}>
          <Box component="form" onSubmit={handleSignUp} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.displayName}
              onChange={handleInputChange('displayName')}
              margin="normal"
              autoComplete="name"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              margin="normal"
              required
              autoComplete="email"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange('password')}
              margin="normal"
              required
              autoComplete="new-password"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              margin="normal"
              required
              autoComplete="new-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
          </Box>
        </TabPanel>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AuthDialog;