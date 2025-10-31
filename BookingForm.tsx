import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Box,
  Avatar,
  Chip,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Alert,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  VideoCall,
  LocalHospital,
  Schedule,
  Payment,
  CheckCircle
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Types
interface Doctor {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  profileImage: string;
  rating: number;
  consultation: {
    online: boolean;
    inPerson: boolean;
    fees: {
      online: number;
      inPerson: number;
    };
  };
  clinic: {
    name: string;
    address: string;
    city: string;
    phone: string;
  };
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface BookingFormProps {
  open: boolean;
  doctor: Doctor | null;
  onClose: () => void;
  onBookingConfirm: (bookingData: any) => void;
}

// Sample time slots
const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9;
  const endHour = 18;
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push({
        id: `${hour}-${minute}`,
        time: timeString,
        available: Math.random() > 0.3 // Random availability
      });
    }
  }
  
  return slots;
};

const BookingForm: React.FC<BookingFormProps> = ({
  open,
  doctor,
  onClose,
  onBookingConfirm
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [consultationType, setConsultationType] = useState<'online' | 'in-person'>('online');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps = ['Consultation Type', 'Date & Time', 'Details', 'Payment', 'Confirmation'];

  useEffect(() => {
    if (selectedDate) {
      setTimeSlots(generateTimeSlots(selectedDate));
      setSelectedSlot(null);
    }
  }, [selectedDate]);

  const handleNext = () => {
    if (activeStep === 0 && !consultationType) {
      setError('Please select consultation type');
      return;
    }
    if (activeStep === 1 && (!selectedDate || !selectedSlot)) {
      setError('Please select date and time');
      return;
    }
    if (activeStep === 2 && !symptoms.trim()) {
      setError('Please describe your symptoms');
      return;
    }
    
    setError(null);
    if (activeStep === 3) {
      handlePayment();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError(null);
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const bookingData = {
        doctor,
        consultationType,
        date: selectedDate,
        timeSlot: selectedSlot,
        symptoms,
        amount: doctor?.consultation.fees[consultationType] || 0,
        paymentStatus: 'paid'
      };
      
      setActiveStep(4);
      onBookingConfirm(bookingData);
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    setSelectedDate(new Date());
    setSelectedSlot(null);
    setSymptoms('');
    setError(null);
    onClose();
  };

  if (!doctor) return null;

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Choose Consultation Type
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={consultationType}
                onChange={(e) => setConsultationType(e.target.value as 'online' | 'in-person')}
              >
                {doctor.consultation.online && (
                  <Card sx={{ mb: 2, border: consultationType === 'online' ? 2 : 1, borderColor: consultationType === 'online' ? 'primary.main' : 'grey.300' }}>
                    <CardContent>
                      <FormControlLabel
                        value="online"
                        control={<Radio />}
                        label={
                          <Box display="flex" alignItems="center">
                            <VideoCall color="primary" sx={{ mr: 1 }} />
                            <Box>
                              <Typography variant="subtitle1">Online Consultation</Typography>
                              <Typography variant="body2" color="text.secondary">
                                Video call from comfort of your home
                              </Typography>
                              <Typography variant="h6" color="primary">
                                ₹{doctor.consultation.fees.online}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </CardContent>
                  </Card>
                )}
                
                {doctor.consultation.inPerson && (
                  <Card sx={{ border: consultationType === 'in-person' ? 2 : 1, borderColor: consultationType === 'in-person' ? 'primary.main' : 'grey.300' }}>
                    <CardContent>
                      <FormControlLabel
                        value="in-person"
                        control={<Radio />}
                        label={
                          <Box display="flex" alignItems="center">
                            <LocalHospital color="primary" sx={{ mr: 1 }} />
                            <Box>
                              <Typography variant="subtitle1">In-Person Visit</Typography>
                              <Typography variant="body2" color="text.secondary">
                                Visit {doctor.clinic.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {doctor.clinic.address}, {doctor.clinic.city}
                              </Typography>
                              <Typography variant="h6" color="primary">
                                ₹{doctor.consultation.fees.inPerson}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </CardContent>
                  </Card>
                )}
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Date & Time
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                minDate={new Date()}
                sx={{ mb: 3, width: '100%' }}
              />
            </LocalizationProvider>
            
            {selectedDate && (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Available Time Slots
                </Typography>
                <Grid container spacing={1}>
                  {timeSlots.filter(slot => slot.available).map((slot) => (
                    <Grid item key={slot.id}>
                      <Chip
                        label={slot.time}
                        clickable
                        color={selectedSlot?.id === slot.id ? 'primary' : 'default'}
                        variant={selectedSlot?.id === slot.id ? 'filled' : 'outlined'}
                        onClick={() => setSelectedSlot(slot)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Consultation Details
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Describe your symptoms or health concerns"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Please provide details about your current health concerns, symptoms, or what you'd like to discuss with the doctor."
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary">
              This information helps the doctor prepare for your consultation and provide better care.
            </Typography>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Summary
            </Typography>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Consultation Fee</Typography>
                  <Typography>₹{doctor.consultation.fees[consultationType]}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Platform Fee</Typography>
                  <Typography>₹0</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Total Amount</Typography>
                  <Typography variant="h6" color="primary">
                    ₹{doctor.consultation.fees[consultationType]}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            
            <Alert severity="info" sx={{ mb: 2 }}>
              You will be charged only after the consultation is confirmed by the doctor.
            </Alert>
            
            {loading && (
              <Box display="flex" alignItems="center" justifyContent="center" p={2}>
                <CircularProgress size={24} sx={{ mr: 1 }} />
                <Typography>Processing payment...</Typography>
              </Box>
            )}
          </Box>
        );

      case 4:
        return (
          <Box textAlign="center">
            <CheckCircle color="success" sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Booking Confirmed!
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Your appointment has been successfully booked.
            </Typography>
            
            <Card sx={{ textAlign: 'left' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Appointment Details</Typography>
                <Box mb={1}>
                  <Typography variant="body2" color="text.secondary">Doctor</Typography>
                  <Typography>{doctor.name}</Typography>
                </Box>
                <Box mb={1}>
                  <Typography variant="body2" color="text.secondary">Date & Time</Typography>
                  <Typography>
                    {selectedDate?.toLocaleDateString()} at {selectedSlot?.time}
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Typography variant="body2" color="text.secondary">Type</Typography>
                  <Typography>
                    {consultationType === 'online' ? 'Online Consultation' : 'In-Person Visit'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Amount Paid</Typography>
                  <Typography>₹{doctor.consultation.fees[consultationType]}</Typography>
                </Box>
              </CardContent>
            </Card>
            
            <Alert severity="success" sx={{ mt: 2 }}>
              {consultationType === 'online' 
                ? 'You will receive a video call link 15 minutes before your appointment.'
                : 'Please arrive 10 minutes early at the clinic.'
              }
            </Alert>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Avatar src={doctor.profileImage} sx={{ mr: 2 }}>
            {doctor.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6">{doctor.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {doctor.title}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {renderStepContent()}
      </DialogContent>

      <DialogActions>
        {activeStep !== 4 && (
          <>
            <Button onClick={handleClose}>Cancel</Button>
            {activeStep > 0 && (
              <Button onClick={handleBack}>Back</Button>
            )}
            <Button 
              variant="contained" 
              onClick={handleNext}
              disabled={loading}
            >
              {activeStep === 3 ? 'Pay Now' : 'Next'}
            </Button>
          </>
        )}
        {activeStep === 4 && (
          <Button variant="contained" onClick={handleClose}>
            Done
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BookingForm;