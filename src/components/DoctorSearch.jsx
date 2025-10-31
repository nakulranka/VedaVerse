import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Button,
  Avatar,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { Search, LocationOn, AccessTime, LocalHospital } from '@mui/icons-material';

const sampleDoctors = [
  {
    id: 1,
    name: "Dr. Rajesh Sharma",
    specialization: "Panchakarma Specialist",
    experience: "15 years",
    rating: 4.8,
    location: "Mumbai, Maharashtra",
    languages: ["Hindi", "English", "Marathi"],
    consultationFee: "₹800",
    availability: "Mon-Sat, 9AM-6PM",
    image: "/images/doctor1.jpg",
    qualifications: ["BAMS", "MD (Ayurveda)", "Panchakarma Certified"],
    specialties: ["Stress Management", "Digestive Disorders", "Joint Pain"]
  },
  {
    id: 2,
    name: "Dr. Priya Nair",
    specialization: "Women's Health Ayurveda",
    experience: "12 years",
    rating: 4.9,
    location: "Bangalore, Karnataka",
    languages: ["English", "Hindi", "Kannada"],
    consultationFee: "₹1000",
    availability: "Mon-Fri, 10AM-5PM",
    image: "/images/doctor2.jpg",
    qualifications: ["BAMS", "MS (Ayurveda)", "Women's Health Specialist"],
    specialties: ["PCOS/PCOD", "Fertility", "Menstrual Disorders"]
  },
  {
    id: 3,
    name: "Dr. Arun Kumar",
    specialization: "Ayurvedic Dermatology",
    experience: "18 years",
    rating: 4.7,
    location: "Chennai, Tamil Nadu",
    languages: ["Tamil", "English", "Telugu"],
    consultationFee: "₹600",
    availability: "Tue-Sun, 8AM-7PM",
    image: "/images/doctor3.jpg",
    qualifications: ["BAMS", "MD (Kayachikitsa)", "Dermatology Specialist"],
    specialties: ["Skin Disorders", "Hair Problems", "Allergies"]
  },
  {
    id: 4,
    name: "Dr. Meera Joshi",
    specialization: "Pediatric Ayurveda",
    experience: "10 years",
    rating: 4.6,
    location: "Pune, Maharashtra",
    languages: ["Hindi", "English", "Marathi"],
    consultationFee: "₹700",
    availability: "Mon-Sat, 11AM-4PM",
    image: "/images/doctor4.jpg",
    qualifications: ["BAMS", "MD (Kaumarbhritya)", "Child Health Specialist"],
    specialties: ["Child Development", "Immunity Building", "Digestive Issues"]
  }
];

function DoctorSearch({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingDialog, setBookingDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredDoctors = sampleDoctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingDialog(true);
  };

  const handleBookingSubmit = () => {
    if (selectedDate && selectedTime && consultationType) {
      setBookingSuccess(true);
      setBookingDialog(false);
      // Reset form
      setSelectedDate('');
      setSelectedTime('');
      setConsultationType('');
      
      setTimeout(() => {
        setBookingSuccess(false);
      }, 5000);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom color="primary" textAlign="center">
        <LocalHospital sx={{ mr: 1, verticalAlign: 'middle' }} />
        Find Ayurvedic Practitioners
      </Typography>
      
      <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
        Connect with certified Ayurvedic doctors and book consultations
      </Typography>

      {bookingSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Appointment booked successfully! You will receive a confirmation email shortly.
        </Alert>
      )}

      {/* Search */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search by doctor name, specialization, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Doctors Grid */}
      <Grid container spacing={3}>
        {filteredDoctors.map((doctor) => (
          <Grid item xs={12} md={6} key={doctor.id}>
            <Card 
              sx={{ 
                height: '100%',
                '&:hover': { 
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      width: 60, 
                      height: 60, 
                      mr: 2, 
                      bgcolor: 'primary.main',
                      fontSize: '1.5rem'
                    }}
                  >
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                      {doctor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {doctor.specialization}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Rating value={doctor.rating} precision={0.1} size="small" readOnly />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {doctor.rating} ({doctor.experience})
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {doctor.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTime sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {doctor.availability}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                    Specialties:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {doctor.specialties.map((specialty, index) => (
                      <Chip
                        key={index}
                        label={specialty}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    {doctor.consultationFee}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleBookAppointment(doctor)}
                    size="small"
                  >
                    Book Appointment
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Booking Dialog */}
      <Dialog
        open={bookingDialog}
        onClose={() => setBookingDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedDoctor && (
          <>
            <DialogTitle>
              <Typography variant="h5" component="h2">
                Book Appointment with {selectedDoctor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedDoctor.specialization} • {selectedDoctor.consultationFee}
              </Typography>
            </DialogTitle>
            
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Select Date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: new Date().toISOString().split('T')[0]
                  }}
                  margin="normal"
                  required
                />
                
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Select Time</InputLabel>
                  <Select
                    value={selectedTime}
                    label="Select Time"
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    {timeSlots.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Consultation Type</InputLabel>
                  <Select
                    value={consultationType}
                    label="Consultation Type"
                    onChange={(e) => setConsultationType(e.target.value)}
                  >
                    <MenuItem value="video">Video Consultation</MenuItem>
                    <MenuItem value="clinic">In-Clinic Visit</MenuItem>
                    <MenuItem value="phone">Phone Consultation</MenuItem>
                  </Select>
                </FormControl>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  <strong>Patient:</strong> {user?.displayName || user?.email}
                </Typography>
              </Box>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setBookingDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleBookingSubmit}
                variant="contained"
                disabled={!selectedDate || !selectedTime || !consultationType}
              >
                Confirm Booking
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {filteredDoctors.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No doctors found matching your search
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search terms
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default DoctorSearch;